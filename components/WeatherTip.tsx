"use client";

import { useEffect, useState } from "react";
import { BookNowButton } from "@/components/CtaButtons";
import {
  buildIrrigationTip,
  DEFAULT_LOCATION,
  type IrrigationTip,
  type WeatherSnapshot,
} from "@/lib/weather-tip";

const DISMISS_KEY = "will-irr-weather-tip-dismissed";

type Loc = { lat: number; lon: number; label: string };

type WeatherPayload = WeatherSnapshot & { lat: number; lon: number };

async function resolveLabel(lat: number, lon: number): Promise<string> {
  try {
    const res = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`,
      { signal: AbortSignal.timeout(4000) },
    );
    if (!res.ok) return "Near you";
    const data = (await res.json()) as {
      city?: string;
      locality?: string;
    };
    return data.city || data.locality || "Near you";
  } catch {
    return "Near you";
  }
}

function getPosition(): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation unavailable"));
      return;
    }
    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: false,
      timeout: 5000,
      maximumAge: 15 * 60 * 1000,
    });
  });
}

async function loadLocation(): Promise<Loc> {
  try {
    const pos = await getPosition();
    const { latitude: lat, longitude: lon } = pos.coords;
    const label = await resolveLabel(lat, lon);
    return { lat, lon, label };
  } catch {
    return {
      lat: DEFAULT_LOCATION.lat,
      lon: DEFAULT_LOCATION.lon,
      label: DEFAULT_LOCATION.label,
    };
  }
}

async function fetchWeather(lat: number, lon: number): Promise<WeatherPayload> {
  const res = await fetch(`/api/weather?lat=${lat}&lon=${lon}`);
  if (!res.ok) throw new Error("Weather fetch failed");
  return res.json() as Promise<WeatherPayload>;
}

export function WeatherTip() {
  const [dismissed, setDismissed] = useState(true);
  const [loading, setLoading] = useState(true);
  const [place, setPlace] = useState<string>(DEFAULT_LOCATION.label);
  const [tip, setTip] = useState<IrrigationTip | null>(null);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(DISMISS_KEY) === "1") {
        setDismissed(true);
        setLoading(false);
        return;
      }
    } catch {
      /* ignore */
    }
    setDismissed(false);

    let cancelled = false;

    (async () => {
      try {
        const loc = await loadLocation();
        if (cancelled) return;
        setPlace(loc.label);
        const wx = await fetchWeather(loc.lat, loc.lon);
        if (cancelled) return;
        setTip(buildIrrigationTip(wx));
      } catch {
        if (cancelled) return;
        setTip(
          buildIrrigationTip({
            temperatureF: 90,
            weatherCode: 1,
            precipMm: 0,
            precipProbability: 10,
            isDay: true,
          }),
        );
        setPlace(DEFAULT_LOCATION.label);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  function dismiss() {
    try {
      sessionStorage.setItem(DISMISS_KEY, "1");
    } catch {
      /* ignore */
    }
    setDismissed(true);
  }

  if (dismissed) return null;

  return (
    <section
      className="border-b border-stone bg-[#e8edf2]"
      aria-live="polite"
      aria-busy={loading}
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-5 px-5 py-6 md:flex-row md:items-center md:justify-between md:gap-10 md:px-8 md:py-7">
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-moss">
            Local conditions · {place}
          </p>
          {loading || !tip ? (
            <p className="mt-2 font-display text-xl font-semibold text-ink md:text-2xl">
              Checking the weather…
            </p>
          ) : (
            <>
              <p className="mt-2 font-display text-xl font-semibold tracking-tight text-ink md:text-2xl">
                {tip.headline}
                <span className="ml-2 text-[15px] font-medium text-ink-muted">
                  {tip.conditionLabel}
                </span>
              </p>
              <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-ink-muted">
                {tip.tip}
              </p>
            </>
          )}
        </div>

        <div className="flex w-full shrink-0 flex-col gap-2 sm:w-auto sm:flex-row sm:items-center sm:gap-3">
          {!loading && tip ? (
            <BookNowButton
              label={tip.ctaLabel}
              className="w-full px-4 py-2.5 text-[13px] sm:w-auto"
            />
          ) : null}
          <button
            type="button"
            onClick={dismiss}
            className="min-h-11 px-2 text-[13px] font-medium text-ink-muted transition-colors hover:text-ink sm:min-h-0"
            aria-label="Dismiss weather tip"
          >
            Dismiss
          </button>
        </div>
      </div>
    </section>
  );
}
