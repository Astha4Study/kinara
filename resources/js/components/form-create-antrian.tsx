import { Link } from '@inertiajs/react';
import clsx from 'clsx';
import { ChevronDown, ChevronUp } from 'lucide-react';
import React, { useState } from 'react';

interface Pasien {
    id: number;
    nama_lengkap: string;
    golongan_darah: string;
    riwayat_penyakit: string;
    alergi: string;
    jenis_kelamin: string;
    umur: number;
}

interface FormCreateAntrianProps {
    pasien: Pasien;
    data: {
        pasien_id: number;
        keluhan: string;
        tanggal_kunjungan: string;
        berat_badan: number;
        tinggi_badan: number;
        suhu_tubuh: number;
        tekanan_darah: string;
        kondisi_khusus: string;
    };
    setData: (key: string, value: any) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    processing: boolean;
    errors?: Record<string, string>;
}

function Highlight({
    label,
    value,
    className,
}: {
    label: string;
    value?: string;
    className?: string;
}) {
    return (
        <div className={clsx(className)}>
            <label className="mb-1 block text-sm font-semibold text-emerald-700">
                {label}
            </label>
            <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-sm font-medium text-emerald-900">
                {value || '-'}
            </div>
        </div>
    );
}

const FormCreateAntrian: React.FC<FormCreateAntrianProps> = ({
    pasien,
    data,
    setData,
    handleSubmit,
    processing,
}) => {
    const [showMore, setShowMore] = useState(false);

    return (
        <form onSubmit={handleSubmit} autoComplete="off" className="space-y-6">
            <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
                <div className="p-6">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <Highlight
                            label="Nama Pasien"
                            value={pasien.nama_lengkap}
                        />

                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Golongan Darah
                            </label>
                            <input
                                type="text"
                                value={pasien.golongan_darah}
                                disabled
                                className="w-full rounded-lg border border-gray-200 bg-gray-100 px-4 py-2.5 text-sm text-gray-600"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Riwayat Penyakit
                            </label>
                            <input
                                type="text"
                                value={pasien.riwayat_penyakit}
                                disabled
                                className="w-full rounded-lg border border-gray-200 bg-gray-100 px-4 py-2.5 text-sm text-gray-600"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Alergi
                            </label>
                            <input
                                type="text"
                                value={pasien.alergi}
                                disabled
                                className="w-full rounded-lg border border-gray-200 bg-gray-100 px-4 py-2.5 text-sm text-gray-600"
                            />
                        </div>

                        {showMore && (
                            <>
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Jenis Kelamin
                                    </label>
                                    <input
                                        type="text"
                                        value={
                                            pasien.jenis_kelamin === 'L'
                                                ? 'Laki-laki'
                                                : 'Perempuan'
                                        }
                                        disabled
                                        className="w-full rounded-lg border border-gray-200 bg-gray-100 px-4 py-2.5 text-sm text-gray-600"
                                    />
                                </div>

                                <Highlight
                                    label="Umur Pasien"
                                    value={`${pasien.umur} Tahun`}
                                />

                                {/* Tanggal Kunjungan */}
                                <div className="md:col-span-2">
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Tanggal Kunjungan
                                    </label>
                                    <input
                                        type="date"
                                        name="tanggal_kunjungan"
                                        value={data.tanggal_kunjungan}
                                        disabled
                                        className="w-full rounded-lg border border-gray-200 bg-gray-100 px-4 py-2.5 text-sm"
                                    />
                                </div>
                            </>
                        )}
                    </div>
                    {/* Tombol Show More / Less */}
                    <div className="mt-4 text-center">
                        <button
                            type="button"
                            onClick={() => setShowMore((v) => !v)}
                            className="inline-flex items-center text-sm text-emerald-600"
                        >
                            {showMore ? (
                                <>
                                    Tampilkan Lebih Sedikit{' '}
                                    <ChevronUp className="h-4 w-4" />
                                </>
                            ) : (
                                <>
                                    Tampilkan Lebih Banyak{' '}
                                    <ChevronDown className="h-4 w-4" />
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
                <div className="p-6">
                    {/* Keluhan */}
                    <div className="mb-6 md:col-span-2">
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Keluhan
                        </label>
                        <textarea
                            name="keluhan"
                            value={data.keluhan}
                            onChange={(e) => setData('keluhan', e.target.value)}
                            rows={3}
                            placeholder="Contoh: demam sejak 2 hari, pusing, mual"
                            className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm"
                        />
                    </div>

                    {/* Pemeriksaan Fisik */}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Berat Badan{' '}
                                <span className="text-red-500">*</span>
                            </label>
                            <div className="relative w-full">
                                <input
                                    type="number"
                                    value={data.berat_badan || ''}
                                    onChange={(e) => {
                                        const val = parseFloat(e.target.value);
                                        if (!isNaN(val) && val >= 0) {
                                            setData(
                                                'berat_badan',
                                                e.target.value,
                                            );
                                        } else if (e.target.value === '') {
                                            setData('berat_badan', '');
                                        }
                                    }}
                                    placeholder="65"
                                    className="w-full rounded-lg border border-gray-200 px-4 py-2.5 pr-10 text-sm"
                                    required
                                />
                                <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-sm text-gray-500">
                                    kg
                                </span>
                            </div>
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Tinggi Badan
                            </label>
                            <div className="relative w-full">
                                <input
                                    type="number"
                                    value={data.tinggi_badan || ''}
                                    onChange={(e) => {
                                        const val = parseFloat(e.target.value);
                                        if (!isNaN(val) && val >= 0) {
                                            setData(
                                                'tinggi_badan',
                                                e.target.value,
                                            );
                                        } else if (e.target.value === '') {
                                            setData('tinggi_badan', '');
                                        }
                                    }}
                                    placeholder="170"
                                    className="w-full rounded-lg border border-gray-200 px-4 py-2.5 pr-10 text-sm"
                                />
                                <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-sm text-gray-500">
                                    cm
                                </span>
                            </div>
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Suhu Tubuh
                            </label>
                            <div className="relative w-full">
                                <input
                                    type="number"
                                    step="0.1"
                                    value={data.suhu_tubuh || ''}
                                    onChange={(e) => {
                                        const val = parseFloat(e.target.value);
                                        if (!isNaN(val) && val >= 0) {
                                            setData(
                                                'suhu_tubuh',
                                                e.target.value,
                                            );
                                        } else if (e.target.value === '') {
                                            setData('suhu_tubuh', '');
                                        }
                                    }}
                                    placeholder="36.8"
                                    className="w-full rounded-lg border border-gray-200 px-4 py-2.5 pr-10 text-sm"
                                />
                                <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-sm text-gray-500">
                                    °C
                                </span>
                            </div>
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Tekanan Darah{' '}
                                <span className="text-red-500">*</span>
                            </label>
                            <div className="relative w-full">
                                <input
                                    type="text"
                                    value={data.tekanan_darah || ''}
                                    onChange={(e) => {
                                        const raw = e.target.value.replace(
                                            /[^0-9/]/g,
                                            '',
                                        );
                                        setData('tekanan_darah', raw);
                                    }}
                                    placeholder="120/80"
                                    className="w-full rounded-lg border border-gray-200 px-4 py-2.5 pr-10 text-sm"
                                    required
                                />
                                <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-sm text-gray-500">
                                    mmHg
                                </span>
                            </div>
                        </div>

                        <div className="md:col-span-2">
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Kondisi Khusus
                            </label>
                            <textarea
                                value={data.kondisi_khusus || ''}
                                onChange={(e) =>
                                    setData('kondisi_khusus', e.target.value)
                                }
                                rows={2}
                                placeholder="Contoh: hamil 6 bulan, alergi obat tertentu, disabilitas"
                                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm"
                            />
                        </div>
                    </div>
                </div>

                {/* Tombol Aksi */}
                <div className="flex justify-end gap-3 border-t border-gray-200 bg-gray-50 px-6 py-4">
                    <Link
                        href="/resepsionis/antrian"
                        className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                        Batal
                    </Link>
                    <button
                        type="submit"
                        disabled={processing}
                        className="rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-50"
                    >
                        {processing ? 'Menyimpan...' : 'Simpan Antrian'}
                    </button>
                </div>
            </div>
        </form>
    );
};

export default FormCreateAntrian;
