import KlinikLayout from '@/layouts/klinik-layout';
import { usePage } from '@inertiajs/react';
import { CheckCircle2, ClipboardCopy, User } from 'lucide-react';

type Klinik = {
    nama_klinik: string;
};

type PasienOnline = {
    nama_lengkap: string;
    nomor_pendaftaran: string;
};

export default function PasienOnlineSuccessPage() {
    const { klinik, pasienOnline } = usePage<{
        klinik: Klinik;
        pasienOnline: PasienOnline;
    }>().props;

    return (
        <KlinikLayout>
            <div className="flex min-h-[80vh] items-center justify-center bg-gray-50 px-4">
                <div className="w-full max-w-md rounded-2xl border bg-white p-6 shadow-sm">
                    {/* Icon */}
                    <div className="mb-4 flex justify-center">
                        <div className="rounded-full bg-emerald-100 p-3">
                            <CheckCircle2 className="h-8 w-8 text-emerald-600" />
                        </div>
                    </div>

                    {/* Title */}
                    <h1 className="mb-2 text-center text-xl font-bold text-gray-900">
                        Pendaftaran Berhasil
                    </h1>
                    <p className="mb-6 text-center text-sm text-gray-600">
                        Terima kasih{' '}
                        <span className="font-semibold text-gray-900">
                            {pasienOnline.nama_lengkap}
                        </span>{' '}
                        telah mendaftar di{' '}
                        <span className="font-semibold text-gray-900">
                            {klinik.nama_klinik}
                        </span>
                        .
                    </p>

                    {/* Nomor Pendaftaran */}
                    <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5 text-center">
                        <p className="mb-1 text-xs font-medium tracking-wide text-emerald-700 uppercase">
                            Nomor Pendaftaran
                        </p>

                        <div className="mt-2 flex items-center justify-center gap-2">
                            <p className="text-2xl font-extrabold tracking-wider text-emerald-900">
                                {pasienOnline.nomor_pendaftaran}
                            </p>
                            <ClipboardCopy
                                className="h-4 w-4 cursor-pointer text-emerald-700 hover:text-emerald-900"
                                onClick={() =>
                                    navigator.clipboard.writeText(
                                        pasienOnline.nomor_pendaftaran,
                                    )
                                }
                            />
                        </div>

                        {/* Info Profil (secondary) */}
                        <div className="mt-3 flex items-center justify-center gap-2 text-xs text-gray-500">
                            <User className="h-3.5 w-3.5" />
                            <span>
                                Nomor ini dapat dilihat kembali di{' '}
                                <strong className="text-gray-700">
                                    halaman profil
                                </strong>
                            </span>
                        </div>
                    </div>

                    {/* Info Datang ke Klinik */}
                    <div className="mt-6 rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-600">
                        <p className="leading-relaxed">
                            Silakan datang ke klinik dan{' '}
                            <strong>tunjukkan nomor pendaftaran</strong> ini
                            kepada resepsionis untuk proses konfirmasi.
                        </p>
                    </div>
                </div>
            </div>
        </KlinikLayout>
    );
}
