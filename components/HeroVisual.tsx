"use client";

import Image from "next/image";
import { useEffect, useEffectEvent, useRef, useState } from "react";

type Props = {
  imageSrc: string;
  imageAlt: string;
};

/**
 * Hero photo panel — slow zoom + soft mist + light mouse parallax.
 */
export function HeroVisual({ imageSrc, imageAlt }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const onChange = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const onMove = useEffectEvent((clientX: number, clientY: number) => {
    const el = ref.current;
    if (!el || reduceMotion) return;
    const rect = el.getBoundingClientRect();
    const x = (clientX - rect.left) / rect.width - 0.5;
    const y = (clientY - rect.top) / rect.height - 0.5;
    setOffset({ x: x * 12, y: y * 10 });
  });

  const onLeave = useEffectEvent(() => {
    setOffset({ x: 0, y: 0 });
  });

  return (
    <div
      ref={ref}
      className="relative aspect-[4/3] min-h-[14rem] overflow-hidden sm:min-h-[20rem] lg:aspect-auto lg:min-h-full"
      onMouseMove={(e) => onMove(e.clientX, e.clientY)}
      onMouseLeave={() => onLeave()}
    >
      <div
        className="absolute inset-[-4%] will-change-transform"
        style={{
          transform: reduceMotion
            ? undefined
            : `translate3d(${offset.x}px, ${offset.y}px, 0)`,
          transition: "transform 0.45s ease-out",
        }}
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority
          className={`object-cover object-[70%_center] ${
            reduceMotion ? "" : "animate-slow-zoom"
          }`}
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>

      {!reduceMotion ? (
        <>
          <div
            className="animate-mist-drift pointer-events-none absolute -left-[10%] top-[8%] h-[55%] w-[70%] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.45)_0%,transparent_70%)] blur-2xl"
            aria-hidden
          />
          <div
            className="animate-mist-drift pointer-events-none absolute bottom-[5%] right-[-5%] h-[45%] w-[55%] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(143,198,63,0.18)_0%,transparent_68%)] blur-2xl"
            style={{ animationDelay: "2.5s" }}
            aria-hidden
          />
        </>
      ) : null}

      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/25 via-transparent to-transparent lg:bg-gradient-to-l lg:from-transparent lg:via-transparent lg:to-mist/20"
        aria-hidden
      />
    </div>
  );
}
