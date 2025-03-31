import { useLanguage } from "./language-context";
import translationJson from "@/assets/translations.json";

type Translations = typeof translationJson;

export function useTranslation() {
    const { isEnglish } = useLanguage();
    const translations: Translations = translationJson;

    const t = (key: keyof (typeof translationJson)["en"], values?: Record<string, any>): string => {
        let text = isEnglish ? translations.en[key] : translations.fr[key]

        if (values) {
            Object.keys(values).forEach((placeholder) => {
                const regex = new RegExp(`{{${placeholder}}}`, "g");
                text = text.replace(regex, values[placeholder])
            })
        }

        return text;
    };

    return t;
}
