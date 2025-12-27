<?php

namespace App\Http\Controllers;

use App\Models\BugReports;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SuperAdminBugReportsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $bugReports = BugReports::with(['klinik', 'pelapor'])
            ->latest()
            ->paginate(10);

        return Inertia::render('SuperAdmin/BugReports/Index', [
            'bugReports' => $bugReports,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $bugReport = BugReports::with(['klinik', 'pelapor'])
            ->findOrFail($id);

        return Inertia::render('SuperAdmin/BugReports/Show', [
            'bugReport' => $bugReport,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $bugReport = BugReports::with(['klinik', 'pelapor'])
            ->findOrFail($id);

        return Inertia::render('SuperAdmin/BugReports/Edit', [
            'bugReport' => $bugReport,
        ]);

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validated = $request->validate([
            'catatan_admin' => 'nullable|string',
        ]);

        $bugReport = BugReports::findOrFail($id);

        if ($bugReport->status === 'dibuka') {
            $bugReport->status = 'sedang_dikerjakan';
            $bugReport->ditangani_pada = now();
        } elseif ($bugReport->status === 'sedang_dikerjakan') {
            $bugReport->status = 'selesai';
            $bugReport->diselesaikan_pada = now();
        }

        $bugReport->catatan_admin = $validated['catatan_admin'] ?? $bugReport->catatan_admin;
        $bugReport->save();

        return redirect()
            ->route('super_admin.bug-reports.index')
            ->with('success', 'Status bug berhasil diperbarui');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
