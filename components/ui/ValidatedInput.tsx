import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";

interface ValidatedInputProps
  extends Omit<TextInputProps, "value" | "onChangeText" | "onBlur"> {
  label: string;
  value: string;
  error?: string;
  touched?: boolean;
  onChangeText: (text: string) => void;
  onBlur?: () => void;
  required?: boolean;
  showPasswordStrength?: boolean;
  passwordStrength?: {
    score: number;
    feedback: string;
    color: string;
  };
}

export const ValidatedInput: React.FC<ValidatedInputProps> = ({
  label,
  value,
  error,
  touched,
  onChangeText,
  onBlur,
  required = false,
  showPasswordStrength = false,
  passwordStrength,
  style,
  ...props
}) => {
  const hasError = touched && error;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {label}
        {required && <Text style={styles.required}> *</Text>}
      </Text>

      <TextInput
        style={[styles.input, hasError && styles.inputError, style]}
        value={value}
        onChangeText={onChangeText}
        onBlur={onBlur}
        {...props}
      />

      {showPasswordStrength && passwordStrength && value.length > 0 && (
        <View style={styles.passwordStrengthContainer}>
          <View style={styles.passwordStrengthBar}>
            <View
              style={[
                styles.passwordStrengthFill,
                {
                  width: `${passwordStrength.score}%`,
                  backgroundColor: passwordStrength.color,
                },
              ]}
            />
          </View>
          <Text
            style={[
              styles.passwordStrengthText,
              { color: passwordStrength.color },
            ]}
          >
            パスワード強度: {passwordStrength.feedback}
          </Text>
        </View>
      )}

      {hasError && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 5,
    color: "#333",
  },
  required: {
    color: "#FF3B30",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  inputError: {
    borderColor: "#FF3B30",
    backgroundColor: "#FFF5F5",
  },
  errorText: {
    color: "#FF3B30",
    fontSize: 14,
    marginTop: 5,
  },
  passwordStrengthContainer: {
    marginTop: 8,
  },
  passwordStrengthBar: {
    height: 4,
    backgroundColor: "#E5E5E5",
    borderRadius: 2,
    overflow: "hidden",
  },
  passwordStrengthFill: {
    height: "100%",
    borderRadius: 2,
  },
  passwordStrengthText: {
    fontSize: 12,
    marginTop: 4,
    fontWeight: "500",
  },
});
