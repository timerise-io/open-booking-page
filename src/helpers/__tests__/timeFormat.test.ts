import { convertSourceDateTimeToTargetDateTime } from "../timeFormat";

const UTC_DATE = "2026-04-23T07:30:00.000Z";

describe("convertSourceDateTimeToTargetDateTime", () => {
  it("formats real-UTC input in Europe/Warsaw (CEST +02:00)", () => {
    expect(
      convertSourceDateTimeToTargetDateTime({
        date: UTC_DATE,
        targetTimeZone: "Europe/Warsaw",
      }),
    ).toBe("9:30");
  });

  it("formats real-UTC input in UTC itself", () => {
    expect(
      convertSourceDateTimeToTargetDateTime({
        date: UTC_DATE,
        targetTimeZone: "UTC",
      }),
    ).toBe("7:30");
  });

  it("formats real-UTC input in America/New_York (EDT -04:00)", () => {
    expect(
      convertSourceDateTimeToTargetDateTime({
        date: UTC_DATE,
        targetTimeZone: "America/New_York",
      }),
    ).toBe("3:30");
  });

  it("respects a custom date format", () => {
    expect(
      convertSourceDateTimeToTargetDateTime({
        date: UTC_DATE,
        targetTimeZone: "Europe/Warsaw",
        dateFormat: "yyyy-MM-dd HH:mm",
      }),
    ).toBe("2026-04-23 09:30");
  });

  it("applies targetTimeZone consistently for a UTC ISO without fractional seconds", () => {
    expect(
      convertSourceDateTimeToTargetDateTime({
        date: "2026-04-23T07:30:00Z",
        targetTimeZone: "Europe/Warsaw",
      }),
    ).toBe("9:30");
  });

  it("crosses date boundary correctly when shifting to a negative-offset zone", () => {
    expect(
      convertSourceDateTimeToTargetDateTime({
        date: "2026-04-23T02:00:00Z",
        targetTimeZone: "America/New_York",
        dateFormat: "yyyy-MM-dd HH:mm",
      }),
    ).toBe("2026-04-22 22:00");
  });
});
