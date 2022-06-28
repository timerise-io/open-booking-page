import { selector } from "recoil";
import { serviceAtom } from "state/atoms/service";

interface SlotViewConfiguration {
  showDuration: boolean;
  showQuantity: boolean;
  maxDaysPerPage: number;
  minDaysPerPage: number;
  slotsColumnWidth: number;
}

export const slotsViewConfiguration = selector<SlotViewConfiguration>({
  key: "slotsViewConfigurationSelection",
  get: ({ get }) => {
    const { duration, quantity } = get(serviceAtom)?.viewConfig?.slot ?? {
      duration: false,
      quantity: false,
    };

    const maxDaysPerPage = duration || quantity ? 5 : 7;
    const minDaysPerPage = duration || quantity ? 2 : 4;
    const slotsColumnWidth = duration || quantity ? 106 : 76;

    return {
      showDuration: duration,
      showQuantity: quantity,
      maxDaysPerPage,
      minDaysPerPage,
      slotsColumnWidth,
    };
  },
});
