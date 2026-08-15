import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en.json";
import ar from "./locales/ar.json";
import es from "./locales/es.json";
import fr from "./locales/fr.json";
import pt from "./locales/pt.json";
import de from "./locales/de.json";
import la from "./locales/la.json";

const resources = {
  en: { translation: en },
  ar: { translation: ar },
  es: { translation: es },
  fr: { translation: fr },
  pt: { translation: pt },
  de: { translation: de },
  la: { translation: la },
};

const supportedLanguages = [
  "en",
  "ar",
  "es",
  "fr",
  "pt",
  "de",
  "la",
];

const rtlLanguages = ["ar"];

const getInitialLanguage = () => {
  const savedLanguage = localStorage.getItem("dpf-language");

  if (savedLanguage && supportedLanguages.includes(savedLanguage)) {
    return savedLanguage;
  }

  return "en";
};

const updateDocumentDirection = (language) => {
  const isRTL = rtlLanguages.includes(language);

  document.documentElement.lang = language;
  document.documentElement.dir = isRTL ? "rtl" : "ltr";

  document.body.classList.toggle("rtl", isRTL);
};

i18n
  .use(initReactI18next)
  .init({
    resources,

    lng: getInitialLanguage(),

    fallbackLng: "en",

    supportedLngs: supportedLanguages,

    interpolation: {
      escapeValue: false,
    },
  });

i18n.on("languageChanged", (language) => {
  localStorage.setItem("dpf-language", language);

  updateDocumentDirection(language);
});

updateDocumentDirection(i18n.language);

export default i18n;