import { Highlight } from '@/components/ui/highlight';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

interface DetailPembayaran {
    uang_dibayar: number;
    kembalian: number;
    metode_pembayaran: string;
    waktu_bayar?: string;
}

interface Pasien {
    nik: string;
    jenis_kelamin: string;
    tanggal_lahir: string;
    alamat: string;
    no_hp: string;
}

interface Laporan {
    id: number;
    nomor_pasien: string;
    nama_pasien: string;
    total_bayar: number;
    status: string;
    tanggal: string;
    detail: DetailPembayaran;
    pasien: Pasien;
}

interface Props {
    laporan: Laporan;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Laporan Keuangan', href: '/admin/laporan-keuangan' },
    { title: 'Detail Laporan', href: '' },
];

export default function LaporanKeuanganShowAdmin({ laporan }: Props) {
    const rupiah = (v: number) =>
        new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(v);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Detail Laporan Keuangan" />

            <div className="p-6">
                {/* Header */}
                <div className="mb-6 flex items-center">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900">
                            Detail Laporan Keuangan
                        </h1>
                        <p className="mt-1 text-sm text-gray-500">
                            Informasi lengkap pembayaran pasien
                        </p>
                    </div>
                </div>

                {/* Card */}
                <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
                    <div className="space-y-6 p-6">
                        {/* Informasi Pasien */}
                        <div>
                            <h2 className="mb-3 text-lg font-semibold text-gray-900">
                                Data Pasien
                            </h2>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <Info
                                    label="Nomor Pasien"
                                    value={laporan.nomor_pasien}
                                />
                                <Info
                                    label="Nama Pasien"
                                    value={laporan.nama_pasien}
                                />
                                <Info label="NIK" value={laporan.pasien.nik} />
                                <Info
                                    label="Jenis Kelamin"
                                    value={laporan.pasien.jenis_kelamin}
                                />
                                <Info
                                    label="Tanggal Lahir"
                                    value={laporan.pasien.tanggal_lahir}
                                />
                                <Info
                                    label="Alamat"
                                    value={laporan.pasien.alamat}
                                />
                                <Info
                                    label="No HP"
                                    value={laporan.pasien.no_hp}
                                />
                            </div>
                        </div>

                        {/* Informasi Pembayaran */}
                        <div>
                            <h2 className="mb-3 text-lg font-semibold text-gray-900">
                                Detail Pembayaran
                            </h2>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                {/* Penting → Highlight */}
                                <Highlight
                                    label="Total Bayar"
                                    value={rupiah(laporan.total_bayar)}
                                />
                                <Highlight
                                    label="Status"
                                    value={laporan.status}
                                />

                                {/* Sisanya cukup Info */}
                                <Info label="Tanggal" value={laporan.tanggal} />
                                <Info
                                    label="Uang Dibayar"
                                    value={rupiah(laporan.detail.uang_dibayar)}
                                />
                                <Info
                                    label="Kembalian"
                                    value={rupiah(laporan.detail.kembalian)}
                                />
                                <Highlight
                                    label="Metode Pembayaran"
                                    value={laporan.detail.metode_pembayaran}
                                />
                                <Info
                                    label="Waktu Bayar"
                                    value={laporan.detail.waktu_bayar ?? '-'}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

function Info({ label, value }: { label: string; value: string | number }) {
    return (
        <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
                {label}
            </label>
            <div className="rounded-lg border bg-gray-50 px-4 py-2.5 text-sm text-gray-900">
                {value}
            </div>
        </div>
    );
}
