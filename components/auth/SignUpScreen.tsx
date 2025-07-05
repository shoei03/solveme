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
import { authService } from "../../services/authService";
import {
  getPasswordStrength,
  validateDisplayName,
  validateEmail,
  validatePassword,
  validatePasswordConfirmation,
} from "../../utils/validation";
import { ThemedText } from "../ThemedText";
import { ValidatedInput } from "../ui/ValidatedInput";

interface SignUpScreenProps {
  onToggleMode: () => void;
}

export const SignUpScreen: React.FC<SignUpScreenProps> = ({ onToggleMode }) => {
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
      displayName: "",
    },
    validationRules: {
      email: { required: true },
      password: { required: true },
      confirmPassword: { required: true },
      displayName: { required: true },
    },
    onSubmit: async (values) => {
      // フィールド別バリデーション
      const emailValidation = validateEmail(values.email);
      const passwordValidation = validatePassword(values.password);
      const confirmPasswordValidation = validatePasswordConfirmation(
        values.password,
        values.confirmPassword
      );
      const displayNameValidation = validateDisplayName(values.displayName);

      // エラーがある場合は設定
      if (!emailValidation.isValid) {
        form.setError("email", emailValidation.error!);
      }
      if (!passwordValidation.isValid) {
        form.setError("password", passwordValidation.error!);
      }
      if (!confirmPasswordValidation.isValid) {
        form.setError("confirmPassword", confirmPasswordValidation.error!);
      }
      if (!displayNameValidation.isValid) {
        form.setError("displayName", displayNameValidation.error!);
      }

      // バリデーションエラーがある場合は処理を停止
      if (
        !emailValidation.isValid ||
        !passwordValidation.isValid ||
        !confirmPasswordValidation.isValid ||
        !displayNameValidation.isValid
      ) {
        return;
      }

      try {
        await authService.signUp(
          values.email,
          values.password,
          values.displayName
        );
        Alert.alert("成功", "アカウントが作成されました");
      } catch (error: any) {
        Alert.alert("登録エラー", error.message);
      }
    },
  });

  const passwordStrength = getPasswordStrength(form.values.password);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.formContainer}>
          <ThemedText type="title" style={styles.title}>
            新規登録
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

          <ValidatedInput
            label="パスワード"
            value={form.values.password}
            error={form.errors.password}
            touched={form.touched.password}
            onChangeText={(text) => form.setValue("password", text)}
            onBlur={() => form.handleBlur("password")}
            placeholder="パスワードを入力（6文字以上）"
            secureTextEntry
            autoCapitalize="none"
            required
            showPasswordStrength
            passwordStrength={passwordStrength}
          />

          <ValidatedInput
            label="パスワード確認"
            value={form.values.confirmPassword}
            error={form.errors.confirmPassword}
            touched={form.touched.confirmPassword}
            onChangeText={(text) => form.setValue("confirmPassword", text)}
            onBlur={() => form.handleBlur("confirmPassword")}
            placeholder="パスワードを再入力"
            secureTextEntry
            autoCapitalize="none"
            required
          />

          <TouchableOpacity
            style={[styles.button, form.isSubmitting && styles.buttonDisabled]}
            onPress={form.handleSubmit}
            disabled={form.isSubmitting}
          >
            <ThemedText style={styles.buttonText}>
              {form.isSubmitting ? "登録中..." : "新規登録"}
            </ThemedText>
          </TouchableOpacity>

          <TouchableOpacity style={styles.linkButton} onPress={onToggleMode}>
            <ThemedText style={styles.linkText}>
              既にアカウントをお持ちの方はログイン
            </ThemedText>
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
    marginBottom: 30,
    color: "#333",
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
