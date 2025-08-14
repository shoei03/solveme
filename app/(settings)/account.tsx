import { Stack } from "expo-router";
import { SafeAreaView, StyleSheet, View } from "react-native";

import { MenuItem } from "@/components/menu/menu-item";
import { accountMenuItems } from "@/constants/menu-items";

import { useAccountActions } from "./_hooks/use-account-actions";

export default function AccountScreen() {
  const { handleMenuOption } = useAccountActions();

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          title: "アカウント設定",
          headerShown: true,
          headerBackTitle: "戻る",
        }}
      />
      <View style={styles.menuItems}>
        {accountMenuItems.map((item) => (
          <MenuItem
            key={item.id}
            item={item}
            onPress={() => handleMenuOption(item)}
          />
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  menuItems: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
});
