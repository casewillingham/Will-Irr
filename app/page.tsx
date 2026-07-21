import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Hero } from "@/components/Hero";
import { WeatherTip } from "@/components/WeatherTip";
import { TrustStrip } from "@/components/TrustStrip";
import { Reveal } from "@/components/Reveal";
import { CtaBand } from "@/components/CtaBand";
import { ReviewsSection } from "@/components/ReviewsSection";
import { getPriorityCities } from "@/lib/cities";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    absolute: `${site.name} | Sprinkler Repair Benbrook & Fort Worth`,
  },
  description:
    "Licensed sprinkler repair and irrigation maintenance in Benbrook, Fort Worth, and nearby cities — plus holiday and landscape lighting. License #LI0030140.",
  alternates: { canonical: "/" },
};

/** Refresh live Google reviews about hourly */
export const revalidate = 3600;

const services = [
  {
    title: "Irrigation",
    body: "Memberships from $20/mo, plus repair and smart controller upgrades.",
    href: "/services#memberships",
    image: "/images/photos/sprinkler-mist.jpg",
    alt: "Sprinkler mist over a green lawn",
  },
  {
    title: "Holiday lighting",
    body: "Custom C9 installs you own — no lease — with professional takedown.",
    href: "/holiday-lighting",
    image: "/images/photos/holiday-install.jpg",
    alt: "Finished holiday lighting on a home exterior at night",
  },
  {
    title: "Landscape lighting",
    body: "Accent, path, and architectural lighting for curb appeal and safety.",
    href: "/landscape-lighting",
    image: "/images/photos/landscape-pro.jpg",
    alt: "Professional landscape lighting along a modern walkway",
  },
];

export default function HomePage() {
  return (
    <>
      <Hero
        headline="Irrigation done right."
        subline="Licensed sprinkler repair and maintenance across Benbrook, Fort Worth, and nearby cities — plus holiday and landscape lighting."
        imageSrc="/images/photos/sprinkler-pro.jpg"
        imageAlt="Pop-up sprinkler watering a manicured lawn"
      />
      <div id="home-next">
        <WeatherTip />
      </div>
      <TrustStrip />

      <section className="border-b border-stone bg-mist px-5 py-12 md:px-8 md:py-14">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 md:flex-row md:items-center md:justify-between md:gap-10">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-moss">
              Memberships
            </p>
            <h2 className="mt-2 max-w-xl font-display text-2xl font-semibold tracking-tight text-ink md:text-3xl">
              Silver from $20/mo — free visits, spring & winter included.
            </h2>
            <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-ink-muted">
              Stop paying per service call. Gold adds a midsummer check-up and
              50% off Christmas light rehang.
            </p>
          </Reveal>
          <Reveal delayMs={60}>
            <Link
              href="/services#memberships"
              className="inline-flex items-center justify-center bg-moss px-5 py-3 text-[13px] font-semibold tracking-wide text-white transition-colors hover:bg-moss-deep"
            >
              Compare plans →
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="bg-[#e8edf2] px-5 py-20 md:px-8 md:py-24">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-moss">
              Services
            </p>
            <h2 className="mt-3 max-w-lg font-display text-3xl font-semibold tracking-tight text-ink md:text-4xl">
              Built for homeowners and property managers who want it handled.
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-3 md:gap-5">
            {services.map((s, i) => (
              <Reveal key={s.href} delayMs={i * 70}>
                <Link
                  href={s.href}
                  className="group flex h-full flex-col overflow-hidden bg-ink"
                >
                  <div className="relative aspect-[5/4] overflow-hidden">
                    <Image
                      src={s.image}
                      alt={s.alt}
                      fill
                      className="object-cover transition duration-700 group-hover:scale-[1.03]"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="flex flex-1 flex-col px-5 py-6">
                    <h3 className="font-display text-xl font-semibold text-white">
                      {s.title}
                    </h3>
                    <p className="mt-2 flex-1 text-[14px] leading-relaxed text-white/65">
                      {s.body}
                    </p>
                    <span className="mt-5 inline-block text-[13px] font-semibold tracking-wide text-leaf group-hover:underline">
                      Learn more →
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink">
        <div className="mx-auto grid max-w-none lg:grid-cols-2">
          <div className="relative min-h-[22rem] lg:min-h-[32rem]">
            <Image
              src="/images/photos/truck.jpg"
              alt="Willingham Irrigation service truck"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="flex items-center px-5 py-16 md:px-14 md:py-20 lg:max-w-xl lg:px-16 xl:pl-20">
            <Reveal>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-leaf">
                Why Willingham
              </p>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-white md:text-4xl">
                Local. Licensed. Easy to book.
              </h2>
              <ul className="mt-8 space-y-4 text-[15px] leading-relaxed text-white/65">
                <li>Texas irrigator license {site.license}</li>
                <li>Residential and commercial service</li>
                <li>Housecall Pro scheduling and customer portal</li>
                <li>Serving Benbrook, Fort Worth, and nearby communities</li>
              </ul>
              <Link
                href="/about"
                className="mt-8 inline-block text-[13px] font-semibold tracking-wide text-leaf hover:underline"
              >
                About the company →
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/photos/landscape-pro.jpg"
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
            aria-hidden
          />
          <div className="absolute inset-0 bg-ink/78" />
        </div>
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-5 py-20 md:grid-cols-2 md:gap-14 md:px-8 md:py-28">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-leaf">
              Outdoor lighting
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-white md:text-4xl">
              Holiday and landscape lighting, installed clean.
            </h2>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-white/70">
              From seasonal C9 displays you own to year-round path and
              architectural lighting — designed to look finished, not temporary.
            </p>
            <div className="mt-8 flex flex-wrap gap-5">
              <Link
                href="/holiday-lighting"
                className="text-[13px] font-semibold tracking-wide text-leaf hover:underline"
              >
                Holiday lighting →
              </Link>
              <Link
                href="/landscape-lighting"
                className="text-[13px] font-semibold tracking-wide text-leaf hover:underline"
              >
                Landscape lighting →
              </Link>
            </div>
          </Reveal>
          <Reveal delayMs={60}>
            <div className="relative aspect-[5/4] overflow-hidden border border-white/15">
              <Image
                src="/images/photos/holiday-install.jpg"
                alt="Finished holiday lighting on a home exterior at night"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-stone bg-mist px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-moss">
              Serving North Texas
            </p>
            <h2 className="mt-3 max-w-2xl font-display text-3xl font-semibold tracking-tight text-ink md:text-4xl">
              Sprinkler repair near you
            </h2>
            <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-ink-muted">
              Licensed irrigation across Benbrook, Fort Worth, and Greater Fort
              Worth — pick a popular city or see the full list.
            </p>
          </Reveal>
          <div className="mt-8 flex flex-wrap gap-3">
            {getPriorityCities().map((city) => (
              <Link
                key={city.slug}
                href={`/${city.slug}`}
                className="border border-stone bg-white px-4 py-2.5 text-[13px] font-semibold tracking-wide text-ink transition-colors hover:bg-[#e8edf2]"
              >
                {city.name}
              </Link>
            ))}
            <Link
              href="/cities-we-serve"
              className="bg-moss px-4 py-2.5 text-[13px] font-semibold tracking-wide text-white transition-colors hover:bg-moss-deep"
            >
              Full city list →
            </Link>
          </div>
        </div>
      </section>

      <ReviewsSection />

      <CtaBand />
    </>
  );
}
