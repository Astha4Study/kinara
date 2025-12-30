<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pembayaran extends Model
{
    use HasFactory;

    protected $table = 'pembayaran';

    protected $fillable = [
        'klinik_id',
        'catatan_layanan_id',
        'resep_id',
        'resepsionis_id',
        'total_bayar',
        'status',
    ];

    public function pasien()
    {
        return $this->belongsTo(Pasien::class);
    }

    public function resep()
    {
        return $this->belongsTo(Resep::class);
    }

    public function klinik()
    {
        return $this->belongsTo(Klinik::class, 'klinik_id');
    }

    public function detail()
    {
        return $this->hasOne(PembayaranDetail::class, 'pembayaran_id');
    }

    public function catatanLayanan()
    {
        return $this->belongsTo(CatatanLayanan::class);
    }

    public function resepsionis()
    {
        return $this->belongsTo(User::class, 'resepsionis_id', 'id');
    }
}
