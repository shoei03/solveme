import type { MenuItemConfig } from "@/app/(tabs)/profile/_components/menu/config";

export const accountMenuItems: MenuItemConfig[] = [
  {
    id: "編集",
    icon: "pencil",
    label: "プロフィール編集",
    route: "/(settings)/account/edit",
  },
  {
    id: "メールアドレス変更",
    icon: "envelope",
    label: "メールアドレス変更",
    route: "/(settings)/account/change-email",
  },
  {
    id: "パスワード変更",
    icon: "lock",
    label: "パスワード変更",
    route: "/(settings)/account/change-password",
  },
  // TODO: 2段階認証の実装
  // {
  //   id: "2段階認証",
  //   icon: "lock.rotation",
  //   label: "2段階認証",
  //   route: "/(settings)/account/edit",
  // },
  {
    id: "ログアウト",
    icon: "rectangle.portrait.and.arrow.right",
    label: "ログアウト",
    route: "/(settings)/account/edit", // ダミーのルート
  },
  {
    id: "アカウント削除",
    icon: "trash",
    label: "アカウント削除",
    route: "/(settings)/account/edit", // ダミーのルート
  },
];
