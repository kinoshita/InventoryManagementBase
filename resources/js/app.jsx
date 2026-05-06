import './bootstrap';
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';

// アプリケーション名の設定
const appName = document.querySelector('meta[name="app-name"]')?.content ?? 'Laravel';

createInertiaApp({
    // タイトルの形式
    title: (title) => `${title} - ${appName}`,

    // ページコンポーネントの自動解決
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob('./Pages/**/*.jsx'),
        ),

    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(<App {...props} />);
    },
});
