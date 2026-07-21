import Image from "next/image";
import { site } from "@/lib/site";

export function TrustStrip() {
  return (
    <section className="border-b border-white/10 bg-ink">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-8 px-5 py-10 md:flex-row md:px-8 md:py-11">
        <div className="grid flex-1 gap-8 text-center sm:grid-cols-3 sm:text-left">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-leaf">
              Licensed
            </p>
            <p className="mt-2 font-display text-lg font-semibold text-white">
              {site.license}
            </p>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-leaf">
              Service area
            </p>
            <p className="mt-2 font-display text-lg font-semibold text-white">
              North Texas
            </p>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-leaf">
              Booking
            </p>
            <p className="mt-2 font-display text-lg font-semibold text-white">
              Online or by text
            </p>
          </div>
        </div>
        <div className="shrink-0 text-center sm:text-left">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-leaf">
            Member
          </p>
          <Image
            src="/images/photos/txia-member.png"
            alt="Texas Irrigation Association member"
            width={140}
            height={124}
            className="mt-2 h-[4.5rem] w-auto"
            unoptimized
          />
        </div>
      </div>
    </section>
  );
}
