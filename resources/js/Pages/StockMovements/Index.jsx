import { Head, Link, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';

const typeLabels = {
    in:         '入庫',
    out:        '出庫',
    adjustment: '棚卸し',
};

const typeBadgeClass = {
    in:         'bg-green-100 text-green-700',
    out:        'bg-orange-100 text-orange-700',
    adjustment: 'bg-blue-100 text-blue-700',
};

export default function StockMovementsIndex({ movements, products, filters }) {
    const [productId, setProductId] = useState(filters.product_id ?? '');
    const [movementType, setMovementType] = useState(filters.movement_type ?? '');

    function applyFilter(e) {
        e.preventDefault();
        router.get('/stock-movements', { product_id: productId || undefined, movement_type: movementType || undefined }, { preserveState: true });
    }

    function resetFilter() {
        setProductId('');
        setMovementType('');
        router.get('/stock-movements');
    }

    return (
        <>
            <Head title="入出庫履歴" />
            <AppLayout title="入出庫履歴">
                {/* フィルタ */}
                <form onSubmit={applyFilter} className="mb-4 flex flex-wrap gap-3 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                    <select
                        value={productId}
                        onChange={e => setProductId(e.target.value)}
                        className="rounded-md border border-gray-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">すべての商品</option>
                        {products.map(p => (
                            <option key={p.id} value={p.id}>[{p.code}] {p.name}</option>
                        ))}
                    </select>

                    <select
                        value={movementType}
                        onChange={e => setMovementType(e.target.value)}
                        className="rounded-md border border-gray-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">すべての種別</option>
                        {Object.entries(typeLabels).map(([v, l]) => (
                            <option key={v} value={v}>{l}</option>
                        ))}
                    </select>

                    <button
                        type="submit"
                        className="rounded-md bg-gray-700 px-4 py-1.5 text-sm font-medium text-white hover:bg-gray-800"
                    >
                        絞り込み
                    </button>
                    <button
                        type="button"
                        onClick={resetFilter}
                        className="rounded-md border border-gray-300 px-4 py-1.5 text-sm text-gray-600 hover:bg-gray-50"
                    >
                        リセット
                    </button>
                </form>

                <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-200 bg-gray-50 text-left text-xs text-gray-500 uppercase">
                                <th className="px-4 py-3">日時</th>
                                <th className="px-4 py-3">商品</th>
                                <th className="px-4 py-3">種別</th>
                                <th className="px-4 py-3 text-right">数量</th>
                                <th className="px-4 py-3">操作者</th>
                                <th className="px-4 py-3">備考</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {movements.data.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-4 py-8 text-center text-gray-400">
                                        履歴がありません。
                                    </td>
                                </tr>
                            ) : (
                                movements.data.map(m => (
                                    <tr key={m.id} className="hover:bg-gray-50">
                                        <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{m.created_at}</td>
                                        <td className="px-4 py-3">
                                            <div className="font-medium">{m.product_name}</div>
                                            <div className="text-xs text-gray-400 font-mono">{m.product_code}</div>
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${typeBadgeClass[m.movement_type]}`}>
                                                {typeLabels[m.movement_type]}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-right font-semibold">
                                            {m.quantity.toLocaleString()} {m.unit}
                                        </td>
                                        <td className="px-4 py-3 text-gray-500 text-xs">{m.account_email ?? '—'}</td>
                                        <td className="px-4 py-3 text-gray-500">{m.note ?? '—'}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* ページネーション */}
                {movements.last_page > 1 && (
                    <div className="mt-4 flex justify-center gap-2">
                        {movements.links.map((link, i) => (
                            <button
                                key={i}
                                disabled={!link.url}
                                onClick={() => link.url && router.get(link.url)}
                                className={`rounded px-3 py-1 text-sm ${
                                    link.active
                                        ? 'bg-blue-600 text-white'
                                        : 'border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-40'
                                }`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                )}
            </AppLayout>
        </>
    );
}
