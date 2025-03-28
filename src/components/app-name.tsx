import AppLogoIcon from "./app-logo-icon";

export default function AppName() {
    return (
        <div className="flex items-center gap-1">
            <h6 className="text-lg font-semibold">Agri Fl</h6>
            <AppLogoIcon width={6} height={6} />
            <h6 className="text-lg font-semibold">w</h6>
        </div>
    );
}
