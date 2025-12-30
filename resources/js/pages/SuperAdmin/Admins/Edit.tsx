import FormEditAdmin from '@/components/form-edit-admin';
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

type Admin = {
    id: number;
    name: string;
    email: string;
    role: string;
};

type Props = {
    admin: Admin;
    availableRoles: string[];
};

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Daftar Admin', href: '/super-admin/kelola-admin' },
    { title: 'Edit Admin', href: '' },
];

export default function AdminsEditSuperAdmin({ admin, availableRoles }: Props) {
    const { data, setData, processing, errors } = useForm({
        name: admin.name || '',
        email: admin.email || '',
        role: admin.role || '',
        current_password: '',
        new_password: '',
        new_password_confirmation: '',
    });

    const [alertOpen, setAlertOpen] = useState(false);
    const [isDirty, setIsDirty] = useState(false);

    const isPasswordChangeValid =
        data.current_password.length > 0 &&
        data.new_password.length > 0 &&
        data.new_password_confirmation.length > 0 &&
        data.new_password === data.new_password_confirmation;

    useEffect(() => {
        const original = {
            name: admin.name || '',
            email: admin.email || '',
            role: admin.role || '',
        };

        const basicChanged =
            data.name !== original.name ||
            data.email !== original.email ||
            data.role !== original.role;

        const passwordAttempted =
            data.current_password.length > 0 ||
            data.new_password.length > 0 ||
            data.new_password_confirmation.length > 0;

        const passwordValid = isPasswordChangeValid;

        setIsDirty(basicChanged || (passwordAttempted && passwordValid));
    }, [data, admin]);

    const realSubmit = () => {
        const formData = new FormData();

        formData.append('name', data.name);
        formData.append('email', data.email);
        formData.append('role', data.role);

        if (isPasswordChangeValid) {
            formData.append('current_password', data.current_password);
            formData.append('new_password', data.new_password);
            formData.append(
                'new_password_confirmation',
                data.new_password_confirmation,
            );
        }

        router.post(
            `/super-admin/kelola-admin/${admin.id}?_method=PUT`,
            formData,
            {
                onSuccess: () => {
                    toast.success('Admin berhasil diperbarui', {
                        description:
                            'Data admin telah berhasil disimpan ke sistem.',
                    });
                },
                onError: () => {
                    toast.error('Gagal memperbarui admin', {
                        description: 'Periksa kembali data yang diinput.',
                    });
                },
            },
        );
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setAlertOpen(true);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Admin" />

            <div className="p-6">
                <h1 className="mb-1 text-2xl font-semibold text-gray-900">
                    Edit Data Admin
                </h1>
                <p className="mb-6 text-sm text-gray-500">
                    Perbarui informasi admin di bawah ini.
                </p>

                <div className="overflow-hidden">
                    <FormEditAdmin
                        data={data}
                        setData={setData}
                        handleSubmit={handleSubmit}
                        processing={processing}
                        availableRoles={availableRoles}
                        errors={errors}
                        isDirty={isDirty}
                    />
                </div>
            </div>

            {/* Alert Konfirmasi */}
            <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Konfirmasi Perubahan
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            Pastikan data admin sudah benar sebelum disimpan.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={realSubmit}
                            className="bg-emerald-600 hover:bg-emerald-700"
                        >
                            Simpan
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </AppLayout>
    );
}
