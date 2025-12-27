import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { toast } from 'sonner';
import { route } from 'ziggy-js';

interface BugReport {
    id: number;
    judul: string;
    deskripsi: string;
    dampak_pelapor: 'rendah' | 'sedang' | 'tinggi';
    status: 'dibuka' | 'sedang_dikerjakan' | 'selesai' | 'ditolak';
    prioritas: 'rendah' | 'sedang' | 'tinggi';
    ditangani_pada?: string | null;
    diselesaikan_pada?: string | null;
    catatan_admin?: string | null;
    klinik: { id: number; nama_klinik: string };
    pelapor: { id: number; name: string };
    created_at: string;
}

interface PageProps {
    bugReport: BugReport;
    [key: string]: any;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/super-admin' },
    { title: 'Bug Reports', href: '/super-admin/bug-reports' },
    { title: 'Edit', href: '' },
];

const statusColor: Record<
    'dibuka' | 'sedang_dikerjakan' | 'selesai' | 'ditolak',
    string
> = {
    dibuka: 'bg-blue-100 text-blue-700',
    sedang_dikerjakan: 'bg-indigo-100 text-indigo-700',
    selesai: 'bg-emerald-100 text-emerald-700',
    ditolak: 'bg-gray-200 text-gray-600',
};

const priorityColor: Record<'rendah' | 'sedang' | 'tinggi', string> = {
    rendah: 'bg-gray-100 text-gray-700',
    sedang: 'bg-yellow-100 text-yellow-700',
    tinggi: 'bg-red-100 text-red-700',
};

const statusLabels: Record<string, string> = {
    dibuka: 'Dibuka',
    sedang_dikerjakan: 'Sedang Dikerjakan',
    selesai: 'Selesai',
    ditolak: 'Ditolak',
};

const priorityLabels: Record<string, string> = {
    rendah: 'Rendah',
    sedang: 'Sedang',
    tinggi: 'Tinggi',
};

export default function BugReportsEditSuperAdmin() {
    const { bugReport } = usePage<PageProps>().props;

    const { data, setData, patch, processing } = useForm({
        status: bugReport.status,
        prioritas: bugReport.prioritas,
        catatan_admin: bugReport.catatan_admin || '',
    });

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString('id-ID', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
        });
    };

    const handleStatusUpdate = (newStatus: 'sedang_dikerjakan' | 'selesai') => {
        setData({
            status: newStatus,
            prioritas: bugReport.prioritas,
            catatan_admin: data.catatan_admin,
        });

        patch(route('super_admin.bug-reports.update', bugReport.id), {
            preserveState: false,
            onSuccess: () => toast.success('Status berhasil diperbarui'),
            onError: () => toast.error('Gagal memperbarui status'),
        });
    };

    const canEditCatatan = bugReport.status === 'sedang_dikerjakan';
    const showActionButtons =
        bugReport.status !== 'selesai' && bugReport.status !== 'ditolak';

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Bug Report" />

            <div className="p-6">
                <div className="mb-6">
                    <h1 className="text-2xl font-semibold text-gray-900">
                        Edit Laporan Bug
                    </h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Kelola dan perbarui status laporan bug
                    </p>
                </div>

                <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
                    <div className="p-6">
                        {/* Header dengan Judul dan Badges */}
                        <div className="mb-6 flex items-start justify-between">
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900">
                                    {bugReport.judul}
                                </h2>
                                <p className="mt-1 text-sm text-gray-500">
                                    Dilaporkan pada{' '}
                                    {formatDate(bugReport.created_at)}
                                </p>
                            </div>
                            <div className="flex items-center gap-2">
                                <span
                                    className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${priorityColor[bugReport.prioritas]}`}
                                >
                                    Prioritas:{' '}
                                    {priorityLabels[bugReport.prioritas]}
                                </span>
                                <span
                                    className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${priorityColor[bugReport.dampak_pelapor]}`}
                                >
                                    Dampak:{' '}
                                    {priorityLabels[bugReport.dampak_pelapor]}
                                </span>
                                <span
                                    className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${statusColor[bugReport.status]}`}
                                >
                                    {statusLabels[bugReport.status]}
                                </span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            {/* Klinik */}
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                    Klinik
                                </label>
                                <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900">
                                    {bugReport.klinik.nama_klinik}
                                </div>
                            </div>

                            {/* Pelapor */}
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                    Pelapor
                                </label>
                                <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900">
                                    {bugReport.pelapor.name}
                                </div>
                            </div>

                            {/* Tanggal Lapor */}
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                    Tanggal Lapor
                                </label>
                                <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900">
                                    {formatDate(bugReport.created_at)}
                                </div>
                            </div>

                            {/* Ditangani Pada */}
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                    Ditangani Pada
                                </label>
                                <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900">
                                    {bugReport.ditangani_pada
                                        ? formatDate(bugReport.ditangani_pada)
                                        : '-'}
                                </div>
                            </div>

                            {/* Diselesaikan Pada */}
                            <div className="md:col-span-2">
                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                    Diselesaikan Pada
                                </label>
                                <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900">
                                    {bugReport.diselesaikan_pada
                                        ? formatDate(
                                              bugReport.diselesaikan_pada,
                                          )
                                        : '-'}
                                </div>
                            </div>

                            {/* Deskripsi */}
                            <div className="md:col-span-2">
                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                    Deskripsi Bug
                                </label>
                                <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900">
                                    {bugReport.deskripsi}
                                </div>
                            </div>

                            {/* Catatan Admin - Editable */}
                            <div className="md:col-span-2">
                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                    Catatan Admin
                                </label>
                                <textarea
                                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 focus:border-emerald-400 focus:ring-emerald-400 disabled:bg-gray-50 disabled:text-gray-500"
                                    value={data.catatan_admin}
                                    onChange={(e) =>
                                        setData('catatan_admin', e.target.value)
                                    }
                                    placeholder={
                                        canEditCatatan
                                            ? 'Tambahkan catatan jika diperlukan'
                                            : 'Tangani untuk menambahkan catatan'
                                    }
                                    rows={4}
                                    disabled={!canEditCatatan}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex justify-end gap-3 border-t border-gray-200 bg-gray-50 px-6 py-4">
                        <Link
                            href="/super-admin/bug-reports"
                            className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                        >
                            Kembali
                        </Link>
                        {showActionButtons && (
                            <>
                                {bugReport.status === 'dibuka' && (
                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleStatusUpdate(
                                                'sedang_dikerjakan',
                                            )
                                        }
                                        disabled={processing}
                                        className="rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-50"
                                    >
                                        Tangani
                                    </button>
                                )}
                                {bugReport.status === 'sedang_dikerjakan' && (
                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleStatusUpdate('selesai')
                                        }
                                        disabled={processing}
                                        className="rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-50"
                                    >
                                        Tandai Selesai
                                    </button>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
