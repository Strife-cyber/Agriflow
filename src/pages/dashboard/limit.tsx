import { BreadcrumbItem } from "@/index";
import AppLayout from "@/layouts/app-layout";
import { useTranslation } from "@/context/translation";
import { useLanguage } from "@/context/language-context";
import { ThresholdSettings } from "@/components/threshold-settings";
import { ActuatorControlPanel } from "@/components/actuator-panel";

export default function Limits() {
    const { isEnglish } = useLanguage();
    const translation = useTranslation();

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: translation("limit"),
            href: '/limit'
        }
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <div className="container mx-auto p-4 lg:p-6">
                        <h1 className="text-2xl font-bold text-gray-800 mb-6">
                            { isEnglish ? "Sensor Settings" : "Parametrage Des Capteurs" }
                        </h1>
                        <ThresholdSettings />
                    </div>
                </div>
                <div className="container mx-auto p-4 lg:p-6">
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold text-gray-800">System Controls</h1>
                        <p className="text-gray-600 mt-2">Manage your agricultural system's actuators</p>
                    </div>

                    <ActuatorControlPanel />
                </div>
            </div>
        </AppLayout>
    )
}