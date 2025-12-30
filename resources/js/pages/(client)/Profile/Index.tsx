import SidebarProfile from '@/components/sidebar-profile';
import KlinikLayout from '@/layouts/klinik-layout';
import { usePage } from '@inertiajs/react';
import { MapPin, Pencil } from 'lucide-react';

type UserType = {
    id: number;
    name: string;
    email: string;
    role?: string;
    avatar?: string | null;
    city?: string | null;
};

type PageProps = {
    user: UserType;
};

export default function ProfileIndexPage() {
    const { user } = usePage<PageProps>().props;

    return (
        <KlinikLayout>
            <div className="flex justify-center px-6 py-10">
                {/* Kontainer utama */}
                <div className="w-full max-w-7xl">
                    <h1 className="mb-6 text-start text-2xl font-semibold text-gray-900">
                        Account Settings
                    </h1>

                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[260px_1fr]">
                        {/* SIDEBAR */}
                        <SidebarProfile />

                        {/* MAIN CONTENT */}
                        <main className="space-y-6">
                            {/* PROFILE CARD */}
                            <div className="rounded-xl border bg-white p-6 shadow-sm">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <img
                                            src={
                                                user.avatar ??
                                                `https://ui-avatars.com/api/?name=${user.name}`
                                            }
                                            alt={user.name}
                                            className="h-16 w-16 rounded-full object-cover"
                                        />

                                        <div>
                                            <h2 className="text-lg font-semibold text-gray-900">
                                                {user.name}
                                            </h2>
                                            <p className="text-sm text-gray-500">
                                                {user.role ?? 'User'}
                                            </p>
                                            {user.city && (
                                                <p className="mt-1 flex items-center gap-1 text-xs text-gray-500">
                                                    <MapPin className="h-3.5 w-3.5" />
                                                    {user.city}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <button className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                                        <Pencil className="h-4 w-4" />
                                        Edit
                                    </button>
                                </div>
                            </div>

                            {/* PERSONAL INFO */}
                            <div className="rounded-xl border bg-white p-6 shadow-sm">
                                <div className="mb-4 flex items-center justify-between">
                                    <h3 className="text-base font-semibold text-gray-900">
                                        Personal Information
                                    </h3>
                                    <button className="inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50">
                                        <Pencil className="h-4 w-4" />
                                        Edit
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <InfoItem
                                        label="Full Name"
                                        value={user.name}
                                    />
                                    <InfoItem
                                        label="Email Address"
                                        value={user.email}
                                    />
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        </KlinikLayout>
    );
}

const InfoItem = ({ label, value }: { label: string; value: string }) => (
    <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p className="mt-1 text-sm font-medium text-gray-900">{value}</p>
    </div>
);
