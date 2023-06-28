import { getIsBrandedPage } from "helpers/functions";
import { useLocation } from "react-router-dom";

export const useIsBrandedPageFlag = () => {
  const location = useLocation();

  return getIsBrandedPage(location.pathname);
};
