<?php

namespace App\Http\Controllers;

use App\Models\Pembayaran;
use App\Models\Resep;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ResepsionisPembayaranController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $pembayarans = Pembayaran::with([
            'resep.pasien:id,nama_lengkap,nomor_pasien',
            'resep.dokter.user:id,name',
            'catatanLayanan.pasien:id,nama_lengkap,nomor_pasien',
            'catatanLayanan.dokter.user:id,name',
        ])
            ->where('status', 'pending')
            ->where('klinik_id', auth()->user()->klinik_id)
            ->orderBy('created_at', 'asc')
            ->get()
            ->map(function ($pembayaran) {

                // 🟢 Ambil sumber data
                if ($pembayaran->resep_id) {
                    $pasien = $pembayaran->resep->pasien;
                    $dokter = $pembayaran->resep->dokter;
                } else {
                    $pasien = $pembayaran->catatanLayanan->pasien;
                    $dokter = $pembayaran->catatanLayanan->dokter;
                }

                return [
                    'id' => $pembayaran->id,
                    'nomor_pasien' => $pasien->nomor_pasien ?? '-',
                    'pasien_nama' => $pasien->nama_lengkap ?? '-',
                    'dokter_nama' => $dokter->user->name ?? '-',
                    'total_harga' => $pembayaran->total_bayar,
                    'status_pembayaran' => $pembayaran->status,
                    'tanggal' => $pembayaran->created_at->toISOString(),
                ];
            });

        return Inertia::render('Resepsionis/Pembayaran/Index', [
            'reseps' => $pembayarans,
        ]);
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create($id)
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, $id)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $pembayaran = Pembayaran::with([
            'resep.pasien',
            'resep.dokter.user',
            'resep.resepDetail.obat',
            'catatanLayanan.pasien',
            'catatanLayanan.dokter.user',
            'catatanLayanan.detail.layanan',
        ])
            ->where('status', 'pending')
            ->where('klinik_id', auth()->user()->klinik_id)
            ->findOrFail($id);

        if ($pembayaran->resep_id) {
            $resep = $pembayaran->resep;

            return Inertia::render('Resepsionis/Pembayaran/Edit', [
                'pembayaran' => [
                    'id' => $pembayaran->id,
                    'total_harga' => $pembayaran->total_bayar,
                    'status' => $pembayaran->status,
                    'pasien' => [
                        'nama_lengkap' => $resep->pasien->nama_lengkap,
                        'nomor_pasien' => $resep->pasien->nomor_pasien,
                        'nik' => $resep->pasien->nik,
                    ],
                    'dokter' => [
                        'nama' => $resep->dokter->user->name ?? '-',
                    ],
                    'detail' => $resep->resepDetail->map(fn($d) => [
                        'nama' => $d->obat->nama_obat,
                        'jumlah' => $d->jumlah,
                        'harga' => $d->harga_satuan,
                        'subtotal' => $d->jumlah * $d->harga_satuan,
                    ]),
                ],
            ]);
        }

        $catatan = $pembayaran->catatanLayanan;

        return Inertia::render('Resepsionis/Pembayaran/Edit', [
            'pembayaran' => [
                'id' => $pembayaran->id,
                'total_harga' => $pembayaran->total_bayar,
                'status' => $pembayaran->status,
                'pasien' => [
                    'nama_lengkap' => $catatan->pasien->nama_lengkap,
                    'nomor_pasien' => $catatan->pasien->nomor_pasien,
                    'nik' => $catatan->pasien->nik ?? '-',
                ],
                'dokter' => [
                    'nama' => $catatan->dokter->user->name ?? '-',
                ],
                'detail' => $catatan->detail->map(fn($d) => [
                    'nama' => $d->layanan->nama_layanan,
                    'jumlah' => 1,
                    'harga' => $d->layanan->harga,
                    'subtotal' => $d->layanan->harga,
                ]),
            ],
        ]);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'uang_dibayar' => 'required|numeric|min:0',
            'metode_pembayaran' => 'nullable|string',
        ]);

        return DB::transaction(function () use ($request, $id) {

            $pembayaran = Pembayaran::lockForUpdate()
                ->where('status', 'pending')
                ->where('klinik_id', auth()->user()->klinik_id)
                ->findOrFail($id);

            $total = $pembayaran->total_bayar;
            $uang = $request->uang_dibayar;

            if ($uang < $total) {
                return back()->withErrors([
                    'uang_dibayar' => 'Uang yang dibayarkan kurang dari total harga.',
                ]);
            }

            $kembalian = $uang - $total;

            $pembayaran->update([
                'resepsionis_id' => auth()->id(),
                'status' => 'lunas',
            ]);

            $pembayaran->detail()->updateOrCreate(
                ['pembayaran_id' => $pembayaran->id],
                [
                    'uang_dibayar' => $uang,
                    'kembalian' => $kembalian,
                    'metode_pembayaran' => $request->metode_pembayaran ?? 'cash',
                ]
            );

            return redirect()
                ->route('resepsionis.pembayaran.index')
                ->with(
                    'success',
                    'Pembayaran berhasil. Kembalian: Rp ' .
                    number_format($kembalian, 0, ',', '.')
                );
        });
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
