import { selector } from "recoil";
import { langAtom } from "state/atoms/langAtom";

const KEY_TO_LOCALE: Record<string, string> = {
  en: "en-gb",
  pl: "pl",
  uk: "uk",
  de: "de",
  es: "es",
  fr: "fr",
};

export const dateLocaleSelector = selector({
  key: "dateLocaleSelector",
  get: ({ get }) => {
    const key = get(langAtom);
    return KEY_TO_LOCALE[key] ?? "en-gb";
  },
});
