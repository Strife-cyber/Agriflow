import { BreadcrumbItem } from "@/index";
import AppLayout from "@/layouts/app-layout";
import UserManagement from "../auth/user-management";

export default function Admin() {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: "Admin",
            href: '/admin'
        }
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <UserManagement/>
        </AppLayout>
    );
}