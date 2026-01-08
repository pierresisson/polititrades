import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";

import en from "@/locales/en.json";
import fr from "@/locales/fr.json";

const resources = {
  en: { translation: en },
  fr: { translation: fr },
};

// Get device locale, default to 'en' if not fr
const deviceLocale = Localization.getLocales()[0]?.languageCode ?? "en";
const defaultLocale = deviceLocale === "fr" ? "fr" : "en";

i18n.use(initReactI18next).init({
  resources,
  lng: defaultLocale,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
  compatibilityJSON: "v4",
});

export default i18n;
