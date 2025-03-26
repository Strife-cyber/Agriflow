import { useLanguage } from "./language-context";

interface Translation {}

interface Translations {
    en: Translation;
    fr: Translation;
}

export const translations: Translations = {
    en: {},
    fr: {}
}

export function useTranslation() {
    const { isEnglish } = useLanguage();

    const t = (key: keyof Translation): string => {
        return isEnglish ? translations.en[key] : translations.fr[key];
    };

    return t;
}
