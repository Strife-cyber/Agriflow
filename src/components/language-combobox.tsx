import { useState } from "react";
import cn from "@/utils/class-merge";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/language-context";
import { Globe, ChevronsUpDown, Check } from "lucide-react";
import {
  Command,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command"; // Changed import path
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

const languages = [
  {
    value: "en",
    label: "English",
  },
  {
    value: "fr",
    label: "Francais",
  },
];

const LanguageCombobox = () => {
  const [open, setOpen] = useState(false);
  const { isEnglish, toggleLanguage } = useLanguage();
  const [language, setLanguage] = useState(isEnglish ? "en" : "fr");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[130px] justify-between border-emerald-200 hover:border-emerald-300 hover:bg-emerald-50"
        >
          <Globe className="mr-2 h-4 w-4 text-emerald-600" />
          {languages.find((lang) => lang.value === language)?.label || "Select language"}
          <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[130px] p-0">
        <Command>
          <CommandList>
            <CommandEmpty>No language found.</CommandEmpty>
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
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      language === lang.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {lang.label}
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
