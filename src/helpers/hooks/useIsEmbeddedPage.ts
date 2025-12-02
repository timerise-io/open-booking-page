import { useEffect } from "react";
import { getIsEmbeddedPage } from "helpers/functions";
import { EMBEDDED_PAGES, PAGES as ROUTES } from "pages/constans";
import { useLocation } from "react-router-dom";
import { useUiStore } from "state/stores";

type UseIsEmbeddedPage = () => {
  isEmbeddedPage: boolean;
  PAGES: Record<string, string>;
};

export const useIsEmbeddedPage: UseIsEmbeddedPage = () => {
  const location = useLocation();
  const setUserPreference = useUiStore((state) => state.setUserPreference);
  const isEmbeddedPage = Boolean(getIsEmbeddedPage(location.pathname));
  const PAGES = isEmbeddedPage ? EMBEDDED_PAGES : ROUTES;

  useEffect(() => {
    if (isEmbeddedPage) {
      setUserPreference({ theme: "light" });
    }
  }, [isEmbeddedPage, setUserPreference]);

  return {
    isEmbeddedPage,
    PAGES,
  };
};
