// エラーメッセージを日本語に変換する関数
export const getJapaneseErrorMessage = (error: string): string => {
  const errorMessages: { [key: string]: string } = {
    "auth/email-already-in-use": "このメールアドレスは既に使用されています",
    "auth/weak-password":
      "パスワードが弱すぎます（6文字以上で入力してください）",
    "auth/invalid-email": "無効なメールアドレスです",
    "auth/user-not-found": "ユーザーが見つかりません",
    "auth/wrong-password": "パスワードが間違っています",
    "auth/too-many-requests":
      "リクエストが多すぎます。しばらく時間をおいてから再試行してください",
    "auth/network-request-failed": "ネットワークエラーが発生しました",
  };

  return errorMessages[error] || "エラーが発生しました";
};

// 日付をフォーマットする関数
export const formatDate = (date: Date): string => {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return "たった今";
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes}分前`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours}時間前`;
  } else if (diffInSeconds < 604800) {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days}日前`;
  } else {
    return date.toLocaleDateString("ja-JP");
  }
};

// バリデーション関数
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): boolean => {
  return password.length >= 6;
};

export const validateDisplayName = (displayName: string): boolean => {
  return displayName.trim().length >= 1 && displayName.trim().length <= 20;
};
