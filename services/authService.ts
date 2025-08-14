import {
  createUserWithEmailAndPassword,
  deleteUser,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  type User,
} from "firebase/auth";
import { deleteDoc, doc, setDoc } from "firebase/firestore";

import { auth, db } from "@/config/firebase";
import type { UserProfile } from "@/types/auth/user";
import { getJapaneseErrorMessage } from "@/utils/helpers";


// Firestoreコレクション名の定数
const USERS_COLLECTION = "users";


/**
 * エラーハンドリングのヘルパー関数
 */
const handleAuthError = (error: unknown): never => {
  const errorCode =
    error && typeof error === "object" && "code" in error
      ? (error as { code: string }).code
      : undefined;
  const errorMessage =
    error && typeof error === "object" && "message" in error
      ? (error as { message: string }).message
      : "不明なエラーが発生しました";

  const japaneseMessage = errorCode ? getJapaneseErrorMessage(errorCode) : null;
  throw new Error(japaneseMessage || errorMessage);
};

/**
 * 初期ユーザープロフィールを作成する関数
 */
const createInitialUserProfile = (
  user: User,
  displayName: string
): UserProfile => ({
  uid: user.uid,
  email: user.email || "",
  displayName,
  bio: "",
  postsCount: 0,
  answersCount: 0,
  bestAnswersCount: 0,
  createdAt: new Date(),
});

export const authService = {
  /**
   * 新規ユーザー登録
   * @param email - ユーザーのメールアドレス
   * @param password - パスワード
   * @param displayName - 表示名
   * @returns 作成されたユーザー情報
   */
  async signUp(
    email: string,
    password: string,
    displayName: string
  ): Promise<User> {
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = result.user;

      // プロフィールを更新
      await updateProfile(user, { displayName });

      // Firestoreにユーザープロフィールを保存
      const userProfile = createInitialUserProfile(user, displayName);
      await setDoc(doc(db, USERS_COLLECTION, user.uid), userProfile);

      return user;
    } catch (error) {
      return handleAuthError(error);
    }
  },

  /**
   * ユーザーログイン
   * @param email - メールアドレス
   * @param password - パスワード
   * @returns ログインしたユーザー情報
   */
  async signIn(email: string, password: string): Promise<User> {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      return result.user;
    } catch (error) {
      return handleAuthError(error);
    }
  },

  /**
   * ユーザーログアウト
   */
  async logOut(): Promise<void> {
    try {
      await signOut(auth);
    } catch (error) {
      handleAuthError(error);
    }
  },

  /**
   * 現在のユーザー情報を取得
   * @returns 現在のユーザー情報（ログインしていない場合はnull）
   */
  getCurrentUser(): User | null {
    return auth.currentUser;
  },

  /**
   * パスワードリセットメールを送信
   * @param email - リセット先のメールアドレス
   */
  async resetPassword(email: string): Promise<void> {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      handleAuthError(error);
    }
  },

  /**
   * ユーザーアカウントを完全に削除
   * 注意: この操作は取り消しできません
   */
  async deleteAccount(): Promise<void> {
    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error("ユーザーがログインしていません");
      }

      // Firestoreからユーザーデータを削除
      await deleteDoc(doc(db, USERS_COLLECTION, user.uid));

      // Firebaseのユーザーアカウントを削除
      await deleteUser(user);
    } catch (error) {
      handleAuthError(error);
    }
  },
};
