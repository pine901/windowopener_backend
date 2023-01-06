<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::truncate();
        User::create([
            'name' => "Administrator",
            'email' => "admin@gmail.com",
            'email_verified_at' => now(),
            'role' => 'admin',
            'password' => Hash::make('admin2022'),
            'remember_token' => Str::random(10),
        ]);
        User::create([
            'name' => "Huateng Fang",
            'email' => "fanghuateng0621@gmail.com",
            'email_verified_at' => now(),
            'password' => Hash::make('customer022'),
            'remember_token' => Str::random(10),
        ]);
    }
}
