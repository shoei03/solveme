import { useCallback, useEffect, useState } from "react";

import { useAuth } from "@/contexts/AuthContext";
import { profileService } from "@/services/profileService";
import type { UserProfile } from "@/types/auth/user";

/**
 * ユーザープロフィール管理フック
 * プロフィールデータの取得、初回ロード、手動リフレッシュを管理
 */
export const useUserProfile = () => {
  const { user } = useAuth();

  // 状態管理
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * プロフィールデータを取得する
   */
  const fetchProfileData = useCallback(async (): Promise<void> => {
    if (!user) return;

    const profileData = await profileService.getUserProfile(user.uid);
    setProfile(profileData);
    setError(null);
  }, [user]);

  /**
   * 初回ロード用のプロフィール取得
   */
  const loadInitialProfile = useCallback(async (): Promise<void> => {
    if (!user) {
      setIsInitialLoading(false);
      return;
    }

    try {
      await fetchProfileData();
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "プロフィールの読み込みに失敗しました";
      setError(errorMessage);
    } finally {
      setIsInitialLoading(false);
    }
  }, [user, fetchProfileData]);

  /**
   * 手動リフレッシュ用のプロフィール取得
   */
  const refreshProfile = useCallback(async (): Promise<void> => {
    if (!user) return;

    setIsRefreshing(true);
    try {
      await fetchProfileData();
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "プロフィールの読み込みに失敗しました";
      setError(errorMessage);
    } finally {
      setIsRefreshing(false);
    }
  }, [user, fetchProfileData]);

  // 初回ロード
  useEffect(() => {
    loadInitialProfile();
  }, [loadInitialProfile]);

  return {
    profile,
    isInitialLoading,
    isRefreshing,
    error,
    refreshProfile,
  };
};
