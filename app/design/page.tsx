import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { CtaBand } from "@/components/CtaBand";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Irrigation Design Services | Willingham Irrigation",
  description:
    "Licensed irrigation design and oversight (LI0030140) for residential and commercial properties in the Fort Worth / Benbrook area.",
  alternates: { canonical: "/design" },
};

const features = [
  {
    title: "Custom irrigation layouts",
    body: "Every property is different. We design systems based on your landscape, soil type, plant material, and sun exposure for even coverage and healthier plants.",
  },
  {
    title: "Water conservation focus",
    body: "Smart technology like Wi-Fi controllers, rain sensors, and pressure-regulated heads help minimize waste and stay aligned with local water goals.",
  },
  {
    title: "Scalable solutions",
    body: "From small residential lots to larger commercial or HOA properties, we design for today’s needs while allowing for future upgrades.",
  },
  {
    title: "Compliance & best practices",
    body: "Designs follow TCEQ standards and Texas irrigation codes so your system is efficient and up to code.",
  },
];

export default function DesignPage() {
  return (
    <>
      <PageHero
        label="Design"
        title="Irrigation design"
        subline="Efficient, code-aware system design from a licensed Texas irrigator — built with real-world repair experience so you get fewer breakdowns later."
        imageSrc="/images/photos/green-lawn.jpg"
        imageAlt="Professionally designed landscape irrigation"
      />

      <section className="bg-[#e8edf2] px-5 py-20 md:px-8 md:py-24">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-moss">
              Field-tested design
            </p>
            <h2 className="mt-3 max-w-2xl font-display text-3xl font-semibold tracking-tight text-ink md:text-4xl">
              Design that works in the field.
            </h2>
            <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-ink-muted">
              Licensed Texas irrigator ({site.license}) with hands-on repair and
              troubleshooting experience. Designs based on real-world service
              knowledge mean smarter long-term planning.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {features.map((f, i) => (
              <Reveal key={f.title} delayMs={i * 70}>
                <div className="border border-stone bg-white px-6 py-7">
                  <h3 className="font-display text-xl font-semibold text-ink">
                    {f.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-ink-muted">
                    {f.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand headline="Planning a new or redesigned system?" />
    </>
  );
}
