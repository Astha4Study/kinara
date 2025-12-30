import DropdownPasienOnline from '@/components/dropdown-menu-pasien-online';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { Filter, Search } from 'lucide-react';
import { useState } from 'react';

type PasienOnline = {
    id: number;
    nomor_pendaftaran: string;
    nama_lengkap: string;
    nik: string;
    jenis_kelamin: 'L' | 'P';
    tanggal_lahir?: string | null; // tetap ada untuk hitung umur
    periode_daftar?: string | null; // tampil di tabel
    alamat: string;
    no_hp?: string | null;
    status: 'pending' | 'terverifikasi' | 'ditolak';
};

// kalau paginate, ada property data
type Paginated<T> = {
    data: T[];
    links?: any;
    meta?: any;
};

type PageProps = {
    pasienOnline: PasienOnline[] | Paginated<PasienOnline>;
};

const listTable = [
    'Nomor Pasien',
    'Nama Pasien',
    'NIK',
    'Gender',
    'Periode Daftar',
    'Umur',
    'Status', // 🔑 ganti dari Alamat ke Status
];

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Pasien Online', href: '/resepsionis/pasien-online' },
];

// fungsi hitung umur dari tanggal lahir
function calculateAge(dateString?: string | null): string {
    if (!dateString) return '-';
    const birthDate = new Date(dateString);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return `${age} tahun`;
}

// komponen badge status
function StatusBadge({ status }: { status: PasienOnline['status'] }) {
    switch (status) {
        case 'pending':
            return (
                <span className="inline-flex items-center gap-1 rounded-full bg-yellow-50 px-3 py-1 text-xs font-medium text-yellow-700">
                    Menunggu
                </span>
            );
        case 'terverifikasi':
            return (
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                    Terverifikasi
                </span>
            );
        case 'ditolak':
            return (
                <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-3 py-1 text-xs font-medium text-red-700">
                    Ditolak
                </span>
            );
        default:
            return (
                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600">
                    {status}
                </span>
            );
    }
}

export default function PasienOnlineIndexResepsionis() {
    const { pasienOnline } = usePage<PageProps>().props;
    const [searchQuery, setSearchQuery] = useState('');

    // pastikan selalu array
    const pasienList: PasienOnline[] = Array.isArray(pasienOnline)
        ? pasienOnline
        : (pasienOnline.data ?? []);

    const filteredPasien = pasienList.filter(
        (p) =>
            p.status === 'pending' &&
            (p.nama_lengkap.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.nik.includes(searchQuery)),
    );

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Pasien Online" />

            <div className="p-6">
                {/* Header */}
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">
                        Pasien Online
                    </h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Daftar pasien online yang menunggu persetujuan
                    </p>
                </div>

                {/* Action Bar */}
                <div className="my-4 flex items-center justify-between">
                    <div className="relative flex gap-3">
                        <div className="flex">
                            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Cari pasien online berdasarkan nama atau NIK..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full min-w-[400px] rounded-lg border border-gray-200 bg-white py-2.5 pr-4 pl-10 text-sm focus:border-emerald-400 focus:ring-emerald-400"
                            />
                        </div>
                        <button className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50">
                            <Filter className="h-4 w-4" />
                            Filter
                        </button>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
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
                            <tbody className="divide-y divide-gray-100">
                                {filteredPasien.length > 0 ? (
                                    filteredPasien.map((item) => (
                                        <tr
                                            key={item.id}
                                            className="transition hover:bg-gray-50"
                                        >
                                            <td className="px-6 py-4 font-medium text-gray-900">
                                                {item.nomor_pendaftaran}
                                            </td>
                                            <td className="px-6 py-4 font-medium text-gray-700">
                                                {item.nama_lengkap}
                                            </td>
                                            <td className="px-6 py-4 text-gray-700">
                                                {item.nik}
                                            </td>
                                            <td className="px-6 py-4 text-gray-700">
                                                {item.jenis_kelamin === 'L'
                                                    ? 'Laki-laki'
                                                    : 'Perempuan'}
                                            </td>
                                            <td className="px-6 py-4 text-gray-700">
                                                {item.periode_daftar
                                                    ? new Date(
                                                          item.periode_daftar,
                                                      ).toLocaleDateString(
                                                          'id-ID',
                                                          {
                                                              day: '2-digit',
                                                              month: 'long',
                                                              year: 'numeric',
                                                          },
                                                      )
                                                    : '-'}
                                            </td>
                                            <td className="px-6 py-4 text-gray-700">
                                                {calculateAge(
                                                    item.tanggal_lahir,
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-gray-700">
                                                <StatusBadge
                                                    status={item.status}
                                                />
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <DropdownPasienOnline
                                                    id={item.id}
                                                    name={item.nama_lengkap}
                                                    onUpdate={() => {
                                                        router.reload();
                                                    }}
                                                />
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={listTable.length + 1}
                                            className="px-6 py-10 text-center text-sm text-gray-500"
                                        >
                                            Tidak ada pasien online pending.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-4 text-sm text-gray-600">
                    Menampilkan {filteredPasien.length} dari {pasienList.length}{' '}
                    pasien online
                </div>
            </div>
        </AppLayout>
    );
}
