import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";

type Props = {
  /** Visual size preset */
  size?: "nav" | "hero" | "page" | "footer";
  className?: string;
  priority?: boolean;
  /** Wrap in home link (default true for nav/footer) */
  linked?: boolean;
};

const sizes = {
  nav: { width: 168, height: 32, className: "h-8 w-auto" },
  hero: { width: 480, height: 92, className: "h-16 w-auto sm:h-20 md:h-24" },
  page: { width: 300, height: 58, className: "h-12 w-auto" },
  footer: { width: 220, height: 42, className: "h-11 w-auto" },
} as const;

export function Logo({
  size = "nav",
  className = "",
  priority = false,
  linked = true,
}: Props) {
  const s = sizes[size];
  // unoptimized: Next's image optimizer re-encodes PNGs and introduces a dark fringe
  const img = (
    <Image
      src="/images/willingham-1.png"
      alt={site.name}
      width={s.width}
      height={s.height}
      priority={priority}
      unoptimized
      className={`${s.className} ${className}`}
    />
  );

  if (!linked) return img;

  return (
    <Link href="/" className="inline-flex shrink-0 items-center" aria-label={site.name}>
      {img}
    </Link>
  );
}
