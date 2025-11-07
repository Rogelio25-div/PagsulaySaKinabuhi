<?php

namespace App\Http\Controllers;

use App\Models\bh;
use App\Http\Requests\StoreBHRequest;
use App\Http\Requests\UpdateBHRequest;
use Illuminate\Support\Facades\Auth;

class BHController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Show only the boarding houses of the logged-in user
    return response()->json(BH::where('user_id', Auth::id())->get());
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
    public function store(StoreBHRequest $request)
    {
        $validate = $request->validate([
           'name' => 'required|string',
           'location' => 'required|string',
            'rooms' => 'required|integer|min:1'
        ]);

        // Attach current user to the new boarding house
        $bh = new BH();
        $bh->name = $request->name;
        $bh->location = $request->location;
        $bh->rooms = $request->rooms;
        $bh->user_id = auth()->id(); // <-- FIX: set user_id from logged-in user
        $bh->save();

        return response()->json(['message' => 'Boarding house created successfully.'], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(bh $bH)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(bh $bH)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBHRequest $request, bh $bH)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(bh $bH)
    {
        //
    }
}
