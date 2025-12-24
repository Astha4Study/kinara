import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type LayananItem = {
    layanan_id: number;
    nama_layanan: string;
};

type CatatanForm = {
    antrian_id: number;
    pemeriksaan_fisik_id: number | null;
    pasien_id: number;
    klinik_id: number;
    keluhan_utama: string;
    detail_keluhan: string;
    diagnosa: string;
    tindakan: string;
    catatan_lain: string;
    layanan: LayananItem[];
    butuh_resep: boolean;
};

type Store = {
    data: CatatanForm;
    processing: boolean;
    errors: Record<string, string>;
    setData: <K extends keyof CatatanForm>(
        key: K,
        value: CatatanForm[K],
    ) => void;
    setProcessing: (v: boolean) => void;
    setErrors: (e: Record<string, string>) => void;
    reset: () => void;
};

const initial: CatatanForm = {
    antrian_id: 0,
    pemeriksaan_fisik_id: null,
    pasien_id: 0,
    klinik_id: 0,
    keluhan_utama: '',
    detail_keluhan: '',
    diagnosa: '',
    tindakan: '',
    catatan_lain: '',
    layanan: [],
    butuh_resep: true,
};

export const useCatatanLayananStore = create<Store>()(
    persist(
        (set) => ({
            data: { ...initial },
            processing: false,
            errors: {},
            setData: (key, value) =>
                set((s) => ({ data: { ...s.data, [key]: value } })),
            setProcessing: (v) => set({ processing: v }),
            setErrors: (e) => set({ errors: e }),
            reset: () =>
                set({
                    data: { ...initial },
                    processing: false,
                    errors: {},
                }),
        }),
        {
            name: 'catatan-layanan',
            partialize: (s) => ({ data: s.data }),
        },
    ),
);
