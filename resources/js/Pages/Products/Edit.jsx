import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';

export default function ProductEdit({ product }) {
    const { data, setData, put, processing, errors } = useForm({
        code:      product.code,
        name:      product.name,
        unit:      product.unit,
        min_stock: product.min_stock,
    });

    function submit(e) {
        e.preventDefault();
        put(`/products/${product.id}`);
    }

    return (
        <>
            <Head title="商品編集" />
            <AppLayout title="商品編集">
                <div className="max-w-lg">
                    <form onSubmit={submit} className="space-y-5 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">商品コード</label>
                            <input
                                type="text"
                                value={data.code}
                                onChange={e => setData('code', e.target.value)}
                                maxLength={50}
                                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.code && <p className="mt-1 text-xs text-red-600">{errors.code}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">商品名</label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={e => setData('name', e.target.value)}
                                maxLength={255}
                                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">単位</label>
                            <input
                                type="text"
                                value={data.unit}
                                onChange={e => setData('unit', e.target.value)}
                                maxLength={50}
                                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.unit && <p className="mt-1 text-xs text-red-600">{errors.unit}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">最小在庫数（アラート閾値）</label>
                            <input
                                type="number"
                                min="0"
                                value={data.min_stock}
                                onChange={e => setData('min_stock', e.target.value)}
                                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.min_stock && <p className="mt-1 text-xs text-red-600">{errors.min_stock}</p>}
                        </div>

                        <div className="flex gap-3 pt-2">
                            <button
                                type="submit"
                                disabled={processing}
                                className="rounded-md bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
                            >
                                更新する
                            </button>
                            <Link
                                href="/products"
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
