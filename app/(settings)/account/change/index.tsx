import { Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PasswordChangeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text>パスワード変更画面</Text>
      {/* ここにパスワード変更のUIを実装 */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});