<?php

use App\Http\Controllers\Auth\EmailVerificationController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\StockController;
use App\Http\Controllers\StockMovementController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Process;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home');
});

// 未認証ユーザー向け
Route::middleware('guest')->group(function () {
    Route::get('/register', [RegisterController::class, 'show'])->name('register');
    Route::post('/register', [RegisterController::class, 'store']);
    Route::get('/login', [LoginController::class, 'show'])->name('login');
    Route::post('/login', [LoginController::class, 'store']);
});

// 認証済みユーザー向け
Route::middleware('auth')->group(function () {
    Route::post('/logout', [LoginController::class, 'destroy'])->name('logout');
    Route::get('/email/verify', [EmailVerificationController::class, 'notice'])->name('verification.notice');
    Route::get('/email/verify/{id}/{hash}', [EmailVerificationController::class, 'verify'])
        ->middleware('signed')
        ->name('verification.verify');
    Route::post('/email/verification-notification', [EmailVerificationController::class, 'resend'])
        ->middleware('throttle:6,1')
        ->name('verification.send');
});

// 認証済み + メール認証済み
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [App\Http\Controllers\DashboardController::class, 'index'])->name('dashboard');
    Route::get('/admin', fn() => Inertia::render('Admin/Dashboard'))->name('admin.dashboard');

    // 商品マスタ
    Route::resource('products', ProductController::class)->except(['show']);

    // 在庫管理
    Route::get('/stocks', [StockController::class, 'index'])->name('stocks.index');
    Route::get('/stocks/move', [StockController::class, 'createMove'])->name('stocks.move.create');
    Route::post('/stocks/move', [StockController::class, 'storeMove'])->name('stocks.move.store');

    // 入出庫履歴
    Route::get('/stock-movements', [StockMovementController::class, 'index'])->name('stock-movements.index');
});

Route::get('/test-python-ocr', function () {
    $imagePath = storage_path('app/private/licenses/sample2.png');

    $result = Process::run([
        base_path('python/venv/bin/python'),
        base_path('python/ocr_passport.py'),
        $imagePath,
    ]);

    $data = json_decode($result->output(), true);

    return response()->json($data);
});
