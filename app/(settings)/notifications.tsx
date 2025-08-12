import { Stack } from "expo-router";
import { SafeAreaView, StyleSheet, View } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function NotificationsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          title: "通知",
          headerShown: true,
        }}
      />
      <ThemedView style={styles.content}>
        <ThemedText type="title" style={styles.title}>
          通知設定
        </ThemedText>
        <ThemedText style={styles.description}>
          アプリからの通知を管理できます。
        </ThemedText>

        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            プッシュ通知
          </ThemedText>
          <ThemedText style={styles.placeholder}>
            • 新着メッセージ通知
          </ThemedText>
          <ThemedText style={styles.placeholder}>
            • アクティビティ通知
          </ThemedText>
          <ThemedText style={styles.placeholder}>• システム通知</ThemedText>
        </View>

        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            メール通知
          </ThemedText>
          <ThemedText style={styles.placeholder}>• 週間レポート</ThemedText>
          <ThemedText style={styles.placeholder}>• 重要なお知らせ</ThemedText>
        </View>

        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            通知時間
          </ThemedText>
          <ThemedText style={styles.placeholder}>• おやすみモード</ThemedText>
          <ThemedText style={styles.placeholder}>• 営業時間設定</ThemedText>
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
