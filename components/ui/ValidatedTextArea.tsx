import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";

interface ValidatedTextAreaProps
  extends Omit<TextInputProps, "value" | "onChangeText" | "onBlur"> {
  label: string;
  value: string;
  error?: string;
  touched?: boolean;
  onChangeText: (text: string) => void;
  onBlur?: () => void;
  required?: boolean;
  maxLength?: number;
  showCharacterCount?: boolean;
  minHeight?: number;
}

export const ValidatedTextArea: React.FC<ValidatedTextAreaProps> = ({
  label,
  value,
  error,
  touched,
  onChangeText,
  onBlur,
  required = false,
  maxLength,
  showCharacterCount = false,
  minHeight = 100,
  style,
  ...props
}) => {
  const hasError = touched && error;
  const characterCount = value.length;
  const isNearLimit = maxLength && characterCount > maxLength * 0.8;

  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>
          {label}
          {required && <Text style={styles.required}> *</Text>}
        </Text>
        {showCharacterCount && maxLength && (
          <Text
            style={[
              styles.characterCount,
              isNearLimit ? styles.characterCountWarning : null,
              characterCount > maxLength ? styles.characterCountError : null,
            ]}
          >
            {characterCount}/{maxLength}
          </Text>
        )}
      </View>

      <TextInput
        style={[
          styles.textArea,
          { minHeight },
          hasError && styles.textAreaError,
          style,
        ]}
        value={value}
        onChangeText={onChangeText}
        onBlur={onBlur}
        multiline
        textAlignVertical="top"
        maxLength={maxLength}
        {...props}
      />

      {hasError && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  labelContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  required: {
    color: "#FF3B30",
  },
  characterCount: {
    fontSize: 12,
    color: "#666",
  },
  characterCountWarning: {
    color: "#FF9500",
  },
  characterCountError: {
    color: "#FF3B30",
  },
  textArea: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  textAreaError: {
    borderColor: "#FF3B30",
    backgroundColor: "#FFF5F5",
  },
  errorText: {
    color: "#FF3B30",
    fontSize: 14,
    marginTop: 5,
  },
});
