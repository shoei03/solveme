import { Stack } from "expo-router";
import { SafeAreaView, StyleSheet, View } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function AccountScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          title: "アカウント",
          headerShown: true,
        }}
      />
      <ThemedView style={styles.content}>
        <ThemedText type="title" style={styles.title}>
          アカウント設定
        </ThemedText>
        <ThemedText style={styles.description}>
          アカウント情報の管理や設定を行うことができます。
        </ThemedText>

        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            基本情報
          </ThemedText>
          <ThemedText style={styles.placeholder}>• プロフィール編集</ThemedText>
          <ThemedText style={styles.placeholder}>• パスワード変更</ThemedText>
          <ThemedText style={styles.placeholder}>
            • メールアドレス変更
          </ThemedText>
        </View>

        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            プライバシー
          </ThemedText>
          <ThemedText style={styles.placeholder}>• プライバシー設定</ThemedText>
          <ThemedText style={styles.placeholder}>• データの管理</ThemedText>
        </View>

        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            セキュリティ
          </ThemedText>
          <ThemedText style={styles.placeholder}>• 二段階認証</ThemedText>
          <ThemedText style={styles.placeholder}>• ログイン履歴</ThemedText>
        </View>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    opacity: 0.7,
    marginBottom: 30,
    lineHeight: 22,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  placeholder: {
    fontSize: 14,
    opacity: 0.8,
    marginBottom: 8,
    marginLeft: 10,
  },
});
