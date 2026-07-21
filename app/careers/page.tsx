import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Careers | Join Willingham Irrigation",
  description:
    "Interested in working with Willingham Irrigation in Greater Fort Worth? Reach out — we’re always glad to hear from people who take pride in field work.",
  alternates: { canonical: "/careers" },
};

const perks = [
  {
    t: "Real field work",
    d: "You’re outside solving problems — repairs, seasonal service, and installs that matter to homeowners.",
  },
  {
    t: "Grow with the trade",
    d: "Learn from a licensed Texas irrigator. Room to build skills in irrigation and outdoor lighting.",
  },
  {
    t: "Local routes",
    d: "Greater Fort Worth service area — Benbrook, White Settlement, Weatherford, Fort Worth, and nearby.",
  },
  {
    t: "Small team",
    d: "Clear expectations, honest feedback, and work you’re proud to put your name on.",
  },
];

const applySms = `${site.smsHref}?body=${encodeURIComponent(
  "Hi — I’m interested in a career at Willingham Irrigation. ",
)}`;
const applyEmail = `mailto:${site.email}?subject=${encodeURIComponent(
  "Careers inquiry — Willingham Irrigation",
)}&body=${encodeURIComponent(
  "Hi Case,\n\nI’m interested in joining the team. Here’s a quick intro:\n\n",
)}`;

export default function CareersPage() {
  return (
    <>
      <PageHero
        label="Careers"
        title="Work with us"
        subline="Join a licensed irrigation company serving Greater Fort Worth. We’re looking for people who show up ready, take pride in clean work, and like solving problems outdoors."
        imageSrc="/images/photos/sprinkler-pro.jpg"
        imageAlt="Irrigation technician work in the field"
      />

      <section className="bg-[#e8edf2] px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-moss">
              Why Willingham
            </p>
            <h2 className="mt-3 max-w-2xl font-display text-3xl font-semibold tracking-tight text-ink md:text-4xl">
              Small team. Real trade work.
            </h2>
            <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-ink-muted">
              Willingham Irrigation is led by Case Willingham, a licensed Texas
              irrigator ({site.license}). We keep lawns watered, systems
              efficient, and the work done right — without the big-company
              runaround.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {perks.map((item, i) => (
              <Reveal key={item.t} delayMs={i * 50}>
                <div className="border border-stone bg-white px-5 py-6">
                  <p className="font-display text-lg font-semibold text-ink">
                    {item.t}
                  </p>
                  <p className="mt-2 text-[14px] leading-relaxed text-ink-muted">
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
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-moss">
              Openings
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink md:text-4xl">
              No openings right now
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-ink-muted">
              We’re not actively hiring at the moment — but we’re always glad to
              hear from solid people in the trade. If irrigation or outdoor work
              is your thing, send a short intro and we’ll keep you in mind when
              something opens up.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-ink">
        <div className="mx-auto grid max-w-none lg:grid-cols-2">
          <div className="relative min-h-[18rem] lg:min-h-[26rem]">
            <Image
              src="/images/photos/truck.jpg"
              alt="Willingham Irrigation service truck"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="flex items-center px-5 py-16 md:px-14 md:py-20 lg:max-w-xl lg:px-16">
            <Reveal>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-leaf">
                Stay in touch
              </p>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-white md:text-4xl">
                Introduce yourself
              </h2>
              <p className="mt-5 text-[15px] leading-relaxed text-white/65">
                Text or email a short note about yourself and your experience. A
                resume helps but isn’t required to start the conversation.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={applySms}
                  className="inline-flex items-center justify-center bg-leaf px-5 py-3 text-[13px] font-semibold tracking-wide text-ink transition-colors hover:bg-white"
                >
                  Text us
                </a>
                <a
                  href={applyEmail}
                  className="inline-flex items-center justify-center border border-white/35 px-5 py-3 text-[13px] font-semibold tracking-wide text-white transition-colors hover:bg-white/10"
                >
                  Email {site.email}
                </a>
              </div>
              <p className="mt-6 text-[13px] text-white/45">
                {site.phoneDisplay} — text preferred.
              </p>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
