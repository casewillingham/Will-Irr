import { NextResponse } from "next/server";
import { DEFAULT_LOCATION } from "@/lib/weather-tip";

export const runtime = "edge";

type OpenMeteoCurrent = {
  temperature_2m: number;
  weather_code: number;
  precipitation: number;
  is_day: number;
};

type OpenMeteoResponse = {
  current?: OpenMeteoCurrent;
  daily?: {
    precipitation_probability_max?: (number | null)[];
  };
};

function parseCoord(value: string | null, fallback: number): number {
  if (value == null || value === "") return fallback;
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = parseCoord(searchParams.get("lat"), DEFAULT_LOCATION.lat);
  const lon = parseCoord(searchParams.get("lon"), DEFAULT_LOCATION.lon);

  // Clamp to sane ranges
  if (lat < -90 || lat > 90 || lon < -180 || lon > 180) {
    return NextResponse.json({ error: "Invalid coordinates" }, { status: 400 });
  }

  const url = new URL("https://api.open-meteo.com/v1/forecast");
  url.searchParams.set("latitude", String(lat));
  url.searchParams.set("longitude", String(lon));
  url.searchParams.set(
    "current",
    "temperature_2m,weather_code,precipitation,is_day",
  );
  url.searchParams.set("daily", "precipitation_probability_max");
  url.searchParams.set("temperature_unit", "fahrenheit");
  url.searchParams.set("precipitation_unit", "mm");
  url.searchParams.set("timezone", "auto");
  url.searchParams.set("forecast_days", "1");

  try {
    const res = await fetch(url.toString(), {
      next: { revalidate: 600 },
      headers: { Accept: "application/json" },
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "Weather upstream error" },
        { status: 502 },
      );
    }

    const data = (await res.json()) as OpenMeteoResponse;
    const current = data.current;
    if (!current) {
      return NextResponse.json(
        { error: "No current weather data" },
        { status: 502 },
      );
    }

    const precipProbability =
      data.daily?.precipitation_probability_max?.[0] ?? null;

    return NextResponse.json(
      {
        temperatureF: current.temperature_2m,
        weatherCode: current.weather_code,
        precipMm: current.precipitation,
        precipProbability:
          typeof precipProbability === "number" ? precipProbability : null,
        isDay: current.is_day === 1,
        lat,
        lon,
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=600, stale-while-revalidate=300",
        },
      },
    );
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch weather" },
      { status: 502 },
    );
  }
}
