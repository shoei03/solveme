import {
  type ValidationResult,
  type ValidationRule,
  validateField,
} from "@/utils/validation";
import { useCallback, useState } from "react";

// フォームフィールドの型定義
export interface FormField {
  value: string;
  error?: string;
  touched: boolean;
  rules?: ValidationRule;
}

// フォーム状態の型定義
export interface FormState {
  [key: string]: FormField;
}

// useFormのオプション型定義
export interface UseFormOptions {
  initialValues: { [key: string]: string };
  validationRules?: { [key: string]: ValidationRule };
  onSubmit?: (values: { [key: string]: string }) => void | Promise<void>;
}

// useFormの戻り値型定義
export interface UseFormReturn {
  values: { [key: string]: string };
  errors: { [key: string]: string | undefined };
  touched: { [key: string]: boolean };
  isValid: boolean;
  isSubmitting: boolean;
  setValue: (field: string, value: string) => void;
  setError: (field: string, error: string) => void;
  clearError: (field: string) => void;
  validateField: (field: string) => boolean;
  validateForm: () => boolean;
  handleBlur: (field: string) => void;
  handleSubmit: () => Promise<void>;
  reset: () => void;
}

export const useForm = (options: UseFormOptions): UseFormReturn => {
  const { initialValues, validationRules = {}, onSubmit } = options;

  // 初期状態の作成
  const createInitialState = (): FormState => {
    const state: FormState = {};
    Object.keys(initialValues).forEach((key) => {
      state[key] = {
        value: initialValues[key],
        touched: false,
        rules: validationRules[key],
      };
    });
    return state;
  };

  const [formState, setFormState] = useState<FormState>(createInitialState());
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 値の設定
  const setValue = useCallback((field: string, value: string) => {
    setFormState((prev) => ({
      ...prev,
      [field]: {
        ...prev[field],
        value,
        error: undefined, // 値が変更されたらエラーをクリア
      },
    }));
  }, []);

  // エラーの設定
  const setError = useCallback((field: string, error: string) => {
    setFormState((prev) => ({
      ...prev,
      [field]: {
        ...prev[field],
        error,
      },
    }));
  }, []);

  // エラーのクリア
  const clearError = useCallback((field: string) => {
    setFormState((prev) => ({
      ...prev,
      [field]: {
        ...prev[field],
        error: undefined,
      },
    }));
  }, []);

  // フィールドのバリデーション
  const validateFormField = useCallback(
    (field: string): boolean => {
      const fieldData = formState[field];
      if (!fieldData || !fieldData.rules) return true;

      const result: ValidationResult = validateField(
        fieldData.value,
        fieldData.rules
      );

      setFormState((prev) => ({
        ...prev,
        [field]: {
          ...prev[field],
          error: result.isValid ? undefined : result.error,
        },
      }));

      return result.isValid;
    },
    [formState]
  );

  // フォーム全体のバリデーション
  const validateForm = useCallback((): boolean => {
    let isFormValid = true;
    const newState = { ...formState };

    Object.keys(formState).forEach((field) => {
      const fieldData = formState[field];
      if (fieldData.rules) {
        const result: ValidationResult = validateField(
          fieldData.value,
          fieldData.rules
        );
        newState[field] = {
          ...fieldData,
          error: result.isValid ? undefined : result.error,
          touched: true,
        };
        if (!result.isValid) {
          isFormValid = false;
        }
      }
    });

    setFormState(newState);
    return isFormValid;
  }, [formState]);

  // ブラー時の処理
  const handleBlur = useCallback(
    (field: string) => {
      setFormState((prev) => ({
        ...prev,
        [field]: {
          ...prev[field],
          touched: true,
        },
      }));
      validateFormField(field);
    },
    [validateFormField]
  );

  // フォーム送信の処理
  const handleSubmit = useCallback(async () => {
    // onSubmitが定義されていない場合は何もしない
    if (!onSubmit) return;

    // 送信中の場合は何もしない
    if (isSubmitting) return;

    // フォームの送信開始フラグを設定
    setIsSubmitting(true);

    // フォームのバリデーションを実行
    const isFormValid = validateForm();
    if (!isFormValid) return;

    // フォームを送信
    try {
      const values: { [key: string]: string } = {};
      Object.keys(formState).forEach((key) => {
        values[key] = formState[key].value;
      });
      await onSubmit(values);
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  }, [formState, isSubmitting, onSubmit, validateForm]);

  // フォームのリセット
  const reset = useCallback(() => {
    const resetState: FormState = {};
    Object.keys(initialValues).forEach((key) => {
      resetState[key] = {
        value: initialValues[key],
        touched: false,
        rules: validationRules[key],
      };
    });
    setFormState(resetState);
    setIsSubmitting(false);
  }, [initialValues, validationRules]);

  // 計算されたプロパティ
  const values = Object.keys(formState).reduce((acc, key) => {
    acc[key] = formState[key].value;
    return acc;
  }, {} as { [key: string]: string });

  const errors = Object.keys(formState).reduce((acc, key) => {
    acc[key] = formState[key].error;
    return acc;
  }, {} as { [key: string]: string | undefined });

  const touched = Object.keys(formState).reduce((acc, key) => {
    acc[key] = formState[key].touched;
    return acc;
  }, {} as { [key: string]: boolean });

  const isValid = Object.values(formState).every((field) => !field.error);

  return {
    values,
    errors,
    touched,
    isValid,
    isSubmitting,
    setValue,
    setError,
    clearError,
    validateField: validateFormField,
    validateForm,
    handleBlur,
    handleSubmit,
    reset,
  };
};
