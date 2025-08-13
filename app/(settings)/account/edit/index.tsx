import { useCallback, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { useAuth } from "@/contexts/AuthContext";
import {
  profileService,
} from "@/services/profileService";
import type { ProfileUpdateData, UserProfile } from "@/types/auth/user";

import ProfileEdit from "./_components/profile-edit";

/**
 * アカウント設定画面
 * プロフィール情報の編集を行う
 */
export default function AccountSettings() {
  const { user } = useAuth();

  // 状態管理
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // プロフィール情報を取得する関数
  const loadProfile = useCallback(async () => {
    if (!user) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const profileData = await profileService.getUserProfile(user.uid);
      setProfile(profileData);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "プロフィールの読み込みに失敗しました";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  // プロフィール更新ハンドラー
  const handleProfileUpdate = useCallback(
    async (updateData: ProfileUpdateData) => {
      if (profile) {
        setProfile({
          ...profile,
          ...updateData,
        });
      }
    },
    [profile]
  );

  // キャンセルハンドラー
  const handleCancel = useCallback(() => {
    // TODO: 実際のキャンセル処理を実装
    console.log("プロフィール編集がキャンセルされました");
  }, []);

  // 初期データ読み込み
  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  // ローディング表示
  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ThemedText>読み込み中...</ThemedText>
      </View>
    );
  }

  // エラー表示
  if (error) {
    return (
      <View style={styles.centerContainer}>
        <ThemedText style={styles.errorText}>エラー: {error}</ThemedText>
      </View>
    );
  }

  // プロフィールが存在しない場合
  if (!profile) {
    return (
      <View style={styles.centerContainer}>
        <ThemedText>プロフィール情報が見つかりません</ThemedText>
      </View>
    );
  }

  // メイン表示
  return (
    <ProfileEdit
      profile={profile}
      onSave={handleProfileUpdate}
      onCancel={handleCancel}
    />
  );
}

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    color: "#dc3545",
    textAlign: "center",
  },
});
