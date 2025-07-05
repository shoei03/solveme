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
- プロフィール管理
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

## 📄 ライセンス

MIT License

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
