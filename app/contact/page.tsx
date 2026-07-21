import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { CtaBand } from "@/components/CtaBand";
import { Faq } from "@/components/Faq";
import { BookNowButton, TextButton } from "@/components/CtaButtons";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Willingham Irrigation | Book Sprinkler Repair",
  description:
    "Book online or text 940-468-9178 for irrigation repair in Benbrook, Fort Worth, and surrounding cities. Email case@will-irr.com.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        label="Contact"
        title="Get in touch"
        subline="Book online or send a text — easiest ways to schedule irrigation repair, maintenance, and outdoor lighting."
        imageSrc="/images/photos/truck.jpg"
        imageAlt="Willingham Irrigation service truck"
      />

      <section className="bg-[#e8edf2] px-5 py-20 md:px-8 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2 md:gap-16">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-moss">
              Reach us
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink">
              Book, text, or email
            </h2>
            <ul className="mt-8 space-y-8 text-ink-muted">
              <li>
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-moss">
                  Book online
                </p>
                <p className="mt-2 max-w-md text-[15px] leading-relaxed">
                  Schedule through Housecall Pro — the fastest way to get on the
                  calendar.
                </p>
                <div className="mt-4">
                  <BookNowButton />
                </div>
              </li>
              <li>
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-moss">
                  Text
                </p>
                <a
                  href={site.smsHref}
                  className="mt-2 block font-display text-3xl font-semibold text-ink transition hover:text-moss"
                >
                  {site.phoneDisplay}
                </a>
                <p className="mt-1 text-[13px]">Preferred over calling</p>
                <div className="mt-3">
                  <TextButton className="border-stone bg-white/60 text-ink hover:bg-white" />
                </div>
              </li>
              <li>
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-moss">
                  Email
                </p>
                <a
                  href={`mailto:${site.email}`}
                  className="mt-2 text-lg text-ink hover:underline"
                >
                  {site.email}
                </a>
              </li>
              <li>
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-moss">
                  Service area
                </p>
                <p className="mt-2 max-w-md text-[15px] leading-relaxed">
                  Serving Benbrook, Fort Worth, and nearby cities.{" "}
                  <Link
                    href="/cities-we-serve"
                    className="font-semibold text-moss hover:underline"
                  >
                    See cities we serve
                  </Link>
                  .
                </p>
              </li>
              <li>
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-moss">
                  License
                </p>
                <p className="mt-2">{site.license}</p>
              </li>
            </ul>
          </Reveal>

          <Reveal delayMs={100}>
            <div className="bg-ink px-6 py-10 md:px-8 md:py-12">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-leaf">
                Existing customers
              </p>
              <h3 className="mt-3 font-display text-2xl font-semibold text-white">
                Already a customer?
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-white/65">
                Open the Customer Portal to request service through your
                account.
              </p>
              <div className="mt-8">
                <a
                  href={site.portalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center border border-white/30 px-5 py-3 text-[13px] font-semibold tracking-wide text-white transition hover:bg-white/10"
                >
                  Customer Portal
                </a>
              </div>
            </div>
          </Reveal>
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
                  question: "What areas do you serve?",
                  answer: `We serve ${site.serviceArea}.`,
                },
                {
                  question: "Do I need an account to book?",
                  answer:
                    "No. Use Book Now as a new or returning customer. The Customer Portal is for existing clients who want to request service through their account.",
                },
                {
                  question: "Can I call instead?",
                  answer: `Texting or booking online is preferred so we can respond with full details. Reach us at ${site.phoneDisplay} by text anytime.`,
                },
              ]}
            />
          </div>
        </div>
      </section>

      <CtaBand headline="Let’s get your system sorted" />
    </>
  );
}
