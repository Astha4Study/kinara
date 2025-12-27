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
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Link, router } from '@inertiajs/react';
import { Eye, MoreHorizontal, XCircle } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface Props {
    id: number;
    judul: string;
}

const DropdownBugReportsAdmin = ({ id, judul }: Props) => {
    const [openAlert, setOpenAlert] = useState(false);

    const handleCancel = () => {
        router.put(
            `/admin/bug-reports/${id}`,
            {
                status: 'dibatalkan',
            },
            {
                onSuccess: () => {
                    toast.success('Laporan dibatalkan', {
                        description: `Bug "${judul}" berhasil dibatalkan.`,
                    });
                    setOpenAlert(false);
                },
                onError: () => {
                    toast.error('Gagal membatalkan laporan', {
                        description:
                            'Terjadi kesalahan saat memproses permintaan.',
                    });
                },
            },
        );
    };

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button className="flex h-8 w-8 items-center justify-center rounded-md text-gray-600 hover:bg-gray-100 focus:ring-2 focus:ring-emerald-500 focus:outline-none">
                        <MoreHorizontal className="h-4 w-4" />
                    </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                    align="end"
                    className="w-44 border border-gray-200 bg-white shadow-lg"
                >
                    {/* Show */}
                    <DropdownMenuItem asChild>
                        <Link
                            href={`/admin/bug-reports/${id}`}
                            className="flex items-center gap-3 text-blue-600 hover:bg-blue-50"
                        >
                            <Eye className="h-4 w-4 text-blue-500" />
                            Lihat Detail
                        </Link>
                    </DropdownMenuItem>

                    {/* Batalkan */}
                    <DropdownMenuItem
                        onClick={() => setOpenAlert(true)}
                        className="flex cursor-pointer items-center gap-3 text-red-600 hover:bg-red-50"
                    >
                        <XCircle className="h-4 w-4 text-red-500" />
                        Batalkan
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            {/* Alert Dialog */}
            <AlertDialog open={openAlert} onOpenChange={setOpenAlert}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Konfirmasi Pembatalan
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            Apakah Anda yakin ingin membatalkan laporan bug{' '}
                            <b>{judul}</b>? Tindakan ini tidak dapat dibatalkan.
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleCancel}
                            className="bg-red-600 text-white hover:bg-red-700"
                        >
                            Ya, Batalkan
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};

export default DropdownBugReportsAdmin;
