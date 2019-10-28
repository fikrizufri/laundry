<?php

use App\User;
use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'name' => 'Anugrah Sandi',
            'email' => 'admin@daengweb.id',
            'email_verified_at' => now(),
            'password' => 'secret',
            'role' => 0
        ]);
    }
}
