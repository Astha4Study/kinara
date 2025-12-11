<?php

namespace App\Http\Controllers;

use App\Models\Antrian;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DokterAntrianController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = Auth::user();

        $dokter = $user->dokter;

        if (!$dokter) {
            abort(404, "Data dokter tidak ditemukan");
        }

        $antrian = Antrian::with(['pasien:id,nomor_pasien,nama_lengkap'])
            ->where('dokter_id', $dokter->id)
            ->orderBy('nomor_antrian', 'asc')
            ->get()
            ->map(function ($a) {
                return [
                    'id' => $a->id,
                    'nomor_antrian' => $a->nomor_antrian,
                    'nomor_pasien' => $a->pasien?->nomor_pasien ?? '-',
                    'pasien_nama' => $a->pasien?->nama_lengkap ?? '-',
                    'keluhan' => $a->keluhan ?? '-',
                    'status' => $a->status,
                    'created_at' => $a->created_at?->toISOString(),
                ];
            });

        return Inertia::render('Dokter/Antrian/Index', [
            'antrian' => $antrian,
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
