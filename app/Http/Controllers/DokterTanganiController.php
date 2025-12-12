<?php

namespace App\Http\Controllers;

use App\Models\Antrian;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DokterTanganiController extends Controller
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
    public function create(Antrian $antrian)
    {
        $dokter = Auth::user()->dokter;

        if (! $dokter || $antrian->dokter_id !== $dokter->id) {
            abort(404, 'Antrian tidak ditemukan untuk dokter ini');
        }

        $antrian->load('pasien', 'klinik');

        return Inertia::render('Dokter/Tangani/Create', [
            'antrian' => $antrian,
            'pasien' => $antrian->pasien,
            'keluhan_utama' => $antrian->keluhan,
            'punya_server' => $antrian->klinik->punya_server,
        ]);
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
