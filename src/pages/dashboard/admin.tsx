import { BreadcrumbItem } from "@/index";
import AppLayout from "@/layouts/app-layout";
import UserManagement from "../auth/user-management";
import { SimplifiedUserView } from "@/components/user-view";

export default function Admin() {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: "Admin",
            href: '/admin'
        }
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div>
                    <UserManagement/>
                </div>
                <div className="container mx-auto p-4 lg:p-6">
                    <SimplifiedUserView/>
                </div>
            </div>
        </AppLayout>
    );
}