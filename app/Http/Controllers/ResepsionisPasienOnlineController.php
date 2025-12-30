<?php

namespace App\Http\Controllers;

use App\Models\Pasien;
use App\Models\PasienOnline;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ResepsionisPasienOnlineController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $pasienOnline = PasienOnline::with('klinik')
            ->latest()
            ->paginate(10);

        return Inertia::render('Resepsionis/PasienOnline/Index', [
            'pasienOnline' => $pasienOnline,
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
    public function show(PasienOnline $pasienOnline)
    {
        return Inertia::render('Resepsionis/PasienOnline/Show', [
            'pasienOnline' => $pasienOnline->load('klinik'),
        ]);

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(PasienOnline $pasienOnline)
    {
        return Inertia::render('Resepsionis/PasienOnline/Edit', [
            'pasienOnline' => $pasienOnline->load('klinik'),
        ]);

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, PasienOnline $pasienOnline)
    {
        $validated = $request->validate([
            'status' => 'required|in:pending,terverifikasi,ditolak',
            'nama_lengkap' => 'required|string|max:255',
            'nik' => 'required|string|max:16|unique:pasien_online,nik,'.$pasienOnline->id,
            'jenis_kelamin' => 'required|in:L,P',
            'tanggal_lahir' => 'required|date',
            'tempat_lahir' => 'nullable|string|max:255',
            'alamat' => 'required|string|max:255',
            'no_hp' => 'nullable|string|max:18',
            'golongan_darah' => 'nullable|string|max:3',
            'riwayat_penyakit' => 'nullable|string',
            'alergi' => 'nullable|string',
        ]);

        $pasienOnline->update($validated);

        // Jika status terverifikasi, buat pasien baru di tabel pasien
        if ($validated['status'] === 'terverifikasi') {
            Pasien::create([
                'nama_lengkap' => $pasienOnline->nama_lengkap,
                'nik' => $pasienOnline->nik,
                'jenis_kelamin' => $pasienOnline->jenis_kelamin,
                'tanggal_lahir' => $pasienOnline->tanggal_lahir,
                'tempat_lahir' => $pasienOnline->tempat_lahir,
                'alamat' => $pasienOnline->alamat,
                'no_hp' => $pasienOnline->no_hp,
                'golongan_darah' => $pasienOnline->golongan_darah,
                'riwayat_penyakit' => $pasienOnline->riwayat_penyakit,
                'alergi' => $pasienOnline->alergi,
                'klinik_id' => $pasienOnline->klinik_id,
                'created_by' => auth()->id(),
            ]);
        }

        return redirect()->route('resepsionis.pasien-online.index')
            ->with('success', 'Pasien online berhasil diverifikasi.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
