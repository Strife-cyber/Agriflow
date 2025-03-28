import { useLanguage } from "./language-context";
import translationJson from "@/assets/translations.json";

type Translations = typeof translationJson;

export function useTranslation() {
    const { isEnglish } = useLanguage();
    const translations: Translations = translationJson;

    const t = (key: keyof (typeof translationJson)["en"]): string => {
        return isEnglish ? translations.en[key] : translations.fr[key]
    };

    return t;
}
