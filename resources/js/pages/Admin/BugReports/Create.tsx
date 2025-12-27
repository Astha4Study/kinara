import FormCreateBugReport from '@/components/form-create-bug';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { toast } from 'sonner';

type DampakPelapor = 'rendah' | 'sedang' | 'tinggi';

export default function BugReportsCreateAdmin() {
    const { data, setData, processing, post, reset, errors } = useForm<{
        judul: string;
        deskripsi: string;
        dampak_pelapor: DampakPelapor;
    }>({
        judul: '',
        deskripsi: '',
        dampak_pelapor: 'sedang',
    });

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >,
    ) => {
        const { name, value } = e.target;

        if (name === 'dampak_pelapor') {
            setData(name, value as DampakPelapor);
            return;
        }

        setData(name as keyof typeof data, value);
    };

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        post('/admin/bug-reports', {
            onSuccess: () => {
                reset();
                toast.success('Laporan berhasil dikirim', {
                    description:
                        'Bug akan segera ditinjau oleh tim pengelola sistem.',
                });
            },
            onError: () => {
                toast.error('Gagal mengirim laporan', {
                    description:
                        'Terjadi kesalahan. Silakan periksa kembali isian Anda.',
                });
            },
        });
    };

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Bug Reports', href: '/admin/bug-reports' },
        { title: 'Laporkan Bug', href: '' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Laporkan Bug" />

            <div className="p-6">
                <div className="mb-6">
                    <h1 className="text-2xl font-semibold text-gray-900">
                        Laporkan Bug
                    </h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Sampaikan permasalahan yang Anda temukan pada sistem
                    </p>
                </div>

                <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
                    <FormCreateBugReport
                        data={data}
                        setData={setData}
                        handleSubmit={handleSubmit}
                        handleChange={handleChange}
                        processing={processing}
                        errors={errors}
                    />
                </div>
            </div>
        </AppLayout>
    );
}
