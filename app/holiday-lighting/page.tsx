import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { CtaBand } from "@/components/CtaBand";
import { Faq } from "@/components/Faq";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Holiday Lighting Install & Takedown | Benbrook & Fort Worth",
  description:
    "Custom C9 holiday lighting for homes and businesses in Benbrook, Fort Worth, and nearby cities. We sell the lights (no lease), install, and take them down.",
  alternates: { canonical: "/holiday-lighting" },
};

const included = [
  "Custom layout designed for your property",
  "Professional install of C9-style lighting",
  "Lights you own (purchase, not lease)",
  "Scheduled takedown after the holiday season",
  "Neat storage handoff so next season is easier",
];

const notIncluded = [
  "Interior holiday decorating",
  "Inflatable yard displays (unless quoted separately)",
  "Electrical panel upgrades (we’ll flag issues if we see them)",
];

const steps = [
  "Request a quote — share your address and photos if you have them.",
  "Site review — we confirm roofline, outlets, and scope.",
  "Install — clean, secure placement with a finished look.",
  "Enjoy the season — lights stay up through the holidays.",
  "Takedown — we remove the display and leave your lights with you.",
];

export default function HolidayLightingPage() {
  return (
    <>
      <PageHero
        label="Holiday lighting"
        title="Custom holiday lighting for Benbrook & Fort Worth"
        subline="We design a clean, professional look along your roofline — then install, take it down after the holidays, and leave the lights with you. We sell holiday lights. We do not lease them."
        imageSrc="/images/photos/holiday-install.jpg"
        imageAlt="Finished holiday lighting on a home exterior at night"
      />

      <section className="bg-[#e8edf2] px-5 py-20 md:px-8 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2 md:gap-16">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-moss">
              Scope
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink">
              What’s included
            </h2>
            <ul className="mt-6 space-y-3 text-[15px] leading-relaxed text-ink-muted">
              {included.map((item) => (
                <li key={item}>— {item}</li>
              ))}
            </ul>
          </Reveal>
          <Reveal delayMs={80}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-moss">
              Boundaries
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink">
              What’s not
            </h2>
            <ul className="mt-6 space-y-3 text-[15px] leading-relaxed text-ink-muted">
              {notIncluded.map((item) => (
                <li key={item}>— {item}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="bg-ink px-5 py-20 md:px-8 md:py-24">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-leaf">
              Process
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-white md:text-4xl">
              How it works
            </h2>
          </Reveal>
          <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
            {steps.map((step, i) => (
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
          <p className="mt-12 max-w-2xl text-[14px] leading-relaxed text-white/55">
            Holiday lighting is seasonal. Book early for the best install
            windows before Thanksgiving and early December. Takedown is
            typically early January. Every property is quoted based on roofline
            length, complexity, and fixture count — ask about discounts with
            irrigation maintenance plans.
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
                  question: "Do I keep the lights?",
                  answer:
                    "Yes. We sell the lights. After takedown, they are yours to store and reuse.",
                },
                {
                  question: "Do you lease holiday lights?",
                  answer: "No. Purchase + install + takedown only.",
                },
                {
                  question: "Can you rehang my lights next year?",
                  answer:
                    "Yes — ask us about rehang / seasonal service when you book.",
                },
                {
                  question: "Do you serve commercial properties?",
                  answer:
                    "Yes. We can light storefronts, offices, and other business properties in our service area.",
                },
                {
                  question: "How do I book?",
                  answer: `Use Book Now or text ${site.phoneDisplay}.`,
                },
              ]}
            />
          </div>
        </div>
      </section>

      <CtaBand
        headline="Ready for a bright, worry-free holiday display?"
        body="Book Now or text — we’ll confirm timing and pricing for your property."
      />
    </>
  );
}
