<?php

namespace App\Http\Controllers;

use App\Models\PasienOnline;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class ClientProfileController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function ProfileIndex()
    {
        $user = Auth::user();

        return Inertia::render('(client)/Profile/Index', [
            'user' => $user,
            'tab' => 'profile',
        ]);
    }

    /**
     * Display a riwayat resource
     */
    public function riwayatIndex()
    {
        $user = Auth::user();

        $riwayat = PasienOnline::where('user_id', $user->id)
            ->latest()
            ->get()
            ->map(fn ($r) => [
                'id' => $r->id,
                'tanggal' => $r->created_at->format('d-m-Y H:i'),
                'status' => $r->status,
                'klinik' => $r->klinik->nama_klinik ?? null,
                'nomor_pendaftaran' => $r->nomor_pendaftaran,
            ]);

        return Inertia::render('(client)/Profile/Riwayat', [
            'riwayat' => $riwayat,
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
    public function edit()
    {
        return Inertia::render('(client)/Profile/Edit', [
            'user' => Auth::user(),
            'tab' => 'profile',
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        $user = Auth::user();

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => [
                'required',
                'email',
                Rule::unique('users')->ignore($user->id),
            ],
            'avatar' => ['nullable', 'image', 'max:2048'],
        ]);

        // Upload avatar hanya jika ada file baru
        if ($request->hasFile('avatar')) {
            if ($user->avatar) {
                Storage::disk('public')->delete($user->avatar);
            }

            $validated['avatar'] = $request
                ->file('avatar')
                ->store('avatars', 'public');
        } else {
            // kalau tidak ada file avatar baru, hapus key 'avatar' dari $validated
            unset($validated['avatar']);
        }

        $user->update($validated);

        return redirect()
            ->route('profile.ProfileIndex')
            ->with('success', 'Profil berhasil diperbarui');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
