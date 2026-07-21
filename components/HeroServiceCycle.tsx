"use client";

import { useEffect, useState } from "react";

const SERVICES = [
  "Holiday lighting",
  "Landscape lighting",
  "Irrigation",
] as const;

const HOLD_MS = 1500;
const SLIDE_MS = 480;

/**
 * Scrolls service names, then holds on Irrigation.
 * No overflow clip — settled glyphs stay fully visible.
 */
export function HeroServiceCycle() {
  const [index, setIndex] = useState(0);
  const [outgoing, setOutgoing] = useState<number | null>(null);
  const [reduceMotion, setReduceMotion] = useState(false);

  const finished = index >= SERVICES.length - 1 && outgoing === null;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      setReduceMotion(mq.matches);
      if (mq.matches) {
        setIndex(SERVICES.length - 1);
        setOutgoing(null);
      }
    };
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (reduceMotion || finished || outgoing !== null) return;

    const timer = window.setTimeout(() => {
      setOutgoing(index);
      setIndex((i) => i + 1);
    }, HOLD_MS);

    return () => window.clearTimeout(timer);
  }, [index, finished, outgoing, reduceMotion]);

  useEffect(() => {
    if (outgoing === null) return;
    const timer = window.setTimeout(() => setOutgoing(null), SLIDE_MS);
    return () => window.clearTimeout(timer);
  }, [outgoing]);

  return (
    <h1 className="mt-4 max-w-lg font-display text-[2.5rem] font-semibold leading-[1.15] tracking-tight text-ink md:text-[3.25rem]">
      <span className="hero-cycle">
        <span className="hero-cycle__sizer" aria-hidden>
          Landscape lighting
        </span>
        <span className="hero-cycle__viewport" aria-live="polite" aria-atomic="true">
          {outgoing !== null && (
            <span className="hero-cycle__word hero-cycle__word--out" aria-hidden>
              {SERVICES[outgoing]}
            </span>
          )}
          <span
            key={index}
            className={
              outgoing !== null && !reduceMotion
                ? "hero-cycle__word hero-cycle__word--in"
                : "hero-cycle__word"
            }
          >
            {SERVICES[index]}
          </span>
        </span>
      </span>{" "}
      done right.
    </h1>
  );
}
