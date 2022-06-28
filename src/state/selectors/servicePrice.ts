import { selector } from "recoil";
import { serviceAtom } from "state/atoms/service";

export const servicePrice = selector({
  key: "servicePrice",
  get: ({ get }) => {
    const service = get(serviceAtom);
    if (!service) return;

    return {
      price: service.price,
      currency: service.currency,
    };
  },
});
