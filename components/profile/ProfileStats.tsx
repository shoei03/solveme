import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { RecentActivity, UserStats } from "../../services/profileService";
import { formatDate } from "../../utils/helpers";

interface ProfileStatsProps {
  stats: UserStats;
  activities: RecentActivity[];
}

export const ProfileStats: React.FC<ProfileStatsProps> = ({
  stats,
  activities,
}) => {
  return (
    <View style={styles.container}>
      {/* 統計情報 */}
      <View style={styles.statsContainer}>
        <Text style={styles.sectionTitle}>活動統計</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{stats.postsCount}</Text>
            <Text style={styles.statLabel}>投稿数</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{stats.answersCount}</Text>
            <Text style={styles.statLabel}>回答数</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{stats.bestAnswersCount}</Text>
            <Text style={styles.statLabel}>ベストアンサー</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{stats.helpfulCount}</Text>
            <Text style={styles.statLabel}>役に立った</Text>
          </View>
        </View>
      </View>

      {/* 最近のアクティビティ */}
      <View style={styles.activityContainer}>
        <Text style={styles.sectionTitle}>最近のアクティビティ</Text>
        {activities.length === 0 ? (
          <Text style={styles.emptyText}>まだアクティビティがありません</Text>
        ) : (
          activities.map((activity) => (
            <TouchableOpacity key={activity.id} style={styles.activityItem}>
              <View style={styles.activityHeader}>
                <View
                  style={[
                    styles.activityBadge,
                    { backgroundColor: getActivityColor(activity.type) },
                  ]}
                >
                  <Text style={styles.activityBadgeText}>
                    {getActivityLabel(activity.type)}
                  </Text>
                </View>
                <Text style={styles.activityDate}>
                  {formatDate(activity.date)}
                </Text>
              </View>
              <Text style={styles.activityTitle} numberOfLines={2}>
                {activity.title}
              </Text>
              {activity.category && (
                <Text style={styles.activityCategory}>
                  カテゴリ: {activity.category}
                </Text>
              )}
            </TouchableOpacity>
          ))
        )}
      </View>
    </View>
  );
};

const getActivityColor = (type: string): string => {
  switch (type) {
    case "post":
      return "#007AFF";
    case "answer":
      return "#34C759";
    case "bestAnswer":
      return "#FF9500";
    default:
      return "#8E8E93";
  }
};

const getActivityLabel = (type: string): string => {
  switch (type) {
    case "post":
      return "投稿";
    case "answer":
      return "回答";
    case "bestAnswer":
      return "BA";
    default:
      return "他";
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statsContainer: {
    backgroundColor: "white",
    marginBottom: 20,
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 15,
    color: "#333",
  },
  statsGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#007AFF",
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },
  activityContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  emptyText: {
    textAlign: "center",
    color: "#666",
    fontStyle: "italic",
    marginTop: 20,
  },
  activityItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  activityHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  activityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  activityBadgeText: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
  },
  activityDate: {
    fontSize: 12,
    color: "#666",
  },
  activityTitle: {
    fontSize: 14,
    color: "#333",
    marginBottom: 5,
  },
  activityCategory: {
    fontSize: 12,
    color: "#007AFF",
  },
});
