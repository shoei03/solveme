import type { Href } from "expo-router";
import type { SymbolViewProps } from "expo-symbols";

export interface MenuItemConfig {
  id: string;
  icon: SymbolViewProps["name"];
  label: string;
  route: Href;
}

export const defaultMenuItems: MenuItemConfig[] = [
  {
    id: "account",
    icon: "person.crop.circle.fill",
    label: "アカウント",
    route: "/(settings)/account",
  },
  {
    id: "notifications",
    icon: "bell.fill",
    label: "通知",
    route: "/(settings)/notifications",
  },
  {
    id: "details",
    icon: "info.circle.fill",
    label: "詳細",
    route: "/(settings)/details",
  },
  {
    id: "contact",
    icon: "envelope.fill",
    label: "お問い合わせ",
    route: "/(settings)/contact",
  },
];

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
