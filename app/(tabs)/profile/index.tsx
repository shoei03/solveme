import { useState } from "react";
import {
  ActivityIndicator,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import { useAuth } from "@/contexts/AuthContext";
import { useColorScheme } from "@/hooks/useColorScheme";
import { formatDate } from "@/utils/helpers";

import { defaultMenuItems } from "./_components/index";
import { SlideMenu } from "./_components/slide-menu";
import { useUserProfile } from "./_hooks/use-user-profile";

export default function ProfileScreen() {
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const colorScheme = useColorScheme();
  const { user } = useAuth();
  const { profile, isInitialLoading, isRefreshing, error, refreshProfile } = useUserProfile();

  if (isInitialLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator
            size="large"
            color={Colors[colorScheme ?? "light"].tint}
          />
          <ThemedText style={styles.loadingText}>読み込み中...</ThemedText>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <ThemedText>エラー: {error}</ThemedText>
        </View>
      </SafeAreaView>
    );
  }

  if (!user || !profile) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <ThemedText>プロフィール情報が見つかりません</ThemedText>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={refreshProfile}
            tintColor={Colors[colorScheme ?? "light"].tint}
          />
        }
      >
        {/* ヘッダー */}
        <ThemedView style={styles.header}>
          <View style={styles.headerContent}>
            <ThemedText type="title" style={styles.headerTitle}>
              プロフィール
            </ThemedText>
            <View style={styles.headerActions}>
              <TouchableOpacity
                style={[
                  styles.headerButton,
                  { backgroundColor: Colors[colorScheme ?? "light"].text },
                ]}
                onPress={() => setIsMenuVisible(true)}
              >
                <IconSymbol
                  name="line.3.horizontal"
                  size={16}
                  color={Colors[colorScheme ?? "light"].background}
                />
              </TouchableOpacity>
            </View>
          </View>
        </ThemedView>

        {/* プロフィール情報 */}
        <ThemedView style={styles.profileSection}>
          <View style={styles.profileHeader}>
            <View style={styles.avatarContainer}>
              {user.photoURL ? (
                <Image source={{ uri: user.photoURL }} style={styles.avatar} />
              ) : (
                <View style={[styles.avatar, styles.avatarPlaceholder]}>
                  <IconSymbol
                    name="person.fill"
                    size={40}
                    color={Colors[colorScheme ?? "light"].tabIconDefault}
                  />
                </View>
              )}
            </View>
            <View style={styles.profileInfo}>
              <ThemedText type="subtitle" style={styles.displayName}>
                {profile.displayName || "ユーザー"}
              </ThemedText>
              <ThemedText style={styles.email}>{user.email}</ThemedText>
              <ThemedText style={styles.joinDate}>
                参加日: {formatDate(profile.createdAt)}
              </ThemedText>
            </View>
          </View>

          {profile.bio && (
            <View style={styles.bioSection}>
              <ThemedText type="defaultSemiBold" style={styles.bioLabel}>
                自己紹介
              </ThemedText>
              <ThemedText style={styles.bioText}>{profile.bio}</ThemedText>
            </View>
          )}
        </ThemedView>
      </ScrollView>

      {/* SlideMenu */}
      <SlideMenu
        isVisible={isMenuVisible}
        onClose={() => setIsMenuVisible(false)}
        title="メニュー"
        menuItems={defaultMenuItems}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 0, 0, 0.1)",
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  headerActions: {
    flexDirection: "row",
    gap: 10,
  },
  headerButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  logoutButton: {
    backgroundColor: "#dc3545",
  },
  profileSection: {
    margin: 20,
    padding: 20,
    borderRadius: 12,
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 15,
  },
  avatarContainer: {
    marginRight: 15,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  avatarPlaceholder: {
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },
  profileInfo: {
    flex: 1,
  },
  displayName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  email: {
    fontSize: 14,
    opacity: 0.7,
    marginBottom: 5,
  },
  joinDate: {
    fontSize: 12,
    opacity: 0.6,
  },
  bioSection: {
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: "rgba(0, 0, 0, 0.1)",
  },
  bioLabel: {
    fontSize: 16,
    marginBottom: 8,
  },
  bioText: {
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.8,
  },
  statsSection: {
    marginHorizontal: 20,
    borderRadius: 12,
  },
});
