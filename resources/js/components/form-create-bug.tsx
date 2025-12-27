import { Link } from '@inertiajs/react';
import React from 'react';

type DampakPelapor = 'rendah' | 'sedang' | 'tinggi';

interface FormCreateBugReportProps {
    data: {
        judul: string;
        deskripsi: string;
        dampak_pelapor: DampakPelapor;
    };
    setData: (key: string, value: any) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    handleChange: (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >,
    ) => void;
    processing: boolean;
    errors: Record<string, string>;
}

const FormCreateBugReport: React.FC<FormCreateBugReportProps> = ({
    data,
    setData,
    handleSubmit,
    handleChange,
    processing,
    errors,
}) => {
    return (
        <form onSubmit={handleSubmit} autoComplete="off">
            <div className="p-6">
                <div className="grid grid-cols-1 gap-6">
                    {/* Judul Bug */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Judul Bug <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="judul"
                            value={data.judul}
                            required
                            onChange={handleChange}
                            placeholder="Contoh: Error saat menyimpan data pasien"
                            className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm"
                        />
                        {errors.judul && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.judul}
                            </p>
                        )}
                    </div>

                    {/* Dampak Bug */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Dampak Bug <span className="text-red-500">*</span>
                        </label>
                        <select
                            name="dampak_pelapor"
                            value={data.dampak_pelapor}
                            onChange={handleChange}
                            required
                            className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm"
                        >
                            <option value="rendah">
                                Rendah – Tidak mengganggu operasional
                            </option>
                            <option value="sedang">
                                Sedang – Menghambat sebagian proses
                            </option>
                            <option value="tinggi">
                                Tinggi – Mengganggu operasional utama
                            </option>
                        </select>
                        {errors.dampak_pelapor && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.dampak_pelapor}
                            </p>
                        )}
                    </div>

                    {/* Deskripsi Bug */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Deskripsi Bug{' '}
                            <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            name="deskripsi"
                            value={data.deskripsi}
                            onChange={handleChange}
                            rows={5}
                            required
                            placeholder="Jelaskan kronologi bug secara jelas, termasuk langkah sebelum bug muncul"
                            className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm"
                        />
                        {errors.deskripsi && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.deskripsi}
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 border-t border-gray-200 bg-gray-50 px-6 py-4">
                <Link
                    href="/admin/bug-reports"
                    className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                    Batal
                </Link>
                <button
                    type="submit"
                    disabled={processing}
                    className="rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-50"
                >
                    {processing ? 'Mengirim...' : 'Kirim Laporan'}
                </button>
            </div>
        </form>
    );
};

export default FormCreateBugReport;
