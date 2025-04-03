import { NavItem } from '..';
import AppLogo from './app-logo';
import { NavUser } from './nav-user';
import { NavMain } from './nav-main';
import { Link } from 'react-router-dom';
import { NavFooter } from './nav-footer';
import { useAuth } from '@/context/auth-context';
import { useTranslation } from '@/context/translation';
import {BarChart3, History, LayoutGrid, LeafIcon, UserCog2Icon } from 'lucide-react';
import { 
    Sidebar, SidebarContent, 
    SidebarFooter, SidebarHeader, 
    SidebarMenu, SidebarMenuButton, SidebarMenuItem 
} from '@/components/ui/sidebar';

export function AppSidebar() {
    const { authState } = useAuth();
    const translate = useTranslation();

    const mainNavItems: NavItem[] = [
        {
            title: translate("dashboard"),
            href: '/dashboard',
            icon: LayoutGrid,
        },
        /*{
            title: translate("limit"),
            href: '/limit',
            icon: Gauge
        },*/
        {
            title: translate("agriInnovation"),
            href: '/agriculture',
            icon: LeafIcon
        },
        {
            title: translate("dataAnalytics"),
            href: '/analytics',
            icon: BarChart3
        },
        {
            title: translate("history"),
            href: '/history',
            icon: History
        },  
        ...(authState.admin ? [{
            title: 'Admin',
            href: '/admin',
            icon: UserCog2Icon
        }] : [])
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
