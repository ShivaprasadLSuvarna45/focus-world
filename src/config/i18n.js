import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-xhr-backend";
import { initReactI18next } from "react-i18next";
import en from './locales/en.json';
import ar from './locales/ar.json';
import hi from './locales/hi.json';

const fallbackLng = ["en"];

const resources = {
    en: {
        translation: { ...en }
    },
    ar: {
        translation: { ...ar }
    },
    hi: {
        translation: { ...hi }
    }
}

i18n
    .use(Backend) // used to load data from other directory
    .use(LanguageDetector) // detects the current language
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        lng: "en",
        fallbackLng: "en",
        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });

export default i18n;