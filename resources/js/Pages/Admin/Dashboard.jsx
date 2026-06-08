import { Head } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';

export default function AdminDashboard() {
    return (
        <>
            <Head title="管理者ダッシュボード" />
            <AppLayout title="管理者ダッシュボード">
                <p className="text-gray-600">管理者としてログインしています。</p>
            </AppLayout>
        </>
    );
}
