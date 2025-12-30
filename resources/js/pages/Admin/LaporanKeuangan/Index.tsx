import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Search } from 'lucide-react';
import { useState } from 'react';

type Laporan = {
    id: number;
    nomor_pasien: string;
    nama_pasien: string;
    total_bayar: number;
    status: string;
    tanggal: string;
    klinik_id: number; // ✅ tambahkan klinik_id
};

type PageProps = {
    laporan: Laporan[];
    currentKlinikId: number; // ✅ kirim dari backend sesuai user login
};

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Laporan Keuangan', href: '/admin/laporan-keuangan' },
];

export default function LaporanKeuanganIndexAdmin() {
    const { laporan, currentKlinikId } = usePage<PageProps>().props;
    const [searchQuery, setSearchQuery] = useState('');

    // ✅ filter status selesai + klinik_id sama
    const filteredLaporan = laporan
        .filter(
            (l) => l.status === 'selesai' && l.klinik_id === currentKlinikId,
        )
        .filter(
            (l) =>
                l.nama_pasien
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                l.nomor_pasien.includes(searchQuery),
        );

    const formatRupiah = (value: number) =>
        new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(value);

    const formatTanggal = (tanggal: string) => {
        try {
            return new Date(tanggal).toLocaleDateString('id-ID', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
            });
        } catch {
            return tanggal;
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Laporan Keuangan" />

            <div className="p-6">
                {/* Header */}
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">
                        Laporan Keuangan
                    </h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Rekap transaksi pembayaran pasien (status selesai)
                    </p>
                </div>

                {/* Action Bar */}
                <div className="my-4 flex flex-wrap items-center justify-between gap-3">
                    <div className="relative flex gap-3">
                        <div className="flex">
                            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Cari berdasarkan nama atau nomor pasien..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full min-w-[400px] rounded-lg border border-gray-200 bg-white py-2.5 pr-4 pl-10 text-sm text-gray-900 placeholder-gray-400 transition focus:border-emerald-400 focus:ring-emerald-400"
                            />
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-gray-200 bg-gray-50">
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        Nomor Pasien
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        Nama Pasien
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        Total Bayar
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        Tanggal
                                    </th>
                                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredLaporan.length > 0 ? (
                                    filteredLaporan.map((item) => (
                                        <tr
                                            key={item.id}
                                            className="transition hover:bg-gray-50"
                                        >
                                            <td className="px-6 py-4 font-medium text-gray-900">
                                                {item.nomor_pasien}
                                            </td>
                                            <td className="px-6 py-4 text-gray-700">
                                                {item.nama_pasien}
                                            </td>
                                            <td className="px-6 py-4 text-gray-700">
                                                {formatRupiah(item.total_bayar)}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                                                    {item.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="px-6 py-4 text-gray-700">
                                                    {formatTanggal(
                                                        item.tanggal,
                                                    )}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <Link
                                                    href={`/admin/laporan-keuangan/${item.id}`}
                                                    className="text-blue-600 hover:text-blue-700"
                                                >
                                                    Lihat Detail
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={6}
                                            className="px-6 py-10 text-center text-sm text-gray-500"
                                        >
                                            Tidak ada data laporan keuangan.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
                    <p>
                        Menampilkan {filteredLaporan.length} dari{' '}
                        {laporan.length} transaksi
                    </p>
                </div>
            </div>
        </AppLayout>
    );
}
