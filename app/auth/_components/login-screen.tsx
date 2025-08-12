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

import { useLoginForm } from "../_hooks/use-auth-form";

interface LoginScreenProps {
  onToggleMode: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onToggleMode }) => {
  const form = useLoginForm();

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.formContainer}>
          <ThemedText type="title" style={styles.title}>
            ログイン
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

          <ValidatedInput
            label="パスワード"
            value={form.values.password}
            error={form.errors.password}
            touched={form.touched.password}
            onChangeText={(text) => form.setValue("password", text)}
            onBlur={() => form.handleBlur("password")}
            placeholder="パスワードを入力"
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
              {form.isSubmitting ? "ログイン中..." : "ログイン"}
            </ThemedText>
          </TouchableOpacity>

          <TouchableOpacity style={styles.linkButton} onPress={onToggleMode}>
            <ThemedText style={styles.linkText}>
              アカウントをお持ちでない方は新規登録
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
