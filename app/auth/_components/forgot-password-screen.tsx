import type React from "react";
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

import { useForgotPasswordForm } from "../_hooks/use-auth-form";

interface ForgotPasswordScreenProps {
  onGoBack: () => void;
}

export const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = ({
  onGoBack,
}) => {
  const form = useForgotPasswordForm();

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.formContainer}>
          <ThemedText type="title" style={styles.title}>
            パスワードを忘れた場合
          </ThemedText>

          <ThemedText style={styles.description}>
            登録時のメールアドレスを入力してください。
            パスワードリセット用のリンクをお送りします。
          </ThemedText>

          <ValidatedInput
            label="メールアドレス"
            value={form.values.email}
            error={form.errors.email}
            touched={form.touched.email}
            onChangeText={(text) => form.setValue("email", text)}
            onBlur={() => form.handleBlur("email")}
            placeholder="example@email.com"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            required
          />

          <TouchableOpacity
            style={[styles.button, form.isSubmitting && styles.buttonDisabled]}
            onPress={form.handleSubmit}
            disabled={form.isSubmitting}
          >
            <ThemedText style={styles.buttonText}>
              {form.isSubmitting ? "送信中..." : "リセットメールを送信"}
            </ThemedText>
          </TouchableOpacity>

          <TouchableOpacity style={styles.linkButton} onPress={onGoBack}>
            <ThemedText style={styles.linkText}>ログイン画面に戻る</ThemedText>
          </TouchableOpacity>
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
    justifyContent: "center",
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
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 30,
    color: "#666",
    lineHeight: 22,
  },
  button: {
    backgroundColor: "#007AFF",
    borderRadius: 8,
    padding: 15,
    alignItems: "center",
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: "#ccc",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  linkButton: {
    marginTop: 20,
    alignItems: "center",
  },
  linkText: {
    color: "#007AFF",
    fontSize: 16,
  },
});
