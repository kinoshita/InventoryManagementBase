<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\StockMovement;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StockMovementController extends Controller
{
    public function index(Request $request)
    {
        $query = StockMovement::with(['product', 'account'])
            ->orderByDesc('created_at');

        if ($request->filled('product_id')) {
            $query->where('product_id', $request->product_id);
        }

        if ($request->filled('movement_type')) {
            $query->where('movement_type', $request->movement_type);
        }

        $movements = $query->paginate(20)->through(fn($m) => [
            'id'            => $m->id,
            'product_code'  => $m->product->code,
            'product_name'  => $m->product->name,
            'unit'          => $m->product->unit,
            'movement_type' => $m->movement_type,
            'quantity'      => $m->quantity,
            'note'          => $m->note,
            'account_email' => $m->account?->email,
            'created_at'    => $m->created_at->format('Y/m/d H:i'),
        ]);

        $products = Product::orderBy('code')->get(['id', 'code', 'name']);

        return Inertia::render('StockMovements/Index', [
            'movements'   => $movements,
            'products'    => $products,
            'filters'     => $request->only('product_id', 'movement_type'),
        ]);
    }
}
