import {
    Activity,
    BedDouble,
    Building2,
    CheckCircle2,
    Image,
    Mail,
    MapPin,
    Phone,
    Users,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';

interface KlinikData {
    nama_klinik?: string;
    jenis_klinik?: string;
    alamat?: string;
    kota?: string;
    provinsi?: string;
    no_telepon?: string;
    email?: string;
    deskripsi?: string;
    latitude?: string;
    longitude?: string;
    kapasitas_total?: number;
    kapasitas_tersedia?: number;
    gambar?: File | null;
}

interface PreviewCreateKlinikProps {
    data: KlinikData;
}

const PreviewCreateKlinik: React.FC<PreviewCreateKlinikProps> = ({ data }) => {
    const [gambarPreview, setGambarPreview] = useState<string | null>(null);

    // Buat / revoke URL saat file berubah
    useEffect(() => {
        if (data.gambar) {
            const url = URL.createObjectURL(data.gambar);
            setGambarPreview(url);
            return () => URL.revokeObjectURL(url);
        } else {
            setGambarPreview(null);
        }
    }, [data.gambar]);

    const kapasitasTerisi =
        (data.kapasitas_total ?? 0) - (data.kapasitas_tersedia ?? 0);
    const okupansi =
        data.kapasitas_total && data.kapasitas_total > 0
            ? Math.round((kapasitasTerisi / data.kapasitas_total) * 100)
            : 0;

    return (
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md">
            {/* Hero Image */}
            <div className="relative flex h-48 items-center justify-center overflow-hidden rounded-t-2xl bg-gray-100">
                {gambarPreview ? (
                    <img
                        src={gambarPreview}
                        alt={data.nama_klinik || 'Preview'}
                        className="absolute inset-0 h-full w-full object-cover"
                    />
                ) : (
                    <Image className="h-12 w-12 text-gray-400" />
                )}
                <div className="absolute inset-0 bg-black/30" />

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                    {data.jenis_klinik && (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-600/90 px-2 py-1 text-xs font-semibold text-white shadow-sm">
                            <Building2 className="h-3 w-3" />
                            {data.jenis_klinik}
                        </span>
                    )}
                </div>

                {/* Nama Klinik */}
                <div className="absolute bottom-3 left-3 max-w-[90%] text-white drop-shadow-lg">
                    {data.alamat && (
                        <div className="mb-1 inline-flex items-center gap-1 text-sm">
                            <MapPin size={16} />
                            <p className="line-clamp-2 max-w-[calc(100%-20px)] overflow-hidden">
                                {data.alamat}
                                {data.kota ? `, ${data.kota}` : ''}
                                {data.provinsi ? `, ${data.provinsi}` : ''}
                            </p>
                        </div>
                    )}
                    <h2 className="line-clamp-2 text-lg font-bold">
                        {data.nama_klinik || 'Nama Klinik'}
                    </h2>
                </div>
            </div>

            {/* Deskripsi */}
            <div className="overflow-hidden p-3 text-sm text-gray-700">
                <p className="line-clamp-3">
                    {data.deskripsi || 'Belum ada deskripsi klinik.'}
                </p>
            </div>

            {/* Info Kapasitas */}
            <div className="grid grid-cols-2 gap-2 border-t border-gray-100 p-3 text-xs text-gray-600">
                <div className="flex items-center gap-1">
                    <BedDouble className="h-4 w-4 text-emerald-600" />
                    <span>Total: {data.kapasitas_total ?? 0}</span>
                </div>
                <div className="flex items-center gap-1">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    <span>Tersedia: {data.kapasitas_tersedia ?? 0}</span>
                </div>
                <div className="flex items-center gap-1">
                    <Users className="h-4 w-4 text-emerald-600" />
                    <span>Terisi: {kapasitasTerisi}</span>
                </div>
                <div className="flex items-center gap-1">
                    <Activity className="h-4 w-4 text-emerald-600" />
                    <span>{okupansi}% Okupansi</span>
                </div>
            </div>

            {/* Kontak */}
            <div className="grid grid-cols-2 gap-2 border-t border-gray-100 p-3 text-xs text-gray-600">
                <div className="flex items-center gap-1">
                    <Phone className="h-4 w-4 text-emerald-600" />
                    <span>{data.no_telepon || '-'}</span>
                </div>
                <div className="flex items-center gap-1">
                    <Mail className="h-4 w-4 text-emerald-600" />
                    <span>{data.email || '-'}</span>
                </div>
            </div>

            {/* Koordinat */}
            <div className="flex items-center gap-1 border-t border-gray-100 p-3 text-xs text-gray-600">
                <span className="truncate">
                    {data.latitude && data.longitude
                        ? `${data.latitude}, ${data.longitude}`
                        : 'Koordinat belum diisi'}
                </span>
            </div>
        </div>
    );
};

export default PreviewCreateKlinik;
