 # Firebase 設定手順

このプロジェクトでは Firebase を使用しています。以下の手順で Firebase プロジェクトを設定してください。

## 1. Firebase プロジェクトの作成

1. [Firebase Console](https://console.firebase.google.com/) にアクセス
2. 「プロジェクトを作成」をクリック
3. プロジェクト名を入力（例：solveme-app）
4. Google Analytics の設定（任意）

## 2. アプリの追加

1. プロジェクトダッシュボードで「アプリを追加」をクリック
2. Web アプリ（</> アイコン）を選択
3. アプリのニックネームを入力
4. Firebase Hosting は任意

## 3. 設定情報の取得

1. Firebase SDK configuration から設定オブジェクトをコピー
2. `config/firebase.ts` ファイルの `firebaseConfig` オブジェクトを更新

```javascript
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id",
};
```

## 4. Authentication の設定

1. Firebase Console のサイドメニューから「Authentication」を選択
2. 「始める」をクリック
3. 「Sign-in method」タブで「メール/パスワード」を有効化

## 5. Firestore Database の設定

1. Firebase Console のサイドメニューから「Firestore Database」を選択
2. 「データベースの作成」をクリック
3. セキュリティルールを「テストモードで開始」に設定（開発用）
4. ロケーションを選択（asia-northeast1 推奨）

## 6. セキュリティルール（本番環境用）

開発が完了したら、以下のセキュリティルールを適用してください：

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // ユーザープロフィール
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }

    // 悩みの投稿
    match /posts/{postId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null && request.auth.uid == request.resource.data.authorId;
      allow update: if request.auth != null && request.auth.uid == resource.data.authorId;
      allow delete: if request.auth != null && request.auth.uid == resource.data.authorId;
    }

    // 回答
    match /answers/{answerId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null && request.auth.uid == request.resource.data.authorId;
      allow update: if request.auth != null && request.auth.uid == resource.data.authorId;
      allow delete: if request.auth != null && request.auth.uid == resource.data.authorId;
    }
  }
}
```

## 注意事項

- `config/firebase.ts` ファイルの設定情報は実際のプロジェクト情報に置き換えてください
- 本番環境では適切なセキュリティルールを設定してください
- API キーなどの機密情報は環境変数で管理することを検討してください
