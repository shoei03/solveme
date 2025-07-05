import React from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { useForm } from "../../hooks/useForm";
import { UserProfile } from "../../services/authService";
import {
  profileService,
  ProfileUpdateData,
} from "../../services/profileService";
import { validateBio, validateDisplayName } from "../../utils/validation";
import { ThemedText } from "../ThemedText";
import { ValidatedInput } from "../ui/ValidatedInput";
import { ValidatedTextArea } from "../ui/ValidatedTextArea";

interface ProfileEditProps {
  profile: UserProfile;
  onSave: (updatedProfile: ProfileUpdateData) => void;
  onCancel: () => void;
}

export const ProfileEdit: React.FC<ProfileEditProps> = ({
  profile,
  onSave,
  onCancel,
}) => {
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
        form.setError("displayName", displayNameValidation.error!);
        return;
      }

      if (!bioValidation.isValid) {
        form.setError("bio", bioValidation.error!);
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
      } catch (error: any) {
        Alert.alert("エラー", error.message);
      }
    },
  });

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.formContainer}>
          <ThemedText type="title" style={styles.title}>
            プロフィール編集
          </ThemedText>

          <ValidatedInput
            label="ユーザー名"
            value={form.values.displayName}
            error={form.errors.displayName}
            touched={form.touched.displayName}
            onChangeText={(text) => form.setValue("displayName", text)}
            onBlur={() => form.handleBlur("displayName")}
            placeholder="ユーザー名を入力"
            autoCapitalize="none"
            autoCorrect={false}
            required
          />

          <ValidatedTextArea
            label="自己紹介"
            value={form.values.bio}
            error={form.errors.bio}
            touched={form.touched.bio}
            onChangeText={(text) => form.setValue("bio", text)}
            onBlur={() => form.handleBlur("bio")}
            placeholder="自己紹介を入力（任意）"
            maxLength={300}
            showCharacterCount
            minHeight={100}
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[
                styles.button,
                styles.saveButton,
                form.isSubmitting && styles.buttonDisabled,
              ]}
              onPress={form.handleSubmit}
              disabled={form.isSubmitting}
            >
              <ThemedText style={styles.saveButtonText}>
                {form.isSubmitting ? "保存中..." : "保存"}
              </ThemedText>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={onCancel}
              disabled={form.isSubmitting}
            >
              <ThemedText style={styles.cancelButtonText}>
                キャンセル
              </ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  formContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
    color: "#333",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    gap: 10,
  },
  button: {
    flex: 1,
    borderRadius: 8,
    padding: 15,
    alignItems: "center",
  },
  saveButton: {
    backgroundColor: "#007AFF",
  },
  saveButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  cancelButton: {
    backgroundColor: "#f0f0f0",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  cancelButtonText: {
    color: "#333",
    fontSize: 16,
    fontWeight: "600",
  },
  buttonDisabled: {
    backgroundColor: "#ccc",
  },
});
