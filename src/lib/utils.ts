import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function yyyymmdd(date = new Date()): string {
  return date.toISOString().slice(0, 10).replaceAll("-", "");
}

export function formatLongDate(input: string): string {
  const year = Number(input.slice(0, 4));
  const month = Number(input.slice(4, 6)) - 1;
  const day = Number(input.slice(6, 8));
  const dt = new Date(Date.UTC(year, month, day));
  return dt.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    timeZone: "UTC"
  });
}
