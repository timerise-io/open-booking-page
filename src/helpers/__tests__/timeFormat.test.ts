import { convertSourceDateTimeToTargetDateTime } from "../timeFormat";

// Timerise API returns the DateTime scalar as wall-clock time in
// service.project.localTimeZone with a literal "Z" suffix (despite the schema
// claiming UTC). A value "2026-04-23T11:30:00.000Z" with sourceTimeZone
// "Europe/Warsaw" means 11:30 Warsaw-wall-time (09:30 real UTC during CEST).
const WALL_TIME = "2026-04-23T11:30:00.000Z";

describe("convertSourceDateTimeToTargetDateTime", () => {
  it("shows the admin's configured wall-clock time when viewer matches source timezone", () => {
    expect(
      convertSourceDateTimeToTargetDateTime({
        date: WALL_TIME,
        sourceTimeZone: "Europe/Warsaw",
        targetTimeZone: "Europe/Warsaw",
      }),
    ).toBe("11:30");
  });

  it("shifts to UTC when viewer is in UTC (Warsaw CEST is +02:00)", () => {
    expect(
      convertSourceDateTimeToTargetDateTime({
        date: WALL_TIME,
        sourceTimeZone: "Europe/Warsaw",
        targetTimeZone: "UTC",
      }),
    ).toBe("9:30");
  });

  it("shifts to New_York (Warsaw CEST +02:00, NY EDT -04:00, 6h delta)", () => {
    expect(
      convertSourceDateTimeToTargetDateTime({
        date: WALL_TIME,
        sourceTimeZone: "Europe/Warsaw",
        targetTimeZone: "America/New_York",
      }),
    ).toBe("5:30");
  });

  it("respects a custom date format in the target timezone", () => {
    expect(
      convertSourceDateTimeToTargetDateTime({
        date: WALL_TIME,
        sourceTimeZone: "Europe/Warsaw",
        targetTimeZone: "Europe/Warsaw",
        dateFormat: "yyyy-MM-dd HH:mm",
      }),
    ).toBe("2026-04-23 11:30");
  });

  it("crosses date boundary correctly when shifting to a far-negative zone", () => {
    expect(
      convertSourceDateTimeToTargetDateTime({
        date: "2026-04-23T02:00:00Z",
        sourceTimeZone: "Europe/Warsaw",
        targetTimeZone: "America/New_York",
        dateFormat: "yyyy-MM-dd HH:mm",
      }),
    ).toBe("2026-04-22 20:00");
  });

  it("is an identity when source and target are both UTC", () => {
    expect(
      convertSourceDateTimeToTargetDateTime({
        date: WALL_TIME,
        sourceTimeZone: "UTC",
        targetTimeZone: "UTC",
      }),
    ).toBe("11:30");
  });
});
