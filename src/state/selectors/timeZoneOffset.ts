import { getAllTimezones, TimezoneName } from "countries-and-timezones";
import { selector } from "recoil";
import { timeZoneAtom } from "state/atoms/timeZone";

export const timeZoneOffsetSelector = selector({
  key: "timeZoneOffsetSelector",
  get: ({ get }) => {
    const timeZone = get(timeZoneAtom);
    return getAllTimezones()[timeZone as TimezoneName].utcOffset ?? 0;
  },
});
