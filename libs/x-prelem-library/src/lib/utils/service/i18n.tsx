import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import HttpApi from "i18next-http-backend";
import English from "../locales/en/translation.json";
import French from "../locales/fr/translation.json";
import German from "../locales/de/translation.json";

declare module "i18next" {
  interface CustomTypeOptions {
    returnNull: false;
  }
}

const resources = {
  en: {
    translation: English,
  },
  fr: {
    translation: French,
  },
  de: {
    translation: German,
  },
};

i18next
  .use(initReactI18next)
  .use(HttpApi) // Registering the back-end plugin
  .init({
    resources,
    lng: "en",
    interpolation: {
      escapeValue: false,
    },
    fallbackLng: "en",
    debug: false,
    react: {
      useSuspense: false, //   <---- to handle suspense fallback error
    },
  });
export default i18next;
