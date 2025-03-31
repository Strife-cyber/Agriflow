import { NavItem } from '..';
import AppLogo from './app-logo';
import { NavUser } from './nav-user';
import { NavMain } from './nav-main';
import { Link } from 'react-router-dom';
import { NavFooter } from './nav-footer';
import { useTranslation } from '@/context/translation';
import { Bell, Gauge, History, LayoutGrid } from 'lucide-react';
import { 
    Sidebar, SidebarContent, 
    SidebarFooter, SidebarHeader, 
    SidebarMenu, SidebarMenuButton, SidebarMenuItem 
} from '@/components/ui/sidebar';

export function AppSidebar() {
    const translate = useTranslation();

    const mainNavItems: NavItem[] = [
        {
            title: translate("dashboard"),
            href: '/dashboard',
            icon: LayoutGrid,
        },
        {
            title: translate("limit"),
            href: '/limit',
            icon: Gauge
        },
        {
            title: translate("history"),
            href: '/history',
            icon: History
        },
        {
            title: translate("notifications"),
            href: '/notifications',
            icon: Bell
        }
    ];
    
    const footerNavItems: NavItem[] = [
    ];

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link to="/dashboard">
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
