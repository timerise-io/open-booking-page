import { cs, nl, enGB, fi, fr, de, hu, it, pl, pt, es, sk, sv, uk } from "date-fns/esm/locale";
import { useRecoilValue } from "recoil";
import { dateLocaleSelector } from "state/selectors/dateLocale";

export const useLocale = () => {
  const locale = useRecoilValue(dateLocaleSelector);
  switch (locale) {
    case "cs":
      return cs;
    case "nl":
      return nl;
    case "en-gb":
      return enGB;
    case "fi":
      return fi;
    case "fr":
      return fr;
    case "de":
      return de;
    case "hu":
      return hu;
    case "it":
      return it;
    case "pl":
      return pl;
    case "pt":
      return pt;
    case "es":
      return es;
    case "sk":
      return sk;
    case "sv":
      return sv;
    case "uk":
      return uk;
    default:
      return enGB;
  }
};
