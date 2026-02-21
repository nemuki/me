# AGENTS.md

## プロジェクト概要

個人ポートフォリオサイト（linktree 風）。Astro + Cloudflare Workers でホスティング。
単一ページ構成（`src/pages/index.astro`）で、プロフィール・リンクカード・経歴をグリッド表示する。

## 技術スタック

- **フレームワーク**: Astro 5（SSR モード、`@astrojs/cloudflare` アダプター）
- **コンテンツ**: Astro Content Collections（YAML でリンク管理、MDX で経歴管理）
- **ホスティング**: Cloudflare Workers + Assets（`wrangler.jsonc` で設定）
- **パッケージマネージャー**: pnpm
- **リンター/フォーマッター**: Biome（タブインデント、ダブルクォート）
- **言語**: TypeScript（`astro/tsconfigs/strict` ベース）

## アーキテクチャ

```
src/
  pages/index.astro          # 唯一のページ。Content Collections からデータ取得してレンダリング
  content/
    config.ts                # コレクション定義（profile / links / bio）
    profile/index.yaml       # プロフィール情報（名前・役職・アバター URL）
    links/
      tech.yaml              # Tech リンクセクション（order: 1）
      sns.yaml               # SNS リンクセクション（order: 2）
      *.yaml                 # 追加セクションはここに追加
    bio/
      index.mdx              # 経歴・職歴（MDX で記述）
  components/LinkCard.astro  # リンクカードコンポーネント
  layouts/Layout.astro       # HTML シェル。CSS 変数でライト/ダーク対応
  utils/getIcon.ts           # simple-icons パッケージからスラグ→SVG を取得
  utils/getGravatar.ts       # ビルド時に Gravatar を Base64 Data URL に変換
```

## 重要な規約

### リンク追加・編集

`src/content/links/*.yaml` ファイルを編集または新規作成するだけでサイトが更新される。

```yaml
title: "Tech 🚀"
order: 1           # 表示順（小さいほど先）
links:
  - label: "GitHub"
    url: "https://github.com/username"
    sub: "github.com/username"
    icon: "github"  # Simple Icons のスラグ (https://simpleicons.org)
```

- `icon` は [Simple Icons](https://simpleicons.org) のスラグ（例: `"github"`, `"x"`, `"bluesky"`）
- `getIcon()` がスラグを `siGithub` 形式のキーに変換して SVG を取得する
- 新セクションは新しい `.yaml` ファイルを追加し `order` で並び順を制御する

### 経歴の編集

`src/content/bio/index.mdx` を Markdown/MDX で自由に記述する。
ファイルが存在する場合のみページに経歴セクションが表示される。

### プロフィールの編集

`src/content/profile/index.yaml` を編集する。

```yaml
name: "Your Name"
nameJa: "名前"
role: "Job Title"
avatarUrl: "https://github.com/username.png"
```

### スタイリング

- CSS 変数（`--bg`, `--surface`, `--text`, `--text-sub`, `--border`, `--card-radius`）を `Layout.astro` で定義
- `prefers-color-scheme: dark` メディアクエリでダークモード対応
- コンポーネントスコープドCSS（Astro の `<style>` タグ）を使用

### 環境変数

- `GRAVATAR_EMAIL`: 設定するとビルド時に Gravatar アバターを取得して Base64 に変換。未設定時は `profile.yaml` の `avatarUrl` にフォールバック

## 開発コマンド

```sh
pnpm dev              # ローカル開発サーバー（localhost:4321）
pnpm build            # プロダクションビルド
pnpm preview          # ビルド後 wrangler dev でローカルプレビュー
pnpm deploy           # ビルド + Cloudflare にデプロイ
pnpm check            # Biome の lint/format チェック
pnpm check:fix        # Biome で自動修正
pnpm cf-typegen       # wrangler types で worker-configuration.d.ts を再生成
```

## コード品質

- Biome を使用（ESLint/Prettier は不使用）
- インデント: **タブ**
- クォート: **ダブルクォート**
- コード変更後は `pnpm check` を実行して lint/format を確認すること
