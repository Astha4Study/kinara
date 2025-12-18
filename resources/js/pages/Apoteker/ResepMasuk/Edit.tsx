import DataPasienResep from '@/components/data-pasien-resep';
import DataPemeriksaanFisik from '@/components/data-pemeriksaan-fisik';
import FormCreateResep from '@/components/form-create-resep';

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
    diagnosa: string;

    pasien: {
        id: number;
        nama_lengkap: string;
        nomor_pasien: string;
        riwayat_penyakit: string;
    };

    pemeriksaan_fisik: {
        berat_badan: number;
        tinggi_badan: number;
        suhu_tubuh: number;
        tekanan_darah: string;
        kondisi_khusus: string;
    };

    detail: {
        id: number;
        nama_obat: string;
        jumlah: number;
        satuan: string;
        harga: number;
        subtotal: number;
    }[];
};

type Props = {
    resep: Resep;
    obatMaster: {
        id: number;
        nama_obat: string;
        jenis_obat: string;
        satuan: string;
        harga: number;
        penggunaan_obat: string;
    }[];
};

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Resep Masuk', href: '/apoteker/resep-masuk' },
    { title: 'Siapkan Obat Pasien', href: '' },
];

export default function ResepMasukEditApoteker({ resep, obatMaster }: Props) {
    const form = useForm({
        detail: [] as {
            nama_obat: string;
            jumlah: number;
            satuan: string;
            harga: number;
            subtotal: number;
        }[],
    });

    const [openConfirm, setOpenConfirm] = useState(false);
    const [detailObat, setDetailObat] = useState(form.data.detail);

    const handleSubmit = () => {
        form.setData('detail', detailObat);

        form.post(route('apoteker.resep-detail.store', resep.id), {
            preserveScroll: true,
            onSuccess: () => {
                setOpenConfirm(false);
                toast.success('Resep berhasil dibuat');
            },
            onError: () => {
                toast.error('Terjadi kesalahan saat membuat resep');
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Siapkan Obat Pasien" />
            <div className="space-y-6 p-6">
                <DataPasienResep
                    pasien={resep.pasien}
                    diagnosa={resep.diagnosa}
                />
                <DataPemeriksaanFisik
                    pemeriksaanFisik={resep.pemeriksaan_fisik}
                />

                <FormCreateResep
                    obat_list={obatMaster}
                    processing={form.processing}
                    errors={form.errors}
                    pasien={resep.pasien}
                    onChange={(list) => form.setData('detail', list)}
                    onConfirm={() => setOpenConfirm(true)}
                />
            </div>

            <AlertDialog open={openConfirm} onOpenChange={setOpenConfirm}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Konfirmasi Pengecekan Obat
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            Apakah kamu yakin sudah mengecek obat dengan baik
                            dan sesuai dengan resep dokter?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={form.processing}>
                            Batal
                        </AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleSubmit}
                            disabled={form.processing}
                            className="bg-emerald-600 hover:bg-emerald-700"
                        >
                            Ya, Sudah Dicek
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </AppLayout>
    );
}
