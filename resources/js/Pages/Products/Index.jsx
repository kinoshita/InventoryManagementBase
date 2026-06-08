import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';

export default function ProductsIndex({ products }) {
    function destroy(id) {
        if (!confirm('この商品を削除しますか？在庫・履歴もすべて削除されます。')) return;
        router.delete(`/products/${id}`);
    }

    return (
        <>
            <Head title="商品マスタ" />
            <AppLayout title="商品マスタ">
                <div className="mb-4 flex justify-end">
                    <Link
                        href="/products/create"
                        className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                    >
                        商品を登録
                    </Link>
                </div>

                <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-200 bg-gray-50 text-left text-xs text-gray-500 uppercase">
                                <th className="px-4 py-3">商品コード</th>
                                <th className="px-4 py-3">商品名</th>
                                <th className="px-4 py-3">単位</th>
                                <th className="px-4 py-3 text-right">最小在庫</th>
                                <th className="px-4 py-3 text-right">現在在庫</th>
                                <th className="px-4 py-3"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {products.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-4 py-8 text-center text-gray-400">
                                        商品が登録されていません。
                                    </td>
                                </tr>
                            ) : (
                                products.map(p => (
                                    <tr key={p.id} className="hover:bg-gray-50">
                                        <td className="px-4 py-3 font-mono text-gray-700">{p.code}</td>
                                        <td className="px-4 py-3 font-medium">{p.name}</td>
                                        <td className="px-4 py-3 text-gray-500">{p.unit}</td>
                                        <td className="px-4 py-3 text-right text-gray-500">{p.min_stock.toLocaleString()}</td>
                                        <td className={`px-4 py-3 text-right font-semibold ${p.quantity < p.min_stock ? 'text-red-600' : ''}`}>
                                            {p.quantity.toLocaleString()}
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex justify-end gap-3">
                                                <Link
                                                    href={`/products/${p.id}/edit`}
                                                    className="text-blue-600 hover:underline"
                                                >
                                                    編集
                                                </Link>
                                                <button
                                                    onClick={() => destroy(p.id)}
                                                    className="text-red-500 hover:underline"
                                                >
                                                    削除
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </AppLayout>
        </>
    );
}
