import { Alert } from "react-native";

import { authService } from "@/services/authService";
import { useForm } from "@/hooks/useForm";

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
