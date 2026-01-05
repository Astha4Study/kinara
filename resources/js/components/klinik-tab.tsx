import { Star } from 'lucide-react';
import { useState } from 'react';

type KlinikTabsProps = {
    deskripsi?: string;
    rating?: number;
};

export default function KlinikTab({ deskripsi, rating }: KlinikTabsProps) {
    const [activeTab, setActiveTab] = useState<'detail' | 'policy' | 'review'>(
        'detail',
    );

    return (
        <div className="space-y-6">
            {/* Tabs */}
            <div className="border-b border-gray-200">
                <nav className="flex gap-8 text-sm font-medium">
                    <button
                        onClick={() => setActiveTab('detail')}
                        className={`pb-3 transition ${
                            activeTab === 'detail'
                                ? 'border-b-2 border-emerald-600 text-emerald-600'
                                : 'text-gray-500 hover:text-gray-800'
                        }`}
                    >
                        Detail Klinik
                    </button>

                    <button
                        onClick={() => setActiveTab('policy')}
                        className={`pb-3 transition ${
                            activeTab === 'policy'
                                ? 'border-b-2 border-emerald-600 text-emerald-600'
                                : 'text-gray-500 hover:text-gray-800'
                        }`}
                    >
                        Kebijakan
                    </button>

                    {/* <button
                        onClick={() => setActiveTab('review')}
                        className={`pb-3 transition ${
                            activeTab === 'review'
                                ? 'border-b-2 border-emerald-600 text-emerald-600'
                                : 'text-gray-500 hover:text-gray-800'
                        }`}
                    >
                        Ulasan
                    </button> */}
                </nav>
            </div>

            {/* Content */}
            {activeTab === 'detail' && (
                <div className="space-y-6 pt-2">
                    <div>
                        <h3 className="mb-2 text-base font-semibold text-gray-900">
                            Tentang Klinik
                        </h3>
                        <p className="max-w-3xl leading-relaxed text-gray-700">
                            {deskripsi ??
                                'Klinik ini menyediakan layanan kesehatan dengan tenaga medis profesional dan fasilitas modern.'}
                        </p>
                    </div>

                    <div>
                        <h3 className="mb-2 text-base font-semibold text-gray-900">
                            Layanan Utama
                        </h3>
                        <ul className="list-disc space-y-1 pl-5 text-sm text-gray-700">
                            <li>Pemeriksaan dan konsultasi dokter</li>
                            <li>Rawat jalan dan rawat inap</li>
                            <li>Tindakan medis dasar</li>
                            <li>Layanan farmasi & laboratorium</li>
                        </ul>
                    </div>
                </div>
            )}

            {activeTab === 'policy' && (
                <div className="space-y-6 pt-2">
                    <div>
                        <h3 className="mb-2 text-base font-semibold text-gray-900">
                            Kebijakan Klinik
                        </h3>
                        <ul className="list-disc space-y-1 pl-5 text-sm text-gray-700">
                            <li>
                                Pendaftaran online disarankan sebelum kedatangan
                            </li>
                            <li>Harap datang 15 menit sebelum jadwal</li>
                            <li>Pembatalan maksimal H-1 jadwal kunjungan</li>
                            <li>
                                Jam operasional dapat berubah pada hari libur
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-2 text-base font-semibold text-gray-900">
                            Metode Pembayaran
                        </h3>
                        <p className="text-sm text-gray-700">
                            Klinik menerima pembayaran tunai, transfer bank, dan
                            asuransi kesehatan tertentu.
                        </p>
                    </div>
                </div>
            )}

            {activeTab === 'review' && (
                <div className="space-y-6 pt-2">
                    <div className="flex items-center gap-2">
                        <Star className="h-5 w-5 text-yellow-400" />
                        <span className="text-lg font-semibold text-gray-900">
                            {rating?.toFixed(1) ?? '4.8'}
                        </span>
                        <span className="text-sm text-gray-500">
                            dari 120 ulasan
                        </span>
                    </div>

                    <div className="space-y-4">
                        {[1, 2, 3].map((_, i) => (
                            <div
                                key={i}
                                className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm"
                            >
                                <div className="flex items-center justify-between">
                                    <p className="font-semibold text-gray-900">
                                        Pasien Anonim
                                    </p>
                                    <div className="flex items-center gap-1 text-sm text-yellow-500">
                                        <Star className="h-4 w-4 fill-yellow-400" />
                                        5.0
                                    </div>
                                </div>

                                <p className="mt-2 text-sm leading-relaxed text-gray-700">
                                    Pelayanan ramah, dokter komunikatif, dan
                                    fasilitas bersih.
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
