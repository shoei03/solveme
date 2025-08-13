import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ThemedText } from "@/components/ThemedText";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

interface ErrorScreenProps {
  /** エラーメッセージ */
  message?: string;
  /** リトライボタンを表示するか */
  showRetry?: boolean;
  /** リトライボタンが押された時の処理 */
  onRetry?: () => void;
  /** リトライボタンのテキスト */
  retryText?: string;
}

/**
 * エラー画面の共通コンポーネント
 * エラーメッセージとリトライボタンを表示
 */
export const ErrorScreen: React.FC<ErrorScreenProps> = ({
  message = "エラーが発生しました",
  showRetry = false,
  onRetry,
  retryText = "再試行",
}) => {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* エラーアイコン */}
        <View style={styles.iconContainer}>
          <IconSymbol
            name="exclamationmark.triangle"
            size={48}
            color={Colors[colorScheme ?? "light"].tabIconDefault}
          />
        </View>

        {/* エラーメッセージ */}
        <ThemedText style={styles.errorMessage}>{message}</ThemedText>

        {/* リトライボタン */}
        {showRetry && onRetry && (
          <TouchableOpacity
            style={[
              styles.retryButton,
              { backgroundColor: Colors[colorScheme ?? "light"].tint },
            ]}
            onPress={onRetry}
          >
            <ThemedText style={styles.retryButtonText}>{retryText}</ThemedText>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  iconContainer: {
    marginBottom: 20,
  },
  errorMessage: {
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 30,
    opacity: 0.8,
  },
  retryButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    minWidth: 120,
    alignItems: "center",
  },
  retryButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
