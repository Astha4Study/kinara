<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class FasilitasSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $fasilitas = [
            'Ruang Ber AC',
            'BPJS',
            'Parkir Luas',
            'Ambulans 24 Jam',
            'Laboratorium',
            'Apotek',
            'Ruang Tunggu Nyaman',
            'Wifi Gratis',
            'Dokter Spesialis',
            'Kantin Sehat',
        ];

        foreach ($fasilitas as $nama) {
            DB::table('fasilitas')->updateOrInsert(
                ['nama' => $nama], // kondisi unik
                [
                    'nama' => $nama,
                    'updated_at' => Carbon::now(),
                    'created_at' => Carbon::now(),
                ]
            );
        }
    }
}
