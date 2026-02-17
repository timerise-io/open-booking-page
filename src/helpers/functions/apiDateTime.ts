import { formatInTimeZone } from "date-fns-tz";

/** Format a Date as ISO 8601 UTC for the Timerise API: "yyyy-MM-ddTHH:mm:ssZ" */
export const toApiDateTime = (date: Date): string =>
  formatInTimeZone(date, "UTC", "yyyy-MM-dd'T'HH:mm:ss'Z'");

/** Strip timezone suffix (.000Z, Z, etc.) from an ISO datetime string */
export const stripTimezoneFromISO = (isoDate: string): string => isoDate.replace(/(\.\d+)?Z$/, "");
