import { Stack } from "expo-router";
import { SafeAreaView, StyleSheet, View } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function DetailsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          title: "詳細",
          headerShown: true,
        }}
      />
      <ThemedView style={styles.content}>
        <ThemedText type="title" style={styles.title}>
          アプリ詳細
        </ThemedText>
        <ThemedText style={styles.description}>
          アプリの詳細情報と各種設定です。
        </ThemedText>

        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            アプリ情報
          </ThemedText>
          <ThemedText style={styles.placeholder}>
            • バージョン: 1.0.0
          </ThemedText>
          <ThemedText style={styles.placeholder}>• ビルド番号: 100</ThemedText>
          <ThemedText style={styles.placeholder}>
            • 最終更新: 2025年8月12日
          </ThemedText>
        </View>

        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            ストレージ
          </ThemedText>
          <ThemedText style={styles.placeholder}>
            • キャッシュをクリア
          </ThemedText>
          <ThemedText style={styles.placeholder}>• データ使用量</ThemedText>
        </View>

        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            法的情報
          </ThemedText>
          <ThemedText style={styles.placeholder}>• 利用規約</ThemedText>
          <ThemedText style={styles.placeholder}>
            • プライバシーポリシー
          </ThemedText>
          <ThemedText style={styles.placeholder}>• ライセンス情報</ThemedText>
        </View>

        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            開発者情報
          </ThemedText>
          <ThemedText style={styles.placeholder}>
            • 開発者: SolveMe Team
          </ThemedText>
          <ThemedText style={styles.placeholder}>
            • ウェブサイト: https://solveme.app
          </ThemedText>
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
