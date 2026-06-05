<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\DebugController;
use Illuminate\Support\Facades\Route;

Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout']);

Route::post('/contact', [ContactController::class, 'store']);

Route::middleware('auth:sanctum')->get('/messages', [ContactController::class, 'index']);

// Dev-only debug route (temporary)
Route::get('/debug/users', [DebugController::class, 'usersCount']);

