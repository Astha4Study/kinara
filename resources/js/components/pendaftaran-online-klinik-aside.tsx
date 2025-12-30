import { BedDouble, Building2, MapPin, Phone } from 'lucide-react';

type KlinikAsideProps = {
    klinik: {
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
};

const PendaftaranOnlineKlinikAside = ({ klinik }: KlinikAsideProps) => {
    return (
        <aside className="sticky top-6 space-y-4">
            {/* CARD KLINIK */}
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-md">
                {/* HERO IMAGE */}
                <div className="relative h-44">
                    <img
                        src={klinik.gambar ?? '/placeholder-image.jpg'}
                        alt={klinik.nama_klinik}
                        className="absolute inset-0 h-full w-full object-cover"
                    />

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/30 to-transparent" />

                    {/* Badge */}
                    <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                        {klinik.jenis_klinik && (
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-600/90 px-2 py-1 text-xs font-semibold text-white shadow-sm">
                                <Building2 className="h-3 w-3" />
                                {klinik.jenis_klinik}
                            </span>
                        )}
                    </div>

                    {/* Nama Klinik */}
                    <div className="absolute right-3 bottom-3 left-3 text-white">
                        <h2 className="line-clamp-2 text-lg leading-snug font-bold drop-shadow">
                            {klinik.nama_klinik}
                        </h2>
                    </div>
                </div>

                {/* INFO */}
                <div className="space-y-3 p-4 text-sm text-gray-700">
                    {/* Alamat */}
                    {klinik.alamat && (
                        <div className="flex items-center gap-2">
                            <div className="rounded-md bg-emerald-50 p-1.5">
                                <MapPin className="h-4 w-4 text-emerald-600" />
                            </div>
                            <p className="leading-relaxed">
                                {klinik.alamat}
                                {klinik.kota && `, ${klinik.kota}`}
                                {klinik.provinsi && `, ${klinik.provinsi}`}
                            </p>
                        </div>
                    )}

                    {/* Kapasitas */}
                    {klinik.kapasitas_total !== undefined && (
                        <div className="flex items-center gap-2">
                            <div className="rounded-md bg-emerald-50 p-1.5">
                                <BedDouble className="h-4 w-4 text-emerald-600" />
                            </div>
                            <span>
                                <span className="font-semibold text-gray-900">
                                    {klinik.kapasitas_tersedia}
                                </span>{' '}
                                dari {klinik.kapasitas_total} kamar tersedia
                            </span>
                        </div>
                    )}

                    {/* Telepon */}
                    {klinik.no_telepon && (
                        <div className="flex items-center gap-2">
                            <div className="rounded-md bg-emerald-50 p-1.5">
                                <Phone className="h-4 w-4 text-emerald-600" />
                            </div>
                            <a
                                href={`tel:${klinik.no_telepon}`}
                                className="font-medium text-emerald-600 hover:text-emerald-700"
                            >
                                {klinik.no_telepon}
                            </a>
                        </div>
                    )}
                </div>
            </div>

            {/* NOTE */}
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-xs leading-relaxed text-emerald-700">
                Pendaftaran online hanya untuk{' '}
                <strong>pengambilan antrian</strong>. Konfirmasi dilakukan
                langsung oleh resepsionis saat pasien datang ke klinik.
            </div>
        </aside>
    );
};

export default PendaftaranOnlineKlinikAside;
