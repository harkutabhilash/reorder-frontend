import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"


// export function cn(...classes: (string | undefined)[]) {
//   return classes.filter(Boolean).join(" ");
// }

export function cn(...classes: (string | undefined | boolean)[]) {
  return classes.filter((cls): cls is string => typeof cls === 'string').join(" ");
}