import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';

const typeLabels = {
    in:         '入庫',
    out:        '出庫',
    adjustment: '棚卸し（在庫修正）',
};

export default function StocksMove({ products }) {
    const { data, setData, post, processing, errors } = useForm({
        product_id:    '',
        movement_type: 'in',
        quantity:      '',
        note:          '',
    });

    const selectedProduct = products.find(p => String(p.id) === String(data.product_id));

    function submit(e) {
        e.preventDefault();
        post('/stocks/move');
    }

    return (
        <>
            <Head title="入出庫登録" />
            <AppLayout title="入出庫登録">
                <div className="max-w-lg">
                    <form onSubmit={submit} className="space-y-5 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                        {/* 商品選択 */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">商品</label>
                            <select
                                value={data.product_id}
                                onChange={e => setData('product_id', e.target.value)}
                                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">-- 商品を選択 --</option>
                                {products.map(p => (
                                    <option key={p.id} value={p.id}>
                                        [{p.code}] {p.name}（現在: {p.quantity} {p.unit}）
                                    </option>
                                ))}
                            </select>
                            {errors.product_id && <p className="mt-1 text-xs text-red-600">{errors.product_id}</p>}
                        </div>

                        {/* 種別 */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">種別</label>
                            <div className="flex gap-4">
                                {Object.entries(typeLabels).map(([value, label]) => (
                                    <label key={value} className="flex items-center gap-1.5 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="movement_type"
                                            value={value}
                                            checked={data.movement_type === value}
                                            onChange={e => setData('movement_type', e.target.value)}
                                        />
                                        <span className="text-sm">{label}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* 数量 */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                {data.movement_type === 'adjustment' ? '新しい在庫数' : '数量'}
                                {selectedProduct && <span className="ml-1 text-gray-400 font-normal">（単位: {selectedProduct.unit}）</span>}
                            </label>
                            {data.movement_type === 'adjustment' && selectedProduct && (
                                <p className="mb-1 text-xs text-gray-500">
                                    現在の在庫数: {selectedProduct.quantity} {selectedProduct.unit}
                                </p>
                            )}
                            <input
                                type="number"
                                min="1"
                                value={data.quantity}
                                onChange={e => setData('quantity', e.target.value)}
                                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="数量を入力"
                            />
                            {errors.quantity && <p className="mt-1 text-xs text-red-600">{errors.quantity}</p>}
                        </div>

                        {/* 備考 */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">備考（任意）</label>
                            <input
                                type="text"
                                value={data.note}
                                onChange={e => setData('note', e.target.value)}
                                maxLength={255}
                                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="仕入れ先、理由など"
                            />
                            {errors.note && <p className="mt-1 text-xs text-red-600">{errors.note}</p>}
                        </div>

                        <div className="flex gap-3 pt-2">
                            <button
                                type="submit"
                                disabled={processing}
                                className="rounded-md bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
                            >
                                登録する
                            </button>
                            <Link
                                href="/stocks"
                                className="rounded-md border border-gray-300 px-5 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                            >
                                キャンセル
                            </Link>
                        </div>
                    </form>
                </div>
            </AppLayout>
        </>
    );
}
