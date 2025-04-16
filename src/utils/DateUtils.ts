import { Duration } from "@/types/Common";

export function formatDate(date: Date | string): string {
  const d = new Date(date);

  const day = d.getDate();
  const month = d.toLocaleString("default", { month: "long" });
  const year = d.getFullYear();

  const suffix =
    day % 10 === 1 && day !== 11
      ? "st"
      : day % 10 === 2 && day !== 12
      ? "nd"
      : day % 10 === 3 && day !== 13
      ? "rd"
      : "th";

  return `${day}${suffix} ${month} ${year}`;
}

export function formatTime(date: Date): string {
  const d = new Date(date);

  const h = d.getHours();
  const m = d.getMinutes();

  return `${pad(h)}:${pad(m)}`;
}

export function formatDateTime(date: Date): string {
  return `${formatDate(date)}, ${formatTime(date)}`;
}

export function convertDurationToMs(duration: Duration): number {
  switch (duration.type) {
    case "seconds":
      return duration.value * 1000;
    case "minutes":
      return duration.value * 60 * 1000;
    case "hours":
      return duration.value * 60 * 60 * 1000;
    default:
      throw new Error("Invalid duration type");
  }
}

export function delay(duration: number | Duration) {
  const milliseconds =
    typeof duration == "number" ? duration : convertDurationToMs(duration);
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

export function formatToDMy(dateStr?: string | Date) {
  if (!dateStr) return "n/a";

  const d = new Date(dateStr);
  const y = d.getFullYear().toString();

  return `${pad(d.getDate())}-${pad(d.getMonth())}-${y.slice(2, 4)}`;
}

export function formatToDMY(dateStr?: string | Date) {
  if (!dateStr) return "n/a";

  const d = new Date(dateStr);
  const y = d.getFullYear().toString();

  return `${pad(d.getDate())}-${pad(d.getMonth() + 1)}-${y}`;
}

export function getMonthAndYear(dateStr?: string | Date) {
  const date = dateStr ? new Date(dateStr) : new Date();

  return {
    year: date.getFullYear(),
    month: pad(date.getMonth() + 1),
  };
}

function pad(v: number | string) {
  return String(v).padStart(2, "0");
}

export function getAllDatesInMonth(dateStr?: string | Date): string[] {
  const date = dateStr ? new Date(dateStr) : new Date();

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const daysInMonth = new Date(year, month, 0).getDate();

  return Array.from(
    { length: daysInMonth },
    (_, i) => `${year}-${pad(month)}-${pad(i + 1)}`
  );
}
