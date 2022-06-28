import React from "react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { langAtom } from "state/atoms/langAtom";

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

export const useLangParam = () => {
  const query = useQuery();
  const setLang = useSetRecoilState(langAtom);
  const { i18n } = useTranslation();

  useEffect(() => {
    const defaultLang = query.get("lang");
    if (defaultLang !== null && ["en", "pl", "uk"].includes(defaultLang)) {
      i18n.changeLanguage(defaultLang);
      setLang(defaultLang);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
