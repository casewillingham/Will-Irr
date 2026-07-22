import { site } from "@/lib/site";

type Props = {
  className?: string;
  label?: string;
};

const base =
  "inline-flex items-center justify-center gap-2 px-5 py-3.5 text-[13px] font-semibold tracking-wide transition-colors duration-200 min-h-11";

export function BookNowButton({ className = "", label = "Book Now" }: Props) {
  return (
    <a
      href={site.bookNowUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} bg-moss text-white hover:bg-moss-deep ${className}`}
    >
      {label}
    </a>
  );
}

/** Primary secondary CTA — text preferred over calling */
export function TextButton({ className = "", label }: Props) {
  return (
    <a
      href={site.smsHref}
      className={`${base} border bg-transparent ${className}`}
    >
      {label ?? (
        <>
          <span className="sm:hidden">Text us</span>
          <span className="hidden sm:inline">Text {site.phoneDisplay}</span>
        </>
      )}
    </a>
  );
}

export function PortalLink({ className = "" }: { className?: string }) {
  return (
    <a
      href={site.portalUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`text-sm font-medium text-moss underline-offset-4 hover:underline ${className}`}
    >
      Customer Portal
    </a>
  );
}
