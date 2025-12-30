import SidebarProfile from '@/components/sidebar-profile';
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import KlinikLayout from '@/layouts/klinik-layout';
import { usePage } from '@inertiajs/react';
import { Calendar, CheckCircle2, Clock, XCircle } from 'lucide-react';

type RiwayatItem = {
    id: number;
    tanggal: string;
    status: string;
    klinik: string | null;
    nomor_pendaftaran?: string;
};

type PageProps = {
    riwayat: RiwayatItem[];
};

export default function RiwayatIndexPage() {
    const { riwayat } = usePage<PageProps>().props;

    return (
        <KlinikLayout>
            <div className="flex justify-center px-6 py-10">
                <div className="w-full max-w-7xl">
                    <h1 className="mb-6 text-2xl font-semibold text-gray-900">
                        Riwayat Pendaftaran
                    </h1>

                    <div className="grid grid-cols-1 gap-3 lg:grid-cols-[260px_1fr]">
                        {/* SIDEBAR */}
                        <SidebarProfile />

                        {/* MAIN CONTENT */}
                        <main className="space-y-6">
                            <div className="rounded-xl border bg-white p-6 shadow-sm">
                                {riwayat.length === 0 ? (
                                    <div className="text-center text-sm text-gray-500">
                                        Belum ada riwayat pendaftaran.
                                    </div>
                                ) : (
                                    <ul className="divide-y">
                                        {riwayat.map((item) => (
                                            <li
                                                key={item.id}
                                                className="flex items-start justify-between gap-4 py-4"
                                            >
                                                {/* Info kiri */}
                                                <div className="space-y-1">
                                                    <p className="text-sm font-semibold text-gray-900">
                                                        {item.klinik ??
                                                            'Nama klinik tidak tersedia'}
                                                    </p>
                                                    <p className="flex items-center gap-1 text-xs text-gray-500">
                                                        <Calendar className="h-3.5 w-3.5" />
                                                        {item.tanggal}
                                                    </p>
                                                </div>

                                                {/* Status kanan + tombol */}
                                                <div className="flex items-center gap-3">
                                                    <StatusBadge
                                                        status={item.status}
                                                    />

                                                    {/* Tombol untuk lihat nomor pendaftaran */}
                                                    <AlertDialog>
                                                        <AlertDialogTrigger
                                                            asChild
                                                        >
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                            >
                                                                Lihat Nomor
                                                            </Button>
                                                        </AlertDialogTrigger>
                                                        <AlertDialogContent>
                                                            <AlertDialogHeader>
                                                                <AlertDialogTitle>
                                                                    Nomor
                                                                    Pendaftaran
                                                                </AlertDialogTitle>
                                                                <AlertDialogDescription>
                                                                    {item.nomor_pendaftaran ??
                                                                        'Nomor tidak tersedia'}
                                                                </AlertDialogDescription>
                                                            </AlertDialogHeader>
                                                            <AlertDialogFooter>
                                                                <AlertDialogCancel>
                                                                    Tutup
                                                                </AlertDialogCancel>
                                                            </AlertDialogFooter>
                                                        </AlertDialogContent>
                                                    </AlertDialog>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        </KlinikLayout>
    );
}

/* =====================
   STATUS BADGE
===================== */
const StatusBadge = ({ status }: { status: string }) => {
    switch (status) {
        case 'menunggu':
            return (
                <span className="inline-flex items-center gap-1 rounded-full bg-yellow-50 px-3 py-1 text-xs font-medium text-yellow-700">
                    <Clock className="h-3.5 w-3.5" />
                    Menunggu
                </span>
            );
        case 'dikonfirmasi':
            return (
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Dikonfirmasi
                </span>
            );
        case 'dibatalkan':
            return (
                <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-3 py-1 text-xs font-medium text-red-700">
                    <XCircle className="h-3.5 w-3.5" />
                    Dibatalkan
                </span>
            );
        default:
            return (
                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600">
                    {status}
                </span>
            );
    }
};
