import { selector } from "recoil";
import { langAtom } from "state/atoms/langAtom";

const KEY_TO_LOCALE: Record<string, string> = {
  cs: "cs",
  nl: "nl",
  en: "en-gb",
  fi: "fi",
  fr: "fr",
  de: "de",
  hu: "hu",
  it: "it",
  pl: "pl",
  pt: "pt",
  es: "es",
  sk: "sk",
  sv: "sv",
  uk: "uk",
};

export const dateLocaleSelector = selector({
  key: "dateLocaleSelector",
  get: ({ get }) => {
    const key = get(langAtom);
    return KEY_TO_LOCALE[key] ?? "en-gb";
  },
});
