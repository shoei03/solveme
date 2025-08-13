import { StyleSheet, TouchableOpacity, View } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

interface MenuHeaderProps {
  title?: string;
  onClose: () => void;
}

export const MenuHeader: React.FC<MenuHeaderProps> = ({
  title,
  onClose,
}) => {
  const colorScheme = useColorScheme();

  return (
    <View style={styles.menuHeader}>
      <ThemedText type="subtitle" style={styles.menuTitle}>
        {title}
      </ThemedText>
      <TouchableOpacity onPress={onClose} style={styles.closeButton}>
        <IconSymbol
          name="xmark"
          size={20}
          color={Colors[colorScheme ?? "light"].text}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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
});
