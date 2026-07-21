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
    <section className="relative flex min-h-svh flex-col bg-mist pt-16 md:pt-[4.25rem]">
      <div className="grid min-h-0 flex-1 lg:grid-cols-2">
        <div className="relative flex flex-col justify-center px-5 py-14 pb-20 md:px-10 md:py-20 lg:px-14 lg:pr-12 xl:pl-[max(3.5rem,calc((100vw-72rem)/2+2rem))]">
          <p className="animate-fade-in text-[11px] font-semibold uppercase tracking-[0.16em] text-moss">
            Greater Fort Worth
          </p>
          <HeroServiceCycle />
          <p
            className="animate-fade-up mt-6 max-w-md text-[1.1rem] leading-relaxed text-ink-muted"
            style={{ animationDelay: "200ms" }}
          >
            {subline}
          </p>
          <div
            className="animate-fade-up mt-8 flex flex-wrap gap-3"
            style={{ animationDelay: "320ms" }}
          >
            <BookNowButton className="transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0" />
            <TextButton className="border-stone bg-white/60 text-ink transition-transform duration-200 hover:-translate-y-0.5 hover:bg-white active:translate-y-0" />
          </div>
          <div
            className="animate-fade-up mt-8 flex items-center gap-4"
            style={{ animationDelay: "420ms" }}
          >
            <Image
              src="/images/photos/txia-member.png"
              alt="Texas Irrigation Association member"
              width={72}
              height={63}
              className="h-12 w-auto"
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
