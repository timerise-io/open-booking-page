import { PAGES } from "pages/constans";
import { matchPath } from "react-router-dom";

const BRANDED_PAGERS = Object.values([
  PAGES.SERVICE,
  PAGES.SERVICES,
  PAGES.BOOKING,
]);

export const getIsBandedPage = (path: string) => {
  return !!BRANDED_PAGERS.map((pagePath) => !!matchPath(path, pagePath)).filter(
    Boolean
  ).length;
};
