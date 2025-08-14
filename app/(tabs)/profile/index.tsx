import {
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ErrorScreen } from "@/components/ErrorScreen";
import { LoadingScreen } from "@/components/LoadingScreen";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import { useAuth } from "@/contexts/AuthContext";
import { useColorScheme } from "@/hooks/useColorScheme";
import { formatDate } from "@/utils/helpers";

import { useUserProfile } from "./_hooks/use-user-profile";

export default function ProfileScreen() {

  const colorScheme = useColorScheme();
  const { user } = useAuth();
  const { profile, isInitialLoading, isRefreshing, error, refreshProfile } =
    useUserProfile();

  if (isInitialLoading) {
    return <LoadingScreen />;
  }

  if (error) {
    return (
      <ErrorScreen
        message={error}
        showRetry={true}
        onRetry={refreshProfile}
        retryText="再試行"
      />
    );
  }

  if (!user || !profile) {
    return (
      <ErrorScreen
        message="プロフィール情報が見つかりません"
        showRetry={false}
        onRetry={() => {}}
        retryText="再試行"
      />
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
