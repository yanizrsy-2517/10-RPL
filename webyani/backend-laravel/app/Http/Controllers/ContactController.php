<?php

namespace App\Http\Controllers;

use App\Models\ContactMessage;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required','string','max:100'],
            'email' => ['required','email','max:150'],
            'message' => ['required','string','max:2000'],
        ]);

        $message = ContactMessage::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Pesan berhasil dikirim',
            'data' => [
                'id' => $message->id,
            ],
        ], 201);
    }

    public function index(Request $request)
    {
        $messages = ContactMessage::query()->orderByDesc('created_at')->get(['id','name','email','message','created_at']);

        return response()->json([
            'success' => true,
            'message' => 'Berhasil mengambil pesan',
            'data' => $messages,
        ]);
    }
}

