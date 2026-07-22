import Link from "next/link";
import Image from "next/image";
import { getPriorityCities } from "@/lib/cities";
import { site } from "@/lib/site";
import { BookNowButton } from "@/components/CtaButtons";
import { Logo } from "@/components/Logo";

const footerLinks = [
  { href: "/services", label: "Services" },
  { href: "/pricing", label: "Pricing" },
  { href: "/holiday-lighting", label: "Holiday lighting" },
  { href: "/landscape-lighting", label: "Landscape lighting" },
  { href: "/about", label: "About" },
  { href: "/careers", label: "Careers" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
] as const;

const popularCityNames = [
  "Benbrook",
  "White Settlement",
  "Palmilla Springs",
  "Weatherford",
  "Fort Worth",
];
const popularCities = popularCityNames
  .map((name) => getPriorityCities().find((c) => c.name === name))
  .filter((c): c is NonNullable<typeof c> => Boolean(c));

export function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-10 md:grid-cols-12 md:gap-8 md:px-8 md:py-12">
        <div className="md:col-span-5">
          <Logo size="footer" />
          <p className="mt-4 max-w-sm text-[14px] leading-relaxed text-white/65">
            {site.tagline}
          </p>
          <div className="mt-5 flex w-full flex-col gap-4 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center">
            <BookNowButton className="w-full sm:w-auto" />
            <Image
              src="/images/photos/txia-member.png"
              alt="Texas Irrigation Association member"
              width={72}
              height={63}
              className="h-10 w-auto max-w-[4.5rem] shrink-0 self-start object-contain"
              unoptimized
            />
          </div>
          <p className="mt-4 text-[12px] text-white/40">
            Licensed irrigation professional {site.license}
          </p>
        </div>

        <div className="md:col-span-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/45">
            Explore
          </p>
          <ul className="mt-3 columns-2 gap-x-6 text-[14px] md:columns-1">
            {footerLinks.map((link) => (
              <li key={link.href} className="break-inside-avoid">
                <Link
                  href={link.href}
                  className="inline-flex min-h-10 items-center text-white/75 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/45">
            Contact
          </p>
          <div className="mt-3 space-y-2 text-[14px] text-white/75">
            <p>
              <span className="text-[12px] text-white/45">Text </span>
              <a
                href={site.smsHref}
                className="font-display text-lg font-semibold text-white hover:underline"
              >
                {site.phoneDisplay}
              </a>
            </p>
            <p>
              <a href={`mailto:${site.email}`} className="hover:text-white">
                {site.email}
              </a>
            </p>
            <p>
              <a
                href={site.portalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                Customer Portal
              </a>
            </p>
          </div>
          <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/45">
            Cities
          </p>
          <p className="mt-2 text-[13px] leading-relaxed text-white/65">
            {popularCities.map((city, i) => (
              <span key={city.slug}>
                {i > 0 && " · "}
                <Link
                  href={`/${city.slug}`}
                  className="hover:text-white"
                >
                  {city.name}
                </Link>
              </span>
            ))}
            {" · "}
            <Link
              href="/cities-we-serve"
              className="text-leaf hover:text-white"
            >
              All cities
            </Link>
          </p>
        </div>
      </div>
      <div className="border-t border-white/10 px-5 py-4 text-center text-[12px] text-white/35 md:px-8">
        © {new Date().getFullYear()} {site.name}. All rights reserved.
      </div>
    </footer>
  );
}
