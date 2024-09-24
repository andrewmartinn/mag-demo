import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getDateWithTime = (date: Date, time: string): Date => {
  const [timePart, period] = time.split(" "); // Split time and period (AM/PM)
  // eslint-disable-next-line prefer-const
  let [hours, minutes] = timePart.split(":").map(Number);

  // Convert to 24-hour format
  if (period === "PM" && hours < 12) {
    hours += 12; // Convert PM hours
  } else if (period === "AM" && hours === 12) {
    hours = 0; // Convert midnight
  }

  const dateTime = new Date(date);
  dateTime.setHours(hours, minutes);
  return dateTime;
};
