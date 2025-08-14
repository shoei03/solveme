import { StyleSheet, View } from "react-native";

import { defaultMenuItems } from "@/constants/menu-items";

import { type MenuItemConfig } from "./config";
import { MenuHeader } from "./menu-header";
import { MenuItem } from "./menu-item";

interface MenuContentProps {
  title: string;
  menuItems?: MenuItemConfig[];
  onClose: () => void;
  onMenuItemPress: (route: MenuItemConfig["route"]) => void;
}

export const MenuContent: React.FC<MenuContentProps> = ({
  title,
  menuItems = defaultMenuItems,
  onClose,
  onMenuItemPress,
}) => {
  return (
    <>
      <MenuHeader title={title} onClose={onClose} />

      <View style={styles.menuItems}>
        {menuItems.map((item) => (
          <MenuItem key={item.id} item={item} onPress={onMenuItemPress} />
        ))}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  menuItems: {
    flex: 1,
  },
});
