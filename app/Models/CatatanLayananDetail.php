<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CatatanLayananDetail extends Model
{
    use HasFactory;

    protected $table = 'catatan_layanan_detail';

    protected $fillable = [
        'catatan_layanan_id',
        'layanan_id',
        'qty'
    ];

    public function catatanLayanan()
    {
        return $this->belongsTo(CatatanLayanan::class);
    }

    public function layanan()
    {
        return $this->belongsTo(Layanan::class);
    }
}
