import { Alert } from "react-native";

import { useForm } from "@/hooks/useForm";
import { profileService } from "@/services/profileService";
import { ProfileUpdateData, UserProfile } from "@/types/auth/user";
import { validateBio, validateDisplayName } from "@/utils/validation";

interface UseProfileEditProps {
  profile: UserProfile;
  onSave: (updatedProfile: ProfileUpdateData) => void;
}

export const useProfileEdit = ({ profile, onSave }: UseProfileEditProps) => {
  const form = useForm({
    initialValues: {
      displayName: profile.displayName || "",
      bio: profile.bio || "",
    },
    validationRules: {
      displayName: { required: true },
      bio: { required: false },
    },
    onSubmit: async (values) => {
      // バリデーション
      const displayNameValidation = validateDisplayName(values.displayName);
      const bioValidation = validateBio(values.bio);

      if (!displayNameValidation.isValid) {
        form.setError(
          "displayName",
          displayNameValidation.error || "表示名が無効です"
        );
        return;
      }

      if (!bioValidation.isValid) {
        form.setError("bio", bioValidation.error || "自己紹介が無効です");
        return;
      }

      try {
        const updateData: ProfileUpdateData = {
          displayName: values.displayName,
          bio: values.bio || undefined,
        };

        await profileService.updateProfile(updateData);
        onSave(updateData);
        Alert.alert("成功", "プロフィールを更新しました");
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "プロフィールの更新に失敗しました";
        Alert.alert("エラー", errorMessage);
      }
    },
  });

  return form;
};
