<?php

namespace App\Http\Controllers;

use App\Models\Antrian;
use App\Models\CatatanLayanan;
use App\Models\Obat;
use App\Models\Resep;
use App\Models\ResepDetail;
use DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DokterStoreFinalController extends Controller
{
    public function storeFinal(Request $request)
    {
        $request->validate([
            'catatan.antrian_id' => 'required|integer',
            'catatan.pasien_id' => 'required|integer',
            'catatan.klinik_id' => 'required|integer',
            'catatan.detail_keluhan' => 'required|string',
            'catatan.diagnosa' => 'required|string',
            'catatan.tindakan' => 'required|string',
            'obat' => 'required|array|min:1',
        ]);

        $cat = $request->input('catatan');
        $obatInput = $request->input('obat');

        $antrian = Antrian::findOrFail($cat['antrian_id']);
        $klinik = $antrian->klinik;

        $sumberInput = $klinik->punya_server ? 'server' : 'manual';

        dd([
            'auth_user' => Auth::user(),
            'dokter_relation' => Auth::user()->dokter ?? 'NULL',
            'dokter_id' => Auth::user()->dokter->id ?? 'NULL',
            'catatan' => $cat,
            'obatInput' => $obatInput,
            'antrian' => $antrian,
        ]);

        DB::transaction(function () use ($cat, $obatInput, $antrian, $sumberInput) {

            // 1. Simpan catatan layanan
            $catatan = CatatanLayanan::create([
                'sumber_input' => $sumberInput,
                'antrian_id' => $cat['antrian_id'],
                'pasien_id' => $cat['pasien_id'],
                'klinik_id' => $cat['klinik_id'],
                'dokter_id' => Auth::user()->dokter->id,
                'nomor_pasien' => optional($antrian->pasien)->nomor_pasien,
                'tanggal_kunjungan' => now(),
                'keluhan_utama' => $cat['keluhan_utama'] ?? '',
                'detail_keluhan' => $cat['detail_keluhan'],
                'diagnosa' => $cat['diagnosa'],
                'tindakan' => $cat['tindakan'],
                'catatan_lain' => $cat['catatan_lain'] ?? '',
            ]);

            // 2. Header resep
            $resep = Resep::create([
                'catatan_layanan_id' => $catatan->id,
                'pasien_id' => $cat['pasien_id'],
                'klinik_id' => $cat['klinik_id'],
                'dokter_id' => Auth::user()->dokter->id,
                'status' => 'pending',
                'total_harga' => 0,
            ]);

            // 3. Detail obat
            $totalHarga = 0;

            foreach ($obatInput as $item) {
                $obat = Obat::findOrFail($item['obat_id']);
                $sub = $obat->harga * $item['jumlah'];
                $totalHarga += $sub;

                ResepDetail::create([
                    'resep_id' => $resep->id,
                    'obat_id' => $item['obat_id'],
                    'jumlah' => $item['jumlah'],
                    'harga_satuan' => $obat->harga,
                    'aturan_pakai' => $item['penggunaan_obat'] ?? '',
                ]);
            }

            $resep->update(['total_harga' => $totalHarga]);
        });

        return redirect()->route('dokter.catatan-layanan.index')
            ->with('success', 'Catatan & resep berhasil disimpan.');
    }
}
