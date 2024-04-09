import { getIsEmbeddedPage } from "helpers/functions";
import { EMBEDDED_PAGES, PAGES as ROUTES } from "pages/constans";
import { useLocation } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { userPreferenceAtom } from "state/atoms/userPreference";

type UseIsEmbeddedPage = () => {
  isEmbeddedPage: boolean;
  PAGES: Record<string, string>;
};

export const useIsEmbeddedPage: UseIsEmbeddedPage = () => {
  const location = useLocation();
  const setUserPreference = useSetRecoilState(userPreferenceAtom);
  const isEmbeddedPage = Boolean(getIsEmbeddedPage(location.pathname));
  const PAGES = isEmbeddedPage ? EMBEDDED_PAGES : ROUTES;

  if (isEmbeddedPage) {
    setUserPreference({ theme: "light" });
  }

  return {
    isEmbeddedPage,
    PAGES,
  };
};
