import { Image } from "expo-image";
import { Alert, StyleSheet, TouchableOpacity } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useAuth } from "@/contexts/AuthContext";
import { authService } from "@/services/authService";

export default function HomeScreen() {
  const { user } = useAuth();

  const handleLogout = async () => {
    Alert.alert("ログアウト", "ログアウトしますか？", [
      { text: "キャンセル", style: "cancel" },
      {
        text: "ログアウト",
        style: "destructive",
        onPress: async () => {
          try {
            await authService.logOut();
          } catch {
            Alert.alert("エラー", "ログアウトに失敗しました");
          }
        },
      },
    ]);
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">
          ようこそ、{user?.displayName || "ユーザー"}さん！
        </ThemedText>
        <HelloWave />
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">SolveMeへようこそ</ThemedText>
        <ThemedText>
          悩みを共有し、みんなで解決策を見つけるコミュニティアプリです。
          あなたの悩みを投稿して、他のユーザーからアドバイスをもらいましょう。
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">今後実装予定の機能</ThemedText>
        <ThemedText>
          • 悩みの投稿と閲覧{"\n"}• 回答機能{"\n"}• ベストアンサー選定{"\n"}•
          カテゴリ別フィルター{"\n"}• プッシュ通知{"\n"}• プロフィール管理
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <ThemedText style={styles.logoutButtonText}>ログアウト</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  logoutButton: {
    backgroundColor: "#FF3B30",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
    marginTop: 10,
  },
  logoutButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
