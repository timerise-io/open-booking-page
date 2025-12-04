import { useNavigate } from "react-router-dom";
import { useIsEmbeddedPage } from "./useIsEmbeddedPage";

export const useSmartNavigation = () => {
  const navigate = useNavigate();
  const { PAGES, isEmbeddedPage } = useIsEmbeddedPage();

  const navigateToHome = () => {
    if (!isEmbeddedPage) {
      navigate("/");
    }
    // Embedded pages: no navigation (stay on error page)
    // User should contact website owner
  };

  return { navigateToHome, isEmbeddedPage, PAGES };
};
