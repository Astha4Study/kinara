<?php

namespace App\Http\Controllers;

use App\Models\Antrian;
use App\Models\CatatanLayanan;
use App\Models\Obat;
use App\Models\PemeriksaanFisik;
use App\Models\Resep;
use App\Models\ResepDetail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DokterFinalStoreController extends Controller
{
    public function storeFinal(Request $request)
    {
        $request->validate([
            'catatan.antrian_id' => 'required|integer',
            'catatan.pasien_id' => 'required|integer',
            'catatan.klinik_id' => 'required|integer',
            'resep_teks' => 'required|string',
        ]);

        $cat = $request->input('catatan');
        $resepTeks = $request->input('resep_teks');

        $antrian = Antrian::findOrFail($cat['antrian_id']);

        DB::transaction(function () use ($cat, $antrian, $resepTeks) {

            // Simpan catatan layanan
            $catatan = CatatanLayanan::create([
                'sumber_input' => $antrian->klinik->punya_server ? 'server' : 'manual',
                'pemeriksaan_fisik_id' => $cat['pemeriksaan_fisik_id'] ?? null,
                'antrian_id' => $cat['antrian_id'],
                'pasien_id' => $cat['pasien_id'],
                'klinik_id' => $cat['klinik_id'],
                'dokter_id' => Auth::user()->dokter->id,

                'nomor_pasien' => $antrian->pasien->nomor_pasien ?? null,
                'tanggal_kunjungan' => now(),
                'keluhan_utama' => $cat['keluhan_utama'] ?? '',
                'detail_keluhan' => $cat['detail_keluhan'] ?? '',
                'diagnosa' => $cat['diagnosa'] ?? '',
                'tindakan' => $cat['tindakan'] ?? '',
                'catatan_lain' => $cat['catatan_lain'] ?? '',
            ]);

            // Simpan Resep Teks
            Resep::create([
                'catatan_layanan_id' => $catatan->id,
                'pasien_id' => $cat['pasien_id'],
                'klinik_id' => $cat['klinik_id'],
                'dokter_id' => Auth::user()->dokter->id,
                'resep_teks' => $resepTeks,
                'status' => 'pending',

                'apoteker_id' => null,
                'total_harga' => null,
            ]);

            // Update Status antrian menjadi selesai
            $antrian->update([
                'status' => 'Selesai',
            ]);
        });

        return redirect()
            ->route('dokter.antrian.index')
            ->with('success', 'Resep berhasil dikirim ke apotek');
    }

}
