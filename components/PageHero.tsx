import Image from "next/image";
import { BookNowButton, TextButton } from "@/components/CtaButtons";

type Props = {
  title: string;
  subline: string;
  label?: string;
  imageSrc?: string;
  imageAlt?: string;
};

/**
 * Interior page hero — same split language as the homepage Hero,
 * slightly shorter so page content starts sooner.
 */
export function PageHero({
  title,
  subline,
  label,
  imageSrc = "/images/photos/green-lawn.jpg",
  imageAlt = "Professionally maintained landscape",
}: Props) {
  return (
    <section className="relative bg-mist pt-16 md:pt-[4.25rem]">
      <div className="grid min-h-[min(42svh,28rem)] lg:min-h-[min(50svh,32rem)] lg:grid-cols-2">
        <div className="flex flex-col justify-center px-5 py-12 md:px-10 md:py-16 lg:px-14 xl:pl-[max(3.5rem,calc((100vw-72rem)/2+2rem))] lg:pr-12">
          {label ? (
            <p className="animate-fade-in text-[11px] font-semibold uppercase tracking-[0.16em] text-moss">
              {label}
            </p>
          ) : null}
          <h1
            className={`animate-fade-up max-w-lg font-display text-[2.15rem] font-semibold leading-[1.1] tracking-tight text-ink md:text-4xl lg:text-[2.75rem] ${
              label ? "mt-4" : ""
            }`}
          >
            {title}
          </h1>
          <p
            className="animate-fade-up mt-5 max-w-md text-[1.05rem] leading-relaxed text-ink-muted"
            style={{ animationDelay: "80ms" }}
          >
            {subline}
          </p>
          <div
            className="animate-fade-up mt-8 flex flex-wrap gap-3"
            style={{ animationDelay: "140ms" }}
          >
            <BookNowButton />
            <TextButton className="border-stone bg-white/60 text-ink hover:bg-white" />
          </div>
        </div>

        <div className="relative aspect-[4/3] min-h-[14rem] sm:min-h-[18rem] lg:aspect-auto lg:min-h-full">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </div>
    </section>
  );
}
