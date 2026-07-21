import { NextResponse } from "next/server";
import {
  fetchGbpReviews,
  isGbpReviewsConfigured,
} from "@/lib/google-reviews";
import { getReviews } from "@/lib/reviews";

/**
 * Debug / health endpoint for Google Business Profile review sync.
 * Prefer getReviews() in Server Components for SSR SEO.
 */
export async function GET() {
  if (!isGbpReviewsConfigured()) {
    const curated = await getReviews();
    return NextResponse.json(
      {
        configured: false,
        provider: "google-business-profile",
        message:
          "Set GOOGLE_GBP_CLIENT_ID, GOOGLE_GBP_CLIENT_SECRET, GOOGLE_GBP_REFRESH_TOKEN, and GOOGLE_GBP_ACCOUNT_ID + GOOGLE_GBP_LOCATION_ID (or GOOGLE_GBP_LOCATION_NAME). Run: npm run gbp:setup",
        payload: curated,
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=300, stale-while-revalidate=60",
        },
      },
    );
  }

  const live = await fetchGbpReviews();
  if (!live) {
    return NextResponse.json(
      {
        configured: true,
        provider: "google-business-profile",
        ok: false,
        message:
          "GBP request failed — check OAuth refresh token, API approval (quota > 0), and account/location IDs.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json(
    {
      configured: true,
      provider: "google-business-profile",
      ok: true,
      payload: {
        ...live,
        sampleReviewCount: live.reviews.length,
      },
    },
    {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=600",
      },
    },
  );
}
