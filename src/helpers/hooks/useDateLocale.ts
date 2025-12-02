import { useUiStore } from "state/stores";

const KEY_TO_LOCALE: Record<string, string> = {
  bg: "bg",
  cs: "cs",
  nl: "nl",
  en: "en-gb",
  fi: "fi",
  fr: "fr",
  de: "de",
  el: "el",
  hu: "hu",
  it: "it",
  pl: "pl",
  pt: "pt",
  es: "es",
  sk: "sk",
  sv: "sv",
  uk: "uk",
  tr: "tr",
  nb: "nb",
};

export const useDateLocale = () => {
  const lang = useUiStore((state) => state.lang);
  return KEY_TO_LOCALE[lang] ?? "en-gb";
};
