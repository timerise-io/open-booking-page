import { PAGES } from "pages/constans";
import { matchPath } from "react-router-dom";

const BRANDED_PAGERS = Object.values([
  PAGES.SERVICE,
  PAGES.SERVICES,
  PAGES.BOOKING,
  PAGES.RESCHEDULE,
]);

export const getIsBandedPage = (path: string) => {
  return !!BRANDED_PAGERS.map((pagePath) => !!matchPath(pagePath, path)).filter(
    Boolean
  ).length;
};
