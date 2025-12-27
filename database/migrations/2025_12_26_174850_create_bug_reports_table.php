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
        Schema::create('bug_reports', function (Blueprint $table) {
            $table->id();
            $table->foreignId('klinik_id')->constrained('klinik')->cascadeOnDelete();
            $table->foreignId('reported_by')->constrained('users')->cascadeOnDelete();
            $table->string('judul');
            $table->text('deskripsi');
            $table->enum('dampak_pelapor', ['rendah', 'sedang', 'tinggi'])->nullable();
            $table->enum('prioritas', ['rendah', 'sedang', 'tinggi'])->default('sedang');

            $table->enum('status', ['dibuka', 'sedang_dikerjakan', 'selesai', 'dibatalkan'])->default('dibuka');

            $table->text('catatan_admin')->nullable();
            $table->timestamp('ditangani_pada')->nullable();
            $table->timestamp('diselesaikan_pada')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bug_reports');
    }
};
