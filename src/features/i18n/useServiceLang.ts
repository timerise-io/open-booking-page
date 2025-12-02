import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useBookingStore, useUiStore } from "state/stores";
import { useLangParam } from "./useLangParam";

const UITranslation = [
  "bg",
  "cs",
  "nl",
  "en",
  "fi",
  "fr",
  "de",
  "el",
  "hu",
  "it",
  "pl",
  "pt",
  "es",
  "sk",
  "sv",
  "uk",
  "tr",
  "nb",
];

export const useServiceLang = () => {
  const serviceLang = useBookingStore((state) => state.service)?.project.defaultLocale;
  const setLang = useUiStore((state) => state.setLang);
  const { i18n } = useTranslation();
  const paramLang = useLangParam();

  useEffect(() => {
    const defaultLang = serviceLang?.split("-")?.[0] ?? "en";

    const paramLangPart = paramLang?.split("-")?.[0];

    if (paramLangPart !== undefined && UITranslation.includes(paramLangPart)) {
      i18n.changeLanguage(paramLangPart);
      setLang(paramLangPart);
      return;
    }

    if (defaultLang !== null && UITranslation.includes(defaultLang)) {
      i18n.changeLanguage(defaultLang);
      setLang(defaultLang);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serviceLang, paramLang]);
};
