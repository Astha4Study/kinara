import FormCreateResep from '@/components/form-create-resep';
import AppLayout from '@/layouts/app-layout';
import { useCatatanLayananStore } from '@/stores/catatan-layanan.store';
import { useResepStore } from '@/stores/resep.store';
import { BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { useEffect } from 'react';

type Props = {
    pasien: { id: number; nama_lengkap: string; nomor_pasien?: string };
    obat_list: {
        id: number;
        nama_obat: string;
        satuan: string;
        harga: number;
        penggunaan_obat: string;
    }[];
};

export default function ResepCreateDokter({ pasien, obat_list }: Props) {
    const { obat_list: resepObat, reset } = useResepStore();
    const { data: catatan } = useCatatanLayananStore();

    useEffect(() => reset(), []);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        router.post(
            '/dokter/resep/store-final',
            { catatan, obat: resepObat },
            {
                onSuccess: () => router.visit('/dokter/catatan-layanan'),
            },
        );
    };

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Daftar Antrian', href: '/dokter/antrian' },
        {
            title: 'Buat Tindakan Dokter',
            href: `/dokter/antrian/${pasien.id}/tangani`,
        },
        { title: 'Siapkan Resep', href: '' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Siapkan Resep" />
            <div className="p-6">
                <div className="mb-6">
                    <h1 className="text-2xl font-semibold text-gray-900">
                        Buat resep untuk {pasien.nama_lengkap}
                    </h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Siapkan resep untuk pasien ya dokter
                    </p>
                </div>

                <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
                    <FormCreateResep
                        obat_list={obat_list}
                        pasien={pasien}
                        onSubmit={handleSubmit}
                        processing={false}
                        errors={{}}
                    />
                </div>
            </div>
        </AppLayout>
    );
}
