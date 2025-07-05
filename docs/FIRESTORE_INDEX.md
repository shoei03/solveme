# Firestore インデックス設定ガイド

## 発生したエラー

```
FirebaseError: The query requires an index. You can create it here: [Firebase Console URL]
```

## 原因

SolveMe アプリのプロフィール機能で、Firestore クエリが複合インデックスを必要としているため。
具体的には以下のクエリでインデックスが必要です：

1. `posts` コレクション: `authorId` + `createdAt` (降順)
2. `answers` コレクション: `authorId` + `createdAt` (降順)
3. `answers` コレクション: `authorId` + `isBestAnswer` + `createdAt`

## 解決方法

### 1. Firebase Console でのインデックス作成

1. エラーメッセージに表示されたリンクをクリック
2. Firebase Console で「インデックスを作成」をクリック
3. 作成完了まで数分間待機

### 2. 手動でのインデックス作成

Firebase Console > Firestore Database > インデックス で以下を作成：

#### posts コレクション用インデックス

- コレクション ID: `posts`
- フィールド:
  - `authorId` (昇順)
  - `createdAt` (降順)

#### answers コレクション用インデックス (基本)

- コレクション ID: `answers`
- フィールド:
  - `authorId` (昇順)
  - `createdAt` (降順)

#### answers コレクション用インデックス (ベストアンサー)

- コレクション ID: `answers`
- フィールド:
  - `authorId` (昇順)
  - `isBestAnswer` (昇順)
  - `createdAt` (降順)

### 3. Firestore ルールの確認

Firestore Database > ルール で以下のような基本ルールが設定されているか確認：

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // ユーザープロフィール
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }

    // 投稿 (今後実装)
    match /posts/{postId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == resource.data.authorId;
    }

    // 回答 (今後実装)
    match /answers/{answerId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == resource.data.authorId;
    }
  }
}
```

## 開発時の対応

現在のコードでは、コレクションが存在しない場合やインデックスエラーが発生した場合に、エラーをキャッチして空のデータを返すようになっています。

### profileService.ts の対応

```typescript
try {
  // Firestoreクエリ実行
} catch {
  console.log("Collection not found or no index - skipping query");
  // 空のデータまたはデフォルト値を返す
}
```

## 本番環境での注意点

1. **インデックス作成の待機時間**: 新しいインデックスの作成には数分〜数時間かかる場合があります
2. **インデックスサイズ**: 大量のデータがある場合、インデックスサイズも大きくなります
3. **クエリコスト**: 複合インデックスを使用するクエリは、単純なクエリよりもコストが高くなります

## 今後の実装時の注意

新しいコレクションやクエリを追加する際は：

1. 必要なインデックスを事前に特定
2. Firebase Console でインデックスを作成
3. エラーハンドリングを適切に実装
4. 開発・ステージング・本番環境すべてでインデックスを作成

## 関連ドキュメント

- [Firestore インデックス管理](https://firebase.google.com/docs/firestore/query-data/indexing)
- [Firestore セキュリティルール](https://firebase.google.com/docs/firestore/security/get-started)
- [Firestore クエリ最適化](https://firebase.google.com/docs/firestore/best-practices)
