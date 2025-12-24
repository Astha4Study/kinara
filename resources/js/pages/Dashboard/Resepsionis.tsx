import PasienPembayaranChartsResepsionis from '@/components/charts/pasien-pembayaran-charts-resepsionis';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Pencil } from 'lucide-react';
import { useState } from 'react';
import { route } from 'ziggy-js';

type PageProps = {
    klinik: {
        id: number;
        nama_klinik: string;
        jenis_klinik: string;
        gambar: string;
    };
    user: { id: number; name: string };
    reseps: { id: number; nama_pasien: string; total_harga: number }[];
    pasienBaru: { id: number; nama_lengkap: string; tanggal: string }[];
    chart: { tanggal: string; pasien: number; pembayaran: number }[];
};

const formatRupiah = (v: number) =>
    new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(v);

export default function ResepsionisDashboard({
    klinik,
    user,
    reseps,
    pasienBaru,
}: PageProps) {
    const { chart, period: initialPeriod } = usePage().props as any;
    const [period, setPeriod] = useState<'week' | 'month'>(initialPeriod);

    const handleChangePeriod = (value: 'week' | 'month') => {
        setPeriod(value);
        router.get(
            route('dashboard'),
            { period: value },
            { preserveState: true, preserveScroll: true, replace: true },
        );
    };

    return (
        <AppLayout>
            <Head title="Dashboard Resepsionis" />

            <div className="p-6">
                {/* FLEX ROW : kiri & kanan sejajar tinggi */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    {/* KIRI : 2 card bertumpuk */}
                    <div className="col-span-2 flex flex-col gap-6">
                        {/* Hero Klinik */}
                        <div className="relative h-40 overflow-hidden rounded-2xl shadow-lg md:h-72">
                            {klinik.gambar ? (
                                <img
                                    src={klinik.gambar}
                                    alt={klinik.nama_klinik}
                                    className="absolute inset-0 h-full w-full object-cover"
                                />
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center bg-gray-200 text-gray-600">
                                    Gambar klinik tidak tersedia
                                </div>
                            )}

                            <div className="absolute inset-0 bg-linear-to-br from-black/80 via-black/55 to-black/30" />

                            <Link
                                href={`/resepsionis/klinik/${klinik.id}/edit`}
                                className="absolute top-3 right-3 inline-flex items-center gap-2 rounded-lg bg-white/15 px-3 py-1.5 text-xs font-medium text-white ring-1 ring-white/20 backdrop-blur-sm transition hover:bg-white/25 hover:ring-white/30"
                            >
                                <Pencil className="h-3.5 w-3.5 opacity-90" />
                                Edit Klinik
                            </Link>

                            <div className="absolute bottom-4 left-4 z-10">
                                <p className="text-[11px] tracking-wide text-white/60">
                                    Selamat datang,
                                </p>
                                <p className="text-base font-semibold text-white md:text-lg">
                                    {user.name}
                                </p>
                            </div>

                            <div className="absolute right-4 bottom-4 z-10 max-w-[65%] text-right">
                                <span className="inline-flex items-center rounded-full bg-emerald-400/15 px-3 py-1 text-[11px] font-medium text-emerald-200 ring-1 ring-emerald-400/30 backdrop-blur">
                                    {klinik.jenis_klinik}
                                </span>
                                <h1 className="mt-2 text-lg leading-snug font-semibold text-white md:text-xl">
                                    {klinik.nama_klinik}
                                </h1>
                                <p className="mt-0.5 text-[11px] text-white/60">
                                    Dashboard operasional klinik
                                </p>
                            </div>
                        </div>

                        {/* Chart */}
                        <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-gray-100">
                            <div className="mb-4 flex items-start justify-between">
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-900">
                                        Statistik Pasien & Pembayaran
                                    </h3>
                                    <p className="text-xs text-gray-500">
                                        Ringkasan aktivitas klinik
                                    </p>
                                </div>

                                <div className="flex rounded-lg border border-gray-200 bg-gray-50 p-0.5 text-xs">
                                    <button
                                        onClick={() =>
                                            handleChangePeriod('week')
                                        }
                                        className={`rounded-md px-3 py-1.5 transition ${
                                            period === 'week'
                                                ? 'bg-emerald-600 text-white shadow-sm'
                                                : 'text-gray-500 hover:text-gray-700'
                                        }`}
                                    >
                                        Mingguan
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleChangePeriod('month')
                                        }
                                        className={`rounded-md px-3 py-1.5 transition ${
                                            period === 'month'
                                                ? 'bg-emerald-600 text-white shadow-sm'
                                                : 'text-gray-500 hover:text-gray-700'
                                        }`}
                                    >
                                        Bulanan
                                    </button>
                                </div>
                            </div>

                            <div className="h-[260px]">
                                <PasienPembayaranChartsResepsionis
                                    data={chart}
                                />
                            </div>
                        </div>
                    </div>

                    {/* KANAN : 2 card sejajar tinggi kiri */}
                    <aside className="flex flex-col gap-6">
                        {/* Pembayaran Menunggu */}
                        <div className="flex-1 rounded-xl bg-white shadow-sm ring-1 ring-gray-100">
                            <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
                                <h3 className="text-sm font-semibold text-gray-900">
                                    Pembayaran Menunggu
                                </h3>
                                <Link
                                    href={route('resepsionis.pembayaran.index')}
                                    className="text-xs font-medium text-emerald-600 hover:underline"
                                >
                                    Lihat semua
                                </Link>
                            </div>

                            <div className="h-[calc(100%-48px)] overflow-y-auto p-3">
                                {reseps.length > 0 ? (
                                    <table className="w-full text-xs">
                                        <thead className="sticky top-0 bg-gray-50 text-gray-500">
                                            <tr>
                                                <th className="px-3 py-2 text-center">
                                                    No
                                                </th>
                                                <th className="px-3 py-2 text-left">
                                                    Pasien
                                                </th>
                                                <th className="px-3 py-2 text-right">
                                                    Total
                                                </th>
                                                <th className="px-3 py-2 text-center">
                                                    Aksi
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100">
                                            {reseps.map((item, i) => (
                                                <tr
                                                    key={item.id}
                                                    className="hover:bg-gray-50"
                                                >
                                                    <td className="px-3 py-2 text-center font-medium">
                                                        {i + 1}
                                                    </td>
                                                    <td className="px-3 py-2 text-left">
                                                        {item.nama_pasien}
                                                    </td>
                                                    <td className="px-3 py-2 text-right">
                                                        {formatRupiah(
                                                            item.total_harga,
                                                        )}
                                                    </td>
                                                    <td className="px-3 py-2 text-center">
                                                        <Link
                                                            href={route(
                                                                'resepsionis.pembayaran.proses-bayar',
                                                                item.id,
                                                            )}
                                                            className="rounded-md bg-emerald-600 px-2 py-1 text-[11px] text-white hover:bg-emerald-700"
                                                        >
                                                            Bayar
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <div className="flex h-full flex-col items-center justify-center gap-2 px-4 py-6 text-center text-xs text-gray-500">
                                        {/* Icon ilustrasi kosong */}
                                        <svg
                                            className="h-10 w-10 text-emerald-600"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={1.5}
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M21 12a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3"
                                            />
                                        </svg>

                                        <p className="font-medium">
                                            Belum ada pembayaran menunggu
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Pasien Baru Bulan Ini */}
                        <div className="flex-1 rounded-xl bg-white shadow-sm ring-1 ring-gray-100">
                            <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
                                <h3 className="text-sm font-semibold text-gray-900">
                                    Pasien Baru Bulan Ini
                                </h3>
                                <Link
                                    href={route('resepsionis.pasien.index')}
                                    className="text-xs font-medium text-emerald-600 hover:underline"
                                >
                                    Lihat semua
                                </Link>
                            </div>

                            <div className="h-[calc(100%-48px)] overflow-y-auto p-3">
                                {pasienBaru.length > 0 ? (
                                    <table className="w-full text-xs">
                                        <thead className="sticky top-0 bg-gray-50 text-gray-500">
                                            <tr>
                                                <th className="px-3 py-2 text-center">
                                                    No
                                                </th>
                                                <th className="px-3 py-2 text-left">
                                                    Pasien
                                                </th>
                                                <th className="px-3 py-2 text-right">
                                                    Tanggal
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100">
                                            {pasienBaru.map((p, i) => (
                                                <tr
                                                    key={p.id}
                                                    className="hover:bg-gray-50"
                                                >
                                                    <td className="px-3 py-2 text-center">
                                                        {i + 1}
                                                    </td>
                                                    <td className="px-3 py-2 text-left">
                                                        {p.nama_lengkap}
                                                    </td>
                                                    <td className="px-3 py-2 text-right text-gray-600">
                                                        {new Date(
                                                            p.tanggal,
                                                        ).toLocaleDateString(
                                                            'id-ID',
                                                            {
                                                                day: '2-digit',
                                                                month: 'short',
                                                                year: 'numeric',
                                                            },
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <div className="flex h-full items-center justify-center text-xs text-gray-500">
                                        Belum ada pasien baru bulan ini
                                    </div>
                                )}
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </AppLayout>
    );
}
