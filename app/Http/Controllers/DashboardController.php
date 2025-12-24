<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $role = $request->user()->roles->first()?->name ?? 'default';

        return match ($role) {
            'admin' => Inertia::render('Dashboard/Admin'),
            'dokter' => Inertia::render('Dashboard/Dokter'),
            'resepsionis' => Inertia::render('Dashboard/Resepsionis'),
            'super_admin' => Inertia::render('Dashboard/SuperAdmin'),
        };
    }
}
