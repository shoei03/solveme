import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useState } from "react";
import { TouchableOpacity } from "react-native";

import { SlideMenu } from "@/components/slide-menu";
import { defaultMenuItems } from "@/constants/menu-items";


export default function TabLayout() {
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  return (
    <>
      <Tabs>
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => (
              <Ionicons name="home" size={24} color={color} />
            ),
            headerLeft: () => (
              <TouchableOpacity
                style={{ marginLeft: 15 }}
                onPress={() => {
                  setIsMenuVisible(true);
                }}
              >
                <Ionicons name="menu" size={24} color="#000" />
              </TouchableOpacity>
            ),
          }}
        />
        <Tabs.Screen
          name="explore/index"
          options={{
            title: "Explore",
            tabBarIcon: ({ color }) => (
              <Ionicons name="compass" size={24} color={color} />
            ),
            headerLeft: () => (
              <TouchableOpacity
                style={{ marginLeft: 15 }}
                onPress={() => {
                  setIsMenuVisible(true);
                }}
              >
                <Ionicons name="menu" size={24} color="#000" />
              </TouchableOpacity>
            ),
          }}
        />
        <Tabs.Screen
          name="profile/index"
          options={{
            title: "プロフィール",
            tabBarIcon: ({ color }) => (
              <Ionicons name="person" size={24} color={color} />
            ),
            headerShown: true,
            headerLeft: () => (
              <TouchableOpacity
                style={{ marginLeft: 15 }}
                onPress={() => {
                  setIsMenuVisible(true);
                }}
              >
                <Ionicons name="menu" size={24} color="#000" />
              </TouchableOpacity>
            ),
          }}
        />
      </Tabs>
      <SlideMenu
        isVisible={isMenuVisible}
        onClose={() => setIsMenuVisible(false)}
        title="メニュー"
        menuItems={defaultMenuItems}
      />
    </>
  );
}
