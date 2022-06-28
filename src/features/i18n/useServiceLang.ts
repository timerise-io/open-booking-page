import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { langAtom } from "state/atoms/langAtom";
import { serviceAtom } from "state/atoms/service";

export const useServiceLang = () => {
  const serviceLang = useRecoilValue(serviceAtom)?.project.defaultLocale;
  const setLang = useSetRecoilState(langAtom);
  const { i18n } = useTranslation();

  useEffect(() => {
    const defaultLang = serviceLang?.split("-")?.[0] ?? "en";
    if (defaultLang !== null && ["en", "pl", "uk"].includes(defaultLang)) {
      i18n.changeLanguage(defaultLang);
      setLang(defaultLang);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serviceLang]);
};
