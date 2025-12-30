import ActionDropdown from '@/components/action-dropdown';
import AppLayout from '@/layouts/app-layout';

import { BreadcrumbItem } from '@/types';
import { Inertia } from '@inertiajs/inertia';
import { Head, usePage } from '@inertiajs/react';
import { Search } from 'lucide-react';
import { useState } from 'react';

type Klinik = {
    id: number;
    nama_klinik: string;
    jenis_klinik:
        | 'Umum'
        | 'Gigi'
        | 'THT'
        | 'Kulit'
        | 'Kandungan'
        | 'Anak'
        | 'Bedah'
        | 'Mata'
        | 'Saraf';
    alamat: string;
    kota: string;
    provinsi: string;
    no_telepon: string;
    email: string | null;
    deskripsi: string;
    latitude: string;
    longitude: string;
    gambar: string | null;
    kapasitas_total: number;
    kapasitas_tersedia: number;
    rating: number;
};

type PageProps = {
    klinik: Klinik[];
};

const listTable = [
    'Nama klinik',
    'Jenis Klinik',
    'Alamat',
    'Kota',
    'Provinsi',
    'Total Kamar',
    'Kamar Tersedia',
    'Rating',
    'Gambar',
];

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Daftar Klinik', href: '/klinik' },
];

export default function KlinikIndexSuperAdmin() {
    const { klinik } = usePage<PageProps>().props;
    const [searchQuery, setSearchQuery] = useState('');

    const deleteKlinik = (id: number) => {
        if (confirm('Yakin ingin menghapus klinik ini?')) {
            Inertia.delete(`/klinik/${id}`);
        }
    };

    const filteredKlinik = klinik.filter(
        (item) =>
            item.nama_klinik
                .toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
            item.jenis_klinik
                .toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
            item.kota.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.provinsi.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Daftar Klinik" />
            <div className="p-6">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">
                        Daftar Klinik
                    </h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Klinik Yang Ada Di Medara
                    </p>
                </div>
                <div className="my-4 flex items-center justify-between gap-3">
                    <div className="relative flex gap-3">
                        <div className="flex">
                            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Cari fasilitas berdasarkan nama, jenis, kota, provinsi..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full min-w-[400px] rounded-lg border border-gray-200 bg-white py-2.5 pr-4 pl-10 text-sm text-gray-900 placeholder-gray-400 transition focus:border-emerald-400 focus:ring-emerald-400"
                            />
                        </div>
                    </div>
                    {/* <Link
                        href="/fasilitas/create"
                        className="flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-700"
                    >
                        <Plus className="h-4 w-4" />
                        Tambah Fasilitas
                    </Link> */}
                </div>

                {/* Table */}
                <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-200 bg-gray-50">
                                    {listTable.map((item) => (
                                        <th
                                            key={item}
                                            className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                                        >
                                            {item}
                                        </th>
                                    ))}
                                    <th className="px-6 py-3 text-center text-xs font-medium tracking-wider text-gray-500 uppercase">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {filteredKlinik.map((item) => (
                                    <tr
                                        key={item.id}
                                        className="transition hover:bg-gray-50"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="text-sm font-medium text-gray-900">
                                                {item.nama_klinik}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-center text-sm text-gray-600">
                                                {item.jenis_klinik}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-600">
                                                {item.alamat}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-600">
                                                {item.kota}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-600">
                                                {item.provinsi}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-center text-sm text-gray-600">
                                                {item.kapasitas_total}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-center text-sm text-gray-600">
                                                {item.kapasitas_tersedia}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-center text-sm text-gray-600">
                                                {item.rating}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {item.gambar ? (
                                                <img
                                                    src={`/storage/${item.gambar}`}
                                                    alt={item.nama_klinik}
                                                    className="h-16 w-16 rounded object-cover"
                                                />
                                            ) : (
                                                <span className="text-gray-400 italic">
                                                    -
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <ActionDropdown
                                                klinik={item}
                                                deleteKlinik={deleteKlinik}
                                            />
                                        </td>
                                    </tr>
                                ))}
                                {filteredKlinik.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan={11}
                                            className="px-4 py-6 text-center text-gray-500 italic"
                                        >
                                            Belum ada data fasilitas
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                    <div className="text-sm text-gray-600">
                        Showing 1 - {filteredKlinik.length} from {klinik.length}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
