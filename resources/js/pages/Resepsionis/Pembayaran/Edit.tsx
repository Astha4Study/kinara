import DataPasienResep from '@/components/data-pasien-resep';
import FormKalkulatorResepsionis from '@/components/form-kalkulator-resepsionis';
import TableLayananPembayaranResepsionis from '@/components/table-layanan-pembayaran-resepsionis';
import TableObatPembayaranResepsionis from '@/components/table-obat-pembayaran-resepsionis';
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

type Pembayaran = {
    id: number;
    total_harga: number;
    status: string;

    pasien: {
        nama_lengkap: string;
        nomor_pasien: string;
        nik: string;
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

    detail_layanan: {
        id: number;
        nama: string;
        harga: number;
        subtotal: number;
        satuan?: string;
    }[];

    diagnosa?: string | null;
    punya_server: number;
};

type Props = {
    pembayaran: Pembayaran;
};

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Pembayaran', href: '/resepsionis/pembayaran' },
    { title: 'Proses Pembayaran', href: '' },
];

export default function PembayaranEditResepsionis({ pembayaran }: Props) {
    const { data, setData, put, processing } = useForm({
        uang_dibayar: 0,
        metode_pembayaran: 'cash',
    });

    const [openConfirm, setOpenConfirm] = useState(false);

    const totalHarga =
        pembayaran.detail_resep.reduce((sum, i) => sum + i.subtotal, 0) +
        pembayaran.detail_layanan.reduce((sum, i) => sum + i.subtotal, 0);

    const handleConfirmSubmit = () => {
        const totalHarga =
            pembayaran.detail_resep.reduce((sum, i) => sum + i.subtotal, 0) +
            pembayaran.detail_layanan.reduce((sum, i) => sum + i.subtotal, 0);

        put(route('resepsionis.pembayaran.update', pembayaran.id), {
            preserveScroll: true,
            onSuccess: () => {
                setOpenConfirm(false);
                const kembalian = data.uang_dibayar - totalHarga;
                toast.success('Pembayaran berhasil', {
                    description: `Kembalian: Rp ${kembalian.toLocaleString('id-ID')}`,
                });
            },
            onError: () => {
                toast.error('Pembayaran gagal', {
                    description: 'Terjadi kesalahan saat memproses pembayaran.',
                });
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Proses Pembayaran" />
            <div className="p-6">
                <div className="space-y-6">
                    {/* Data Pasien & Dokter */}
                    <DataPasienResep pasien={pembayaran.pasien} />

                    <div
                        className={`grid gap-6 ${
                            pembayaran.detail_resep.length > 0 &&
                            pembayaran.detail_layanan.length > 0
                                ? 'md:grid-cols-2'
                                : 'md:grid-cols-1'
                        }`}
                    >
                        {pembayaran.detail_resep.length > 0 && (
                            <TableObatPembayaranResepsionis
                                detail={pembayaran.detail_resep}
                            />
                        )}

                        {pembayaran.detail_layanan.length > 0 && (
                            <TableLayananPembayaranResepsionis
                                detail={pembayaran.detail_layanan}
                            />
                        )}
                    </div>

                    <FormKalkulatorResepsionis
                        detailResep={pembayaran.detail_resep}
                        detailLayanan={pembayaran.detail_layanan}
                        data={data}
                        setData={setData}
                        processing={processing}
                        onSubmit={() => setOpenConfirm(true)}
                    />
                </div>
            </div>

            {/* Dialog Konfirmasi */}
            <AlertDialog open={openConfirm} onOpenChange={setOpenConfirm}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Konfirmasi Pembayaran
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            Apakah kamu yakin ingin memproses pembayaran ini?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={processing}>
                            Batal
                        </AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleConfirmSubmit}
                            disabled={processing}
                            className="bg-emerald-600 hover:bg-emerald-700"
                        >
                            Ya, Proses Pembayaran
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </AppLayout>
    );
}
