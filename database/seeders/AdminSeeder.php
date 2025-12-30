<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User; // pastikan model User sudah ada
use Spatie\Permission\Models\Role;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Pastikan role 'admin' sudah ada
        $role = Role::firstOrCreate(['name' => 'admin']);

        $admins = [
            ['name' => 'Admin Sentosa', 'email' => 'adminkliniksentosa@example.com'],
            ['name' => 'Admin Sehat', 'email' => 'adminkliniksehat@example.com'],
            ['name' => 'Admin Medika', 'email' => 'adminklinikmedika@example.com'],
            ['name' => 'Admin Pratama', 'email' => 'adminklinikpratama@example.com'],
            ['name' => 'Admin Utama', 'email' => 'adminklinikutama@example.com'],
            ['name' => 'Admin Harmoni', 'email' => 'adminklinikharmoni@example.com'],
            ['name' => 'Admin Bakti', 'email' => 'adminklinikbakti@example.com'],
            ['name' => 'Admin Kasih', 'email' => 'adminklinikkasih@example.com'],
            ['name' => 'Admin Mitra', 'email' => 'adminklinikmitra@example.com'],
            ['name' => 'Admin Citra', 'email' => 'adminklinikcitra@example.com'],
            ['name' => 'Admin Nusantara', 'email' => 'adminkliniknusantara@example.com'],
            ['name' => 'Admin Persada', 'email' => 'adminklinikpersada@example.com'],
        ];

        foreach ($admins as $index => $admin) {
            $user = User::updateOrCreate(
                ['email' => $admin['email']], // supaya tidak duplikat kalau seed ulang
                [
                    'created_by' => 1,
                    'name' => $admin['name'],
                    'email_verified_at' => now(),
                    'password' => Hash::make('12345678'),
                ]
            );

            // Assign role admin
            $user->assignRole($role);
        }
    }
}