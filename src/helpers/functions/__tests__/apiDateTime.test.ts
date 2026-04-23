import { stripTimezoneFromISO, toApiDateTime } from "../apiDateTime";

describe("toApiDateTime", () => {
  it("formats a Date as UTC ISO 8601 without milliseconds", () => {
    const date = new Date("2026-02-17T14:30:00Z");
    expect(toApiDateTime(date)).toBe("2026-02-17T14:30:00Z");
  });

  it("converts local time to UTC", () => {
    // Create a date at a known UTC time
    const date = new Date(Date.UTC(2026, 0, 1, 0, 0, 0));
    expect(toApiDateTime(date)).toBe("2026-01-01T00:00:00Z");
  });

  it("does not include milliseconds", () => {
    const date = new Date("2026-06-15T09:05:30.123Z");
    expect(toApiDateTime(date)).toBe("2026-06-15T09:05:30Z");
  });
});

describe("stripTimezoneFromISO", () => {
  it("strips .000Z suffix", () => {
    expect(stripTimezoneFromISO("2026-02-17T09:00:00.000Z")).toBe("2026-02-17T09:00:00");
  });

  it("strips bare Z suffix", () => {
    expect(stripTimezoneFromISO("2026-02-17T09:00:00Z")).toBe("2026-02-17T09:00:00");
  });

  it("strips varying fractional seconds", () => {
    expect(stripTimezoneFromISO("2026-02-17T09:00:00.1Z")).toBe("2026-02-17T09:00:00");
    expect(stripTimezoneFromISO("2026-02-17T09:00:00.12Z")).toBe("2026-02-17T09:00:00");
    expect(stripTimezoneFromISO("2026-02-17T09:00:00.123456Z")).toBe("2026-02-17T09:00:00");
  });

  it("returns the string unchanged if no Z suffix", () => {
    expect(stripTimezoneFromISO("2026-02-17T09:00:00")).toBe("2026-02-17T09:00:00");
  });

  it("returns the string unchanged if it has a numeric offset", () => {
    expect(stripTimezoneFromISO("2026-02-17T09:00:00+05:30")).toBe("2026-02-17T09:00:00+05:30");
  });
});
