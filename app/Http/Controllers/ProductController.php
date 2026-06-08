<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Stock;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::with('stock')->orderBy('code')->get()->map(fn($p) => [
            'id'         => $p->id,
            'code'       => $p->code,
            'name'       => $p->name,
            'unit'       => $p->unit,
            'min_stock'  => $p->min_stock,
            'quantity'   => $p->stock->quantity ?? 0,
        ]);

        return Inertia::render('Products/Index', compact('products'));
    }

    public function create()
    {
        return Inertia::render('Products/Create');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'code'      => ['required', 'string', 'max:50', 'unique:products,code'],
            'name'      => ['required', 'string', 'max:255'],
            'unit'      => ['required', 'string', 'max:50'],
            'min_stock' => ['required', 'integer', 'min:0'],
        ]);

        $product = Product::create($data);
        Stock::create(['product_id' => $product->id, 'quantity' => 0]);

        return redirect()->route('products.index')->with('success', '商品を登録しました。');
    }

    public function edit(Product $product)
    {
        return Inertia::render('Products/Edit', [
            'product' => $product->only('id', 'code', 'name', 'unit', 'min_stock'),
        ]);
    }

    public function update(Request $request, Product $product)
    {
        $data = $request->validate([
            'code'      => ['required', 'string', 'max:50', "unique:products,code,{$product->id}"],
            'name'      => ['required', 'string', 'max:255'],
            'unit'      => ['required', 'string', 'max:50'],
            'min_stock' => ['required', 'integer', 'min:0'],
        ]);

        $product->update($data);

        return redirect()->route('products.index')->with('success', '商品を更新しました。');
    }

    public function destroy(Product $product)
    {
        $product->delete();

        return redirect()->route('products.index')->with('success', '商品を削除しました。');
    }
}
