<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class DebugController extends Controller
{
    public function usersCount(Request $request)
    {
        return response()->json([
            'success' => true,
            'data' => [
                'users_count' => User::count(),
            ],
        ]);
    }
}

