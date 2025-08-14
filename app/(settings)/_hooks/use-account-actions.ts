import { router } from "expo-router";
import { useCallback } from "react";
import { Alert } from "react-native";

import type { MenuItemConfig } from "@/constants/menu-items";
import { authService } from "@/services/authService";

export const useAccountActions = () => {
  const handleLogout = useCallback(() => {
    Alert.alert("ログアウト", "ログアウトしますか？", [
      {
        text: "キャンセル",
        style: "cancel",
      },
      {
        text: "ログアウト",
        style: "destructive",
        onPress: () => {
          authService.logOut();
          router.replace("/(tabs)");
        },
      },
    ]);
  }, []);

  const handleDeleteAccount = useCallback(() => {
    Alert.alert(
      "アカウント削除",
      "アカウントを削除すると、すべてのデータが失われます。この操作は取り消せません。本当に削除しますか？",
      [
        {
          text: "キャンセル",
          style: "cancel",
        },
        {
          text: "削除",
          style: "destructive",
          onPress: () => {
            authService.deleteAccount();
            router.push("/(tabs)");
          },
        },
      ]
    );
  }, []);

  const handleMenuOption = useCallback(
    (item: MenuItemConfig) => {
      if (item.id === "ログアウト") {
        handleLogout();
      } else if (item.id === "アカウント削除") {
        handleDeleteAccount();
      } else {
        router.push(item.route);
      }
    },
    [handleLogout, handleDeleteAccount]
  );

  return {
    handleLogout,
    handleDeleteAccount,
    handleMenuOption,
  };
};
