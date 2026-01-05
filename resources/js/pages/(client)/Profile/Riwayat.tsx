import SidebarProfile from '@/components/sidebar-profile';
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
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
                        <main className="rounded-2xl border bg-white p-6">
                            {riwayat.length === 0 ? (
                                <div className="py-12 text-center">
                                    <p className="text-sm font-medium text-gray-500">
                                        Belum ada riwayat pendaftaran
                                    </p>
                                    <p className="mt-1 text-xs text-gray-400">
                                        Riwayat pendaftaran kamu akan muncul di
                                        sini
                                    </p>
                                </div>
                            ) : (
                                <ul className="space-y-3">
                                    {riwayat.map((item) => (
                                        <li
                                            key={item.id}
                                            className="flex items-start justify-between gap-4 rounded-xl border bg-white p-4 transition hover:bg-gray-50"
                                        >
                                            {/* Info kiri */}
                                            <div className="space-y-1">
                                                <p className="text-sm font-semibold text-gray-900">
                                                    {item.klinik ??
                                                        'Nama klinik tidak tersedia'}
                                                </p>
                                                <div className="flex items-center gap-1 text-xs text-gray-500">
                                                    <Calendar className="h-3.5 w-3.5" />
                                                    <span>{item.tanggal}</span>
                                                </div>
                                            </div>

                                            {/* Status + Action */}
                                            <div className="flex items-center gap-3">
                                                <StatusBadge
                                                    status={item.status}
                                                />

                                                <AlertDialog>
                                                    <AlertDialogTrigger asChild>
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            className="rounded-full px-4"
                                                        >
                                                            Lihat Nomor
                                                        </Button>
                                                    </AlertDialogTrigger>

                                                    <AlertDialogContent className="max-w-sm rounded-2xl p-6">
                                                        <AlertDialogHeader className="items-center space-y-4">
                                                            <AlertDialogTitle className="text-sm font-medium text-gray-500">
                                                                Nomor
                                                                Pendaftaran
                                                            </AlertDialogTitle>

                                                            {/* Nomor sebagai hero */}
                                                            <div className="rounded-xl bg-gray-50 px-6 py-4">
                                                                <p className="text-3xl font-bold tracking-wider text-gray-900">
                                                                    {item.nomor_pendaftaran ??
                                                                        '—'}
                                                                </p>
                                                            </div>

                                                            <p className="text-xs text-gray-400">
                                                                Harap simpan
                                                                nomor ini untuk
                                                                keperluan
                                                                administrasi
                                                            </p>
                                                        </AlertDialogHeader>

                                                        <AlertDialogFooter className="mt-6">
                                                            <AlertDialogCancel className="w-full rounded-xl">
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
        case 'pending':
            return (
                <span className="inline-flex items-center gap-1 rounded-full bg-yellow-50 px-3 py-1 text-xs font-medium text-yellow-700">
                    <Clock className="h-3.5 w-3.5" />
                    Menunggu
                </span>
            );
        case 'terverifikasi':
            return (
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Dikonfirmasi
                </span>
            );
        case 'ditolak':
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
