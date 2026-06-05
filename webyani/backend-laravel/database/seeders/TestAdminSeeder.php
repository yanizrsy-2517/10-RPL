<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class TestAdminSeeder extends Seeder
{
    // Run the database seeds.
    public function run(): void
    {
        // Admin untuk testing login dashboard
        User::updateOrCreate(
            ['email' => 'gloucousm@gmail.com'],
            [
                'name' => 'Admin',
                'password' => Hash::make('adityadaniel2509'),
            ]
        );
    }
}

