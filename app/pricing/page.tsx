import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { CtaBand } from "@/components/CtaBand";
import { Faq } from "@/components/Faq";
import { BookNowButton, TextButton } from "@/components/CtaButtons";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Estimated Pricing | Sprinkler Repair Service Call $75",
  description:
    "Flat-rate irrigation pricing from Willingham Irrigation. $75 service call, then estimated repair prices for heads, valves, leaks, and more across Greater Fort Worth. Final price confirmed on site.",
  alternates: { canonical: "/pricing" },
};

const howItWorks = [
  {
    t: "Service call — $75",
    d: "Covers the trip out and diagnosis so we know what’s wrong with the system.",
  },
  {
    t: "Flat-rate repairs",
    d: "We don’t bill by the hour. Common jobs have set rates — harder digs may cost more.",
  },
  {
    t: "Clear pricing",
    d: "No hourly mystery invoices. You’re charged flat rates for the work that gets done.",
  },
];

type PriceRow = { name: string; price: string };

/** Ballpark estimates for the website — final price confirmed on site. */
const estimatedRates: { category: string; items: PriceRow[] }[] = [
  {
    category: "Heads & nozzles",
    items: [
      { name: "4″ spray head replacement", price: "from ~$37" },
      { name: "4″ rotor replacement", price: "from ~$47" },
      { name: "Nozzle replacement", price: "~$12" },
      { name: "Rotary nozzle replacement", price: "~$15" },
      { name: "Cap head", price: "~$20" },
    ],
  },
  {
    category: "Valves",
    items: [
      { name: "Solenoid replacement", price: "from ~$35" },
      { name: "Full valve rebuild", price: "from ~$75" },
      { name: "Valve replacement", price: "from ~$210" },
    ],
  },
  {
    category: "Leaks & drip",
    items: [
      { name: "Pipe leak (1″ and under)", price: "from ~$100" },
      { name: "Pipe leak (1¼″–2″)", price: "~$220" },
      { name: "Drip repair", price: "from ~$10" },
      { name: "Head relocation (per ft)", price: "~$26" },
    ],
  },
  {
    category: "Controllers & electrical",
    items: [
      { name: "Hunter X2 8-station", price: "~$280" },
      { name: "Rachio Pro 8-zone", price: "~$430" },
      { name: "Rain sensor", price: "~$220" },
      { name: "Wiring troubleshooting", price: "~$225" },
    ],
  },
];

export default function PricingPage() {
  return (
    <>
      <PageHero
        label="Pricing"
        title="Flat-rate pricing. No guessing."
        subline="We charge a $75 service call to diagnose, then flat-rate repairs for the work. The numbers below are estimates to give you a sense of cost."
        imageSrc="/images/photos/sprinkler-close.jpg"
        imageAlt="Sprinkler watering a garden bed"
      />

      <section className="bg-ink px-5 py-20 md:px-8 md:py-24">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-leaf">
              How we bill
            </p>
            <h2 className="mt-3 max-w-2xl font-display text-3xl font-semibold tracking-tight text-white md:text-4xl">
              Straightforward from the first visit.
            </h2>
            <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-white/65">
              Irrigation problems shouldn’t come with mystery invoices. We’re a
              flat-rate shop: you pay a service call for diagnosis, then set
              prices for the repairs.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {howItWorks.map((item, i) => (
              <Reveal key={item.t} delayMs={i * 60}>
                <div
                  className={`flex h-full flex-col px-6 py-8 ${
                    i === 0
                      ? "bg-white text-ink"
                      : "border border-white/15 text-white"
                  }`}
                >
                  {i === 0 ? (
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-moss">
                      Service call
                    </p>
                  ) : null}
                  <p
                    className={`font-display text-xl font-semibold tracking-tight ${
                      i === 0 ? "mt-2 text-ink" : "text-white"
                    }`}
                  >
                    {item.t}
                  </p>
                  {i === 0 ? (
                    <p className="mt-4 flex items-baseline gap-1 font-display">
                      <span className="text-5xl font-semibold tracking-tight md:text-6xl">
                        $75
                      </span>
                    </p>
                  ) : null}
                  <p
                    className={`mt-4 text-[15px] leading-relaxed ${
                      i === 0 ? "text-ink-muted" : "text-white/65"
                    }`}
                  >
                    {item.d}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <p className="mt-10 max-w-2xl text-[14px] leading-relaxed text-white/45">
            Silver and Gold members get free service visits — no $75 trip fee
            when something breaks.{" "}
            <Link
              href="/services#memberships"
              className="text-leaf underline-offset-2 hover:underline"
            >
              See memberships
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="bg-[#e8edf2] px-5 py-20 md:px-8 md:py-24">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-moss">
              Estimated prices
            </p>
            <h2 className="mt-3 max-w-2xl font-display text-3xl font-semibold tracking-tight text-ink md:text-4xl">
              Ballpark costs for common repairs.
            </h2>
            <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-ink-muted">
              These are approximate starting prices to help you plan — not a
              live quote. Deeper digs, tougher access, or different parts can
              change the number. Service call is separate unless you’re on a
              membership.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {estimatedRates.map((group, i) => (
              <Reveal key={group.category} delayMs={i * 50}>
                <div className="h-full border border-stone bg-white px-5 py-6 md:px-6">
                  <h3 className="font-display text-xl font-semibold tracking-tight text-ink">
                    {group.category}
                  </h3>
                  <ul className="mt-5 divide-y divide-stone">
                    {group.items.map((item) => (
                      <li
                        key={item.name}
                        className="flex items-baseline justify-between gap-4 py-3 text-[15px]"
                      >
                        <span className="text-ink-muted">{item.name}</span>
                        <span className="shrink-0 font-display font-semibold text-ink">
                          {item.price}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delayMs={120}>
            <p className="mt-8 rounded-none border border-stone bg-mist px-5 py-4 text-[14px] leading-relaxed text-ink-muted">
              <span className="font-semibold text-ink">Estimates only.</span>{" "}
              Prices can change without this page being updated right away.
              Exact rates are based on the repair and site conditions.
            </p>
            <p className="mt-6 max-w-2xl text-[14px] leading-relaxed text-ink-muted">
              Controllers, backflows, and larger upgrades are quoted to the job —
              same flat-rate approach, just matched to what your property needs.
              Serving {site.serviceArea}.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <BookNowButton className="w-full sm:w-auto" />
              <TextButton className="w-full border-stone bg-white text-ink hover:bg-mist sm:w-auto" />
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
            Pricing questions
          </h2>
          <div className="mt-8">
            <Faq
              items={[
                {
                  question: "Are the prices on this page exact?",
                  answer:
                    "No — they’re estimates to give you a ballpark. Exact flat rates depend on the repair and site conditions. Prices can change without this page being updated immediately.",
                },
                {
                  question: "What’s included in the $75 service call?",
                  answer:
                    "The trip to your property and a hands-on diagnosis of the issue so we know what needs fixing.",
                },
                {
                  question: "Is the service call waived once repairs are done?",
                  answer:
                    "The $75 covers the trip and diagnosis. If you’re a Silver or Gold member, service visits are free — no trip fee when something breaks mid-season.",
                },
                {
                  question: "How do I avoid the service call fee?",
                  answer: `Join a Silver ($20/mo) or Gold ($40/mo) membership — both include free service visits plus spring start-up and winterization. See memberships on our services page, or text ${site.phoneDisplay} and we’ll set you up.`,
                },
              ]}
            />
          </div>
        </div>
      </section>

      <CtaBand
        headline="Need a diagnosis?"
        body="Book online or text us — we’ll confirm timing and get your system dialed in."
      />
    </>
  );
}
