import { router } from "expo-router";
import { useCallback } from "react";
import {
  Animated,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Colors } from "@/constants/Colors";
import type { MenuItemConfig } from "@/constants/menu-items";
import { useSlideMenuAnimation } from "@/hooks/use-slide-menu-animation";
import { useColorScheme } from "@/hooks/useColorScheme";


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
  const insets = useSafeAreaInsets();

  const { slideAnimation, opacityAnimation, showModal } = useSlideMenuAnimation(
    {
      isVisible,
    }
  );

  const handleMenuOption = useCallback(
    (route: MenuItemConfig["route"]) => {
      onClose();
      setTimeout(() => {
        router.push(route);
      }, 300);
    },
    [onClose]
  );

  return (
    <Modal
      visible={showModal}
      transparent={true}
      animationType="none"
      onRequestClose={onClose}
    >
      <Animated.View
        style={[
          styles.modalOverlay,
          {
            opacity: opacityAnimation,
          },
        ]}
      >
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.overlayTouchArea} />
        </TouchableWithoutFeedback>
        <Animated.View
          style={[
            styles.slideMenu,
            {
              transform: [{ translateX: slideAnimation }],
              backgroundColor: Colors[colorScheme ?? "light"].background,
            },
          ]}
        >
          <View style={[styles.menuContainer, { paddingTop: insets.top + 20 }]}>
            <MenuContent
              onMenuItemPress={handleMenuOption}
              onClose={onClose}
              title={title}
              menuItems={menuItems}
            />
          </View>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  overlayTouchArea: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  slideMenu: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 280,
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
  },
  menuContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
});
