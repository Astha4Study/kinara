import { Link } from '@inertiajs/react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import React, { useState } from 'react';

type Pasien = {
    id: number;
    nama_lengkap: string;
    nomor_pasien?: string;
    nik?: string | number;
    tanggal_lahir?: string | null;
    tempat_lahir?: string;
    no_hp?: string | number;
    golongan_darah?: string | null;
    riwayat_penyakit?: string | null;
    alergi?: string | null;
};

type PemeriksaanFisik = {
    berat_badan: number | null;
    tinggi_badan: number | null;
    suhu_tubuh: number | null;
    tekanan_darah: string | null;
    kondisi_khusus: string | null;
};

type Data = {
    pemeriksaan_fisik_id: number;
    keluhan_utama: string;
    detail_keluhan: string;
    diagnosa: string;
    tindakan: string;
    catatan_lain: string;
};

interface Props {
    pasien: Pasien;
    punyaServer: number;
    pemeriksaanFisik?: PemeriksaanFisik | null;
    data: Data;
    setData: (k: keyof Data, v: any) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    processing: boolean;
    errors: Record<string, string>;
}

const FormCreateCatatanLayanan: React.FC<Props> = ({
    pasien,
    punyaServer,
    pemeriksaanFisik,
    data,
    setData,
    handleSubmit,
    processing,
    errors,
}) => {
    const [showMore, setShowMore] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setData(e.target.name as keyof Data, e.target.value);
    };

    const formatDate = (d?: string | null) => {
        if (!d) return '-';
        try {
            const dt = new Date(d);
            if (isNaN(dt.getTime())) return String(d);
            return dt.toLocaleDateString('id-ID');
        } catch {
            return String(d);
        }
    };

    return (
        <form onSubmit={handleSubmit} autoComplete="off" className="space-y-6">
            {/* Data Pasien */}
            <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
                <div className="p-6">
                    <div className="mb-4">
                        <h3 className="text-base font-semibold text-gray-800">
                            Data Pasien
                        </h3>
                        <p className="text-sm text-gray-500">
                            Data lengkap pasien
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        {/* Nama Lengkap */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Nama Lengkap
                            </label>
                            <input
                                type="text"
                                value={pasien.nama_lengkap}
                                disabled
                                className="w-full cursor-not-allowed rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-700"
                            />
                        </div>

                        {/* Nomor Pasien */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Nomor Pasien
                            </label>
                            <input
                                type="text"
                                value={pasien.nomor_pasien ?? '-'}
                                disabled
                                className="w-full cursor-not-allowed rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-700"
                            />
                        </div>

                        {/* Baris-baris lain TAMPIL JIKA showMore = true */}
                        {showMore && (
                            <>
                                {/* NIK */}
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        NIK
                                    </label>
                                    <input
                                        type="text"
                                        value={pasien.nik ?? '-'}
                                        disabled
                                        className="w-full cursor-not-allowed rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-700"
                                    />
                                </div>

                                {/* Tanggal Lahir */}
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Tanggal Lahir
                                    </label>
                                    <input
                                        type="text"
                                        value={formatDate(pasien.tanggal_lahir)}
                                        disabled
                                        className="w-full cursor-not-allowed rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-700"
                                    />
                                </div>

                                {/* Tempat Lahir */}
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Tempat Lahir
                                    </label>
                                    <input
                                        type="text"
                                        value={pasien.tempat_lahir ?? '-'}
                                        disabled
                                        className="w-full cursor-not-allowed rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-700"
                                    />
                                </div>

                                {/* No. HP */}
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        No. HP
                                    </label>
                                    <input
                                        type="text"
                                        value={pasien.no_hp ?? '-'}
                                        disabled
                                        className="w-full cursor-not-allowed rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-700"
                                    />
                                </div>

                                {/* Golongan Darah */}
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Golongan Darah
                                    </label>
                                    <input
                                        type="text"
                                        value={pasien.golongan_darah ?? '-'}
                                        disabled
                                        className="w-full cursor-not-allowed rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-700"
                                    />
                                </div>

                                {/* Riwayat Penyakit */}
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Riwayat Penyakit
                                    </label>
                                    <input
                                        type="text"
                                        value={pasien.riwayat_penyakit ?? '-'}
                                        disabled
                                        className="w-full cursor-not-allowed rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-700"
                                    />
                                </div>

                                {/* Alergi */}
                                <div className="md:col-span-2">
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Alergi
                                    </label>
                                    <textarea
                                        value={pasien.alergi ?? '-'}
                                        disabled
                                        rows={2}
                                        className="w-full cursor-not-allowed rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-700"
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

            {/* Bagian Pemeriksaan Fisik */}
            <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
                <div className="p-6">
                    <div className="mb-4">
                        <h3 className="text-base font-semibold text-gray-800">
                            Pemeriksaan Fisik
                        </h3>
                        <p className="text-sm text-gray-500">
                            Data hasil pemeriksaan fisik pasien
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {/* Berat Badan */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Berat Badan
                            </label>
                            <input
                                type="text"
                                value={
                                    pemeriksaanFisik?.berat_badan !== null
                                        ? `${pemeriksaanFisik?.berat_badan} kg`
                                        : '-'
                                }
                                disabled
                                className="w-full cursor-not-allowed rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-700"
                            />
                        </div>

                        {/* Tinggi Badan */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Tinggi Badan
                            </label>
                            <input
                                type="text"
                                value={
                                    pemeriksaanFisik?.tinggi_badan !== null
                                        ? `${pemeriksaanFisik?.tinggi_badan} cm`
                                        : '-'
                                }
                                disabled
                                className="w-full cursor-not-allowed rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-700"
                            />
                        </div>

                        {/* Suhu Tubuh */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Suhu Tubuh
                            </label>
                            <input
                                type="text"
                                value={
                                    pemeriksaanFisik?.berat_badan !== null
                                        ? `${pemeriksaanFisik?.berat_badan} kg`
                                        : '-'
                                }
                                disabled
                                className="w-full cursor-not-allowed rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-700"
                            />
                        </div>

                        {/* Tekanan Darah */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Tekanan Darah
                            </label>
                            <input
                                type="text"
                                value={pemeriksaanFisik?.tekanan_darah ?? '-'}
                                disabled
                                className="w-full cursor-not-allowed rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-700"
                            />
                        </div>

                        {/* Kondisi Khusus */}
                        <div className="col-span-2">
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Kondisi Khusus
                            </label>
                            <input
                                type="text"
                                value={pemeriksaanFisik?.kondisi_khusus ?? '-'}
                                disabled
                                className="w-full cursor-not-allowed rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-700"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
                <div className="p-6">
                    {/* Keluhan Utama */}
                    <div className="mb-4">
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Keluhan Utama
                        </label>
                        <textarea
                            name="keluhan_utama"
                            value={data.keluhan_utama}
                            readOnly
                            rows={3}
                            className="w-full cursor-not-allowed rounded-lg border border-gray-200 bg-gray-100 px-4 py-2.5 text-sm text-gray-700"
                            placeholder="-"
                        />
                    </div>

                    <div>
                        {punyaServer === 1 ? (
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                {/* Detail Keluhan */}
                                <div className="md:col-span-2">
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Detail Keluhan{' '}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        name="detail_keluhan"
                                        value={data.detail_keluhan}
                                        onChange={handleChange}
                                        rows={3}
                                        placeholder="Jelaskan lebih detail keluhan pasien"
                                        className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm"
                                    />
                                    {errors.detail_keluhan && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.detail_keluhan}
                                        </p>
                                    )}
                                </div>

                                {/* Diagnosa */}
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Diagnosa{' '}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="diagnosa"
                                        value={data.diagnosa}
                                        onChange={handleChange}
                                        placeholder="Contoh: Gastritis, ISPA, dll"
                                        className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm"
                                    />
                                    {errors.diagnosa && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.diagnosa}
                                        </p>
                                    )}
                                </div>

                                {/* Tindakan */}
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Tindakan{' '}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="tindakan"
                                        value={data.tindakan}
                                        onChange={handleChange}
                                        placeholder="Contoh: Resep obat, Rujuk, Observasi"
                                        className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm"
                                    />
                                    {errors.tindakan && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.tindakan}
                                        </p>
                                    )}
                                </div>

                                {/* Catatan Lain */}
                                <div className="md:col-span-2">
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Catatan Lain
                                    </label>
                                    <textarea
                                        name="catatan_lain"
                                        value={data.catatan_lain}
                                        onChange={handleChange}
                                        rows={2}
                                        placeholder="Catatan tambahan (opsional)"
                                        className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm"
                                    />
                                    {errors.catatan_lain && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.catatan_lain}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-6 text-center shadow-sm">
                                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
                                    <svg
                                        className="h-6 w-6 text-emerald-600"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.79 1.732-3L13.732 4c-.77-1.79-2.502-1.79-3.268 0L3.34 16c-.77 1.79.192 3 1.732 3z"
                                        />
                                    </svg>
                                </div>
                                <h3 className="mb-1 text-sm font-semibold text-emerald-800">
                                    Mode Tanpa Server
                                </h3>
                                <p className="text-sm text-emerald-700">
                                    Data rekam medis lengkap dicatat secara
                                    manual. Informasi yang tersimpan otomatis
                                    hanya nomor pasien, nama, dan keluhan utama.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
                {/* Tombol */}
                <div className="flex justify-end gap-3 border-t border-gray-200 bg-gray-50 px-6 py-4">
                    <Link
                        href="/dokter/antrian"
                        className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                        Batal
                    </Link>
                    <button
                        type="submit"
                        disabled={processing}
                        className="rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-50"
                    >
                        {processing ? 'Membuatkan Resep...' : 'Siapkan Resep'}
                    </button>
                </div>
            </div>
        </form>
    );
};

export default FormCreateCatatanLayanan;
