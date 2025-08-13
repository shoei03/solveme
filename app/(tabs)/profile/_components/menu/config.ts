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
