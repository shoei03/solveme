import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  Animated,
  Dimensions,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

import type { MenuItemConfig } from "./menu";
import { MenuContent } from "./menu";

interface SlideMenuProps {
  isVisible: boolean;
  onClose: () => void;
  title: string;
  menuItems: MenuItemConfig[];
}

export const SlideMenu: React.FC<SlideMenuProps> = ({
  isVisible,
  onClose,
  title,
  menuItems,
}) => {
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

  const handleMenuOption = (route: MenuItemConfig["route"]) => {
    onClose();
    setTimeout(() => {
      router.push(route);
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
              <MenuContent
                onMenuItemPress={handleMenuOption}
                onClose={onClose}
                title={title}
                menuItems={menuItems}
              />
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
});
