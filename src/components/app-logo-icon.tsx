import appLogo from '@/assets/applogo.svg';

export default function AppLogoIcon() {
    return (
        <div className="relative inline-block w-16 h-16 group">
            <img 
                src={appLogo} 
                className="w-full h-full object-contain"
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