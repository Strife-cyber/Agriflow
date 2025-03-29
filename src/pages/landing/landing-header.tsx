import AppLogo from "@/components/app-logo";
import LanguageCombobox from "@/components/language-combobox";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/context/translation";

const LandingHeader = () => {
    const translation = useTranslation();

    return (
        <header className="flex items-center justify-between py-5 px-2 md:px-10">
            <div>
                <AppLogo/>
            </div>
            <nav className="hidden md:flex lg:min-w-[320px] items-center justify-between bg-green-500 text-white rounded-full p-1 px-2 space-x-6">
                <a href="" className="hover:bg-white hover:text-black rounded-full py-1 px-3">{ translation("home") }</a>
                <a href="" className="hover:bg-white hover:text-black rounded-full py-1 px-3">{ translation("about") }</a>
                <a href="" className="hover:bg-white hover:text-black rounded-full py-1 px-3">{ translation("contact") }</a>
            </nav>
            <div className="flex items-center space-x-4">
                <Button
                    className="border-green-500 text-green-500 hover:bg-green-500 hover:text-white transition-all duration-300 ease-in-out transform hover:scale-105" 
                    variant="outline"
                >{ translation("login") }</Button>
                <LanguageCombobox/>
            </div>
        </header>
    );
}

export default LandingHeader;
