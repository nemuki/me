# AGENTS.md

## プロジェクト概要

個人リンク集サイト（linktree 風）。Astro + Cloudflare Workers でホスティング。
単一ページ構成（`src/pages/index.astro`）で、プロフィールとリンクカードをグリッド表示する。

## 技術スタック

- **フレームワーク**: Astro 5（SSR モード、`@astrojs/cloudflare` アダプター）
- **ホスティング**: Cloudflare Workers + Assets（`wrangler.jsonc` で設定）
- **パッケージマネージャー**: pnpm
- **リンター/フォーマッター**: Biome（タブインデント、ダブルクォート）
- **言語**: TypeScript（`astro/tsconfigs/strict` ベース）

## アーキテクチャ

```
src/
  pages/index.astro      # 唯一のページ。profile と sections をレンダリング
  data/links.ts          # プロフィール情報 + リンクデータ（編集の主な対象）
  components/LinkCard.astro  # リンクカードコンポーネント
  layouts/Layout.astro   # HTML シェル。CSS 変数でライト/ダーク対応
  utils/getIcon.ts       # simple-icons パッケージからスラグ→SVG を取得
  utils/getGravatar.ts   # ビルド時に Gravatar を Base64 Data URL に変換
```

## 重要な規約

### リンク追加・編集

`src/data/links.ts` の `sections` 配列を編集するだけでサイトが更新される。各リンクは以下の型に従う:

```ts
{ label: string; url: string; sub: string; icon: string }
```

- `icon` フィールドは [Simple Icons](https://simpleicons.org) のスラグを指定する（例: `"github"`, `"x"`, `"bluesky"`）
- `getIcon()` がスラグを `siGithub` 形式のキーに変換して SVG を取得する

### スタイリング

- CSS 変数（`--bg`, `--surface`, `--text`, `--text-sub`, `--border`, `--card-radius`）を `Layout.astro` で定義
- `prefers-color-scheme: dark` メディアクエリでダークモード対応
- コンポーネントスコープドCSS（Astro の `<style>` タグ）を使用

### 環境変数

- `GRAVATAR_EMAIL`: 設定するとビルド時に Gravatar アバターを取得して Base64 に変換。未設定時は GitHub アバター URL にフォールバック

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
