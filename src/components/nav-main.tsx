import { type NavItem } from '..';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/language-context';
import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { Separator } from './ui/separator';

export function NavMain({ items = [] }: { items: NavItem[] }) {
    const { isEnglish } = useLanguage();

    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarGroupLabel>{ isEnglish ? "Platform" : "Platforme" }</SidebarGroupLabel>
            <Separator orientation='horizontal'/>
            <SidebarMenu className='mt-2 space-y-2'>
                {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild isActive={item.href === window.location.pathname}>
                            <Link to={item.href}>
                                {item.icon && <item.icon />}
                                <span>{item.title}</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
}
