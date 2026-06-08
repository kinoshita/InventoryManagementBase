<?php

namespace Database\Seeders;

use App\Models\Account;
use Illuminate\Database\Seeder;

class AdminAccountSeeder extends Seeder
{
    public function run(): void
    {
        Account::firstOrCreate(
            ['email' => 'admin@example.com'],
            [
                'password' => 'password',
                'role' => 'admin',
                'email_verified_at' => now(),
            ]
        );
    }
}
