import Image from "next/image";

/**
 * Photo swap slot — replace src with a real job photo when available.
 * Keep the same aspect and alt text for layout continuity.
 */
export function PhotoSlot({
  src = "/images/placeholders/hero-sprinkler.svg",
  alt,
  className = "",
  priority = false,
  label = "Photo placeholder — swap with job photography",
  showLabel = true,
  zoom = false,
}: {
  src?: string;
  alt: string;
  className?: string;
  priority?: boolean;
  label?: string;
  showLabel?: boolean;
  zoom?: boolean;
}) {
  return (
    <div className={`relative overflow-hidden bg-[#1a4a78] ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        unoptimized={src.endsWith(".svg")}
        className={`object-cover ${zoom ? "animate-slow-zoom" : ""}`}
        sizes="100vw"
      />
      {showLabel && (
        <span className="pointer-events-none absolute bottom-3 right-3 rounded-sm bg-ink/70 px-2 py-1 text-[10px] uppercase tracking-wider text-mist/90">
          {label}
        </span>
      )}
    </div>
  );
}
