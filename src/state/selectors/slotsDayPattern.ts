import _ from "lodash";
import { selector } from "recoil";
import { serviceSlotsMapSelector } from "./serviceSlotsMap";

export const slotsDayPattern = selector({
  key: "slotsDayPattern",
  get: ({ get }) => {
    const patternMap = get(serviceSlotsMapSelector);

    const allDaysTimes = Object.entries(patternMap).flatMap(([from, item]) => {
      return Object.values(item).map((slot) => {
        const from = slot.dateTimeFrom.split("T")[1];
        const to = slot.dateTimeTo.split("T")[1];

        return { key: `${from}-${to}`, from, to };
      });
    });

    const dayPattern = _.sortedUniqBy(_.orderBy(allDaysTimes, ["key"]), "key");

    return dayPattern;
  },
});
