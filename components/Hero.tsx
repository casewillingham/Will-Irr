import Image from "next/image";
import { BookNowButton, TextButton } from "@/components/CtaButtons";
import { HeroServiceCycle } from "@/components/HeroServiceCycle";
import { HeroVisual } from "@/components/HeroVisual";

type Props = {
  headline: string;
  subline: string;
  imageSrc?: string;
  imageAlt?: string;
};

/**
 * Split hero — mist panel for copy, full-bleed photo beside it.
 * Brand mark stays in the header only.
 */
export function Hero({
  headline: _headline,
  subline,
  imageSrc = "/images/photos/sprinkler-pro.jpg",
  imageAlt = "Pop-up sprinkler watering a manicured lawn",
}: Props) {
  return (
    <section className="relative flex flex-col bg-mist pt-16 md:pt-[4.25rem] lg:min-h-svh">
      <div className="grid min-h-0 flex-1 lg:grid-cols-2">
        <div className="relative flex flex-col justify-center px-5 py-10 md:px-10 md:py-20 lg:px-14 lg:pr-12 xl:pl-[max(3.5rem,calc((100vw-72rem)/2+2rem))]">
          <p className="animate-fade-in text-[11px] font-semibold uppercase tracking-[0.16em] text-moss">
            Greater Fort Worth
          </p>
          <HeroServiceCycle />
          <p
            className="animate-fade-up mt-5 max-w-md text-[1.05rem] leading-relaxed text-ink-muted md:mt-6 md:text-[1.1rem]"
            style={{ animationDelay: "200ms" }}
          >
            {subline}
          </p>
          <div
            className="animate-fade-up mt-7 flex w-full flex-col gap-3 sm:mt-8 sm:w-auto sm:flex-row sm:flex-wrap"
            style={{ animationDelay: "320ms" }}
          >
            <BookNowButton className="w-full transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0 sm:w-auto" />
            <TextButton className="w-full border-stone bg-white/60 text-ink transition-transform duration-200 hover:-translate-y-0.5 hover:bg-white active:translate-y-0 sm:w-auto" />
          </div>
          <div
            className="animate-fade-up mt-7 flex items-center gap-4 sm:mt-8"
            style={{ animationDelay: "420ms" }}
          >
            <Image
              src="/images/photos/txia-member.png"
              alt="Texas Irrigation Association member"
              width={72}
              height={63}
              className="h-11 w-auto max-w-[4.5rem] shrink-0 object-contain sm:h-12"
              unoptimized
            />
            <p className="max-w-[12rem] text-[12px] leading-snug text-ink-muted">
              Texas Irrigation Association member · Benbrook & Fort Worth
            </p>
          </div>

          <a
            href="#home-next"
            className="animate-fade-in absolute bottom-6 left-5 hidden items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted transition-colors hover:text-ink lg:flex"
            style={{ animationDelay: "700ms" }}
          >
            <span className="animate-scroll-cue inline-flex h-8 w-5 items-start justify-center rounded-full border border-stone pt-1.5">
              <span className="h-1.5 w-1 rounded-full bg-moss" />
            </span>
            Scroll
          </a>
        </div>

        <HeroVisual imageSrc={imageSrc} imageAlt={imageAlt} />
      </div>
    </section>
  );
}
