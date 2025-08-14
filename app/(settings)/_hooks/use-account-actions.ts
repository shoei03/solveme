import { router } from "expo-router";
import { useCallback } from "react";
import { Alert } from "react-native";

import type { MenuItemConfig } from "@/app/(tabs)/profile/_components/menu/config";

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
          // TODO: ログアウト処理を実装
          console.log("ログアウト処理");
          // ログアウト後はタブスクリーンのindexに戻る
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
            // TODO: アカウント削除処理を実装
            console.log("アカウント削除処理");
            // アカウント削除後はログイン画面に戻る
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
