import i18next from 'i18next';
import HttpApi from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

declare module 'i18next' {
  interface CustomTypeOptions {
    returnNull: false;
  }
}

i18next
  .use(initReactI18next)
  .use(HttpApi) // Registering the back-end plugin
  .init({
    lng: 'en',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
    fallbackLng: 'en',
    debug: true,
  });

export default i18next;
