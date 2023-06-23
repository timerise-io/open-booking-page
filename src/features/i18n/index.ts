import i18n from "i18next";
import Backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    ns: ["common", "forms", "booking", "confirmation"],
    defaultNS: "common",
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    backend: {
      requestOptions: {
        cache: "no-store",
      },
    },
  });

export default i18n;
