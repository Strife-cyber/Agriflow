import appLogo from "@/assets/applogo.svg";
import cn from "@/utils/class-merge";

interface AppLogoIconProps {
    width?: number;
    height?: number;
}

export default function AppLogoIcon({ width = 16, height = 16 }: AppLogoIconProps) {
    return (
        <div className="relative inline-block group" style={{ width: `${width * 4}px`, height: `${height * 4}px` }}>
            <img 
                src={appLogo} 
                alt="App Logo"
                className={cn("object-contain")}
                style={{ width: `${width * 4}px`, height: `${height * 4}px` }}
            />
            <div className="absolute inset-0 -z-10 
                bg-green-400/0 
                rounded-full 
                blur-xl 
                transition-all 
                duration-300 
                group-hover:bg-green-400/20 
                group-hover:scale-110"
            />
        </div>
    );
}
