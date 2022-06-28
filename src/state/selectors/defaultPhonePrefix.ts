import { selector } from "recoil";
import { serviceAtom } from "state/atoms/service";

export const defaultPhonePrefixSelector = selector({
  key: "defaultPhonePrefixSelector",
  get: ({ get }) => {
    const serviceLang = get(serviceAtom)?.project.defaultLocale;
    return serviceLang?.split("-")?.[1] ?? "PL";
  },
});
