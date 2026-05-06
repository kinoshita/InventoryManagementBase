import { Head } from '@inertiajs/react';

export default function Home() {
    return (
        <>
            <Head title="ホーム" />
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">
                        Laravel + Inertia + React
                    </h1>
                    <p className="text-gray-600 text-lg">
                        TailwindCSS でスタイリングされたベースプロジェクト
                    </p>
                </div>
            </div>
        </>
    );
}
