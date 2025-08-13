import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ValidatedInput } from "@/components/ui/ValidatedInput";
import { ValidatedTextArea } from "@/components/ui/ValidatedTextArea";
import { useProfileEdit } from "@/hooks/use-profile-edit";
import { ProfileUpdateData, UserProfile } from "@/types/auth/user";

interface ProfileEditProps {
  profile: UserProfile;
  onSave: (updatedProfile: ProfileUpdateData) => void;
  onCancel: () => void;
}

export default function ProfileEdit({ profile, onSave, onCancel }: ProfileEditProps) {
  const form = useProfileEdit({ profile, onSave });

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
