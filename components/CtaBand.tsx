import { BookNowButton, TextButton } from "@/components/CtaButtons";

export function CtaBand({
  headline = "Ready to schedule service?",
  body = "Book online or send a text — we’ll confirm timing and get your system dialed in.",
}: {
  headline?: string;
  body?: string;
}) {
  return (
    <section className="border-t border-stone bg-ink">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 px-5 py-16 md:flex-row md:items-center md:px-8 md:py-20">
        <div className="max-w-xl">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-white md:text-4xl">
            {headline}
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-white/70">{body}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <BookNowButton />
          <TextButton className="border-white/35 text-white hover:bg-white/10" />
        </div>
      </div>
    </section>
  );
}
