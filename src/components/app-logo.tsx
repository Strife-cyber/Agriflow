import AppLogoIcon from "./app-logo-icon";

export default function AppLogo() {
    return (
        <div className="flex items-center gap-2">
            <div className="text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-md">
                <AppLogoIcon/>
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="leading-none font-semibold">Agri Flow</span>
            </div>
        </div>
    );
}
