// バリデーション結果の型定義
export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

// バリデーションルールの型定義
export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: string) => boolean;
  message?: string;
}

// メールアドレスのバリデーション
export const validateEmail = (email: string): ValidationResult => {
  if (!email || email.trim() === "") {
    return { isValid: false, error: "メールアドレスを入力してください" };
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email.trim())) {
    return { isValid: false, error: "有効なメールアドレスを入力してください" };
  }

  if (email.length > 320) {
    return { isValid: false, error: "メールアドレスが長すぎます" };
  }

  return { isValid: true };
};

// パスワードのバリデーション
export const validatePassword = (password: string): ValidationResult => {
  if (!password) {
    return { isValid: false, error: "パスワードを入力してください" };
  }

  if (password.length < 6) {
    return { isValid: false, error: "パスワードは6文字以上で入力してください" };
  }

  if (password.length > 128) {
    return {
      isValid: false,
      error: "パスワードは128文字以内で入力してください",
    };
  }

  // パスワード強度チェック
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);

  if (!hasLetter || !hasNumber) {
    return {
      isValid: false,
      error: "パスワードは英字と数字を含む必要があります（推奨）",
    };
  }

  // 連続する同じ文字のチェック
  if (/(.)\1{2,}/.test(password)) {
    return {
      isValid: false,
      error: "同じ文字を3回以上連続して使用できません",
    };
  }

  return { isValid: true };
};

// パスワード確認のバリデーション
export const validatePasswordConfirmation = (
  password: string,
  confirmPassword: string
): ValidationResult => {
  if (!confirmPassword) {
    return { isValid: false, error: "パスワード確認を入力してください" };
  }

  if (password !== confirmPassword) {
    return { isValid: false, error: "パスワードが一致しません" };
  }

  return { isValid: true };
};

// ユーザー名のバリデーション
export const validateDisplayName = (displayName: string): ValidationResult => {
  if (!displayName || displayName.trim() === "") {
    return { isValid: false, error: "ユーザー名を入力してください" };
  }

  const trimmed = displayName.trim();

  if (trimmed.length < 1) {
    return { isValid: false, error: "ユーザー名は1文字以上で入力してください" };
  }

  if (trimmed.length > 20) {
    return {
      isValid: false,
      error: "ユーザー名は20文字以内で入力してください",
    };
  }

  // 禁止文字のチェック
  const forbiddenChars = /[<>\"'&]/;
  if (forbiddenChars.test(trimmed)) {
    return { isValid: false, error: "使用できない文字が含まれています" };
  }

  // 先頭・末尾の空白チェック
  if (displayName !== trimmed) {
    return {
      isValid: false,
      error: "ユーザー名の先頭・末尾に空白は使用できません",
    };
  }

  return { isValid: true };
};

// 投稿タイトルのバリデーション
export const validatePostTitle = (title: string): ValidationResult => {
  if (!title || title.trim() === "") {
    return { isValid: false, error: "タイトルを入力してください" };
  }

  const trimmed = title.trim();

  if (trimmed.length < 5) {
    return { isValid: false, error: "タイトルは5文字以上で入力してください" };
  }

  if (trimmed.length > 100) {
    return { isValid: false, error: "タイトルは100文字以内で入力してください" };
  }

  return { isValid: true };
};

// 投稿内容のバリデーション
export const validatePostContent = (content: string): ValidationResult => {
  if (!content || content.trim() === "") {
    return { isValid: false, error: "内容を入力してください" };
  }

  const trimmed = content.trim();

  if (trimmed.length < 10) {
    return { isValid: false, error: "内容は10文字以上で入力してください" };
  }

  if (trimmed.length > 2000) {
    return { isValid: false, error: "内容は2000文字以内で入力してください" };
  }

  return { isValid: true };
};

// 回答内容のバリデーション
export const validateAnswerContent = (content: string): ValidationResult => {
  if (!content || content.trim() === "") {
    return { isValid: false, error: "回答を入力してください" };
  }

  const trimmed = content.trim();

  if (trimmed.length < 5) {
    return { isValid: false, error: "回答は5文字以上で入力してください" };
  }

  if (trimmed.length > 1000) {
    return { isValid: false, error: "回答は1000文字以内で入力してください" };
  }

  return { isValid: true };
};

// カテゴリのバリデーション
export const validateCategory = (category: string): ValidationResult => {
  const validCategories = [
    "人間関係",
    "仕事・キャリア",
    "健康・メンタル",
    "学業・勉強",
    "恋愛・結婚",
    "家族",
    "お金・投資",
    "趣味・娯楽",
    "その他",
  ];

  if (!category) {
    return { isValid: false, error: "カテゴリを選択してください" };
  }

  if (!validCategories.includes(category)) {
    return { isValid: false, error: "有効なカテゴリを選択してください" };
  }

  return { isValid: true };
};

// 自己紹介のバリデーション
export const validateBio = (bio: string): ValidationResult => {
  if (bio && bio.length > 300) {
    return { isValid: false, error: "自己紹介は300文字以内で入力してください" };
  }

  return { isValid: true };
};

// 汎用バリデーション関数
export const validateField = (
  value: string,
  rules: ValidationRule
): ValidationResult => {
  // 必須チェック
  if (rules.required && (!value || value.trim() === "")) {
    return {
      isValid: false,
      error: rules.message || "この項目は必須です",
    };
  }

  // 値が空の場合、必須でなければOK
  if (!value || value.trim() === "") {
    return { isValid: true };
  }

  const trimmed = value.trim();

  // 最小長チェック
  if (rules.minLength && trimmed.length < rules.minLength) {
    return {
      isValid: false,
      error: rules.message || `${rules.minLength}文字以上で入力してください`,
    };
  }

  // 最大長チェック
  if (rules.maxLength && trimmed.length > rules.maxLength) {
    return {
      isValid: false,
      error: rules.message || `${rules.maxLength}文字以内で入力してください`,
    };
  }

  // パターンチェック
  if (rules.pattern && !rules.pattern.test(trimmed)) {
    return {
      isValid: false,
      error: rules.message || "入力形式が正しくありません",
    };
  }

  // カスタムバリデーション
  if (rules.custom && !rules.custom(trimmed)) {
    return {
      isValid: false,
      error: rules.message || "バリデーションエラーが発生しました",
    };
  }

  return { isValid: true };
};

// 複数フィールドの一括バリデーション
export const validateMultipleFields = (fields: {
  [key: string]: { value: string; rules: ValidationRule };
}): { [key: string]: ValidationResult } => {
  const results: { [key: string]: ValidationResult } = {};

  Object.keys(fields).forEach((key) => {
    const field = fields[key];
    results[key] = validateField(field.value, field.rules);
  });

  return results;
};

// すべてのバリデーションが成功しているかチェック
export const isAllValid = (results: {
  [key: string]: ValidationResult;
}): boolean => {
  return Object.values(results).every((result) => result.isValid);
};

// パスワード強度の評価
export const getPasswordStrength = (
  password: string
): {
  score: number;
  feedback: string;
  color: string;
} => {
  if (!password) {
    return {
      score: 0,
      feedback: "パスワードを入力してください",
      color: "#FF3B30",
    };
  }

  let score = 0;
  const checks = {
    length: password.length >= 8,
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    numbers: /[0-9]/.test(password),
    symbols: /[^a-zA-Z0-9]/.test(password),
  };

  // 各条件をクリアするごとにスコアを加算
  Object.values(checks).forEach((check) => {
    if (check) score += 20;
  });

  let feedback = "";
  let color = "";

  if (score < 40) {
    feedback = "弱い";
    color = "#FF3B30";
  } else if (score < 60) {
    feedback = "普通";
    color = "#FF9500";
  } else if (score < 80) {
    feedback = "強い";
    color = "#34C759";
  } else {
    feedback = "非常に強い";
    color = "#30D158";
  }

  return { score, feedback, color };
};
