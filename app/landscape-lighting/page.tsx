import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { CtaBand } from "@/components/CtaBand";
import { Faq } from "@/components/Faq";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Landscape Lighting Design & Install | Benbrook & Fort Worth",
  description:
    "Professional landscape lighting in Benbrook, Fort Worth, and nearby cities. Accent, path, architectural, and security lighting designed for curb appeal and safety.",
  alternates: { canonical: "/landscape-lighting" },
};

const options = [
  {
    title: "Landscape & accent lighting",
    body: "Highlight trees, planting beds, and yard focal points with natural-looking, carefully aimed lights.",
  },
  {
    title: "Path & walkway lighting",
    body: "Improve visibility along sidewalks, steps, and driveways with low, subtle fixtures that blend into the landscape.",
  },
  {
    title: "Architectural lighting",
    body: "Bring out your home’s structure — columns, facades, entryways — with clean placement that adds depth without looking overdone.",
  },
  {
    title: "Security & area lighting",
    body: "Increase visibility around side yards, corners, and dark zones with dependable coverage that feels inviting, not harsh.",
  },
];

const processSteps = [
  "Quote / site visit — we walk the property and discuss goals.",
  "Simple design plan — fixture types, locations, and zones.",
  "Install — clean wiring and placement with attention to finish.",
  "Walkthrough — we aim lights with you so the night look is right.",
];

export default function LandscapeLightingPage() {
  return (
    <>
      <PageHero
        label="Landscape lighting"
        title="Landscape lighting that looks great and works hard"
        subline="Safer paths, better curb appeal after dark, and outdoor living that lasts past sunset — designed for your property, not a template."
        imageSrc="/images/photos/landscape-pro.jpg"
        imageAlt="Professional landscape lighting along a walkway"
      />

      <section className="bg-[#e8edf2] px-5 py-20 md:px-8 md:py-24">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-moss">
              Options
            </p>
            <h2 className="mt-3 max-w-2xl font-display text-3xl font-semibold tracking-tight text-ink md:text-4xl">
              Lighting that fits your goals.
            </h2>
            <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-ink-muted">
              Soft accent lighting, clear path lighting, architectural
              highlights, or brighter coverage for security — we build a system
              that fits.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {options.map((opt, i) => (
              <Reveal key={opt.title} delayMs={i * 70}>
                <div className="border border-stone bg-white px-6 py-7">
                  <h3 className="font-display text-xl font-semibold text-ink">
                    {opt.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-ink-muted">
                    {opt.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink px-5 py-20 md:px-8 md:py-24">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-leaf">
              Process
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-white md:text-4xl">
              How the process works
            </h2>
          </Reveal>
          <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, i) => (
              <Reveal key={step} delayMs={i * 60}>
                <p className="font-display text-3xl font-semibold text-leaf/50">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <p className="mt-3 text-[14px] leading-relaxed text-white/70">
                  {step}
                </p>
              </Reveal>
            ))}
          </ol>
          <p className="mt-10 text-[14px] text-white/55">
            Looking for seasonal Christmas displays instead? See{" "}
            <Link
              href="/holiday-lighting"
              className="text-leaf underline-offset-2 hover:underline"
            >
              Holiday Lighting
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="bg-mist px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-3xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-moss">
            FAQ
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink">
            Common questions
          </h2>
          <div className="mt-8">
            <Faq
              items={[
                {
                  question: "Is this the same as holiday lighting?",
                  answer:
                    "No. Landscape lighting is a year-round outdoor lighting system. Holiday lighting is a seasonal Christmas display.",
                },
                {
                  question: "Do you only do irrigation?",
                  answer:
                    "Irrigation repair and maintenance is our core business. Landscape and holiday lighting are additional outdoor services in the same service area.",
                },
                {
                  question: "Can lighting be added in phases?",
                  answer:
                    "Often yes — start with paths and entries, then add accent zones later.",
                },
                {
                  question: "How do I get started?",
                  answer: `Use Book Now or text ${site.phoneDisplay}.`,
                },
              ]}
            />
          </div>
        </div>
      </section>

      <CtaBand headline="Want your property to look as good at night?" />
    </>
  );
}
