import type { Review, ReviewsPayload } from "@/lib/reviews";
import { site } from "@/lib/site";

/** Cache GBP review payloads about once per hour. */
export const GBP_REVALIDATE_SECONDS = 3600;

const BUSINESS_MANAGE_SCOPE =
  "https://www.googleapis.com/auth/business.manage";

const STAR_MAP: Record<string, number> = {
  ONE: 1,
  TWO: 2,
  THREE: 3,
  FOUR: 4,
  FIVE: 5,
};

type GbpReviewer = {
  displayName?: string;
  profilePhotoUrl?: string;
  isAnonymous?: boolean;
};

type GbpReview = {
  name?: string;
  reviewId?: string;
  reviewer?: GbpReviewer;
  starRating?: string;
  comment?: string;
  createTime?: string;
  updateTime?: string;
};

type GbpListReviewsResponse = {
  reviews?: GbpReview[];
  averageRating?: number;
  totalReviewCount?: number;
  nextPageToken?: string;
  error?: {
    message?: string;
    status?: string;
    code?: number;
  };
};

type TokenResponse = {
  access_token?: string;
  expires_in?: number;
  error?: string;
  error_description?: string;
};

function gbpLocationParent(): string | null {
  const explicit = process.env.GOOGLE_GBP_LOCATION_NAME?.trim();
  if (explicit) {
    return explicit.replace(/^\/+/, "");
  }

  const accountId = process.env.GOOGLE_GBP_ACCOUNT_ID?.trim();
  const locationId = process.env.GOOGLE_GBP_LOCATION_ID?.trim();
  if (!accountId || !locationId) return null;

  const account = accountId.startsWith("accounts/")
    ? accountId
    : `accounts/${accountId}`;
  const location = locationId.startsWith("locations/")
    ? locationId.slice("locations/".length)
    : locationId;

  return `${account}/locations/${location}`;
}

export function isGbpReviewsConfigured(): boolean {
  return Boolean(
    process.env.GOOGLE_GBP_CLIENT_ID?.trim() &&
      process.env.GOOGLE_GBP_CLIENT_SECRET?.trim() &&
      process.env.GOOGLE_GBP_REFRESH_TOKEN?.trim() &&
      gbpLocationParent(),
  );
}

async function getAccessToken(): Promise<string | null> {
  const clientId = process.env.GOOGLE_GBP_CLIENT_ID?.trim();
  const clientSecret = process.env.GOOGLE_GBP_CLIENT_SECRET?.trim();
  const refreshToken = process.env.GOOGLE_GBP_REFRESH_TOKEN?.trim();
  if (!clientId || !clientSecret || !refreshToken) return null;

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
      grant_type: "refresh_token",
    }),
    cache: "no-store",
  });

  const data = (await res.json()) as TokenResponse;
  if (!res.ok || !data.access_token) {
    console.error(
      "[gbp-reviews] token refresh failed",
      data.error_description || data.error || `HTTP ${res.status}`,
    );
    return null;
  }

  return data.access_token;
}

function starRatingToNumber(star?: string): number {
  if (!star) return 5;
  return STAR_MAP[star] ?? 5;
}

function relativeFromIso(iso?: string): string | undefined {
  if (!iso) return undefined;
  const then = Date.parse(iso);
  if (!Number.isFinite(then)) return undefined;

  const days = Math.max(0, Math.round((Date.now() - then) / 86_400_000));
  if (days <= 0) return "today";
  if (days === 1) return "yesterday";
  if (days < 30) return `${days} days ago`;
  const months = Math.round(days / 30);
  if (months < 12) return months === 1 ? "1 month ago" : `${months} months ago`;
  const years = Math.round(days / 365);
  return years === 1 ? "1 year ago" : `${years} years ago`;
}

function mapGbpReview(review: GbpReview, index: number): Review | null {
  const text = (review.comment ?? "").trim();
  const author = (
    review.reviewer?.displayName ||
    (review.reviewer?.isAnonymous ? "Google user" : "")
  ).trim();

  // Keep rating-only reviews out of quote cards; they still count in totals from the API.
  if (!text || !author) return null;

  return {
    id: review.reviewId || review.name || `gbp-review-${index + 1}`,
    rating: starRatingToNumber(review.starRating),
    text,
    author,
    relativeDate: relativeFromIso(review.updateTime || review.createTime),
  };
}

async function listAllReviews(
  parent: string,
  accessToken: string,
): Promise<GbpListReviewsResponse | null> {
  const reviews: GbpReview[] = [];
  let pageToken: string | undefined;
  let averageRating: number | undefined;
  let totalReviewCount: number | undefined;

  do {
    const url = new URL(
      `https://mybusiness.googleapis.com/v4/${parent}/reviews`,
    );
    url.searchParams.set("pageSize", "50");
    url.searchParams.set("orderBy", "updateTime desc");
    if (pageToken) url.searchParams.set("pageToken", pageToken);

    const res = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
        "X-GOOG-API-FORMAT-VERSION": "2",
      },
      cache: "no-store",
    });

    const data = (await res.json()) as GbpListReviewsResponse;
    if (!res.ok) {
      console.error(
        "[gbp-reviews]",
        data.error?.message || `HTTP ${res.status}`,
      );
      return null;
    }

    if (data.reviews?.length) reviews.push(...data.reviews);
    if (typeof data.averageRating === "number") {
      averageRating = data.averageRating;
    }
    if (typeof data.totalReviewCount === "number") {
      totalReviewCount = data.totalReviewCount;
    }
    pageToken = data.nextPageToken;
  } while (pageToken);

  return { reviews, averageRating, totalReviewCount };
}

/**
 * Live reviews via Google Business Profile API (works for service-area businesses).
 * Requires OAuth refresh token + location IDs — see scripts/gbp-oauth-setup.mjs.
 */
export async function fetchGbpReviews(): Promise<ReviewsPayload | null> {
  if (!isGbpReviewsConfigured()) return null;

  const parent = gbpLocationParent();
  if (!parent) return null;

  try {
    const accessToken = await getAccessToken();
    if (!accessToken) return null;

    const data = await listAllReviews(parent, accessToken);
    if (!data) return null;

    const reviews = (data.reviews ?? [])
      .map(mapGbpReview)
      .filter((r): r is Review => r != null);

    const aggregateRating =
      typeof data.averageRating === "number"
        ? Math.round(data.averageRating * 10) / 10
        : reviews.length
          ? Math.round(
              (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length) *
                10,
            ) / 10
          : null;

    const reviewCount =
      typeof data.totalReviewCount === "number"
        ? data.totalReviewCount
        : reviews.length || null;

    return {
      source: "google",
      googleReviewsUrl: site.googleReviewsUrl || "",
      aggregateRating,
      reviewCount,
      reviews,
      live: true,
    };
  } catch (err) {
    console.error("[gbp-reviews] fetch failed", err);
    return null;
  }
}

/** @deprecated Use isGbpReviewsConfigured */
export function isGoogleReviewsConfigured(): boolean {
  return isGbpReviewsConfigured();
}

/** @deprecated Use fetchGbpReviews */
export async function fetchGooglePlaceReviews(): Promise<ReviewsPayload | null> {
  return fetchGbpReviews();
}

export { BUSINESS_MANAGE_SCOPE };
