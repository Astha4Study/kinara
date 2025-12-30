<?php

namespace App\Http\Controllers;

use App\Models\Klinik;
use App\Models\PasienOnline;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ClientPasienOnlineController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(string $slug)
    {
        if (! preg_match('/-(\d+)$/', $slug, $m)) {
            abort(404);
        }
        $id = (int) $m[1];

        $klinik = Klinik::findOrFail($id);
        $klinik->gambar = asset('storage/'.$klinik->gambar);

        return inertia('(client)/PasienOnline/Create', [
            'klinik' => $klinik,
            'slug' => $slug,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, $slug)
    {
        if (! preg_match('/-(\d+)$/', $slug, $m)) {
            abort(404);
        }
        $id = (int) $m[1];
        $klinik = Klinik::findOrFail($id);

        $validated = $request->validate([
            'nama_lengkap' => 'required|string|max:255',
            'nik' => 'required|string|max:16',
            'jenis_kelamin' => 'required|in:L,P',
            'tanggal_lahir' => 'required|date',
            'alamat' => 'required|string',
            'no_hp' => 'required|string|max:18',
        ]);

        $validated['klinik_id'] = $klinik->id;
        $validated['user_id'] = Auth::id();
        $validated['periode_daftar'] = now()->toDateString();
        $validated['status'] = 'pending';

        $nextId = (PasienOnline::max('id') ?? 0) + 1;
        $validated['nomor_pendaftaran'] = $klinik->kode_klinik.'-'
            .now()->format('Ymd').'-'
            .str_pad($nextId, 4, '0', STR_PAD_LEFT);

        $pasienOnline = PasienOnline::create($validated);

        return redirect()->route('daftar-online.success', [
            'slug' => $slug,
            'pasienOnline' => $pasienOnline->id,
        ]);
    }

    /**
     * If success show code
     */
    public function success(string $slug, PasienOnline $pasienOnline)
    {
        if (! preg_match('/-(\d+)$/', $slug, $m)) {
            abort(404);
        }
        $id = (int) $m[1];
        $klinik = Klinik::findOrFail($id);

        return inertia('(client)/PasienOnline/Success', [
            'klinik' => $klinik,
            'pasienOnline' => $pasienOnline,
        ]);
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
