"use client";

/**
 * Sıradaki seferi Europe/Istanbul saatine göre hesaplayan hook.
 * Sunucu/istemci uyuşmazlığını (hydration) önlemek için ilk render'da
 * null döner, mount olduktan sonra dakikada bir güncellenir.
 */
import { useEffect, useState } from "react";
import { SCHEDULE, type Departure, type DeparturePoint } from "@/lib/data";

export type NextDeparture = {
  /** Kalkış noktası */
  point: DeparturePoint;
  /** "HH:MM" */
  time: string;
  /** Varış noktası */
  to: string;
  /** Kaç dakika sonra (bugün sefer kalmadıysa null) */
  minutesLeft: number | null;
  /** Bugün bu noktadan sefer kaldı mı */
  isToday: boolean;
};

function istanbulNowMinutes(): number {
  const parts = new Intl.DateTimeFormat("tr-TR", {
    timeZone: "Europe/Istanbul",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(new Date());
  const h = Number(parts.find((p) => p.type === "hour")?.value ?? 0);
  const m = Number(parts.find((p) => p.type === "minute")?.value ?? 0);
  return h * 60 + m;
}

export function timeToMinutes(t: string): number {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}

/** Verilen noktada, verilen dakikadan sonraki ilk seferi bulur. */
export function nextTimeFor(
  point: DeparturePoint,
  nowMin: number
): { departure: Departure; minutesLeft: number } | null {
  for (const departure of point.departures) {
    const tm = timeToMinutes(departure.time);
    if (tm >= nowMin) return { departure, minutesLeft: tm - nowMin };
  }
  return null;
}

/**
 * Tüm kalkış noktaları için sıradaki seferler.
 * `null` → henüz mount olmadı (SSR'da saat gösterme).
 */
export function useNextDepartures(): {
  nowMin: number;
  departures: NextDeparture[];
} | null {
  const [state, setState] = useState<{
    nowMin: number;
    departures: NextDeparture[];
  } | null>(null);

  useEffect(() => {
    const compute = () => {
      const nowMin = istanbulNowMinutes();
      const departures: NextDeparture[] = SCHEDULE.map((point) => {
        const next = nextTimeFor(point, nowMin);
        return next
          ? {
              point,
              time: next.departure.time,
              to: next.departure.to,
              minutesLeft: next.minutesLeft,
              isToday: true,
            }
          : {
              point,
              time: point.departures[0].time,
              to: point.departures[0].to,
              minutesLeft: null,
              isToday: false,
            };
      });
      setState({ nowMin, departures });
    };
    compute();
    const id = setInterval(compute, 30_000);
    return () => clearInterval(id);
  }, []);

  return state;
}

/** "23 dk" / "1 sa 05 dk" biçiminde insancıl süre */
export function formatMinutes(min: number): string {
  if (min < 60) return `${min} dk`;
  const h = Math.floor(min / 60);
  const m = min % 60;
  return m === 0 ? `${h} saat` : `${h} sa ${String(m).padStart(2, "0")} dk`;
}
