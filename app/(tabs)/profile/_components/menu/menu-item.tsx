import { StyleSheet, TouchableOpacity } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

import type { MenuItemConfig } from "./config";

interface MenuItemProps {
  item: MenuItemConfig;
  onPress: (route: MenuItemConfig["route"]) => void;
}

export const MenuItem: React.FC<MenuItemProps> = ({ item, onPress }) => {
  const colorScheme = useColorScheme();

  return (
    <TouchableOpacity
      style={styles.menuItem}
      onPress={() => onPress(item.route)}
    >
      <IconSymbol
        name={item.icon}
        size={20}
        color={Colors[colorScheme ?? "light"].text}
      />
      <ThemedText style={styles.menuItemText}>{item.label}</ThemedText>
      <IconSymbol
        name="chevron.right"
        size={16}
        color={Colors[colorScheme ?? "light"].tabIconDefault}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
