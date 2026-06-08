import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';

const typeLabels = { in: '入庫', out: '出庫', adjustment: '棚卸し' };
const typeBadgeClass = {
    in:         'bg-green-100 text-green-700',
    out:        'bg-orange-100 text-orange-700',
    adjustment: 'bg-blue-100 text-blue-700',
};

export default function Dashboard({ alertCount, todayCount, recentMovements }) {
    return (
        <>
            <Head title="ダッシュボード" />
            <AppLayout title="ダッシュボード">
                {/* サマリーカード */}
                <div className="mb-6 grid grid-cols-2 gap-4 max-w-xl">
                    <div className={`rounded-lg border p-4 ${alertCount > 0 ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-white'}`}>
                        <div className="text-xs text-gray-500 mb-1">在庫アラート</div>
                        <div className={`text-3xl font-bold ${alertCount > 0 ? 'text-red-600' : 'text-gray-800'}`}>
                            {alertCount}
                            <span className="text-sm font-normal ml-1">件</span>
                        </div>
                        {alertCount > 0 && (
                            <Link href="/stocks" className="mt-2 block text-xs text-red-600 hover:underline">
                                在庫一覧で確認 →
                            </Link>
                        )}
                    </div>

                    <div className="rounded-lg border border-gray-200 bg-white p-4">
                        <div className="text-xs text-gray-500 mb-1">本日の入出庫件数</div>
                        <div className="text-3xl font-bold text-gray-800">
                            {todayCount}
                            <span className="text-sm font-normal ml-1">件</span>
                        </div>
                        <Link href="/stock-movements" className="mt-2 block text-xs text-blue-600 hover:underline">
                            履歴を見る →
                        </Link>
                    </div>
                </div>

                {/* 最近の入出庫 */}
                <div className="max-w-3xl">
                    <h2 className="text-sm font-semibold text-gray-600 mb-3 uppercase tracking-wide">最近の入出庫（直近5件）</h2>
                    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-gray-200 bg-gray-50 text-left text-xs text-gray-500 uppercase">
                                    <th className="px-4 py-3">日時</th>
                                    <th className="px-4 py-3">商品</th>
                                    <th className="px-4 py-3">種別</th>
                                    <th className="px-4 py-3 text-right">数量</th>
                                    <th className="px-4 py-3">操作者</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {recentMovements.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-4 py-6 text-center text-gray-400 text-xs">
                                            まだ入出庫の記録がありません。
                                        </td>
                                    </tr>
                                ) : (
                                    recentMovements.map(m => (
                                        <tr key={m.id} className="hover:bg-gray-50">
                                            <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{m.created_at}</td>
                                            <td className="px-4 py-3">
                                                <div>{m.product_name}</div>
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
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </AppLayout>
        </>
    );
}
