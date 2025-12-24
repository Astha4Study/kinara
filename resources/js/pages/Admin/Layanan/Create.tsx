import FormCreateLayanan from '@/components/form-create-layanan-admin';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { toast } from 'sonner';

export default function LayananCreateAdmin() {
    const { data, setData, post, processing, reset } = useForm({
        nama_layanan: '',
        harga: '',
        aktif: true,
        keterangan: '',
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post('/admin/layanan', {
            onSuccess: () => {
                reset();
                toast.success('Layanan berhasil ditambahkan');
            },
            onError: () => {
                toast.error('Layanan gagal dibuat');
            },
        });
    };

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Daftar Layanan', href: '/admin/layanan' },
        { title: 'Tambah Layanan', href: '' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tambah Layanan" />

            <div className="p-6">
                <h1 className="mb-1 text-2xl font-semibold text-gray-900">
                    Tambah Data Layanan
                </h1>
                <p className="mb-6 text-sm text-gray-500">
                    Lengkapi data layanan di bawah untuk menambahkan ke daftar.
                </p>

                <div className="overflow-hidden">
                    <FormCreateLayanan
                        data={data}
                        setData={setData}
                        handleSubmit={handleSubmit}
                        processing={processing}
                    />
                </div>
            </div>
        </AppLayout>
    );
}
