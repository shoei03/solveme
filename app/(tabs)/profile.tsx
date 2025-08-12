import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ProfileEdit } from "@/components/profile/ProfileEdit";
import { ProfileStats } from "@/components/profile/ProfileStats";
import { SlideMenu } from "@/components/profile/SlideMenu";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import { useAuth } from "@/contexts/AuthContext";
import { useColorScheme } from "@/hooks/useColorScheme";
import { authService, type UserProfile } from "@/services/authService";
import {
  profileService,
  type ProfileUpdateData,
  type RecentActivity,
  type UserStats,
} from "@/services/profileService";
import { formatDate } from "@/utils/helpers";

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [activities, setActivities] = useState<RecentActivity[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadProfileData = useCallback(async () => {
    if (!user) return;

    try {
      const [profileData, statsData, activitiesData] = await Promise.all([
        profileService.getUserProfile(user.uid),
        profileService.getUserStats(user.uid),
        profileService.getRecentActivity(user.uid, 10),
      ]);

      setProfile(profileData);
      setStats(statsData);
      setActivities(activitiesData);
    } catch (error: unknown) {
      console.error("Failed to load profile data:", error);
      Alert.alert("エラー", "プロフィール情報の読み込みに失敗しました");
    } finally {
      setLoading(false);
    }
  }, [user]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadProfileData();
    setRefreshing(false);
  };

  const handleProfileUpdate = async (updateData: ProfileUpdateData) => {
    if (profile) {
      setProfile({
        ...profile,
        ...updateData,
      });
    }
    setIsEditing(false);
  };

  const handleLogout = () => {
    Alert.alert("ログアウト", "ログアウトしますか？", [
      {
        text: "キャンセル",
        style: "cancel",
      },
      {
        text: "ログアウト",
        style: "destructive",
        onPress: async () => {
          try {
            await authService.logOut();
          } catch (error: unknown) {
            const errorMessage =
              error instanceof Error
                ? error.message
                : "ログアウトに失敗しました";
            Alert.alert("ログアウトエラー", errorMessage);
          }
        },
      },
    ]);
  };

  useEffect(() => {
    loadProfileData();
  }, [loadProfileData]);

  if (loading) {
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

  if (!user || !profile) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <ThemedText>プロフィール情報が見つかりません</ThemedText>
        </View>
      </SafeAreaView>
    );
  }

  if (isEditing) {
    return (
      <SafeAreaView style={styles.container}>
        <ProfileEdit
          profile={profile}
          onSave={handleProfileUpdate}
          onCancel={() => setIsEditing(false)}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
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
                  { backgroundColor: Colors[colorScheme ?? "light"].tint },
                ]}
                onPress={() => setIsEditing(true)}
              >
                <IconSymbol name="pencil" size={16} color="white" />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.headerButton, styles.logoutButton]}
                onPress={handleLogout}
              >
                <IconSymbol
                  name="rectangle.portrait.and.arrow.right"
                  size={16}
                  color="white"
                />
              </TouchableOpacity>
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

        {/* 統計情報とアクティビティ */}
        {stats && (
          <ThemedView style={styles.statsSection}>
            <ProfileStats stats={stats} activities={activities} />
          </ThemedView>
        )}
      </ScrollView>

      {/* SlideMenu */}
      <SlideMenu
        isVisible={isMenuVisible}
        onClose={() => setIsMenuVisible(false)}
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
