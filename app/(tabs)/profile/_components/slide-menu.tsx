import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  Animated,
  Dimensions,
  Modal,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

interface SlideMenuProps {
  isVisible: boolean;
  onClose: () => void;
}

export const SlideMenu: React.FC<SlideMenuProps> = ({ isVisible, onClose }) => {
  const colorScheme = useColorScheme();
  const [slideAnimation] = useState(
    new Animated.Value(Dimensions.get("window").width)
  );

  useEffect(() => {
    if (isVisible) {
      Animated.timing(slideAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnimation, {
        toValue: Dimensions.get("window").width,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible, slideAnimation]);

  const handleMenuOption = (option: string) => {
    onClose();
    setTimeout(() => {
      switch (option) {
        case "account":
          router.push("/(settings)/account");
          break;
        case "notifications":
          router.push("/(settings)/notifications");
          break;
        case "details":
          router.push("/(settings)/details");
          break;
        case "contact":
          router.push("/(settings)/contact");
          break;
      }
    }, 300);
  };

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="none"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback>
            <Animated.View
              style={[
                styles.slideMenu,
                {
                  transform: [{ translateX: slideAnimation }],
                  backgroundColor: Colors[colorScheme ?? "light"].background,
                },
              ]}
            >
              <View style={styles.menuHeader}>
                <ThemedText type="subtitle" style={styles.menuTitle}>
                  メニュー
                </ThemedText>
                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                  <IconSymbol
                    name="xmark"
                    size={20}
                    color={Colors[colorScheme ?? "light"].text}
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.menuItems}>
                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => handleMenuOption("account")}
                >
                  <IconSymbol
                    name="person.crop.circle.fill"
                    size={20}
                    color={Colors[colorScheme ?? "light"].text}
                  />
                  <ThemedText style={styles.menuItemText}>
                    アカウント
                  </ThemedText>
                  <IconSymbol
                    name="chevron.right"
                    size={16}
                    color={Colors[colorScheme ?? "light"].tabIconDefault}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => handleMenuOption("notifications")}
                >
                  <IconSymbol
                    name="bell.fill"
                    size={20}
                    color={Colors[colorScheme ?? "light"].text}
                  />
                  <ThemedText style={styles.menuItemText}>通知</ThemedText>
                  <IconSymbol
                    name="chevron.right"
                    size={16}
                    color={Colors[colorScheme ?? "light"].tabIconDefault}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => handleMenuOption("details")}
                >
                  <IconSymbol
                    name="info.circle.fill"
                    size={20}
                    color={Colors[colorScheme ?? "light"].text}
                  />
                  <ThemedText style={styles.menuItemText}>詳細</ThemedText>
                  <IconSymbol
                    name="chevron.right"
                    size={16}
                    color={Colors[colorScheme ?? "light"].tabIconDefault}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => handleMenuOption("contact")}
                >
                  <IconSymbol
                    name="envelope.fill"
                    size={20}
                    color={Colors[colorScheme ?? "light"].text}
                  />
                  <ThemedText style={styles.menuItemText}>
                    お問い合わせ
                  </ThemedText>
                  <IconSymbol
                    name="chevron.right"
                    size={16}
                    color={Colors[colorScheme ?? "light"].tabIconDefault}
                  />
                </TouchableOpacity>
              </View>
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  slideMenu: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    width: 280,
    paddingTop: 50,
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: -2,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
  },
  menuHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 0, 0, 0.1)",
    marginBottom: 20,
  },
  menuTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  closeButton: {
    padding: 5,
  },
  menuItems: {
    flex: 1,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 5,
  },
  menuItemText: {
    flex: 1,
    fontSize: 16,
    marginLeft: 15,
  },
});
