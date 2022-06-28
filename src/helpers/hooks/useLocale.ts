import { enGB, pl, uk } from "date-fns/esm/locale";
import { useRecoilValue } from "recoil";
import { dateLocaleSelector } from "state/selectors/dateLocale";

export const useLocale = () => {
  const locale = useRecoilValue(dateLocaleSelector);

  switch (locale) {
    case "en-gb":
      return enGB;
    case "pl":
      return pl;
    case "uk":
      return uk;
    default:
      return enGB;
  }
};
