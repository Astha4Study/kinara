<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Klinik extends Model
{
    use HasFactory;

    protected $table = 'klinik';

    protected $fillable = [
        'kode_klinik',
        'nama_klinik',
        'jenis_klinik',
        'alamat',
        'kota',
        'provinsi',
        'no_telepon',
        'email',
        'deskripsi',
        'latitude',
        'longitude',
        'gambar',
        'rating',
        'kapasitas_total',
        'kapasitas_tersedia',
        'punya_apoteker',
        'punya_server',
        'created_by',
    ];

    protected $casts = [
        'punya_apoteker' => 'boolean',
    ];

    public function owner()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function pasien()
    {
        return $this->hasMany(Pasien::class);
    }

    public function getGambarUrlAttribute()
    {
        return $this->gambar ? asset('storage/' . $this->gambar) : null;
    }

    public function hapusGambarLama()
    {
        if ($this->gambar && Storage::disk('public')->exists($this->gambar)) {
            Storage::disk('public')->delete($this->gambar);
        }
    }

    public function fasilitas()
    {
        return $this->belongsToMany(Fasilitas::class, 'fasilitas_klinik');
    }

    public function jamOperasional()
    {
        return $this->hasMany(JamOperasional::class);
    }

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($klinik) {
            if (!$klinik->kode_klinik && $klinik->nama_klinik) {
                $words = explode(' ', $klinik->nama_klinik);
                $initials = '';
                foreach ($words as $word) {
                    if (ctype_alpha($word[0])) {
                        $initials .= strtoupper($word[0]);
                    }
                }

                $kode = $initials;

                // Jika sudah ada, tambahkan suffix huruf A-Z
                $suffix = 'A';
                while (self::where('kode_klinik', $kode)->exists()) {
                    $kode = $initials . $suffix;

                    // increment suffix huruf
                    $suffix++;
                    if ($suffix > 'Z') {
                        // kalau sudah lewat Z, tambahkan random huruf lagi
                        $suffix = chr(rand(65, 90)); // huruf acak A-Z
                    }
                }

                $klinik->kode_klinik = $kode;
            }
        });
    }
}
