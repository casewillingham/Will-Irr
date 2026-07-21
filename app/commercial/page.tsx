import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { CtaBand } from "@/components/CtaBand";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Commercial Irrigation Repair & Maintenance | Fort Worth Area",
  description:
    "Commercial sprinkler repair, maintenance plans, and smart monitoring for properties in Benbrook, Fort Worth, and nearby cities.",
  alternates: { canonical: "/commercial" },
};

const pillars = [
  {
    t: "Repair & response",
    d: "Fast diagnosis for valves, mainlines, controllers, and coverage problems that affect curb appeal and water bills.",
  },
  {
    t: "Maintenance programs",
    d: "Scheduled inspections and seasonal service so systems stay compliant, efficient, and ready for Texas weather.",
  },
  {
    t: "Smart monitoring",
    d: "Wi-Fi controllers and cloud-based management to remotely monitor and adjust systems — catching leaks and valve failures early.",
  },
];

export default function CommercialPage() {
  return (
    <>
      <PageHero
        label="Commercial"
        title="Commercial irrigation services"
        subline="Reliable, high-efficiency irrigation solutions for commercial properties across Greater Fort Worth — repair, upgrades, and smart monitoring."
        imageSrc="/images/photos/commercial-irrigation-tech.jpg"
        imageAlt="Irrigation technician adjusting a sprinkler on a commercial lawn"
      />

      <section className="bg-[#e8edf2] px-5 py-20 md:px-8 md:py-24">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-moss">
              Property managers & owners
            </p>
            <h2 className="mt-3 max-w-2xl font-display text-3xl font-semibold tracking-tight text-ink md:text-4xl">
              Built for commercial properties.
            </h2>
            <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-ink-muted">
              At Willingham Irrigation, we specialize in reliable irrigation
              solutions for commercial properties across the Greater Fort Worth
              area. Whether you manage an office campus, retail center, HOA
              common area, or multi-unit community, we keep systems watering
              efficiently with clear communication and professional service.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {pillars.map((item, i) => (
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
          <p className="mt-10 text-[14px] text-ink-muted">
            Serving commercial properties in {site.serviceArea}. License{" "}
            {site.license}.
          </p>
        </div>
      </section>

      <CtaBand headline="Need commercial irrigation support?" />
    </>
  );
}
