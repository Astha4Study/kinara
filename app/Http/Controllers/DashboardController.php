<?php

namespace App\Http\Controllers;

use App\Models\Pasien;
use App\Models\Pembayaran;
use App\Models\Resep;
use Carbon\Carbon;
use Carbon\CarbonInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        Carbon::setLocale('id');

        $user = $request->user();

        $role = $request->user()->roles->first()?->name ?? 'default';

        $klinik = $user->klinik;

        $period = $request->get('period', 'week');

        $dokter = $user->dokter;

        $klinikDokter = $dokter?->klinik;

        $reseps = Pembayaran::with(['resep.pasien', 'catatanLayanan.pasien'])
            ->where('status', 'pending')
            ->where('klinik_id', $klinik?->id)
            ->orderBy('created_at', 'asc')
            ->limit(5)
            ->get()
            ->map(fn($p) => [
                'id' => $p->id,
                'nama_pasien' => $p->resep?->pasien?->nama_lengkap
                    ?? $p->catatanLayanan?->pasien?->nama_lengkap
                    ?? '-',
                'total_harga' => $p->total_bayar,
            ]);

        $pasienBaru = Pasien::where('klinik_id', $klinik?->id)
            ->whereMonth('created_at', now()->month)
            ->whereYear('created_at', now()->year)
            ->orderBy('created_at', 'desc')
            ->limit(5)
            ->get()
            ->map(fn($p) => [
                'id' => $p->id,
                'nama_lengkap' => $p->nama_lengkap,
                'nomor_pasien' => $p->nomor_pasien,
                'tanggal' => $p->created_at->format('d M Y'),
            ]);

        if ($period === 'week') {
            $start = now()->startOfWeek(CarbonInterface::MONDAY)->startOfDay();

            $chart = collect(range(0, 6))->map(function ($day) use ($klinik, $start) {
                $date = $start->copy()->addDays($day);

                $pasien = Pasien::where('klinik_id', $klinik?->id)
                    ->whereBetween('created_at', [
                        $date->copy()->startOfDay(),
                        $date->copy()->endOfDay(),
                    ])
                    ->count();

                $pembayaran = Pembayaran::where('klinik_id', $klinik?->id)
                    ->whereIn('status', ['lunas', 'selesai'])
                    ->whereBetween('created_at', [
                        $date->copy()->startOfDay(),
                        $date->copy()->endOfDay(),
                    ])
                    ->sum('total_bayar');

                return [
                    'tanggal' => $date->translatedFormat('D'),
                    'pasien' => $pasien,
                    'pembayaran' => (int) $pembayaran,
                ];
            });
        }

        if ($period === 'month') {
            $chart = collect(range(1, 12))->map(function ($month) use ($klinik) {
                $date = now()->setMonth($month)->startOfMonth();
                $start = $date->copy()->startOfMonth();
                $end = $date->copy()->endOfMonth();

                $pasien = Pasien::where('klinik_id', $klinik?->id)
                    ->whereBetween('created_at', [$start, $end])
                    ->count();

                $pembayaran = Pembayaran::where('klinik_id', $klinik?->id)
                    ->whereIn('status', ['lunas', 'selesai'])
                    ->whereBetween('created_at', [$start, $end])
                    ->sum('total_bayar');

                return [
                    'tanggal' => $date->translatedFormat('M'),
                    'pasien' => $pasien,
                    'pembayaran' => (int) $pembayaran,
                ];
            });
        }

        return match ($role) {
            'admin' => Inertia::render('Dashboard/Admin'),
            'dokter' => Inertia::render('Dashboard/Dokter', [
                'dokter' => [
                    'id' => $dokter?->id,
                    'nama' => $dokter?->nama_dokter,
                    'sip' => $dokter?->sip,
                ],
                'klinik' => $klinikDokter
                        ?->setAttribute(
                        'gambar',
                        $klinikDokter->gambar
                        ? asset('storage/' . $klinikDokter->gambar)
                        : null
                    )
                        ?->setAttribute('jenis_klinik', $klinikDokter->jenis_klinik),
            ]),

            'resepsionis' => Inertia::render('Dashboard/Resepsionis', [
                'klinik' => $klinik
                        ?->setAttribute('gambar', asset('storage/' . $user->klinik->gambar))
                        ?->setAttribute('jenis_klinik', $user->klinik->jenis_klinik),
                'user' => $user->only('id', 'name'),
                'reseps' => $reseps,
                'pasienBaru' => $pasienBaru,
                'chart' => $chart,
                'period' => $period,
            ]),
            'super_admin' => Inertia::render('Dashboard/SuperAdmin'),
        };
    }
}
