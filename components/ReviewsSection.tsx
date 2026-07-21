import Link from "next/link";
import { BookNowButton } from "@/components/CtaButtons";
import { Reveal } from "@/components/Reveal";
import { StarRating } from "@/components/StarRating";
import { getReviews, hasReviews } from "@/lib/reviews";

type Props = {
  /** Show fewer cards on interior pages */
  limit?: number;
  className?: string;
};

export async function ReviewsSection({ limit = 6, className = "" }: Props) {
  const data = await getReviews();
  const reviews = data.reviews.slice(0, limit);
  const showCards = hasReviews(data);
  const rating = data.aggregateRating;
  const count = data.reviewCount;
  const googleUrl = data.googleReviewsUrl;

  return (
    <section className={`bg-mist px-5 py-20 md:px-8 md:py-24 ${className}`}>
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-moss">
                Customer reviews
              </p>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink md:text-4xl">
                Trusted by homeowners across Benbrook & Fort Worth
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-ink-muted">
                Real feedback from local customers — shown in our layout, not a
                third-party widget.
                {showCards
                  ? " Here’s what people say about our sprinkler repair and maintenance."
                  : " See our latest reviews on Google."}
              </p>
              {rating != null && count != null ? (
                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <StarRating rating={rating} />
                  <p className="font-display text-lg font-semibold text-ink">
                    {rating.toFixed(1)}
                    <span className="ml-1 text-[14px] font-medium text-ink-muted">
                      · {count} Google {count === 1 ? "review" : "reviews"}
                    </span>
                  </p>
                </div>
              ) : null}
            </div>
            <div className="flex shrink-0 flex-wrap gap-3">
              {googleUrl ? (
                <Link
                  href={googleUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center border border-stone bg-white px-5 py-3 text-[13px] font-semibold tracking-wide text-ink transition-colors hover:bg-[#e8edf2]"
                >
                  Read all on Google
                </Link>
              ) : null}
              <BookNowButton className="px-5 py-3 text-[13px]" />
            </div>
          </div>
        </Reveal>

        {showCards ? (
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {reviews.map((review, i) => (
              <Reveal key={review.id} delayMs={i * 60}>
                <figure className="flex h-full flex-col border border-stone bg-white px-6 py-7">
                  <StarRating rating={review.rating} className="text-[15px]" />
                  <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-ink">
                    “{review.text}”
                  </blockquote>
                  <figcaption className="mt-6 border-t border-stone pt-4">
                    <p className="font-display text-[15px] font-semibold text-ink">
                      {review.author}
                    </p>
                    <p className="mt-1 text-[13px] text-ink-muted">
                      {[review.location, review.relativeDate]
                        .filter(Boolean)
                        .join(" · ")}
                    </p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal delayMs={80}>
            <div className="mt-12 border border-stone bg-white px-6 py-10 md:px-10">
              <p className="max-w-2xl text-[15px] leading-relaxed text-ink-muted">
                {data.live
                  ? "Google hasn’t returned review quotes yet for this listing. Rating and count still sync when available — or open Google to leave the first review."
                  : "We’re connecting live Google reviews. In the meantime, book with confidence — we’re licensed, local, and easy to reach by text."}
              </p>
              {googleUrl ? (
                <Link
                  href={googleUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex text-[13px] font-semibold tracking-wide text-moss hover:underline"
                >
                  Read reviews on Google →
                </Link>
              ) : null}
            </div>
          </Reveal>
        )}

        {data.live || googleUrl ? (
          <p className="mt-8 text-[12px] text-ink-muted">
            Reviews from{" "}
            {googleUrl ? (
              <Link
                href={googleUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-ink underline-offset-2 hover:underline"
              >
                Google
              </Link>
            ) : (
              "Google"
            )}
            {data.live ? " · updated automatically" : null}
          </p>
        ) : null}
      </div>
    </section>
  );
}
