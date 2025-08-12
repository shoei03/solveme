import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  type User,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

import { auth, db } from "../config/firebase";
import { getJapaneseErrorMessage } from "../utils/helpers";

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  bio?: string;
  postsCount: number;
  answersCount: number;
  bestAnswersCount: number;
  createdAt: Date;
}

export const authService = {
  // 新規登録
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
      const userProfile: UserProfile = {
        uid: user.uid,
        email: user.email || "",
        displayName,
        bio: "",
        postsCount: 0,
        answersCount: 0,
        bestAnswersCount: 0,
        createdAt: new Date(),
      };

      await setDoc(doc(db, "users", user.uid), userProfile);

      return user;
    } catch (error: any) {
      throw new Error(getJapaneseErrorMessage(error.code) || error.message);
    }
  },

  // ログイン
  async signIn(email: string, password: string): Promise<User> {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      return result.user;
    } catch (error: any) {
      throw new Error(getJapaneseErrorMessage(error.code) || error.message);
    }
  },

  // ログアウト
  async logOut(): Promise<void> {
    try {
      await signOut(auth);
    } catch (error: any) {
      throw new Error(getJapaneseErrorMessage(error.code) || error.message);
    }
  },

  // 現在のユーザー取得
  getCurrentUser(): User | null {
    return auth.currentUser;
  },

  // パスワードリセットメール送信
  async resetPassword(email: string): Promise<void> {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error: any) {
      throw new Error(getJapaneseErrorMessage(error.code) || error.message);
    }
  },
};
