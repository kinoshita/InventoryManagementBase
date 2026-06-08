import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';

export default function StocksIndex({ stocks, alertCount }) {
    return (
        <>
            <Head title="在庫一覧" />
            <AppLayout title="在庫一覧">
                {alertCount > 0 && (
                    <div className="mb-4 flex items-center gap-2 rounded-md border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
                        <span className="font-bold">⚠ 在庫アラート:</span>
                        {alertCount}件の商品が最小在庫数を下回っています。
                    </div>
                )}

                <div className="mb-4 flex justify-end">
                    <Link
                        href="/stocks/move"
                        className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                    >
                        入出庫登録
                    </Link>
                </div>

                <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-200 bg-gray-50 text-left text-xs text-gray-500 uppercase">
                                <th className="px-4 py-3">商品コード</th>
                                <th className="px-4 py-3">商品名</th>
                                <th className="px-4 py-3 text-right">現在在庫</th>
                                <th className="px-4 py-3 text-right">最小在庫</th>
                                <th className="px-4 py-3">単位</th>
                                <th className="px-4 py-3">状態</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {stocks.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-4 py-8 text-center text-gray-400">
                                        商品が登録されていません。
                                    </td>
                                </tr>
                            ) : (
                                stocks.map(s => (
                                    <tr
                                        key={s.id}
                                        className={s.in_alert ? 'bg-red-50' : 'hover:bg-gray-50'}
                                    >
                                        <td className="px-4 py-3 font-mono">{s.code}</td>
                                        <td className="px-4 py-3">{s.name}</td>
                                        <td className={`px-4 py-3 text-right font-semibold ${s.in_alert ? 'text-red-600' : ''}`}>
                                            {s.quantity.toLocaleString()}
                                        </td>
                                        <td className="px-4 py-3 text-right text-gray-500">{s.min_stock.toLocaleString()}</td>
                                        <td className="px-4 py-3 text-gray-500">{s.unit}</td>
                                        <td className="px-4 py-3">
                                            {s.in_alert && (
                                                <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700">
                                                    在庫不足
                                                </span>
                                            )}
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
