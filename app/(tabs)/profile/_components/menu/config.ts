import type { Href } from "expo-router";
import type { SymbolViewProps } from "expo-symbols";

export interface MenuItemConfig {
  id: string;
  icon: SymbolViewProps["name"];
  label: string;
  route: Href;
}
