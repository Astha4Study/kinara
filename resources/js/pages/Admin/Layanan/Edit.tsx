import FormEditLayananAdmin from '@/components/form-edit-layanan-admin';
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
import { Head, router, useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

type Layanan = {
    id: number;
    nama_layanan: string;
    harga: number;
    aktif: boolean;
    detail_layanan: Array<{ keterangan: string }>;
};

type Props = {
    layanan: Layanan;
};

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Daftar Layanan', href: '/admin/layanan' },
    { title: 'Edit Layanan', href: '' },
];

export default function LayananEditAdmin({ layanan }: Props) {
    const { data, setData, processing, errors } = useForm({
        nama_layanan: layanan.nama_layanan || '',
        harga: layanan.harga || '',
        aktif: layanan.aktif ?? true,
        keterangan:
            layanan.detail_layanan?.map((d) => d.keterangan).join(', ') || '',
    });

    const [alertOpen, setAlertOpen] = useState(false);
    const [isDirty, setIsDirty] = useState(false);

    const isEqual = (a: any, b: any) => JSON.stringify(a) === JSON.stringify(b);

    useEffect(() => {
        const original = {
            nama_layanan: layanan.nama_layanan || '',
            harga: layanan.harga || '',
            aktif: layanan.aktif ?? true,
            keterangan:
                layanan.detail_layanan?.map((d) => d.keterangan).join(', ') ||
                '',
        };
        setIsDirty(!isEqual(data, original));
    }, [data, layanan]);

    const realSubmit = () => {
        const formData = new FormData();
        Object.entries(data).forEach(([k, v]) => {
            if (v !== undefined && v !== null) formData.append(k, v as any);
        });

        router.post(`/admin/layanan/${layanan.id}?_method=PUT`, formData, {
            onSuccess: () => {
                toast.success('Layanan berhasil diperbarui', {
                    description:
                        'Data layanan telah berhasil disimpan ke sistem.',
                });
            },
            onError: (err) => {
                toast.error('Gagal memperbarui layanan', {
                    description:
                        'Terjadi kesalahan saat menyimpan data layanan.',
                });
                console.error(err);
            },
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setAlertOpen(true);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Layanan" />

            <div className="p-6">
                <h1 className="mb-1 text-2xl font-semibold text-gray-900">
                    Edit Data Layanan
                </h1>
                <p className="mb-6 text-sm text-gray-500">
                    Perbarui informasi layanan di bawah ini.
                </p>

                <div className="overflow-hidden">
                    <FormEditLayananAdmin
                        data={data}
                        setData={setData}
                        handleSubmit={handleSubmit}
                        processing={processing}
                        isDirty={isDirty}
                        errors={errors}
                    />
                </div>
            </div>

            {/* Alert */}
            <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Konfirmasi Perubahan
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            Pastikan seluruh informasi layanan sudah benar
                            sebelum menyimpan.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction onClick={realSubmit}>
                            Simpan
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </AppLayout>
    );
}
