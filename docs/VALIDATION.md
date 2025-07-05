# バリデーション機能ドキュメント

## 概要

SolveMe アプリでは、フロントエンドでの堅牢なバリデーション機能を提供しています。ユーザーの入力を検証し、適切なエラーメッセージを表示することで、良好なユーザーエクスペリエンスを実現します。

## 📁 ファイル構成

### `utils/validation.ts`

- バリデーション関数の集合
- 各フィールド専用のバリデーション関数
- 汎用的なバリデーション機能

### `hooks/useForm.ts`

- フォーム状態管理のカスタム Hook
- バリデーション結果の管理
- フォーム送信処理

### `components/ui/ValidatedInput.tsx`

- バリデーション機能付き入力コンポーネント
- エラー表示、パスワード強度表示

### `components/ui/ValidatedTextArea.tsx`

- バリデーション機能付きテキストエリア
- 文字数カウント、エラー表示

## 🔧 バリデーション関数

### メールアドレス (`validateEmail`)

```typescript
const result = validateEmail(email);
// { isValid: boolean, error?: string }
```

**チェック項目:**

- 必須入力チェック
- 正規表現による形式チェック
- 最大長チェック (320 文字)

### パスワード (`validatePassword`)

```typescript
const result = validatePassword(password);
```

**チェック項目:**

- 必須入力チェック
- 最小長チェック (6 文字以上)
- 最大長チェック (128 文字以内)
- 英字・数字の含有チェック
- 連続する同じ文字のチェック

### パスワード確認 (`validatePasswordConfirmation`)

```typescript
const result = validatePasswordConfirmation(password, confirmPassword);
```

**チェック項目:**

- 必須入力チェック
- パスワードとの一致チェック

### ユーザー名 (`validateDisplayName`)

```typescript
const result = validateDisplayName(displayName);
```

**チェック項目:**

- 必須入力チェック
- 文字数チェック (1-20 文字)
- 禁止文字チェック
- 先頭・末尾空白チェック

### 投稿タイトル (`validatePostTitle`)

**チェック項目:**

- 必須入力チェック
- 文字数チェック (5-100 文字)

### 投稿内容 (`validatePostContent`)

**チェック項目:**

- 必須入力チェック
- 文字数チェック (10-2000 文字)

### 回答内容 (`validateAnswerContent`)

**チェック項目:**

- 必須入力チェック
- 文字数チェック (5-1000 文字)

### カテゴリ (`validateCategory`)

**チェック項目:**

- 必須選択チェック
- 有効なカテゴリかのチェック

## 🎨 UI コンポーネント

### ValidatedInput

```tsx
<ValidatedInput
  label="メールアドレス"
  value={email}
  error={error}
  touched={touched}
  onChangeText={handleChange}
  onBlur={handleBlur}
  required
  showPasswordStrength={true} // パスワード用
  passwordStrength={strength} // パスワード強度
/>
```

### ValidatedTextArea

```tsx
<ValidatedTextArea
  label="投稿内容"
  value={content}
  error={error}
  touched={touched}
  onChangeText={handleChange}
  onBlur={handleBlur}
  maxLength={2000}
  showCharacterCount={true}
  required
/>
```

## 🔄 useForm Hook

### 基本的な使用方法

```tsx
const form = useForm({
  initialValues: {
    email: "",
    password: "",
  },
  validationRules: {
    email: { required: true },
    password: { required: true },
  },
  onSubmit: async (values) => {
    // カスタムバリデーション
    const emailValidation = validateEmail(values.email);
    if (!emailValidation.isValid) {
      form.setError("email", emailValidation.error!);
      return;
    }

    // 送信処理
    await submitData(values);
  },
});
```

### 提供される機能

- `values`: 現在のフォーム値
- `errors`: フィールドエラー
- `touched`: フィールドがタッチされたか
- `isValid`: フォーム全体の妥当性
- `isSubmitting`: 送信中かどうか
- `setValue(field, value)`: 値の設定
- `setError(field, error)`: エラーの設定
- `handleBlur(field)`: ブラー処理
- `handleSubmit()`: 送信処理

## 🚀 パスワード強度評価

```typescript
const strength = getPasswordStrength(password);
// {
//   score: number (0-100),
//   feedback: string,
//   color: string
// }
```

**評価基準:**

- 8 文字以上: +20 点
- 小文字含有: +20 点
- 大文字含有: +20 点
- 数字含有: +20 点
- 記号含有: +20 点

**強度レベル:**

- 0-39 点: 弱い (赤)
- 40-59 点: 普通 (オレンジ)
- 60-79 点: 強い (緑)
- 80-100 点: 非常に強い (濃い緑)

## 🎯 汎用バリデーション

### validateField

```typescript
const result = validateField(value, {
  required: true,
  minLength: 5,
  maxLength: 100,
  pattern: /^[a-zA-Z0-9]+$/,
  custom: (value) => value !== "forbidden",
  message: "カスタムエラーメッセージ",
});
```

### validateMultipleFields

```typescript
const results = validateMultipleFields({
  email: { value: email, rules: { required: true, pattern: emailRegex } },
  password: { value: password, rules: { required: true, minLength: 6 } },
});
```

## 💡 ベストプラクティス

1. **リアルタイムバリデーション**: onBlur でバリデーションを実行
2. **視覚的フィードバック**: エラー時の色やアイコンの変更
3. **明確なエラーメッセージ**: ユーザーが理解しやすい日本語メッセージ
4. **パスワード強度表示**: セキュリティ向上のための視覚的ガイド
5. **文字数カウント**: 長いテキスト入力時のユーザビリティ向上

## 🔧 拡張方法

### 新しいバリデーション関数の追加

```typescript
export const validateCustomField = (value: string): ValidationResult => {
  // カスタムロジック
  if (customCondition) {
    return { isValid: false, error: "エラーメッセージ" };
  }
  return { isValid: true };
};
```

### 新しいバリデーションルールの追加

```typescript
// ValidationRuleインターフェースに新しいプロパティを追加
export interface ValidationRule {
  // 既存のプロパティ...
  customRule?: boolean;
}
```
