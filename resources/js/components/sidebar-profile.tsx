import { Link, router, usePage } from '@inertiajs/react';
import { History, LogOut, User } from 'lucide-react';

const SidebarItem = ({
    icon: Icon,
    label,
    href,
    active,
    danger,
    onClick,
}: {
    icon: any;
    label: string;
    href?: string;
    active?: boolean;
    danger?: boolean;
    onClick?: () => void;
}) => {
    const baseClass =
        'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition';
    const activeClass = active
        ? 'bg-emerald-50 font-medium text-emerald-700'
        : danger
          ? 'text-red-600 hover:bg-red-50'
          : 'text-gray-600 hover:bg-gray-100';

    if (onClick) {
        return (
            <button
                onClick={onClick}
                className={`${baseClass} ${activeClass} w-full text-left`}
            >
                <Icon className="h-4 w-4" />
                {label}
            </button>
        );
    }

    return (
        <Link href={href!} className={`${baseClass} ${activeClass}`}>
            <Icon className="h-4 w-4" />
            {label}
        </Link>
    );
};

const SidebarProfile = () => {
    const { url } = usePage(); // ambil url aktif

    const handleLogout = () => {
        router.post('/logout');
    };

    return (
        <aside className="h-fit space-y-2 rounded-xl border bg-white p-4">
            <SidebarItem
                icon={User}
                label="Profil Saya"
                href="/profile"
                active={url.startsWith('/profile')}
            />
            <SidebarItem
                icon={History}
                label="Riwayat"
                href="/riwayat"
                active={url.startsWith('/riwayat')}
            />
            <SidebarItem
                icon={LogOut}
                label="Keluar"
                danger
                onClick={handleLogout}
            />
        </aside>
    );
};

export default SidebarProfile;
