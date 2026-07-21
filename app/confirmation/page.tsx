import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Appointment Confirmed",
  description:
    "Thanks for scheduling with Willingham Irrigation. Prep tips for a smooth appointment, including Rachio and Hunter Hydrawise access.",
  alternates: { canonical: "/confirmation" },
  robots: { index: false, follow: false },
};

const rachioSteps = [
  "Open the Rachio app (device / property selection screen).",
  "Tap “Share property” right below the property name.",
  "Tap Add Shared User, then choose “Share with friends & relatives.”",
  `Enter ${site.email} (our Rachio account email).`,
  "Select the controller(s) to share (all devices are selected by default), then tap Share.",
];

const hunterSteps = [
  "Sign in to your Hydrawise account.",
  "Tap the Menu icon in the upper left.",
  "Tap Account Details.",
  "Scroll to the bottom and toggle the slider under Privacy Settings to search for a contractor.",
  "Select Willingham Irrigation from the list (closest contractors appear first).",
  "Tap Select, then OK.",
];

function SuccessMark() {
  return (
    <div
      className="animate-fade-in mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-leaf/20 ring-1 ring-leaf/40"
      aria-hidden
    >
      <svg
        viewBox="0 0 24 24"
        className="h-8 w-8 text-leaf"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 13l4 4L19 7" />
      </svg>
    </div>
  );
}

export default function ConfirmationPage() {
  return (
    <div className="bg-mist pt-16 md:pt-[4.25rem]">
      <section className="relative overflow-hidden bg-ink px-5 pb-6 pt-16 md:px-8 md:pb-8 md:pt-20">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          aria-hidden
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 0%, rgba(143, 198, 63, 0.22), transparent 55%)",
          }}
        />
        <div className="relative mx-auto max-w-2xl text-center">
          <SuccessMark />
          <p
            className="animate-fade-up mt-6 text-[11px] font-semibold uppercase tracking-[0.16em] text-leaf"
            style={{ animationDelay: "60ms" }}
          >
            Request received
          </p>
          <h1
            className="animate-fade-up mt-4 font-display text-3xl font-semibold tracking-tight text-white md:text-5xl"
            style={{ animationDelay: "100ms" }}
          >
            We’ve got your request.
          </h1>
          <p
            className="animate-fade-up mx-auto mt-5 max-w-lg text-[1.1rem] leading-relaxed text-white/75"
            style={{ animationDelay: "160ms" }}
          >
            Thanks for choosing Willingham Irrigation. We’ll follow up shortly
            to confirm the date and time of your appointment.
          </p>
          <div
            className="animate-fade-up mx-auto mt-8 grid max-w-md gap-3 text-left sm:grid-cols-2"
            style={{ animationDelay: "220ms" }}
          >
            <div className="border border-white/15 bg-white/5 px-4 py-3.5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-leaf">
                What’s next
              </p>
              <p className="mt-1.5 text-[14px] leading-snug text-white/80">
                We’ll reach out to confirm timing
              </p>
            </div>
            <div className="border border-white/15 bg-white/5 px-4 py-3.5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-leaf">
                Questions?
              </p>
              <p className="mt-1.5 text-[14px] leading-snug text-white/80">
                Text{" "}
                <a
                  href={site.smsHref}
                  className="text-white underline-offset-2 hover:underline"
                >
                  {site.phoneDisplay}
                </a>
              </p>
            </div>
          </div>

          <a
            href="#prep-tips"
            className="animate-fade-up mt-10 inline-flex flex-col items-center gap-2 text-white"
            style={{ animationDelay: "280ms" }}
          >
            <span className="border border-leaf/50 bg-leaf/15 px-5 py-2.5 text-[13px] font-semibold tracking-wide text-leaf">
              Please scroll — important prep tips below
            </span>
            <span className="animate-bounce-y mt-1 flex flex-col items-center text-white/70">
              <span className="text-[11px] font-medium uppercase tracking-[0.14em]">
                Keep scrolling
              </span>
              <svg
                viewBox="0 0 24 24"
                className="mt-1 h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </span>
          </a>
        </div>
      </section>

      <section
        id="prep-tips"
        className="scroll-mt-24 border-t-4 border-leaf bg-white px-5 py-16 md:px-8 md:py-20"
      >
        <div className="mx-auto max-w-3xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-moss">
            Important — please read
          </p>
          <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink md:text-3xl">
            A few things that make the visit smoother
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-ink-muted">
            No rush — whenever you can before we arrive. These help us work
            faster and get better results.
          </p>

          <div className="mt-12 space-y-12">
            <article>
              <h3 className="font-display text-xl font-semibold text-ink">
                1. Share access to your WiFi controller{" "}
                <span className="font-normal text-ink-muted">
                  (if this applies)
                </span>
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-muted">
                If you have a Rachio or Hunter Hydrawise controller, share access
                with us before the appointment so we can adjust and troubleshoot
                remotely when needed.
              </p>

              <div className="mt-8 grid gap-6 md:grid-cols-2">
                <div className="border border-stone bg-white p-6">
                  <h4 className="text-[13px] font-semibold uppercase tracking-[0.12em] text-moss">
                    Rachio
                  </h4>
                  <ol className="mt-4 list-decimal space-y-2.5 pl-5 text-[14px] leading-relaxed text-ink-muted">
                    {rachioSteps.map((step) => (
                      <li key={step}>{step}</li>
                    ))}
                  </ol>
                  <p className="mt-4 text-[13px] leading-relaxed text-ink-muted">
                    Do not use Limited Access (under controller Settings) — that
                    only allows running zones. Property share gives us the access
                    we need.
                  </p>
                  <a
                    href="https://support.rachio.com/en_us/sharing-moving-and-transferring-a-rachio-device-or-property-Byu6vUkFD"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-block text-[13px] font-semibold text-moss hover:underline"
                  >
                    Rachio’s official instructions →
                  </a>
                </div>

                <div className="border border-stone bg-white p-6">
                  <h4 className="text-[13px] font-semibold uppercase tracking-[0.12em] text-moss">
                    Hunter Hydrawise
                  </h4>
                  <ol className="mt-4 list-decimal space-y-2.5 pl-5 text-[14px] leading-relaxed text-ink-muted">
                    {hunterSteps.map((step) => (
                      <li key={step}>{step}</li>
                    ))}
                  </ol>
                  <a
                    href="https://www.hunterirrigation.com/support/hydrawise-app-addremove-contractor"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-block text-[13px] font-semibold text-moss hover:underline"
                  >
                    Hunter’s official instructions →
                  </a>
                </div>
              </div>
            </article>

            <article>
              <h3 className="font-display text-xl font-semibold text-ink">
                2. Prepare your system
              </h3>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-[15px] leading-relaxed text-ink-muted">
                <li>Ensure your irrigation system is powered on and accessible.</li>
                <li>
                  Verify your WiFi network is working so we can connect to your
                  controller if needed.
                </li>
              </ul>
            </article>

            <article>
              <h3 className="font-display text-xl font-semibold text-ink">
                3. Provide property access{" "}
                <span className="font-normal text-ink-muted">(if applicable)</span>
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-muted">
                If you won’t be home, make sure we can reach the work areas —
                gates, side yards, or garage as needed. Send gate codes or notes
                to{" "}
                <a
                  href={`mailto:${site.email}`}
                  className="font-medium text-moss hover:underline"
                >
                  {site.email}
                </a>{" "}
                or text{" "}
                <a
                  href={site.smsHref}
                  className="font-medium text-moss hover:underline"
                >
                  {site.phoneDisplay}
                </a>
                .
              </p>
            </article>

            <article>
              <h3 className="font-display text-xl font-semibold text-ink">
                4. Clear pet waste from work areas
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-muted">
                Please pick up pet waste in the yard and around sprinkler heads,
                valve boxes, and the controller before we arrive. It keeps the
                visit safer and helps us get the job done without delays.
              </p>
            </article>

            <article>
              <h3 className="font-display text-xl font-semibold text-ink">
                5. Keep the grass mowed
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-muted">
                Please mow before your appointment so the lawn isn’t overgrown.
                Tall grass makes it harder to find heads, check coverage, and
                complete repairs efficiently.
              </p>
            </article>
          </div>

          <div className="mt-14 border border-stone bg-white px-6 py-10 text-center md:px-10">
            <p className="font-display text-xl font-semibold text-ink md:text-2xl">
              We’ve got you from here.
            </p>
            <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-ink-muted">
              Looking forward to taking care of your system — talk soon.
            </p>
            <Link
              href="/"
              className="mt-6 inline-block text-[13px] font-semibold tracking-wide text-moss hover:underline"
            >
              Back to home →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
