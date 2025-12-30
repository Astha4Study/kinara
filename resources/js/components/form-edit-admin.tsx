import { Link } from '@inertiajs/react';

interface FormEditAdminProps {
    data: any;
    setData: (key: string, value: any) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    processing: boolean;
    availableRoles: string[];
    errors: Record<string, string>;
    isDirty: boolean;
}

const FormEditAdmin: React.FC<FormEditAdminProps> = ({
    data,
    setData,
    handleSubmit,
    processing,
    availableRoles,
    errors,
    isDirty,
}) => {
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleSubmit(e);
    };

    return (
        <form
            onSubmit={onSubmit}
            autoComplete="off"
            className="space-y-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
        >
            {/* Nama */}
            <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                    Nama Lengkap <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                    placeholder="Masukkan nama lengkap"
                />
                {errors.name && (
                    <p className="mt-1 text-xs text-red-500">{errors.name}</p>
                )}
            </div>

            {/* Email */}
            <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                    Email <span className="text-red-500">*</span>
                </label>
                <input
                    type="email"
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                    className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                    placeholder="example@mail.com"
                />
                {errors.email && (
                    <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                )}
            </div>

            {/* Role */}
            <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                    Role <span className="text-red-500">*</span>
                </label>
                <select
                    value={data.role}
                    disabled
                    onChange={(e) => setData('role', e.target.value)}
                    className="w-full cursor-not-allowed rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                >
                    {availableRoles.map((role) => (
                        <option key={role} value={role}>
                            {role.charAt(0).toUpperCase() + role.slice(1)}
                        </option>
                    ))}
                </select>
                {errors.role && (
                    <p className="mt-1 text-xs text-red-500">{errors.role}</p>
                )}
            </div>

            {/* Password Lama */}
            <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                    Password Lama
                </label>
                <input
                    type="password"
                    value={data.current_password}
                    onChange={(e) =>
                        setData('current_password', e.target.value)
                    }
                    placeholder="Masukkan password lama"
                    className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                />
                {errors.current_password && (
                    <p className="mt-1 text-xs text-red-500">
                        {errors.current_password}
                    </p>
                )}
            </div>

            {/* Password Baru */}
            <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                    Password Baru
                </label>
                <input
                    type="password"
                    value={data.new_password}
                    onChange={(e) => setData('new_password', e.target.value)}
                    placeholder="Masukkan password baru"
                    className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                />
                {errors.new_password && (
                    <p className="mt-1 text-xs text-red-500">
                        {errors.new_password}
                    </p>
                )}
            </div>

            {/* Konfirmasi Password Baru */}
            <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                    Konfirmasi Password Baru
                </label>
                <input
                    type="password"
                    value={data.new_password_confirmation}
                    onChange={(e) =>
                        setData('new_password_confirmation', e.target.value)
                    }
                    placeholder="Ulangi password baru"
                    className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                />
                {errors.new_password_confirmation && (
                    <p className="mt-1 text-xs text-red-500">
                        {errors.new_password_confirmation}
                    </p>
                )}
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3">
                <Link
                    href="/super-admin/kelola-admin"
                    className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                    Batal
                </Link>
                <button
                    type="submit"
                    disabled={processing || !isDirty}
                    className="rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-50"
                >
                    {processing ? 'Menyimpan...' : 'Simpan'}
                </button>
            </div>
        </form>
    );
};

export default FormEditAdmin;
