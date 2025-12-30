<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('pasien_online', function (Blueprint $table) {
            $table->id();
            $table->foreignId('klinik_id')->nullable()->constrained('klinik')->onDelete('set null');
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->string('nomor_pendaftaran')->unique();
            $table->string('nama_lengkap');
            $table->string('nik');
            $table->enum('jenis_kelamin', ['L', 'P']);
            $table->date('tanggal_lahir');
            $table->text('alamat');
            $table->string('no_hp');

            $table->date('periode_daftar')->default(now());

            $table->enum('status', ['pending', 'terverifikasi', 'ditolak'])->default('pending');

            $table->timestamps();

            $table->unique(['nik', 'periode_daftar']);
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pasien_online');
    }
};
