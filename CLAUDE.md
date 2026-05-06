# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 技術スタック

- **バックエンド**: Laravel 13 (PHP 8.4)
- **フロントエンド**: React (JSX) + Inertia.js v3
- **スタイリング**: TailwindCSS v4 (@tailwindcss/vite)
- **ビルドツール**: Vite + @vitejs/plugin-react
- **TypeScript**: 使用しない（JSX のみ）

## コマンド

```bash
# 開発サーバー起動（バックエンド）
php artisan serve

# フロントエンド開発サーバー（HMR）
npm run dev

# フロントエンドビルド
npm run build

# テスト実行
php artisan test

# 単一テスト実行
php artisan test --filter=テスト名

# DB マイグレーション
php artisan migrate

# キャッシュクリア
php artisan optimize:clear
```

## アーキテクチャ

### Inertia.js の仕組み

Inertia はバックエンド（Laravel）とフロントエンド（React）を SPA として繋ぐアダプター。サーバーサイドルーティングを使いながら、クライアントサイドのページ遷移を実現する。

- **ルート定義**: `routes/web.php` で `Inertia::render('PageName')` を返す
- **ページコンポーネント**: `resources/js/Pages/` 以下に JSX で作成
- **データ受け渡し**: `Inertia::render('Page', ['key' => $value])` → コンポーネントの props で受け取る
- **ミドルウェア**: `app/Http/Middleware/HandleInertiaRequests.php` で共有データ（認証情報など）を設定

### ディレクトリ構成

```
resources/
├── js/
│   ├── app.jsx          # エントリポイント（Inertia 初期化）
│   ├── bootstrap.js     # Axios 設定等
│   └── Pages/           # Inertia ページコンポーネント（JSX）
└── css/
    └── app.css          # TailwindCSS インポート
resources/views/
└── app.blade.php        # Inertia のルートテンプレート（単一ファイル）
```

### 新しいページの追加手順

1. `resources/js/Pages/` に `PageName.jsx` を作成
2. `routes/web.php` に `Inertia::render('PageName')` を返すルートを追加

### TailwindCSS v4 の注意点

設定ファイル (`tailwind.config.js`) は不要。`resources/css/app.css` の `@source` ディレクティブでスキャン対象を指定している。
