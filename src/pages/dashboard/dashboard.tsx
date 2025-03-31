import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/index';
import { WeatherCard } from '@/components/weather-card';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { SensorBoard } from '@/components/sensor-board';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="mb-6">
                    <h2 className='text-2xl font-bold text-black mb-4'>
                        Weather Info
                    </h2>
                    <WeatherCard/>
                </div>
                <div>
                    <h2 className='text-2xl font-bold text-black mb-4'>
                        Field Sensors
                    </h2>
                    <SensorBoard/>
                </div>
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                </div>
            </div>
        </AppLayout>
    );
}
