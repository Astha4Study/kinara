<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Antrian extends Model
{
    use HasFactory;

    protected $table = 'antrian';

    protected $fillable = [
        'nomor_antrian',
        'pasien_id',
        'dokter_id',
        'klinik_id',
        'keluhan',
        'status',
        'alasan_dibatalkan',
        'tanggal_kunjungan',
    ];

    public function pasien()
    {
        return $this->belongsTo(Pasien::class);
    }

    public function dokter()
    {
        return $this->belongsTo(Dokter::class, 'dokter_id');
    }

    public function klinik()
    {
        return $this->belongsTo(Klinik::class);
    }

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($antrian) {

            $user = Auth::user();

            if (! $user || ! $user->hasRole('resepsionis')) {
                throw new \Exception('Hanya resepsionis yang dapat menambahkan antrian.');
            }

            // Klinik resepsionis
            $antrian->klinik_id = $user->klinik_id;

            // Nomor antrian otomatis
            $lastNumber = self::where('klinik_id', $antrian->klinik_id)
                ->whereDate('tanggal_kunjungan', $antrian->tanggal_kunjungan)
                ->max('nomor_antrian') ?? 0;

            $antrian->nomor_antrian = $lastNumber + 1;

            // Pilih dokter otomatis
            $dokter = Dokter::where('klinik_id', $antrian->klinik_id)
                ->where('status', 'tersedia')
                ->orderBy('antrian_saat_ini', 'asc')
                ->first();

            if ($dokter) {
                $antrian->dokter_id = $dokter->id;

                // Update antrian dokter
                $dokter->increment('antrian_saat_ini');
            }
        });
    }
}
