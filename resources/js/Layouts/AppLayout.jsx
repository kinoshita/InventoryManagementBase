import { Link, useForm, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

const navItems = [
    { href: '/dashboard',       label: 'ダッシュボード' },
    { href: '/stocks',          label: '在庫一覧' },
    { href: '/stocks/move',     label: '入出庫登録' },
    { href: '/products',        label: '商品マスタ' },
    { href: '/stock-movements', label: '入出庫履歴' },
];

export default function AppLayout({ title, children }) {
    const { auth, flash } = usePage().props;
    const { post, processing } = useForm({});
    const [notice, setNotice] = useState(null);
    const currentPath = usePage().url.split('?')[0];

    useEffect(() => {
        if (flash?.success || flash?.error) {
            setNotice({ type: flash.success ? 'success' : 'error', message: flash.success || flash.error });
            const timer = setTimeout(() => setNotice(null), 4000);
            return () => clearTimeout(timer);
        }
    }, [flash]);

    function logout(e) {
        e.preventDefault();
        post('/logout');
    }

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* サイドバー */}
            <aside className="w-56 bg-gray-800 text-white flex flex-col shrink-0">
                <div className="px-4 py-5 text-sm font-bold border-b border-gray-700">
                    在庫管理システム
                </div>
                <nav className="flex-1 py-4">
                    {navItems.map(item => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`block px-4 py-2.5 text-sm hover:bg-gray-700 transition-colors ${
                                currentPath === item.href ? 'bg-gray-700 font-medium' : 'text-gray-300'
                            }`}
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>
                <div className="px-4 py-4 border-t border-gray-700 text-xs text-gray-400">
                    <div className="mb-2 truncate">{auth.account?.email}</div>
                    <form onSubmit={logout}>
                        <button
                            type="submit"
                            disabled={processing}
                            className="text-gray-400 hover:text-white underline"
                        >
                            ログアウト
                        </button>
                    </form>
                </div>
            </aside>

            {/* メインコンテンツ */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* フラッシュ通知 */}
                {notice && (
                    <div className={`px-6 py-3 text-sm font-medium ${
                        notice.type === 'success'
                            ? 'bg-green-100 text-green-800 border-b border-green-200'
                            : 'bg-red-100 text-red-800 border-b border-red-200'
                    }`}>
                        {notice.message}
                    </div>
                )}
                <main className="flex-1 p-6">
                    {title && (
                        <h1 className="text-xl font-bold text-gray-800 mb-6">{title}</h1>
                    )}
                    {children}
                </main>
            </div>
        </div>
    );
}
