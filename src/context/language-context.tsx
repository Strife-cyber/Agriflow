import Cookies from "js-cookie";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface LanguageContextType {
    isEnglish: boolean;
    toggleLanguage: (english: boolean) => void;
}

interface LanguageProviderProps {
    children: ReactNode
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({children}: LanguageProviderProps) {
    const [isEnglish, setIsEnglish] = useState<boolean>(() => {
        const savedLang = Cookies.get('language');
        return savedLang !== undefined ? savedLang === 'true' : true;
    });

    useEffect(() => {
        Cookies.set('language', isEnglish.toString(), { expires: 365 });
    }, [isEnglish]);

    const toggleLanguage = (english: boolean) => {
        setIsEnglish(english);
    }

    const value: LanguageContextType = {
        isEnglish,
        toggleLanguage
    }

    return (
        <LanguageContext.Provider value={value}>
            { children }
        </LanguageContext.Provider>
    );
}

export const useLanguage = (): LanguageContextType => {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        console.error('useLanguage must be used within a LanguageProvider');
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
