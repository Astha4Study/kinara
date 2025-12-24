import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { toast } from 'sonner';

type Antrian = {
    id: number;
    nomor_antrian: number;
    nomor_pasien: string;
    pasien_nama: string;
    dokter_nama: string;
    keluhan: string;
    status: string;
    created_at: string;
};

type PageProps = {
    antrian: Antrian[];
};

const listTable = [
    'No Antrian',
    'Nomor Pasien',
    'Nama Pasien',
    'Penanggung Jawab',
    'Keluhan',
    'Status',
    'Tanggal Dibuat',
    'Aksi',
];

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Daftar Antrian', href: '/resepsionis/antrian' },
];

export default function AntrianIndexResepsionis() {
    const { antrian } = usePage<PageProps>().props;
    const [searchQuery, setSearchQuery] = useState('');
    const [open, setOpen] = useState(false);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [alasan, setAlasan] = useState('');

    const filteredAntrian = antrian.filter(
        (a) =>
            (a.pasien_nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
                a.dokter_nama
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                a.keluhan.toLowerCase().includes(searchQuery.toLowerCase())) &&
            !['selesai', 'dibatalkan'].includes(a.status.toLowerCase()),
    );

    const batalkanClick = (id: number) => {
        setSelectedId(id);
        setAlasan('');
        setOpen(true);
    };

    const konfirmasiBatalkan = () => {
        if (!selectedId || !alasan.trim()) {
            toast.error('Alasan pembatalan wajib diisi');
            return;
        }

        router.put(
            `/resepsionis/antrian/${selectedId}`,
            { alasan: alasan.trim() },
            {
                onSuccess: () => {
                    toast.success('Antrian berhasil dibatalkan');
                    setOpen(false);
                },
                onError: () => toast.error('Gagal membatalkan antrian'),
            },
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Daftar Antrian" />

            <div className="p-6">
                {/* Header */}
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">
                        Daftar Antrian
                    </h1>
                    <p className="mt-1 mb-4 text-sm text-gray-500">
                        Kelola data antrian pasien di fasilitas Anda
                    </p>
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
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredAntrian.length > 0 ? (
                                    filteredAntrian.map((item) => (
                                        <tr
                                            key={item.id}
                                            className="transition hover:bg-gray-50"
                                        >
                                            <td className="px-6 py-4 text-gray-700">
                                                {item.nomor_antrian ?? '-'}
                                            </td>
                                            <td className="px-6 py-4 font-medium text-gray-900">
                                                {item.nomor_pasien ?? '-'}
                                            </td>
                                            <td className="px-6 py-4 font-medium text-gray-900">
                                                {item.pasien_nama
                                                    ? item.pasien_nama
                                                    : '-'}
                                            </td>
                                            <td className="px-6 py-4 text-gray-700">
                                                {item.dokter_nama
                                                    ? item.dokter_nama
                                                    : '-'}
                                            </td>
                                            <td className="px-6 py-4 text-gray-700">
                                                {item.keluhan
                                                    ? item.keluhan
                                                    : '-'}
                                            </td>
                                            <td className="px-6 py-4 text-gray-700">
                                                <span
                                                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                                        item.status ===
                                                        'Menunggu'
                                                            ? 'bg-yellow-100 text-yellow-700'
                                                            : item.status ===
                                                                'Sedang Diperiksa'
                                                              ? 'bg-blue-100 text-blue-700'
                                                              : item.status ===
                                                                  'Dibatalkan'
                                                                ? 'bg-red-100 text-red-700'
                                                                : 'bg-green-100 text-green-700'
                                                    }`}
                                                >
                                                    {item.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-gray-700">
                                                {item.created_at
                                                    ? new Date(
                                                          item.created_at,
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
                                                <button
                                                    onClick={() =>
                                                        batalkanClick(item.id)
                                                    }
                                                    className="rounded-md bg-red-600 px-3 py-1 text-xs font-medium text-white hover:bg-red-700"
                                                >
                                                    Batalkan
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={listTable.length + 2}
                                            className="px-6 py-10 text-center text-sm text-gray-500"
                                        >
                                            Tidak ada data antrian.
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
                        Menampilkan {filteredAntrian.length} dari{' '}
                        {antrian.length} antrian
                    </p>
                </div>
            </div>
            <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Batalkan Antrian</AlertDialogTitle>
                        <AlertDialogDescription>
                            Masukkan alasan pembatalan antrian ini.
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    <div>
                        <Label htmlFor="alasan">
                            Alasan <span className="text-red-500">*</span>
                        </Label>
                        <Textarea
                            id="alasan"
                            value={alasan}
                            onChange={(e) => setAlasan(e.target.value)}
                            placeholder="Contoh: Pasien membatalkan janji"
                            rows={3}
                            className="mt-1 w-full"
                        />
                    </div>

                    <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction
                            className="bg-emerald-600 hover:bg-emerald-700"
                            onClick={konfirmasiBatalkan}
                        >
                            Ya, Batalkan
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </AppLayout>
    );
}
