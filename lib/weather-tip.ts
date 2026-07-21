/** Benbrook, TX — default when geolocation is unavailable */
export const DEFAULT_LOCATION = {
  lat: 32.6732,
  lon: -97.4606,
  label: "Benbrook",
} as const;

export type WeatherSnapshot = {
  temperatureF: number;
  weatherCode: number;
  precipMm: number;
  precipProbability: number | null;
  isDay: boolean;
};

export type IrrigationTip = {
  conditionLabel: string;
  headline: string;
  tip: string;
  ctaLabel: string;
};

/** WMO weather interpretation codes → short label */
export function weatherCodeLabel(code: number): string {
  if (code === 0) return "Clear";
  if (code === 1) return "Mostly clear";
  if (code === 2) return "Partly cloudy";
  if (code === 3) return "Overcast";
  if (code === 45 || code === 48) return "Foggy";
  if (code >= 51 && code <= 57) return "Drizzle";
  if (code >= 61 && code <= 67) return "Rain";
  if (code >= 71 && code <= 77) return "Snow";
  if (code >= 80 && code <= 82) return "Showers";
  if (code >= 85 && code <= 86) return "Snow showers";
  if (code === 95) return "Thunderstorm";
  if (code === 96 || code === 99) return "Storm with hail";
  return "Mixed skies";
}

function isPrecipitating(code: number): boolean {
  return (
    (code >= 51 && code <= 67) ||
    (code >= 80 && code <= 82) ||
    code === 95 ||
    code === 96 ||
    code === 99
  );
}

/**
 * Map current conditions to one irrigation-aware tip.
 * Rules are intentionally simple for the prototype.
 */
export function buildIrrigationTip(wx: WeatherSnapshot): IrrigationTip {
  const conditionLabel = weatherCodeLabel(wx.weatherCode);
  const raining =
    isPrecipitating(wx.weatherCode) ||
    wx.precipMm >= 0.5 ||
    (wx.precipProbability != null && wx.precipProbability >= 60);
  const nearFreeze = wx.temperatureF <= 36;
  const hot = wx.temperatureF >= 95;
  const warm = wx.temperatureF >= 85;

  if (nearFreeze) {
    return {
      conditionLabel,
      headline: `${Math.round(wx.temperatureF)}° — freeze watch`,
      tip: "Pause watering and protect your backflow preventer. A quick winterization check beats a frozen break.",
      ctaLabel: "Book a checkup",
    };
  }

  if (raining) {
    return {
      conditionLabel,
      headline: `${Math.round(wx.temperatureF)}° — rain in the mix`,
      tip: "Skip today’s sprinkler run. Let nature water the lawn and save the wear on your system.",
      ctaLabel: "Book a checkup",
    };
  }

  if (hot) {
    return {
      conditionLabel,
      headline: `${Math.round(wx.temperatureF)}° — heat stress`,
      tip: "Deep water early morning or evening. Midday runs lose a lot to evaporation in North Texas heat.",
      ctaLabel: "Book a checkup",
    };
  }

  if (warm) {
    return {
      conditionLabel,
      headline: `${Math.round(wx.temperatureF)}° — warm & dry`,
      tip: "Walk the yard for dry spots and broken heads. A short coverage check keeps the lawn even.",
      ctaLabel: "Book a checkup",
    };
  }

  return {
    conditionLabel,
    headline: `${Math.round(wx.temperatureF)}° — mild day`,
    tip: "Good day to confirm controller schedules and look for leaks before the next heat wave.",
    ctaLabel: "Book a checkup",
  };
}
