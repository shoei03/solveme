import { useEffect, useState } from "react";

import { useAuth } from "@/contexts/AuthContext";
import { profileService } from "@/services/profileService";
import type { UserProfile } from "@/types/auth/user";

export const useUserProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        const profileData = await profileService.getUserProfile(user.uid);
        setProfile(profileData);
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : "プロフィールの読み込みに失敗しました";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  return { profile, loading, error };
};
