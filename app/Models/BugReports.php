<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BugReports extends Model
{
    use HasFactory;

    protected $table = 'bug_reports';

    protected $fillable = [
        'klinik_id',
        'reported_by',
        'judul',
        'deskripsi',
        'dampak_pelapor',
        'prioritas',
        'status',
        'catatan_admin',
        'ditangani_pada',
        'diselesaikan_pada',
    ];

    public function klinik()
    {
        return $this->belongsTo(Klinik::class);
    }

    public function pelapor()
    {
        return $this->belongsTo(User::class, 'reported_by');
    }
}
