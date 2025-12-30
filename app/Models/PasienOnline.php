<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PasienOnline extends Model
{
    use HasFactory;

    protected $table = 'pasien_online';

    // kolom yang bisa diisi mass-assignment
    protected $fillable = [
        'klinik_id',
        'user_id',
        'nomor_pendaftaran',
        'nama_lengkap',
        'nik',
        'jenis_kelamin',
        'tanggal_lahir',
        'alamat',
        'no_hp',
        'periode_daftar',
        'status',
    ];

    public function klinik()
    {
        return $this->belongsTo(Klinik::class, 'klinik_id');
    }
}
