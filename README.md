# So## 🚀 実装済み機能

### ✅ 認証機能

- メールアドレス・パスワードによる新規登録
- ログイン機能
- ログアウト機能
- Firebase Authentication 連携
- 認証状態の永続化

### ✅ バリデーション機能

- リアルタイムフォームバリデーション
- パスワード強度評価
- カスタムバリデーションルール
- 日本語エラーメッセージ
- 再利用可能なバリデーションコンポーネント

### ✅ プロフィール機能

- プロフィール情報表示（ユーザー名、メール、参加日、自己紹介）
- アバター画像表示
- プロフィール編集機能
- 活動統計表示（投稿数、回答数、ベストアンサー数、役に立った数）
- 最近のアクティビティ履歴
- ログアウト機能

### ✅ 品質管理

- TypeScript 型チェック
- ESLint 設定
- ビルドパイプライン
- CI/CD 対応スクリプトみ相談チャットアプリ

React Native (Expo) で作成された、ユーザーが悩みを投稿し、他のユーザーが回答できるコミュニティアプリです。

## � 実装済み機能

### ✅ 認証機能

- メールアドレス・パスワードによる新規登録
- ログイン機能
- ログアウト機能
- Firebase Authentication 連携
- 認証状態の永続化

## 🔄 今後実装予定の機能

- 悩みの投稿機能
- 悩みの一覧表示・閲覧機能
- 回答機能
- ベストアンサー選定機能
- カテゴリ別フィルター
- 評価システム
- プッシュ通知
- プロフィール画像アップロード
- 収益化機能（トップ表示）

## 📱 セットアップ手順

### 1. 依存関係のインストール

```bash
npm install
```

### 2. Firebase の設定

1. [Firebase Console](https://console.firebase.google.com/) でプロジェクトを作成
2. Authentication と Firestore を有効化
3. `config/firebase.ts` の設定情報を更新

詳細は `FIREBASE_SETUP.md` を参照してください。

### 3. アプリの起動

```bash
npm start
```

### 4. 開発・ビルドコマンド

```bash
# 開発サーバー起動
npm start

# 特定プラットフォームで起動
npm run android
npm run ios
npm run web

# ビルド
npm run build
npm run build:web

# 品質チェック
npm run lint          # ESLint
npm run lint:fix      # ESLint（自動修正）
npm run type-check    # TypeScript型チェック
npm test              # 型チェック + Lint

# CI/CD用
npm run prebuild      # ビルド前チェック
npm run precommit     # コミット前チェック
```

## 🛠 技術スタック

- **フロントエンド**: React Native + Expo
- **バックエンド**: Firebase (Authentication + Firestore)
- **言語**: TypeScript
- **ナビゲーション**: Expo Router

## 📁 プロジェクト構造

```
├── app/                    # Expo Router の画面
├── components/            # 再利用可能なコンポーネント
│   ├── auth/             # 認証関連コンポーネント
│   └── ui/              # UI コンポーネント
├── config/               # Firebase 設定
├── contexts/             # React Context
├── services/             # API サービス
├── utils/               # ユーティリティ関数
└── assets/              # 画像・フォントなどのアセット
```

## 🔧 開発

### 認証フロー

1. アプリ起動時に認証状態をチェック
2. 未認証の場合：ログイン/新規登録画面を表示
3. 認証済みの場合：メインアプリを表示

### Firebase 設定

- Authentication: メール/パスワード認証
- Firestore: ユーザープロフィール、投稿、回答データの保存

## � ドキュメント

- [Firebase 設定手順](FIREBASE_SETUP.md)
- [バリデーション機能詳細](docs/VALIDATION.md)
- [プロフィール機能詳細](docs/PROFILE.md)

## 📄 ライセンス

MIT License
