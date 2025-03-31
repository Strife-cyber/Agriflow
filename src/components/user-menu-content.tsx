import { UserInfo } from './user-info';
import { LogOut, Settings } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from '@/context/translation';
import { AuthState, useAuth } from '@/context/auth-context';
import { useMobileNavigation } from '@/utils/use-mobile-navigation';
import { DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';

interface UserMenuContentProps {
    user: AuthState;
}

export function UserMenuContent({ user }: UserMenuContentProps) {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const translation = useTranslation();
    const cleanup = useMobileNavigation();

    return (
        <>
            <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <UserInfo user={user} showEmail={true} />
                </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
                <DropdownMenuItem asChild>
                    <Link className="block w-full" to="/profile/edit" onClick={cleanup}>
                        <Settings className="mr-2" />
                        { translation("settings") }
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
                <Link className="block w-full" to="/" onClick={() => { logout(); navigate("/"); }}>
                    <LogOut className="mr-2" />
                    { translation("logout") }
                </Link>
            </DropdownMenuItem>
        </>
    );
}
