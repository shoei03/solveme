import { Stack } from "expo-router";
import {
  Alert,
  Linking,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function ContactScreen() {
  const colorScheme = useColorScheme();

  const handleEmailContact = () => {
    const subject = "SolveMeアプリについてのお問い合わせ";
    const body = "お問い合わせ内容をこちらにご記入ください。\n\n";
    const mailto = `mailto:support@solveme.app?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    Linking.openURL(mailto).catch(() => {
      Alert.alert("エラー", "メールアプリを開けませんでした");
    });
  };

  const handlePhoneContact = () => {
    Alert.alert(
      "電話でのお問い合わせ",
      "営業時間: 平日 9:00-18:00\n電話番号: 03-1234-5678",
      [
        {
          text: "電話をかける",
          onPress: () => {
            Linking.openURL("tel:03-1234-5678").catch(() => {
              Alert.alert("エラー", "電話アプリを開けませんでした");
            });
          },
        },
        { text: "キャンセル", style: "cancel" },
      ]
    );
  };

  const handleWebContact = () => {
    Linking.openURL("https://solveme.app/contact").catch(() => {
      Alert.alert("エラー", "ウェブサイトを開けませんでした");
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          title: "お問い合わせ",
          headerShown: true,
        }}
      />
      <ThemedView style={styles.content}>
        <ThemedText type="title" style={styles.title}>
          お問い合わせ
        </ThemedText>
        <ThemedText style={styles.description}>
          ご質問やご要望がございましたら、お気軽にお問い合わせください。
        </ThemedText>

        <View style={styles.contactMethods}>
          <TouchableOpacity
            style={[
              styles.contactButton,
              { borderColor: Colors[colorScheme ?? "light"].tint },
            ]}
            onPress={handleEmailContact}
          >
            <IconSymbol
              name="envelope.fill"
              size={24}
              color={Colors[colorScheme ?? "light"].tint}
            />
            <View style={styles.contactInfo}>
              <ThemedText type="subtitle" style={styles.contactTitle}>
                メールでお問い合わせ
              </ThemedText>
              <ThemedText style={styles.contactDescription}>
                support@solveme.app
              </ThemedText>
            </View>
            <IconSymbol
              name="chevron.right"
              size={16}
              color={Colors[colorScheme ?? "light"].tabIconDefault}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.contactButton,
              { borderColor: Colors[colorScheme ?? "light"].tint },
            ]}
            onPress={handlePhoneContact}
          >
            <IconSymbol
              name="phone.fill"
              size={24}
              color={Colors[colorScheme ?? "light"].tint}
            />
            <View style={styles.contactInfo}>
              <ThemedText type="subtitle" style={styles.contactTitle}>
                電話でお問い合わせ
              </ThemedText>
              <ThemedText style={styles.contactDescription}>
                平日 9:00-18:00
              </ThemedText>
            </View>
            <IconSymbol
              name="chevron.right"
              size={16}
              color={Colors[colorScheme ?? "light"].tabIconDefault}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.contactButton,
              { borderColor: Colors[colorScheme ?? "light"].tint },
            ]}
            onPress={handleWebContact}
          >
            <IconSymbol
              name="globe"
              size={24}
              color={Colors[colorScheme ?? "light"].tint}
            />
            <View style={styles.contactInfo}>
              <ThemedText type="subtitle" style={styles.contactTitle}>
                ウェブサイトから
              </ThemedText>
              <ThemedText style={styles.contactDescription}>
                よくある質問も確認できます
              </ThemedText>
            </View>
            <IconSymbol
              name="chevron.right"
              size={16}
              color={Colors[colorScheme ?? "light"].tabIconDefault}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.responseTime}>
          <ThemedText type="subtitle" style={styles.responseTitle}>
            回答時間の目安
          </ThemedText>
          <ThemedText style={styles.responseText}>
            • メール: 1-2営業日以内
          </ThemedText>
          <ThemedText style={styles.responseText}>
            • 電話: 即時対応（営業時間内）
          </ThemedText>
          <ThemedText style={styles.responseText}>
            • ウェブ: 1-3営業日以内
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
  contactMethods: {
    marginBottom: 30,
  },
  contactButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderWidth: 1,
    borderRadius: 12,
    marginBottom: 12,
  },
  contactInfo: {
    flex: 1,
    marginLeft: 16,
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  contactDescription: {
    fontSize: 14,
    opacity: 0.7,
  },
  responseTime: {
    marginTop: 20,
  },
  responseTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
  },
  responseText: {
    fontSize: 14,
    opacity: 0.8,
    marginBottom: 6,
    marginLeft: 10,
  },
});
