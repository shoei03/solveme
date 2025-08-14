import {
  Alert,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

import { ThemedText } from "@/components/ThemedText";

export default function ChangeEmailScreen() {
  const handleContactSupport = () => {
    Alert.alert(
      "サポートへの連絡",
      "以下の方法でサポートにお問い合わせください：",
      [
        {
          text: "メールで連絡",
          // TODO: メールアドレスを設定
          onPress: () => {},
        },
        { text: "キャンセル", style: "cancel" },
      ]
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.formContainer}>
        <ThemedText type="title" style={styles.title}>
          メールアドレスを忘れた場合
        </ThemedText>

        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            1. よく使うメールアドレスを確認
          </ThemedText>
          <ThemedText style={styles.description}>
            以下のメールアドレスで登録していませんか？
          </ThemedText>
          <View style={styles.tipContainer}>
            <ThemedText style={styles.tip}>• Gmail (〇〇@gmail.com)</ThemedText>
            <ThemedText style={styles.tip}>
              • Yahoo (〇〇@yahoo.co.jp)
            </ThemedText>
            <ThemedText style={styles.tip}>
              • iCloud (〇〇@icloud.com)
            </ThemedText>
            <ThemedText style={styles.tip}>• 会社のメールアドレス</ThemedText>
            <ThemedText style={styles.tip}>• 学校のメールアドレス</ThemedText>
          </View>
        </View>

        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            2. メールボックスを確認
          </ThemedText>
          <ThemedText style={styles.description}>
            過去にSolveMeからのメールがないか確認してみてください。
          </ThemedText>
          <View style={styles.tipContainer}>
            <ThemedText style={styles.tip}>• 「SolveMe」で検索</ThemedText>
            <ThemedText style={styles.tip}>
              • 「登録完了」「ようこそ」で検索
            </ThemedText>
            <ThemedText style={styles.tip}>
              • 迷惑メールフォルダも確認
            </ThemedText>
          </View>
        </View>

        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            3. ブラウザの保存されたパスワードを確認
          </ThemedText>
          <ThemedText style={styles.description}>
            ブラウザにSolveMeのログイン情報が保存されていませんか？
          </ThemedText>
          <View style={styles.tipContainer}>
            <ThemedText style={styles.tip}>
              • Chrome: 設定 → パスワード
            </ThemedText>
            <ThemedText style={styles.tip}>
              • Safari: 設定 → パスワード
            </ThemedText>
            <ThemedText style={styles.tip}>
              • Firefox: 設定 → プライバシーとセキュリティ
            </ThemedText>
          </View>
        </View>

        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            4. 新しいアカウントを作成
          </ThemedText>
          <ThemedText style={styles.description}>
            メールアドレスが見つからない場合は、新しいアカウントを作成することをお勧めします。
          </ThemedText>
        </View>

        <TouchableOpacity
          style={styles.supportButton}
          onPress={handleContactSupport}
        >
          <ThemedText style={styles.supportButtonText}>
            それでも解決しない場合はサポートに連絡
          </ThemedText>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: "#f5f5f5",
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
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    color: "#333",
  },
  description: {
    fontSize: 16,
    marginBottom: 15,
    color: "#666",
    lineHeight: 22,
  },
  tipContainer: {
    backgroundColor: "#f8f9fa",
    padding: 15,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: "#007AFF",
  },
  tip: {
    fontSize: 14,
    color: "#555",
    marginBottom: 5,
    lineHeight: 20,
  },
  supportButton: {
    backgroundColor: "#FF6B35",
    borderRadius: 8,
    padding: 15,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  supportButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  linkButton: {
    alignItems: "center",
  },
  linkText: {
    color: "#007AFF",
    fontSize: 16,
  },
});
