import ResepSelesaiChartsApoteker from '@/components/charts/resep-selesai-charts-apoteker';
import StatusResepPiechartApoteker from '@/components/charts/status-resep-piechart-apoteker';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import {
    ClipboardList,
    Database,
    FileText,
    Stethoscope,
    User,
} from 'lucide-react';
import { route } from 'ziggy-js';

type PageProps = {
    klinik: {
        id: number;
        nama_klinik: string;
        jenis_klinik: string;
        gambar: string;
    };
    user: { id: number; name: string };
    resepMasuk: {
        id: number;
        pasien: string;
        dokter: string;
        status: string;
    }[];
    chartResepSelesai: {
        hari: string;
        total: number;
    }[];
    chartStatusResep: {
        name: string;
        value: number;
    }[];
    obatStokMenipis: {
        id: number;
        nama: string;
        stok: number;
        satuan: string;
        status: 'aman' | 'menipis' | 'habis';
    }[];
};

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Dashboard', href: '' }];

export default function ApotekerDashboard({
    klinik,
    user,
    resepMasuk,
    chartResepSelesai,
    chartStatusResep,
    obatStokMenipis,
}: PageProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard Apoteker" />

            <div className="p-3 sm:p-4 md:p-6">
                {/* Main Grid */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-6">
                    {/* Hero Klinik */}
                    <div className="md:col-span-2 lg:col-span-4">
                        <div className="relative h-48 overflow-hidden rounded-2xl shadow-lg md:h-56 lg:h-72">
                            {klinik.gambar ? (
                                <img
                                    src={klinik.gambar}
                                    alt={klinik.nama_klinik}
                                    className="absolute inset-0 h-full w-full object-cover"
                                />
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-emerald-100 to-emerald-200 text-gray-600">
                                    <p className="text-sm">
                                        Gambar klinik tidak tersedia
                                    </p>
                                </div>
                            )}

                            <div className="absolute inset-0 bg-linear-to-br from-black/80 via-black/55 to-black/30" />

                            <div className="absolute bottom-4 left-4 z-10">
                                <p className="text-xs text-white/70 md:text-sm">
                                    Selamat datang,
                                </p>
                                <p className="mt-0.5 text-lg font-bold text-white md:text-xl">
                                    {user.name}
                                </p>
                            </div>

                            <div className="absolute right-4 bottom-4 z-10 max-w-[60%] text-right md:max-w-[65%]">
                                <span className="inline-flex rounded-full bg-emerald-400/20 px-3 py-1 text-xs text-emerald-100 ring-1 ring-emerald-400/40 backdrop-blur-sm">
                                    {klinik.jenis_klinik}
                                </span>
                                <h1 className="mt-2 text-base leading-snug font-bold text-white md:text-lg lg:text-xl">
                                    {klinik.nama_klinik}
                                </h1>
                                <p className="mt-1 text-xs text-white/70 md:text-sm">
                                    Dashboard operasional apotek
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Resep Masuk */}
                    <div className="md:col-span-2 lg:col-span-2">
                        <div className="h-full min-h-[300px] rounded-xl bg-white shadow-sm ring-1 ring-gray-100 lg:min-h-0">
                            <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
                                <div className="flex items-center gap-2">
                                    <FileText className="h-4 w-4 text-emerald-600" />
                                    <h3 className="text-sm font-semibold text-gray-900">
                                        Resep Masuk
                                    </h3>
                                </div>
                                <Link
                                    href={route('apoteker.resep-masuk.index')}
                                    className="text-xs font-medium text-emerald-600 transition-colors hover:text-emerald-700 hover:underline"
                                >
                                    Lihat semua
                                </Link>
                            </div>

                            <div className="h-[calc(100%-48px)] overflow-y-auto">
                                {resepMasuk.length > 0 ? (
                                    <table className="w-full text-xs">
                                        <thead className="sticky top-0 z-10 bg-gray-50 text-gray-500">
                                            <tr>
                                                <th className="px-2 py-2 text-left font-medium md:px-3">
                                                    Pasien
                                                </th>
                                                <th className="px-2 py-2 text-left font-medium md:px-3">
                                                    Dokter
                                                </th>
                                                <th className="px-2 py-2 text-left font-medium md:px-3">
                                                    Status
                                                </th>
                                                <th className="px-2 py-2 text-center font-medium md:px-3">
                                                    Aksi
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100">
                                            {resepMasuk.map((item) => (
                                                <tr
                                                    key={item.id}
                                                    className="transition-colors hover:bg-gray-50"
                                                >
                                                    <td className="px-2 py-2 md:px-3">
                                                        <div className="flex items-center gap-2">
                                                            <User className="h-4 w-4 shrink-0 text-emerald-600" />
                                                            <span className="truncate font-medium text-gray-900">
                                                                {item.pasien}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="px-2 py-2 md:px-3">
                                                        <div className="flex items-center gap-2">
                                                            <Stethoscope className="h-4 w-4 shrink-0 text-blue-600" />
                                                            <span className="truncate text-gray-700">
                                                                {item.dokter}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="px-2 py-2 md:px-3">
                                                        <span
                                                            className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold whitespace-nowrap ${
                                                                item.status ===
                                                                'pending'
                                                                    ? 'bg-yellow-100 text-yellow-700'
                                                                    : item.status ===
                                                                        'sedang_dibuat'
                                                                      ? 'bg-blue-100 text-blue-700'
                                                                      : 'bg-gray-100 text-gray-600'
                                                            }`}
                                                        >
                                                            {item.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-2 py-2 text-center md:px-3">
                                                        <Link
                                                            href={route(
                                                                'apoteker.resep-masuk.edit',
                                                                item.id,
                                                            )}
                                                            className="inline-flex items-center gap-1 rounded-md bg-emerald-600 px-2 py-1 text-xs font-medium text-white transition-colors hover:bg-emerald-700"
                                                        >
                                                            <ClipboardList className="h-3.5 w-3.5" />
                                                            <span className="hidden sm:inline">
                                                                Proses
                                                            </span>
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <div className="flex h-full flex-col items-center justify-center gap-3 px-4 py-8 text-center">
                                        <Database className="h-12 w-12 text-emerald-600/60" />
                                        <div>
                                            <p className="text-sm font-medium text-gray-700">
                                                Belum ada resep masuk
                                            </p>
                                            <p className="mt-1 text-xs text-gray-500">
                                                Resep akan muncul otomatis
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Chart Resep Selesai */}
                    <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-gray-100 md:col-span-2 md:p-5 lg:col-span-2 lg:row-span-1">
                        <div className="mb-4 flex items-start justify-between">
                            <div>
                                <h3 className="text-sm font-semibold text-gray-900 md:text-base">
                                    Resep Selesai
                                </h3>
                                <p className="mt-0.5 text-xs text-gray-500">
                                    Ringkasan resep yang telah selesai dibuat
                                </p>
                            </div>
                        </div>

                        <div className="h-60] md:h-[260px]">
                            <ResepSelesaiChartsApoteker
                                data={chartResepSelesai}
                            />
                        </div>
                    </div>

                    {/* Pie Chart Status Resep */}
                    <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-gray-100 md:col-span-2 md:p-5 lg:col-span-2 lg:row-span-1">
                        <div className="mb-3">
                            <h3 className="text-sm font-semibold text-gray-900 md:text-base">
                                Distribusi Status Resep
                            </h3>
                            <p className="mt-0.5 text-xs text-gray-500">
                                Status resep hari ini
                            </p>
                        </div>

                        <div className="h-[200px] md:h-[220px]">
                            <StatusResepPiechartApoteker
                                data={chartStatusResep}
                            />
                        </div>
                    </div>

                    {/* Obat Stok Paling Sedikit */}
                    <div className="h-full min-h-[300px] rounded-xl bg-white shadow-sm ring-1 ring-gray-100 md:col-span-2 lg:col-span-2 lg:min-h-0">
                        <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
                            <div className="flex items-center gap-2">
                                <FileText className="h-4 w-4 text-emerald-600" />
                                <h3 className="text-sm font-semibold text-gray-900">
                                    Obat Stok Paling Sedikit
                                </h3>
                            </div>
                            <Link
                                href={route('apoteker.daftarobat.index')}
                                className="text-xs font-medium text-emerald-600 transition-colors hover:text-emerald-700 hover:underline"
                            >
                                Lihat semua
                            </Link>
                        </div>

                        <div className="h-[calc(100%-48px)] overflow-y-auto">
                            {obatStokMenipis.length > 0 ? (
                                <table className="w-full text-xs">
                                    <thead className="sticky top-0 z-10 bg-gray-50 text-gray-500">
                                        <tr>
                                            <th className="px-2 py-2 text-left font-medium md:px-3">
                                                Nama Obat
                                            </th>
                                            <th className="px-2 py-2 text-left font-medium md:px-3">
                                                Stok
                                            </th>
                                            <th className="px-2 py-2 text-left font-medium md:px-3">
                                                Status
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {obatStokMenipis.map((obat) => (
                                            <tr
                                                key={obat.id}
                                                className="transition-colors hover:bg-gray-50"
                                            >
                                                <td className="px-2 py-2 md:px-3">
                                                    <div className="flex items-center gap-2">
                                                        <FileText className="h-4 w-4 shrink-0 text-emerald-600" />
                                                        <span className="truncate font-medium text-gray-900">
                                                            {obat.nama}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-2 py-2 md:px-3">
                                                    <span className="truncate text-gray-700">
                                                        {obat.stok}{' '}
                                                        {obat.satuan}
                                                    </span>
                                                </td>
                                                <td className="px-2 py-2 md:px-3">
                                                    <span
                                                        className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold whitespace-nowrap ${
                                                            obat.status ===
                                                            'habis'
                                                                ? 'bg-red-100 text-red-700'
                                                                : obat.status ===
                                                                    'menipis'
                                                                  ? 'bg-yellow-100 text-yellow-700'
                                                                  : 'bg-green-100 text-green-700'
                                                        }`}
                                                    >
                                                        {obat.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <div className="flex h-full flex-col items-center justify-center gap-3 px-4 py-8 text-center">
                                    <Database className="h-12 w-12 text-emerald-600/60" />
                                    <div>
                                        <p className="text-sm font-medium text-gray-700">
                                            Semua stok obat aman
                                        </p>
                                        <p className="mt-1 text-xs text-gray-500">
                                            Tidak perlu pengadaan saat ini
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
