<?php

namespace App\Http\Controllers;

use App\Models\Pembayaran;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminLaporanKeuanganController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $pembayaran = Pembayaran::with([
            'catatanLayanan.pasien:id,nomor_pasien,nama_lengkap',
            'detail:id,pembayaran_id,uang_dibayar,kembalian,metode_pembayaran',
        ])
            ->where('klinik_id', auth()->user()->klinik_id)
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Admin/LaporanKeuangan/Index', [
            'laporan' => $pembayaran->map(fn($p) => [
                'id' => $p->id,
                'nomor_pasien' => $p->catatanLayanan?->pasien?->nomor_pasien ?? '-',
                'nama_pasien' => $p->catatanLayanan?->pasien?->nama_lengkap ?? '-',
                'total_bayar' => $p->total_bayar,
                'status' => $p->status,
                'tanggal' => $p->created_at->format('d F Y'),
            ]),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $pembayaran = Pembayaran::with([
            'catatanLayanan.pasien:id,nomor_pasien,nama_lengkap,nik,jenis_kelamin,tanggal_lahir,alamat,no_hp',
            'detail:id,pembayaran_id,uang_dibayar,kembalian,metode_pembayaran,created_at',
        ])->findOrFail($id);

        return Inertia::render('Admin/LaporanKeuangan/Show', [
            'laporan' => [
                'id' => $pembayaran->id,
                'nomor_pasien' => $pembayaran->catatanLayanan?->pasien?->nomor_pasien ?? '-',
                'nama_pasien' => $pembayaran->catatanLayanan?->pasien?->nama_lengkap ?? '-',
                'total_bayar' => $pembayaran->total_bayar,
                'status' => $pembayaran->status,
                'tanggal' => $pembayaran->created_at->format('d-m-Y H:i'),
                'detail' => [
                    'uang_dibayar' => $pembayaran->detail?->uang_dibayar ?? 0,
                    'kembalian' => $pembayaran->detail?->kembalian ?? 0,
                    'metode_pembayaran' => $pembayaran->detail?->metode_pembayaran ?? '-',
                    'waktu_bayar' => $pembayaran->detail?->created_at?->format('d-m-Y H:i'),
                ],
                'pasien' => [
                    'nik' => $pembayaran->catatanLayanan?->pasien?->nik ?? '-',
                    'jenis_kelamin' => $pembayaran->catatanLayanan?->pasien?->jenis_kelamin ?? '-',
                    'tanggal_lahir' => $pembayaran->catatanLayanan?->pasien?->tanggal_lahir ?? '-',
                    'alamat' => $pembayaran->catatanLayanan?->pasien?->alamat ?? '-',
                    'no_hp' => $pembayaran->catatanLayanan?->pasien?->no_hp ?? '-',
                ],
            ],
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
