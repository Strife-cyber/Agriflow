import { useState } from "react";
import cn from "@/utils/class-merge";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/language-context";
import { Globe, ChevronsUpDown, Check } from "lucide-react";
import { useAnimation, aos } from "@/context/aos";
import {
  Command,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

const languages = [
  { value: "en", label: "English" },
  { value: "fr", label: "Français" },
];

const LanguageCombobox = () => {
  const [open, setOpen] = useState(false);
  const { isEnglish, toggleLanguage } = useLanguage();
  const [language, setLanguage] = useState(isEnglish ? "en" : "fr");
  useAnimation();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div 
          className="relative"
          data-aos={aos.fadeLeft}
          data-aos-delay="400"
        >
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="md:w-[140px] justify-between border border-emerald-400/20 hover:border-emerald-400/40 bg-gray-900/50 backdrop-blur-sm rounded-xl px-4 py-5 transition-all duration-300 hover:scale-105"
          >
            <Globe className="mr-2 h-5 w-5 text-emerald-400" />
            <div className="hidden md:block text-gray-300 font-medium">
              {languages.find((lang) => lang.value === language)?.label}
            </div>
            <ChevronsUpDown className="ml-2 h-4 w-4 text-emerald-400/80" />
          </Button>
        </div>
      </PopoverTrigger>
      
      <PopoverContent 
        className="w-[140px] p-1.5 border border-emerald-400/20 bg-gray-900/80 backdrop-blur-lg rounded-xl shadow-xl"
        align="end"
        data-aos={aos.zoomIn}
      >
        <Command>
          <CommandList>
            <CommandEmpty className="text-gray-400 px-2 py-3 text-sm">
              No language found.
            </CommandEmpty>
            <CommandGroup>
              {languages.map((lang) => (
                <CommandItem
                  key={lang.value}
                  value={lang.value}
                  onSelect={(currentValue) => {
                    setLanguage(currentValue);
                    setOpen(false);
                    toggleLanguage(currentValue === "en");
                  }}
                  className="group rounded-lg px-3 py-2.5 text-gray-300 hover:bg-gray-800/50 transition-colors duration-200 cursor-pointer"
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4 text-emerald-400",
                      language === lang.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <span className="font-medium group-hover:text-emerald-400 transition-colors">
                    {lang.label}
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default LanguageCombobox;
