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
      <div className="mx-auto flex max-w-6xl flex-col items-stretch justify-between gap-8 px-5 py-14 md:flex-row md:items-center md:px-8 md:py-20">
        <div className="max-w-xl">
          <h2 className="font-display text-[1.75rem] font-semibold tracking-tight text-white sm:text-3xl md:text-4xl">
            {headline}
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-white/70">{body}</p>
        </div>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap">
          <BookNowButton className="w-full sm:w-auto" />
          <TextButton className="w-full border-white/35 text-white hover:bg-white/10 sm:w-auto" />
        </div>
      </div>
    </section>
  );
}
