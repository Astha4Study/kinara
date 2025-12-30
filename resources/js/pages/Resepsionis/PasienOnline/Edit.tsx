import FormEditPasienOnlineResepsionis from '@/components/form-edit-pasien-online-resepsionis';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, router, useForm } from '@inertiajs/react';
import { toast } from 'sonner';

type PasienOnline = {
    id: number;
    nama_lengkap: string;
    nik: string;
    jenis_kelamin: 'L' | 'P';
    tanggal_lahir?: string | null;
    tempat_lahir?: string | null;
    alamat: string;
    no_hp?: string | null;
    golongan_darah?: string | null;
    riwayat_penyakit?: string | null;
    alergi?: string | null;
    periode_daftar?: string | null;
    status: 'pending' | 'terverifikasi' | 'ditolak';
};

type Props = {
    pasienOnline: PasienOnline;
};

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Pasien Online', href: '/resepsionis/pasien-online' },
    { title: 'Verifikasi Pasien', href: '' },
];

export default function PasienOnlineEditResepsionis({ pasienOnline }: Props) {
    const { data, setData, processing, errors } = useForm({
        nama_lengkap: pasienOnline.nama_lengkap || '',
        nik: pasienOnline.nik || '',
        jenis_kelamin: pasienOnline.jenis_kelamin || 'L',
        tanggal_lahir: pasienOnline.tanggal_lahir || '',
        tempat_lahir: pasienOnline.tempat_lahir || '',
        alamat: pasienOnline.alamat || '',
        no_hp: pasienOnline.no_hp || '',
        golongan_darah: pasienOnline.golongan_darah || '',
        riwayat_penyakit: pasienOnline.riwayat_penyakit || '',
        alergi: pasienOnline.alergi || '',
        status: 'terverifikasi', 
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                formData.append(key, value as any);
            }
        });

        // 🔑 pastikan status ikut dikirim
        formData.set('status', 'terverifikasi');

        router.post(
            `/resepsionis/pasien-online/${pasienOnline.id}?_method=PUT`,
            formData,
            {
                onSuccess: () => {
                    toast.success('Berhasil!', {
                        description:
                            'Pasien online berhasil diverifikasi dan dibuat sebagai pasien.',
                    });
                },
                onError: () => {
                    toast.error('Gagal!', {
                        description:
                            'Terjadi kesalahan saat memverifikasi pasien online.',
                    });
                },
            },
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Verifikasi Pasien Online" />

            <div className="p-6">
                <div className="mb-6">
                    <h1 className="text-2xl font-semibold text-gray-900">
                        Verifikasi Pasien Online
                    </h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Periksa dan verifikasi data pasien online sebelum dibuat
                        sebagai pasien resmi
                    </p>
                </div>

                {/* Form Card */}
                <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
                    <FormEditPasienOnlineResepsionis
                        data={data}
                        setData={setData}
                        handleSubmit={handleSubmit}
                        processing={processing}
                        errors={errors}
                    />
                </div>
            </div>
        </AppLayout>
    );
}
