import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Link } from '@inertiajs/react';
import { useState } from 'react';

interface FormEditLayananAdminProps {
    data: any;
    setData: (key: string, value: any) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    processing: boolean;
    isDirty: boolean;
    errors?: Record<string, string>;
}

const FormEditLayananAdmin: React.FC<FormEditLayananAdminProps> = ({
    data,
    setData,
    handleSubmit,
    processing,
    isDirty,
    errors = {},
}) => {
    const [localErrors] = useState<any>({});

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleSubmit(e);
    };

    const formatRupiah = (value: string | number) => {
        if (!value) return '';
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(Number(value));
    };

    const parseRupiah = (value: string) => {
        return Number(value.replace(/[^0-9]/g, ''));
    };

    return (
        <form onSubmit={onSubmit} autoComplete="off">
            <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
                <div className="space-y-6 p-6">
                    {/* Informasi Utama */}
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        {/* Nama Layanan */}
                        <div>
                            <Label className="mb-2 block text-sm font-medium text-gray-700">
                                Nama Layanan{' '}
                                <span className="text-red-500">*</span>
                            </Label>
                            <input
                                type="text"
                                value={data.nama_layanan}
                                onChange={(e) =>
                                    setData('nama_layanan', e.target.value)
                                }
                                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                                placeholder="Contoh: Pemeriksaan Umum"
                            />
                            {errors.nama_layanan && (
                                <p className="mt-1 text-xs text-red-500">
                                    {errors.nama_layanan}
                                </p>
                            )}
                        </div>

                        {/* Harga */}
                        <div>
                            <Label className="mb-2 block text-sm font-medium text-gray-700">
                                Harga <span className="text-red-500">*</span>
                            </Label>
                            <input
                                type="text"
                                value={formatRupiah(data.harga)}
                                onChange={(e) =>
                                    setData(
                                        'harga',
                                        parseRupiah(e.target.value),
                                    )
                                }
                                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                                placeholder="Contoh: Rp 50.000"
                            />
                            {errors.harga && (
                                <p className="mt-1 text-xs text-red-500">
                                    {errors.harga}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Status Layanan */}
                    <div className="rounded-lg border border-gray-200 p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <Label className="text-sm font-medium text-gray-700">
                                    Status Layanan
                                </Label>
                                <p className="text-xs text-gray-500">
                                    Tentukan apakah layanan dapat digunakan
                                </p>
                            </div>

                            <div className="flex items-center gap-3">
                                <span
                                    className={`text-sm font-medium ${data.aktif ? 'text-emerald-600' : 'text-gray-400'}`}
                                >
                                    {data.aktif ? 'Aktif' : 'Nonaktif'}
                                </span>
                                <Switch
                                    checked={data.aktif}
                                    onCheckedChange={(value) =>
                                        setData('aktif', value)
                                    }
                                    className="data-[state=checked]:bg-emerald-600"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Detail Layanan */}
                    <div>
                        <Label className="mb-2 block text-sm font-medium text-gray-700">
                            Detail Layanan{' '}
                            <span className="text-red-500">*</span>
                        </Label>
                        <textarea
                            value={data.keterangan}
                            onChange={(e) =>
                                setData('keterangan', e.target.value)
                            }
                            className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                            placeholder="Jelaskan layanan secara singkat dan jelas"
                            rows={4}
                        />
                        <p className="mt-1 text-xs text-gray-500">
                            Contoh: Pemeriksaan meliputi cek tekanan darah dan
                            konsultasi
                        </p>
                        {errors.keterangan && (
                            <p className="mt-1 text-xs text-red-500">
                                {errors.keterangan}
                            </p>
                        )}
                    </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3 border-t border-gray-200 bg-gray-50 px-6 py-4">
                    <Link
                        href="/admin/layanan"
                        className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                        Batal
                    </Link>
                    <button
                        type="submit"
                        disabled={processing || !isDirty}
                        className={`rounded-lg px-4 py-2.5 text-sm font-medium text-white transition disabled:cursor-not-allowed ${
                            processing || !isDirty
                                ? 'bg-emerald-600 opacity-50'
                                : 'bg-emerald-600 hover:bg-emerald-700'
                        }`}
                    >
                        {processing ? 'Menyimpan...' : 'Simpan'}
                    </button>
                </div>
            </div>
        </form>
    );
};

export default FormEditLayananAdmin;
