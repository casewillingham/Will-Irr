import { unstable_cache } from "next/cache";
import reviewsData from "@/content/reviews.json";
import {
  fetchGbpReviews,
  GBP_REVALIDATE_SECONDS,
  isGbpReviewsConfigured,
} from "@/lib/google-reviews";
import { site } from "@/lib/site";

export type Review = {
  id: string;
  rating: number;
  text: string;
  author: string;
  location?: string;
  relativeDate?: string;
};

export type ReviewsPayload = {
  source: "google" | "housecall" | "mixed";
  googleReviewsUrl: string;
  aggregateRating: number | null;
  reviewCount: number | null;
  reviews: Review[];
  /** True when payload came from Google Business Profile API */
  live?: boolean;
};

type ReviewsFile = {
  source?: ReviewsPayload["source"];
  googleReviewsUrl?: string;
  aggregateRating?: number | null;
  reviewCount?: number | null;
  reviews?: Array<{
    id?: string;
    rating?: number;
    text: string;
    author: string;
    location?: string;
    relativeDate?: string;
  }>;
};

function normalizeReviews(file: ReviewsFile): ReviewsPayload {
  const reviews: Review[] = (file.reviews ?? [])
    .filter((r) => r.text?.trim() && r.author?.trim())
    .map((r, i) => ({
      id: r.id ?? `review-${i + 1}`,
      rating: Math.min(5, Math.max(1, r.rating ?? 5)),
      text: r.text.trim(),
      author: r.author.trim(),
      location: r.location?.trim() || undefined,
      relativeDate: r.relativeDate?.trim() || undefined,
    }));

  const aggregateRating =
    file.aggregateRating ??
    (reviews.length
      ? Math.round(
          (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length) * 10,
        ) / 10
      : null);

  return {
    source: file.source ?? "google",
    googleReviewsUrl: file.googleReviewsUrl || site.googleReviewsUrl || "",
    aggregateRating,
    reviewCount: file.reviewCount ?? (reviews.length || null),
    reviews,
    live: false,
  };
}

function getCuratedReviews(): ReviewsPayload {
  return normalizeReviews(reviewsData as ReviewsFile);
}

const getCachedGbpReviews = unstable_cache(
  async () => fetchGbpReviews(),
  ["gbp-reviews"],
  { revalidate: GBP_REVALIDATE_SECONDS, tags: ["reviews"] },
);

/**
 * Prefer live Google Business Profile sync when configured;
 * otherwise curated content/reviews.json.
 */
export async function getReviews(): Promise<ReviewsPayload> {
  if (isGbpReviewsConfigured()) {
    const live = await getCachedGbpReviews();
    if (live) {
      const curated = getCuratedReviews();
      if (!live.googleReviewsUrl && curated.googleReviewsUrl) {
        live.googleReviewsUrl = curated.googleReviewsUrl;
      }
      // Cap cards shown from API; totals still use full count.
      return live;
    }
  }

  return getCuratedReviews();
}

export function hasReviews(payload: ReviewsPayload): boolean {
  return payload.reviews.length > 0;
}
