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
import { router } from '@inertiajs/react';
import { CheckCircle2, MoreHorizontal, XCircle } from 'lucide-react';
import { useState } from 'react';

interface Props {
    id: number;
    name: string;
    onUpdate: () => void;
}

export default function DropdownPasienOnline({ id, name, onUpdate }: Props) {
    const [openAlert, setOpenAlert] = useState(false);
    const [actionType, setActionType] = useState<'verifikasi' | 'tolak' | null>(
        null,
    );

    const handleUpdate = () => {
        if (!actionType) return;

        if (actionType === 'verifikasi') {
            // 🔑 arahkan ke halaman edit untuk verifikasi & buat pasien
            router.visit(`/resepsionis/pasien-online/${id}/edit`);
        } else {
            // 🔑 kalau tolak tetap update status
            router.put(`/resepsionis/pasien-online/${id}`, {
                status: 'ditolak',
            });
            onUpdate();
        }

        setOpenAlert(false);
    };

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button className="inline-flex h-8 w-8 items-center justify-center rounded-md text-gray-600 hover:bg-gray-100 focus:ring-2 focus:ring-emerald-500 focus:outline-none">
                        <MoreHorizontal className="h-4 w-4" />
                    </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                    align="end"
                    className="w-44 border border-gray-200 bg-white shadow-lg"
                >
                    {/* Verifikasi */}
                    <DropdownMenuItem
                        onClick={() => {
                            setActionType('verifikasi');
                            setOpenAlert(true);
                        }}
                        className="flex cursor-pointer items-center gap-3 text-emerald-600 hover:bg-emerald-50"
                    >
                        <CheckCircle2 className="h-4 w-4 text-emerald-500" />{' '}
                        Verifikasi
                    </DropdownMenuItem>

                    {/* Tolak */}
                    <DropdownMenuItem
                        onClick={() => {
                            setActionType('tolak');
                            setOpenAlert(true);
                        }}
                        className="flex cursor-pointer items-center gap-3 text-red-600 hover:bg-red-50"
                    >
                        <XCircle className="h-4 w-4 text-red-500" /> Tolak
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            {/* Alert */}
            <AlertDialog open={openAlert} onOpenChange={setOpenAlert}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Konfirmasi{' '}
                            {actionType === 'verifikasi'
                                ? 'Verifikasi'
                                : 'Tolak'}
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            Apakah kamu yakin ingin{' '}
                            {actionType === 'verifikasi'
                                ? 'memverifikasi'
                                : 'menolak'}{' '}
                            pasien online <b>{name}</b>?{' '}
                            {actionType === 'verifikasi'
                                ? 'Tindakan ini akan membuka form verifikasi pasien.'
                                : 'Tindakan ini akan mengubah status pendaftaran menjadi ditolak.'}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleUpdate}
                            className={
                                actionType === 'verifikasi'
                                    ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                                    : 'bg-red-600 text-white hover:bg-red-700'
                            }
                        >
                            Ya,{' '}
                            {actionType === 'verifikasi'
                                ? 'Verifikasi'
                                : 'Tolak'}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
