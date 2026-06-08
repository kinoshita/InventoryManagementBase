<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\StockMovement;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class StockController extends Controller
{
    public function index()
    {
        $stocks = Product::with('stock')->orderBy('code')->get()->map(fn($p) => [
            'id'        => $p->id,
            'code'      => $p->code,
            'name'      => $p->name,
            'unit'      => $p->unit,
            'min_stock' => $p->min_stock,
            'quantity'  => $p->stock->quantity ?? 0,
            'in_alert'  => ($p->stock->quantity ?? 0) < $p->min_stock,
        ]);

        $alertCount = $stocks->where('in_alert', true)->count();

        return Inertia::render('Stocks/Index', compact('stocks', 'alertCount'));
    }

    public function createMove()
    {
        $products = Product::with('stock')->orderBy('code')->get()->map(fn($p) => [
            'id'       => $p->id,
            'code'     => $p->code,
            'name'     => $p->name,
            'unit'     => $p->unit,
            'quantity' => $p->stock->quantity ?? 0,
        ]);

        return Inertia::render('Stocks/Move', compact('products'));
    }

    public function storeMove(Request $request)
    {
        $data = $request->validate([
            'product_id'    => ['required', 'exists:products,id'],
            'movement_type' => ['required', 'in:in,out,adjustment'],
            'quantity'      => ['required', 'integer', 'min:1'],
            'note'          => ['nullable', 'string', 'max:255'],
        ]);

        DB::transaction(function () use ($data) {
            $product = Product::with('stock')->findOrFail($data['product_id']);
            $stock   = $product->stock;
            $current = $stock->quantity ?? 0;

            if ($data['movement_type'] === 'in') {
                $newQuantity = $current + $data['quantity'];
            } elseif ($data['movement_type'] === 'out') {
                if ($current < $data['quantity']) {
                    abort(422, '在庫数が不足しています。');
                }
                $newQuantity = $current - $data['quantity'];
            } else {
                // adjustment: quantity は新しい在庫数
                $newQuantity = $data['quantity'];
            }

            $stock->update(['quantity' => $newQuantity]);

            StockMovement::create([
                'product_id'    => $data['product_id'],
                'account_id'    => Auth::id(),
                'movement_type' => $data['movement_type'],
                'quantity'      => $data['quantity'],
                'note'          => $data['note'] ?? null,
            ]);
        });

        return redirect()->route('stocks.index')->with('success', '在庫を更新しました。');
    }
}
