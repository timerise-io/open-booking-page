import { getIsBandedPage } from "helpers/functions/getIsBrandedPage";
import { useLocation } from "react-router-dom";

export const useIsBrandedPageFlag = () => {
  const location = useLocation();

  return getIsBandedPage(location.pathname);
};
