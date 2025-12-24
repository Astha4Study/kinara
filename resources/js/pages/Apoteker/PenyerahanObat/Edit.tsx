import DataPasienResep from '@/components/data-pasien-resep';
import TableObatPenyerahanObatApoteker from '@/components/table-obat-penyerahan-obat-apoteker';
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
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { toast } from 'sonner';
import { route } from 'ziggy-js';

type Resep = {
    id: number;
    total_harga: number;
    status: string;
    pasien: {
        nama_lengkap: string;
        nomor_pasien: string;
    };
    dokter: { nama: string };
    detail_resep: {
        id: number;
        nama: string;
        jumlah: number;
        harga: number;
        subtotal: number;
        satuan?: string;
    }[];
};

type Props = {
    resep: Resep;
};

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Penyerahan Obat', href: '/apoteker/penyerahan-obat' },
    { title: 'Proses Penyerahan', href: '' },
];

export default function PenyerahanObatCreateApoteker({ resep }: Props) {
    const { patch, processing } = useForm({});
    const [open, setOpen] = useState(false);

    const updateStatus = () => {
        setOpen(false);
        patch(route('apoteker.penyerahan-obat.update', resep.id), {
            onSuccess: () =>
                toast.success('Obat berhasil diserahkan', {
                    description: `Resep ${resep.pasien.nomor_pasien} sudah diserahkan ke pasien.`,
                }),
            onError: () =>
                toast.error('Penyerahan gagal', {
                    description:
                        'Terjadi kesalahan saat memproses penyerahan obat.',
                }),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Proses Penyerahan Obat" />
            <div className="p-6">
                <div className="space-y-6">
                    {/* Data Pasien */}
                    <DataPasienResep pasien={resep.pasien} />

                    <TableObatPenyerahanObatApoteker
                        detail={resep.detail_resep}
                        processing={processing}
                        onConfirm={() => setOpen(true)}
                    />
                </div>
            </div>

            {/* Dialog Konfirmasi */}
            <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Konfirmasi Penyerahan Obat
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            Apakah kamu yakin ingin menyerahkan obat untuk resep
                            ini?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={processing}>
                            Batal
                        </AlertDialogCancel>
                        <AlertDialogAction
                            onClick={updateStatus}
                            disabled={processing}
                            className="bg-emerald-600 hover:bg-emerald-700"
                        >
                            Ya, Serahkan Obat
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </AppLayout>
    );
}
