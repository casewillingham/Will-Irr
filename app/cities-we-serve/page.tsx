import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { CtaBand } from "@/components/CtaBand";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import {
  citiesByRegion,
  getPriorityCities,
  regionLabels,
} from "@/lib/cities";
import { getCitiesHubJsonLd } from "@/lib/schema";
import { site } from "@/lib/site";

const hubFaqs = [
  {
    question: "What areas of North Texas do you cover?",
    answer: `We serve Greater Fort Worth and nearby North Texas — including Benbrook, White Settlement, Palmilla Springs, Weatherford, Fort Worth, and the full city list on this page across Tarrant, Parker, Johnson, and adjoining counties. See every city above or text ${site.phoneDisplay} to confirm your ZIP.`,
  },
  {
    question: "Do you only serve the featured cities?",
    answer: `No — we serve every city on this list. Featured just means that page has a bit more local info. If you’re nearby and don’t see your town, text ${site.phoneDisplay} and we’ll check your ZIP.`,
  },
  {
    question: "Can I book sprinkler repair online?",
    answer:
      "Yes. Use Book Now for Housecall Pro scheduling, or text us — texting is often the fastest way to confirm timing.",
  },
];

export const metadata: Metadata = {
  title: "Sprinkler Repair Across North Texas & Greater Fort Worth",
  description:
    "Licensed sprinkler and irrigation repair across Benbrook, White Settlement, Palmilla Springs, Weatherford, Fort Worth, and nearby North Texas cities. Find your city.",
  alternates: { canonical: "/cities-we-serve" },
  openGraph: {
    title: `Sprinkler Repair Across North Texas | ${site.name}`,
    description:
      "Serving Benbrook, White Settlement, Palmilla Springs, Weatherford, Fort Worth, and communities across the Greater Fort Worth area. Licensed Texas irrigator.",
    url: "/cities-we-serve",
    siteName: site.name,
    locale: "en_US",
    type: "website",
  },
};

export default function CitiesHubPage() {
  const priority = getPriorityCities();
  const prioritySlugs = new Set(priority.map((c) => c.slug));
  const groups = citiesByRegion();

  return (
    <>
      <JsonLd data={getCitiesHubJsonLd(hubFaqs)} />

      <PageHero
        label="North Texas service area"
        title="Sprinkler repair across Greater Fort Worth"
        subline={`Licensed sprinkler repair across Greater Fort Worth and North Texas. Find your city below — or text ${site.phoneDisplay} if you’re nearby.`}
        imageSrc="/images/photos/green-lawn.jpg"
        imageAlt="North Texas lawn irrigation"
      />

      <section className="bg-[#e8edf2] px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-moss">
              Service area
            </p>
            <h2 className="mt-3 max-w-2xl font-display text-3xl font-semibold tracking-tight text-ink md:text-4xl">
              Find your city
            </h2>
            <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-ink-muted">
              We repair sprinklers across Greater Fort Worth and nearby North
              Texas towns. Pick your city for local details — or text{" "}
              {site.phoneDisplay} if you’re close by and don’t see your name
              listed.
            </p>
          </Reveal>

          <div className="mt-12 space-y-12">
            {groups.map((group) => (
              <div key={group.region}>
                <Reveal>
                  <h3 className="font-display text-xl font-semibold text-ink">
                    {regionLabels[group.region]}
                  </h3>
                </Reveal>
                <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {group.cities.map((city, i) => {
                    const featured = prioritySlugs.has(city.slug);
                    return (
                      <Reveal key={city.slug} delayMs={Math.min(i * 25, 150)}>
                        <Link
                          href={`/${city.slug}`}
                          className="group flex h-full min-h-[4.25rem] items-center justify-between gap-3 bg-ink px-5 py-5 transition hover:bg-moss-deep"
                        >
                          <span className="font-display text-lg font-semibold text-white">
                            {city.name}
                            {featured ? (
                              <span className="ml-2 align-middle text-[10px] font-semibold uppercase tracking-[0.1em] text-leaf/80">
                                · Featured
                              </span>
                            ) : null}
                          </span>
                          <span className="shrink-0 text-[13px] font-semibold tracking-wide text-leaf">
                            View →
                          </span>
                        </Link>
                      </Reveal>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-mist px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-moss">
              Why local matters
            </p>
            <h2 className="mt-3 max-w-2xl font-display text-3xl font-semibold tracking-tight text-ink md:text-4xl">
              Built for North Texas heat, clay, and freezes
            </h2>
            <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-ink-muted">
              Sprinkler systems here fail in predictable ways — mower-clipped
              heads, burned solenoids in August, freeze-cracked fittings after a
              cold snap, and controllers that never matched the landscape. We
              diagnose and repair across the metroplex, with seasonal start-up
              and winterization so you’re ready before extremes hit.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-white px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-3xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-moss">
            FAQ
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink">
            Service area questions
          </h2>
          <div className="mt-8">
            <Faq items={hubFaqs} />
          </div>
        </div>
      </section>

      <CtaBand
        headline="Need sprinkler repair in North Texas?"
        body={`Text ${site.phoneDisplay} or book online — we’ll confirm you’re in range and get you on the calendar.`}
      />
    </>
  );
}
