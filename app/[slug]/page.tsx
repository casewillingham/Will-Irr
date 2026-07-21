import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { CtaBand } from "@/components/CtaBand";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import {
  cities,
  getCityBySlug,
  getNearbyCities,
} from "@/lib/cities";
import { getCityPageJsonLd } from "@/lib/schema";
import { site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

const sharedFixes = [
  {
    t: "Controllers, valves, leaks & wiring",
    d: "Diagnose dead zones, stuck valves, and wiring faults — then fix them right.",
  },
  {
    t: "Spring start-up & winterization",
    d: "Seasonal service so freezes and heat don’t catch your system off guard.",
  },
  {
    t: "Memberships & smart upgrades",
    d: "Silver and Gold plans with free visits — plus Hydrawise when you want smarter watering.",
  },
];

export function generateStaticParams() {
  return cities.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const city = getCityBySlug(slug);
  if (!city) return {};

  const title = `Sprinkler Repair in ${city.name}, TX`;
  const description = `Licensed sprinkler and irrigation repair in ${city.name}, TX. Fast diagnosis, seasonal service, and memberships from Willingham Irrigation. License ${site.license}.`;

  return {
    title,
    description,
    alternates: { canonical: `/${slug}` },
    openGraph: {
      title: `${title} | ${site.name}`,
      description,
      url: `/${slug}`,
      siteName: site.name,
      locale: "en_US",
      type: "website",
    },
  };
}

export default async function CityLanderPage({ params }: Props) {
  const { slug } = await params;
  const city = getCityBySlug(slug);
  if (!city) notFound();

  const nearby = getNearbyCities(city);

  return (
    <>
      <JsonLd data={getCityPageJsonLd(city)} />

      <PageHero
        label={city.short}
        title={`Sprinkler repair in ${city.name}, TX`}
        subline={city.blurb}
        imageSrc="/images/photos/sprinkler-mist.jpg"
        imageAlt={`Sprinkler and irrigation service in ${city.name}, Texas`}
      />

      <section className="bg-[#e8edf2] px-5 py-20 md:px-8 md:py-24">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-moss">
              Local service
            </p>
            <h2 className="mt-3 max-w-2xl font-display text-3xl font-semibold tracking-tight text-ink md:text-4xl">
              Irrigation help in {city.name}
            </h2>
            <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-ink-muted">
              From broken heads and valve failures to controller problems and
              seasonal start-up or winterization, we help {city.name} homeowners
              and property managers keep systems running efficiently. Licensed
              Texas irrigator {site.license}. Serving {city.name} and
              communities across Greater Fort Worth / North Texas.
            </p>
          </Reveal>

          {city.body?.length ? (
            <div className="mt-10 max-w-3xl space-y-5">
              {city.body.map((paragraph) => (
                <Reveal key={paragraph.slice(0, 48)}>
                  <p className="text-[15px] leading-relaxed text-ink-muted">
                    {paragraph}
                  </p>
                </Reveal>
              ))}
            </div>
          ) : null}

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {city.highlights.map((item, i) => (
              <Reveal key={item} delayMs={i * 70}>
                <div className="bg-ink px-5 py-6">
                  <p className="font-display text-lg font-semibold leading-snug text-white">
                    {item}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-mist px-5 py-20 md:px-8 md:py-24">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-moss">
              What we fix
            </p>
            <h2 className="mt-3 max-w-2xl font-display text-3xl font-semibold tracking-tight text-ink md:text-4xl">
              Sprinkler repair built for North Texas
            </h2>
            <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-ink-muted">
              Heat, clay soils, and freezes stress irrigation across the Greater
              Fort Worth area. Here’s how we help {city.name} properties stay
              watered without the waste.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {sharedFixes.map((item, i) => (
              <Reveal key={item.t} delayMs={i * 70}>
                <div className="flex h-full flex-col border border-stone bg-white px-5 py-6">
                  <h3 className="font-display text-lg font-semibold text-ink">
                    {item.t}
                  </h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-ink-muted">
                    {item.d}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delayMs={120}>
            <p className="mt-10 text-[15px] text-ink-muted">
              Prefer predictable costs? Compare{" "}
              <Link
                href="/services#memberships"
                className="font-semibold text-moss hover:underline"
              >
                Silver and Gold memberships
              </Link>{" "}
              — free visits, spring start-up, and winterization included. Or see{" "}
              <Link
                href="/services"
                className="font-semibold text-moss hover:underline"
              >
                all irrigation services
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-ink px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-leaf">
              Why Willingham
            </p>
            <h2 className="mt-3 max-w-2xl font-display text-3xl font-semibold tracking-tight text-white md:text-4xl">
              Local, licensed, easy to book
            </h2>
            <ul className="mt-8 max-w-2xl space-y-3 text-[15px] leading-relaxed text-white/70">
              <li>Texas irrigator license {site.license}</li>
              <li>
                Serving {city.name} and communities across the Greater Fort
                Worth area
              </li>
              <li>Housecall Pro booking and customer portal</li>
              <li>Text preferred — {site.phoneDisplay}</li>
            </ul>
            <Link
              href="/cities-we-serve"
              className="mt-8 inline-block text-[13px] font-semibold tracking-wide text-leaf hover:underline"
            >
              See all cities we serve →
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="bg-mist px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-3xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-moss">
            FAQ
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink">
            {city.name} irrigation questions
          </h2>
          <div className="mt-8">
            <Faq items={city.faqs} />
          </div>
        </div>
      </section>

      {nearby.length > 0 ? (
        <section className="border-t border-stone bg-white px-5 py-16 md:px-8 md:py-20">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-moss">
                Nearby
              </p>
              <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink md:text-3xl">
                Also serving cities near {city.name}
              </h2>
            </Reveal>
            <div className="mt-8 flex flex-wrap gap-3">
              {nearby.map((n) => (
                <Link
                  key={n.slug}
                  href={`/${n.slug}`}
                  className="border border-stone bg-[#e8edf2] px-4 py-2.5 text-[13px] font-semibold tracking-wide text-ink transition-colors hover:bg-mist"
                >
                  {n.name}
                </Link>
              ))}
              <Link
                href="/cities-we-serve"
                className="border border-moss bg-moss px-4 py-2.5 text-[13px] font-semibold tracking-wide text-white transition-colors hover:bg-moss-deep"
              >
                All cities →
              </Link>
            </div>
          </div>
        </section>
      ) : null}

      <CtaBand
        headline={`Book sprinkler repair in ${city.name}`}
        body={`Text ${site.phoneDisplay} or schedule online with Housecall Pro.`}
      />
    </>
  );
}
