import { updatePassword, updateProfile } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

import { auth, db } from "@/config/firebase";
import type { UserProfile } from "@/types/auth/user";

export interface ProfileUpdateData {
  displayName?: string;
  bio?: string;
}

export interface PasswordUpdateData {
  currentPassword: string;
  newPassword: string;
}

export interface UserStats {
  postsCount: number;
  answersCount: number;
  bestAnswersCount: number;
  helpfulCount: number;
}

export interface RecentActivity {
  id: string;
  type: "post" | "answer" | "bestAnswer";
  title: string;
  date: Date;
  category?: string;
}

export const profileService = {
  // ユーザープロフィールの取得
  async getUserProfile(userId: string): Promise<UserProfile | null> {
    try {
      const userDoc = await getDoc(doc(db, "users", userId));
      if (userDoc.exists()) {
        const data = userDoc.data();
        return {
          ...data,
          createdAt: data.createdAt?.toDate() || new Date(),
        } as UserProfile;
      }
      return null;
    } catch {
      throw new Error("プロフィール情報の取得に失敗しました");
    }
  },

  // プロフィール情報の更新
  async updateProfile(updateData: ProfileUpdateData): Promise<void> {
    const user = auth.currentUser;
    if (!user) {
      throw new Error("ログインが必要です");
    }

    try {
      // Firebase Auth のプロフィール更新
      if (updateData.displayName) {
        await updateProfile(user, { displayName: updateData.displayName });
      }

      // Firestore のプロフィール更新
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        ...updateData,
        updatedAt: new Date(),
      });
    } catch {
      throw new Error("プロフィールの更新に失敗しました");
    }
  },

  // パスワードの更新
  async updatePassword(passwordData: PasswordUpdateData): Promise<void> {
    const user = auth.currentUser;
    if (!user) {
      throw new Error("ログインが必要です");
    }

    try {
      await updatePassword(user, passwordData.newPassword);
    } catch (error: any) {
      if (error.code === "auth/requires-recent-login") {
        throw new Error("パスワード変更のために再ログインが必要です");
      }
      throw new Error("パスワードの更新に失敗しました");
    }
  },

  // ユーザー統計の取得
  async getUserStats(userId: string): Promise<UserStats> {
    try {
      let postsCount = 0;
      let answersCount = 0;
      let bestAnswersCount = 0;

      try {
        // 投稿数の取得
        const postsQuery = query(
          collection(db, "posts"),
          where("authorId", "==", userId)
        );
        const postsSnapshot = await getDocs(postsQuery);
        postsCount = postsSnapshot.size;
      } catch {
        console.log("Posts collection not found - setting postsCount to 0");
      }

      try {
        // 回答数の取得
        const answersQuery = query(
          collection(db, "answers"),
          where("authorId", "==", userId)
        );
        const answersSnapshot = await getDocs(answersQuery);
        answersCount = answersSnapshot.size;
      } catch {
        console.log("Answers collection not found - setting answersCount to 0");
      }

      try {
        // ベストアンサー数の取得
        const bestAnswersQuery = query(
          collection(db, "answers"),
          where("authorId", "==", userId),
          where("isBestAnswer", "==", true)
        );
        const bestAnswersSnapshot = await getDocs(bestAnswersQuery);
        bestAnswersCount = bestAnswersSnapshot.size;
      } catch {
        console.log(
          "Best answers query failed - setting bestAnswersCount to 0"
        );
      }

      // 「役に立った」の総数（今後実装）
      const helpfulCount = 0; // TODO: 実装時に更新

      return {
        postsCount,
        answersCount,
        bestAnswersCount,
        helpfulCount,
      };
    } catch {
      throw new Error("統計情報の取得に失敗しました");
    }
  },

  // 最近のアクティビティの取得
  async getRecentActivity(
    userId: string,
    limitCount: number = 10
  ): Promise<RecentActivity[]> {
    try {
      const activities: RecentActivity[] = [];

      try {
        // 最近の投稿（コレクションが存在しない場合はスキップ）
        const postsQuery = query(
          collection(db, "posts"),
          where("authorId", "==", userId),
          orderBy("createdAt", "desc"),
          limit(limitCount)
        );
        const postsSnapshot = await getDocs(postsQuery);

        postsSnapshot.forEach((doc) => {
          const data = doc.data();
          activities.push({
            id: doc.id,
            type: "post",
            title: data.title,
            date: data.createdAt?.toDate() || new Date(),
            category: data.category,
          });
        });
      } catch {
        console.log(
          "Posts collection not found or no index - skipping posts query"
        );
      }

      try {
        // 最近の回答（コレクションが存在しない場合はスキップ）
        const answersQuery = query(
          collection(db, "answers"),
          where("authorId", "==", userId),
          orderBy("createdAt", "desc"),
          limit(limitCount)
        );
        const answersSnapshot = await getDocs(answersQuery);

        answersSnapshot.forEach((doc) => {
          const data = doc.data();
          activities.push({
            id: doc.id,
            type: "answer",
            title: `回答: ${data.postTitle || "投稿への回答"}`,
            date: data.createdAt?.toDate() || new Date(),
          });
        });
      } catch {
        console.log(
          "Answers collection not found or no index - skipping answers query"
        );
      }

      // 日付順でソート
      activities.sort((a, b) => b.date.getTime() - a.date.getTime());

      return activities.slice(0, limitCount);
    } catch (error: any) {
      console.error("Recent activity fetch error:", error);
      return []; // エラー時は空配列を返す
    }
  },
};
