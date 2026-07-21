import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { CtaBand } from "@/components/CtaBand";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Willingham Irrigation | Licensed Pros in Benbrook & Fort Worth",
  description:
    "Meet Case Willingham and the team behind dependable sprinkler repair and irrigation maintenance in Benbrook, Fort Worth, and nearby North Texas communities.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        label="About"
        title="About us"
        subline="Thorough, honest, reliable irrigation service — led by a licensed Texas irrigator who cares about work done right the first time."
        imageSrc="/images/photos/truck.jpg"
        imageAlt="Willingham Irrigation service truck"
      />

      <section className="bg-[#e8edf2] px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2 md:gap-16">
          <Reveal>
            <div className="relative aspect-[3/4] overflow-hidden bg-mist md:aspect-[4/5]">
              <Image
                src="/images/photos/case-headshot.jpg"
                alt="Case Willingham, licensed irrigator"
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
          </Reveal>
          <Reveal delayMs={60}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-moss">
              Owner / Operator
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink md:text-4xl">
              Case Willingham
            </h2>
            <p className="mt-2 text-[15px] text-ink-muted">
              Licensed Texas irrigator {site.license}
            </p>
            <p className="mt-6 text-[15px] leading-relaxed text-ink-muted">
              Willingham Irrigation is led by Case Willingham, serving Benbrook,
              Fort Worth, and nearby communities. Case takes pride in work that’s
              done right the first time — and in helping customers keep
              landscapes healthy while conserving water through efficient
              systems.
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-ink-muted">
              Born and raised in Texas, Case has always enjoyed working outdoors
              and building things that last — which naturally led into the
              irrigation trade. When he’s not in the field, you’ll usually find
              him at home, working on garage projects, or watching Formula 1.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-ink">
        <div className="mx-auto grid max-w-none md:grid-cols-2">
          <div className="relative order-1 min-h-[18rem] md:min-h-[28rem]">
            <Image
              src="/images/photos/truck-door.jpg"
              alt="Willingham Irrigation truck door branding"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="order-2 flex items-center px-5 py-16 md:px-14 md:py-20 lg:max-w-xl lg:px-16">
            <Reveal>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-leaf">
                Our approach
              </p>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-white md:text-4xl">
                Show up ready to solve the problem.
              </h2>
              <p className="mt-5 text-[15px] leading-relaxed text-white/65">
                Every business has a story, and ours starts with a simple goal —
                helping homeowners and property managers keep irrigation systems
                running efficiently. We bring hands-on field experience to every
                repair, tune-up, and upgrade.
              </p>
              <p className="mt-4 text-[15px] leading-relaxed text-white/65">
                Whether it’s fixing a leak, troubleshooting electrical issues,
                or preparing a system for summer heat or winter freezes — we
                show up ready to get it handled.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <CtaBand headline="Work with a local licensed irrigator" />
    </>
  );
}
