import { Link } from '@inertiajs/react';
import { History, LogOut, User } from 'lucide-react';

const SidebarItem = ({
    icon: Icon,
    label,
    href,
    active,
    danger,
}: {
    icon: any;
    label: string;
    href: string;
    active?: boolean;
    danger?: boolean;
}) => (
    <Link
        href={href}
        className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${
            active
                ? 'bg-emerald-50 font-medium text-emerald-700'
                : danger
                  ? 'text-red-600 hover:bg-red-50'
                  : 'text-gray-600 hover:bg-gray-100'
        }`}
    >
        <Icon className="h-4 w-4" />
        {label}
    </Link>
);

const SidebarProfile = () => {
    return (
        <aside className="h-fit space-y-2 rounded-xl border bg-white p-4">
            <SidebarItem
                icon={User}
                label="Profil Saya"
                href="/profile"
                active
            />
            <SidebarItem icon={History} label="Riwayat" href="/riwayat" />
            <SidebarItem icon={LogOut} label="Keluar" href="/logout" danger />
        </aside>
    );
};

export default SidebarProfile;
