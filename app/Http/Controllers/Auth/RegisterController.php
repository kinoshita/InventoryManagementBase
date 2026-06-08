<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Account;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class RegisterController extends Controller
{
    public function show()
    {
        return Inertia::render('Auth/Register');
    }

    public function store(Request $request)
    {
        $request->validate([
            'email' => ['required', 'email', 'max:255', 'unique:accounts,email'],
            'password' => ['required', 'min:8', 'confirmed'],
        ]);

        $account = Account::create([
            'email' => $request->email,
            'password' => $request->password,
            'role' => 'general',
        ]);

        $account->sendEmailVerificationNotification();

        Auth::login($account);

        return redirect()->route('verification.notice');
    }
}
