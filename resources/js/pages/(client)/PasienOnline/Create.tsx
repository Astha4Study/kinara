import PendaftaranOnlineKlinikAside from '@/components/pendaftaran-online-klinik-aside';
import KlinikLayout from '@/layouts/klinik-layout';
import { useForm, usePage } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import { route } from 'ziggy-js';

type Klinik = {
    id: number;
    nama_klinik: string;
    jenis_klinik: string;
    alamat?: string;
    kota?: string;
    provinsi?: string;
    no_telepon?: string;
    kapasitas_total?: number;
    kapasitas_tersedia?: number;
    gambar?: string;
};

export default function PasienOnlineCreatePage() {
    const { klinik, slug } = usePage<{ klinik: Klinik; slug: string }>().props;

    const { data, setData, post, processing, errors } = useForm({
        nama_lengkap: '',
        nik: '',
        jenis_kelamin: '',
        tanggal_lahir: '',
        tempat_lahir: '',
        alamat: '',
        no_hp: '',
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    ) => {
        setData(e.target.name as keyof typeof data, e.target.value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('daftar-online.store', { slug })); // ✅ pakai slug dari props
    };

    return (
        <KlinikLayout>
            <div className="mx-auto max-w-6xl px-4 py-10">
                {/* Back */}
                <button
                    onClick={() => window.history.back()}
                    className="mb-6 inline-flex items-center gap-1 rounded-full border bg-emerald-600 px-2 py-1.5 text-sm font-medium text-white hover:bg-emerald-700"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Kembali
                </button>

                {/* GRID */}
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {/* ASIDE KLINIK */}
                    <PendaftaranOnlineKlinikAside klinik={klinik} />

                    {/* FORM */}
                    <div className="lg:col-span-2">
                        <div className="rounded-2xl border bg-white shadow-sm">
                            <div className="border-b px-6 py-4">
                                <h2 className="text-lg font-semibold text-gray-900">
                                    Data Pasien
                                </h2>
                                <p className="mt-1 text-sm text-gray-500">
                                    Isi data sesuai identitas resmi
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} autoComplete="off">
                                <div className="p-6">
                                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                        {/* Nama Lengkap */}
                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                                Nama Lengkap{' '}
                                                <span className="text-red-500">
                                                    *
                                                </span>
                                            </label>
                                            <input
                                                type="text"
                                                name="nama_lengkap"
                                                value={data.nama_lengkap}
                                                onChange={handleChange}
                                                placeholder="Nama sesuai KTP"
                                                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-emerald-500 focus:ring-emerald-500"
                                            />
                                            {errors.nama_lengkap && (
                                                <p className="mt-1 text-xs text-red-600">
                                                    {errors.nama_lengkap}
                                                </p>
                                            )}
                                        </div>

                                        {/* NIK */}
                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                                NIK{' '}
                                                <span className="text-red-500">
                                                    *
                                                </span>
                                            </label>
                                            <input
                                                type="text"
                                                name="nik"
                                                value={data.nik}
                                                onChange={handleChange}
                                                maxLength={16}
                                                placeholder="16 digit NIK"
                                                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-emerald-500 focus:ring-emerald-500"
                                            />
                                            {errors.nik && (
                                                <p className="mt-1 text-xs text-red-600">
                                                    {errors.nik}
                                                </p>
                                            )}
                                        </div>

                                        {/* Jenis Kelamin */}
                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                                Jenis Kelamin{' '}
                                                <span className="text-red-500">
                                                    *
                                                </span>
                                            </label>
                                            <select
                                                name="jenis_kelamin"
                                                value={data.jenis_kelamin}
                                                onChange={handleChange}
                                                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-emerald-500 focus:ring-emerald-500"
                                            >
                                                <option value="">
                                                    Pilih Jenis Kelamin
                                                </option>
                                                <option value="L">
                                                    Laki-laki
                                                </option>
                                                <option value="P">
                                                    Perempuan
                                                </option>
                                            </select>
                                            {errors.jenis_kelamin && (
                                                <p className="mt-1 text-xs text-red-600">
                                                    {errors.jenis_kelamin}
                                                </p>
                                            )}
                                        </div>

                                        {/* Tanggal Lahir */}
                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                                Tanggal Lahir{' '}
                                                <span className="text-red-500">
                                                    *
                                                </span>
                                            </label>
                                            <input
                                                type="date"
                                                name="tanggal_lahir"
                                                value={data.tanggal_lahir}
                                                onChange={handleChange}
                                                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-emerald-500 focus:ring-emerald-500"
                                            />
                                            {errors.tanggal_lahir && (
                                                <p className="mt-1 text-xs text-red-600">
                                                    {errors.tanggal_lahir}
                                                </p>
                                            )}
                                        </div>

                                        {/* Nomor HP */}
                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                                Nomor HP{' '}
                                                <span className="text-red-500">
                                                    *
                                                </span>
                                            </label>
                                            <input
                                                type="text"
                                                name="no_hp"
                                                value={data.no_hp}
                                                onChange={handleChange}
                                                placeholder="08xxxxxxxxxx"
                                                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-emerald-500 focus:ring-emerald-500"
                                            />
                                            {errors.no_hp && (
                                                <p className="mt-1 text-xs text-red-600">
                                                    {errors.no_hp}
                                                </p>
                                            )}
                                        </div>

                                        {/* Alamat */}
                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                                Alamat{' '}
                                                <span className="text-red-500">
                                                    *
                                                </span>
                                            </label>
                                            <input
                                                type="text"
                                                name="alamat"
                                                value={data.alamat}
                                                onChange={handleChange}
                                                placeholder="Alamat lengkap domisili"
                                                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-emerald-500 focus:ring-emerald-500"
                                            />
                                            {errors.alamat && (
                                                <p className="mt-1 text-xs text-red-600">
                                                    {errors.alamat}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Submit */}
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="mt-8 w-full rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white shadow hover:bg-emerald-700 focus:ring-2 focus:ring-emerald-500 focus:outline-none disabled:opacity-50"
                                    >
                                        {processing
                                            ? 'Mengirim...'
                                            : 'Daftar Antrian Online'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </KlinikLayout>
    );
}
