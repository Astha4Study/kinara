import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';

type BugReport = {
    id: number;
    judul: string;
    deskripsi: string;
    dampak_pelapor: 'rendah' | 'sedang' | 'tinggi';
    status:
        | 'dibuka'
        | 'sedang_dikerjakan'
        | 'selesai'
        | 'ditolak'
        | 'dibatalkan';
    created_at: string;
    diselesaikan_pada?: string | null;
    catatan_admin?: string | null;
    klinik: { nama_klinik: string };
};

type PageProps = { bug: BugReport };

const priorityColor: Record<'rendah' | 'sedang' | 'tinggi', string> = {
    rendah: 'bg-gray-100 text-gray-700',
    sedang: 'bg-yellow-100 text-yellow-700',
    tinggi: 'bg-red-100 text-red-700',
};

const statusColor: Record<string, string> = {
    dibuka: 'bg-blue-100 text-blue-700',
    sedang_dikerjakan: 'bg-indigo-100 text-indigo-700',
    selesai: 'bg-emerald-100 text-emerald-700',
    ditolak: 'bg-gray-200 text-gray-600',
    dibatalkan: 'bg-gray-200 text-gray-600',
};

export default function BugReportsShowAdmin() {
    const { bug } = usePage<PageProps>().props;

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Bug Reports', href: '/admin/bug-reports' },
        { title: 'Detail Bug', href: '' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Detail Bug - ${bug.judul}`} />

            <div className="p-6">
                <div className="mb-6">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900">
                            Detail Laporan Bug
                        </h1>
                        <p className="mt-1 text-sm text-gray-500">
                            Informasi lengkap laporan bug yang Anda kirim
                        </p>
                    </div>
                </div>

                <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
                    <div className="p-6">
                        <div className="mb-4 flex items-start justify-between">
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900">
                                    {bug.judul}
                                </h2>
                                <p className="mt-1 text-sm text-gray-500">
                                    Dilaporkan pada{' '}
                                    {new Date(
                                        bug.created_at,
                                    ).toLocaleDateString('id-ID', {
                                        day: '2-digit',
                                        month: 'long',
                                        year: 'numeric',
                                    })}
                                </p>
                            </div>
                            <div>
                                <span
                                    className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${statusColor[bug.status]}`}
                                >
                                    {bug.status.replace('_', ' ')}
                                </span>
                            </div>
                        </div>

                        <div className="mt-4">
                            <label className="mb-1 block text-sm font-medium text-gray-700">
                                Deskripsi Bug
                            </label>
                            <div className="rounded-lg border bg-gray-50 px-4 py-2.5 text-sm whitespace-pre-line text-gray-900">
                                {bug.deskripsi}
                            </div>
                        </div>

                        <div className="mt-4">
                            <label className="mb-1 block text-sm font-medium text-gray-700">
                                Catatan Admin
                            </label>
                            <div className="rounded-lg border bg-gray-50 px-4 py-2.5 text-sm text-gray-900">
                                {bug.catatan_admin || (
                                    <span className="text-gray-400 italic">
                                        Belum ada catatan dari admin
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="mt-4">
                            <label className="mb-1 block text-sm font-medium text-gray-700">
                                Status Penyelesaian
                            </label>
                            <div className="rounded-lg border bg-gray-50 px-4 py-2.5 text-sm text-gray-900">
                                {bug.status === 'selesai' &&
                                bug.diselesaikan_pada ? (
                                    <>
                                        Bug diselesaikan pada{' '}
                                        <b>
                                            {new Date(
                                                bug.diselesaikan_pada,
                                            ).toLocaleDateString('id-ID', {
                                                day: '2-digit',
                                                month: 'long',
                                                year: 'numeric',
                                            })}
                                        </b>
                                    </>
                                ) : (
                                    <span className="text-gray-400 italic">
                                        Kami akan memberi tahu setelah bug
                                        diselesaikan
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
