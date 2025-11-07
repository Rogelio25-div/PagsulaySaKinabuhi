<?php

use App\Http\Controllers\UserController;
use App\Http\Controllers\BHController;
use Illuminate\Http\Request;                     // Lets you handle incoming HTTP requests
use Illuminate\Support\Facades\Route;            // Used to define API routes
use App\Http\Controllers\AuthController;         // Imports your AuthController for login, register, logout

// ---------- PROTECTED ROUTES (require a valid Sanctum token) ----------
Route::middleware('auth:sanctum')->group(function() {

    Route::post('logout', [AuthController::class, 'logout']);
    // Logs out the current user by deleting their active token

    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    // Returns the currently authenticated user's data

    Route::apiResource('/users', UserController::class);
    Route::get('/boardinghouse', [BHController::class, 'index']); //lists all boarding houses
    Route::post('/boardinghouses', [BHController::class, 'store']);//creates a new boarding house

    // Automatically creates all CRUD routes (list, add, update, delete) for users
    // Example routes: GET /users, POST /users, PUT /users/{id}, DELETE /users/{id}
});
// ---------- END OF PROTECTED ROUTES ----------


// ---------- PUBLIC ROUTES (no authentication needed) ----------
Route::post('login', [AuthController::class, 'login']);
// Handles user login; returns token if credentials are correct

Route::post('register', [AuthController::class, 'register']);
// Handles new user registration; creates a user and returns token

// Route::post('logout', [AuthController::class, 'logout']);
// (Old version) Not used anymore since logout now requires authentication
// ---------- END OF PUBLIC ROUTES ----------
