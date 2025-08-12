import { Alert } from "react-native";

import { useForm } from "@/hooks/useForm";
import { authService } from "@/services/authService";

export const useLoginForm = () => {
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validationRules: {
      email: { required: true },
      password: { required: true },
    },
    onSubmit: async (values) => {
      try {
        await authService.signIn(values.email, values.password);
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error ? error.message : "ログインに失敗しました";
        Alert.alert("ログインエラー", errorMessage);
      }
    },
  });

  return form;
};

export const useSignUpForm = () => {
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

  return form;
};
