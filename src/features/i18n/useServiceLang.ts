import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { langAtom } from "state/atoms/langAtom";
import { serviceAtom } from "state/atoms/service";
import { useLangParam } from "./useLangParam";

const UITranslation = ["bg", "cs", "nl", "en", "fi", "fr", "de", "el", "hu", "it", "pl", "pt", "es", "sk", "sv", "uk", "tr"];

export const useServiceLang = () => {
  const serviceLang = useRecoilValue(serviceAtom)?.project.defaultLocale;
  const setLang = useSetRecoilState(langAtom);
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
