import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { CtaBand } from "@/components/CtaBand";
import { ReviewsSection } from "@/components/ReviewsSection";
import { Faq } from "@/components/Faq";
import { BookNowButton, TextButton } from "@/components/CtaButtons";
import { getPriorityCities } from "@/lib/cities";
import { site } from "@/lib/site";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Irrigation Memberships & Sprinkler Repair",
  description:
    "Silver and Gold irrigation memberships from $20/month — free visits, spring start-up, winterization, and discounts. Plus repair and smart upgrades in Benbrook & Fort Worth.",
  alternates: { canonical: "/services" },
};

/** Refresh live Google reviews about hourly */
export const revalidate = 3600;

const whyJoin = [
  {
    t: "Free service visits",
    d: "No per-trip fee when something breaks — we come out and fix it.",
  },
  {
    t: "Seasons covered",
    d: "Spring start-up and winterization included so you’re never scrambling.",
  },
  {
    t: "Real savings",
    d: "10–15% off upgrades, materials, and Christmas lights — plus warranty extensions.",
  },
  {
    t: "Smart monitoring",
    d: "With Hydrawise: 24/7 monitoring and monthly water reports built in.",
  },
];

const plans = [
  {
    name: "Silver",
    price: "$20",
    period: "/month",
    blurb: "Year-round coverage without the hassle of one-off calls.",
    featured: false,
    points: [
      "Spring start-up — activation, programming, adjustments",
      "Winterization — shut-down and freeze prep",
      "Free service visits",
      "10% off upgrades, materials & new Christmas lights",
      "24/7 monitoring (with Hydrawise)",
      "Monthly water reports (with Hydrawise)",
      "Extended warranty +1 year",
    ],
  },
  {
    name: "Gold",
    price: "$40",
    period: "/month",
    blurb: "Peak-season peace of mind — our most complete membership.",
    featured: true,
    points: [
      "Everything in Silver, plus:",
      "Midsummer check-up during peak heat",
      "15% off upgrades, materials & new Christmas lights",
      "Extended warranty +2 years",
      "50% off Christmas light rehang",
    ],
  },
];

const offerings = [
  {
    t: "Repairs",
    d: "Heads, valves, pipes, solenoids, and wiring — diagnosed and fixed right.",
  },
  {
    t: "Seasonal service",
    d: "Spring start-up and winterization as one-time visits if you’re not on a plan.",
  },
  {
    t: "Smart upgrades",
    d: "Hydrawise and Wi-Fi controllers for better convenience and water savings.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        label="Services & memberships"
        title="Stop paying for every service call."
        subline="Silver and Gold memberships keep your sprinklers ready all year — free visits, seasonal service included, and discounts that add up. Repair and smart upgrades anytime you need them."
        imageSrc="/images/photos/sprinkler-close.jpg"
        imageAlt="Sprinkler watering a garden bed"
      />

      <section
        id="memberships"
        className="scroll-mt-24 bg-ink px-5 py-20 md:px-8 md:py-24"
      >
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-leaf">
              Memberships
            </p>
            <h2 className="mt-3 max-w-2xl font-display text-3xl font-semibold tracking-tight text-white md:text-4xl">
              Plans that pay for themselves.
            </h2>
            <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-white/65">
              One broken valve or emergency call can cost more than months of
              Silver. Members get free visits, spring start-up, winterization,
              and preferred pricing — so your system stays healthy without the
              surprise invoices.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {whyJoin.map((item, i) => (
              <Reveal key={item.t} delayMs={i * 50}>
                <div className="border border-white/10 px-5 py-5">
                  <p className="font-display text-lg font-semibold text-white">
                    {item.t}
                  </p>
                  <p className="mt-2 text-[14px] leading-relaxed text-white/55">
                    {item.d}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-14 grid gap-5 lg:grid-cols-2">
            {plans.map((plan, i) => (
              <Reveal key={plan.name} delayMs={i * 80}>
                <div
                  className={`flex h-full flex-col px-6 py-8 md:px-8 md:py-10 ${
                    plan.featured
                      ? "bg-white text-ink"
                      : "border border-white/15 bg-transparent text-white"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p
                        className={`text-[11px] font-semibold uppercase tracking-[0.14em] ${
                          plan.featured ? "text-moss" : "text-leaf"
                        }`}
                      >
                        {plan.name} plan
                      </p>
                      <p className="mt-3 flex items-baseline gap-1 font-display">
                        <span className="text-4xl font-semibold tracking-tight md:text-5xl">
                          {plan.price}
                        </span>
                        <span
                          className={`text-[15px] font-medium ${
                            plan.featured ? "text-ink-muted" : "text-white/55"
                          }`}
                        >
                          {plan.period}
                        </span>
                      </p>
                    </div>
                    {plan.featured ? (
                      <span className="shrink-0 bg-moss px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-white">
                        Most popular
                      </span>
                    ) : null}
                  </div>
                  <p
                    className={`mt-4 text-[15px] leading-relaxed ${
                      plan.featured ? "text-ink-muted" : "text-white/65"
                    }`}
                  >
                    {plan.blurb}
                  </p>
                  <ul
                    className={`mt-8 flex-1 space-y-3 text-[15px] leading-relaxed ${
                      plan.featured ? "text-ink-muted" : "text-white/70"
                    }`}
                  >
                    {plan.points.map((p) => (
                      <li key={p} className="flex gap-3">
                        <span
                          className={`mt-0.5 shrink-0 ${
                            plan.featured ? "text-moss" : "text-leaf"
                          }`}
                          aria-hidden
                        >
                          ✓
                        </span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-10 flex flex-wrap gap-3">
                    <BookNowButton
                      label={`Start ${plan.name}`}
                      className={
                        plan.featured
                          ? undefined
                          : "bg-leaf text-ink hover:bg-white"
                      }
                    />
                    <TextButton
                      className={
                        plan.featured
                          ? "border-stone text-ink hover:bg-mist"
                          : "border-white/35 text-white hover:bg-white/10"
                      }
                    />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <p className="mt-10 text-[14px] text-white/45">
            Serving {site.serviceArea}. Hydrawise monitoring and reports require
            a compatible smart controller — we can upgrade you if needed.
          </p>
        </div>
      </section>

      <ReviewsSection limit={3} />

      <section className="bg-[#e8edf2] px-5 py-20 md:px-8 md:py-24">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-moss">
              Also available
            </p>
            <h2 className="mt-3 max-w-2xl font-display text-3xl font-semibold tracking-tight text-ink md:text-4xl">
              Repair and upgrades anytime.
            </h2>
            <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-ink-muted">
              Not ready for a membership? We still diagnose and fix systems
              fast — and seasonal services are available as one-time visits.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {offerings.map((item, i) => (
              <Reveal key={item.t} delayMs={i * 70}>
                <div className="flex h-full flex-col bg-ink px-5 py-6">
                  <h3 className="font-display text-xl font-semibold text-white">
                    {item.t}
                  </h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-white/65">
                    {item.d}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-mist px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-3xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-moss">
            FAQ
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink">
            Membership questions
          </h2>
          <div className="mt-8">
            <Faq
              items={[
                {
                  question: "Is a membership worth it vs. calling when something breaks?",
                  answer:
                    "Usually yes. One after-hours or peak-season call can exceed several months of Silver. Members get free visits plus spring start-up and winterization included — so you’re covered before problems snowball.",
                },
                {
                  question: "What’s the difference between Silver and Gold?",
                  answer:
                    "Silver is $20/month with spring start-up, winterization, free visits, 10% off upgrades and Christmas lights, Hydrawise monitoring/reports, and one extra year of warranty. Gold is $40/month and adds a midsummer check-up, 15% discount, two extra warranty years, and 50% off Christmas light rehang.",
                },
                {
                  question: "Do I need a Hydrawise controller?",
                  answer:
                    "No — you still get visits, seasonal service, discounts, and warranty extension. 24/7 monitoring and monthly water reports require Hydrawise (or we can install one).",
                },
                {
                  question: "How do I join?",
                  answer: `Book online or text ${site.phoneDisplay} and tell us you’d like Silver or Gold. We’ll confirm details and get you on the calendar for your first seasonal visit.`,
                },
              ]}
            />
          </div>
        </div>
      </section>

      <section className="border-t border-stone bg-white px-5 py-14 md:px-8 md:py-16">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-moss">
              Service area
            </p>
            <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink md:text-3xl">
              Memberships & repair across Greater Fort Worth
            </h2>
            <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-ink-muted">
              We serve Benbrook, Fort Worth, and nearby North Texas cities —
              popular pages below, or see every city we cover.
            </p>
          </Reveal>
          <div className="mt-6 flex flex-wrap gap-3">
            {getPriorityCities().map((city) => (
              <Link
                key={city.slug}
                href={`/${city.slug}`}
                className="border border-stone bg-[#e8edf2] px-4 py-2.5 text-[13px] font-semibold tracking-wide text-ink transition-colors hover:bg-mist"
              >
                {city.name}
              </Link>
            ))}
            <Link
              href="/cities-we-serve"
              className="text-[13px] font-semibold tracking-wide text-moss hover:underline"
            >
              Full city list →
            </Link>
          </div>
        </div>
      </section>

      <CtaBand
        headline="Ready to join a membership?"
        body="Start Silver or Gold online — or text us and we’ll walk you through the best fit for your system."
      />
    </>
  );
}
