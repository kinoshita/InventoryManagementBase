<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\StockMovement;
use Illuminate\Support\Carbon;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $products = Product::with('stock')->get();

        $alertCount = $products->filter(fn($p) => ($p->stock->quantity ?? 0) < $p->min_stock)->count();

        $todayCount = StockMovement::whereDate('created_at', Carbon::today())->count();

        $recentMovements = StockMovement::with(['product', 'account'])
            ->orderByDesc('created_at')
            ->limit(5)
            ->get()
            ->map(fn($m) => [
                'id'            => $m->id,
                'product_code'  => $m->product->code,
                'product_name'  => $m->product->name,
                'unit'          => $m->product->unit,
                'movement_type' => $m->movement_type,
                'quantity'      => $m->quantity,
                'account_email' => $m->account?->email,
                'created_at'    => $m->created_at->format('Y/m/d H:i'),
            ]);

        return Inertia::render('Dashboard', compact('alertCount', 'todayCount', 'recentMovements'));
    }
}
