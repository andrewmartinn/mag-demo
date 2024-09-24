import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getDateWithTime = (date: Date, time: string): Date => {
  const [hours, minutes] = time.split(":").map(Number);
  const dateTime = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()),
  );

  dateTime.setUTCHours(
    hours + (time.includes("PM") && hours !== 12 ? 12 : 0),
    minutes,
  );

  return dateTime;
};
