import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabsLayout() {
  const insets = useSafeAreaInsets();

  const bottomPadding = Platform.OS === "ios"
    ? Math.max(insets.bottom, 16)
    : 18;
  const topPadding = 10;
  const totalHeight = 64 + bottomPadding + topPadding;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#FCE902",
        tabBarInactiveTintColor: "#71717A",
        tabBarStyle: {
          backgroundColor: "#0A0A0F",
          borderTopWidth: 1,
          borderTopColor: "#1F1F28",
          height: totalHeight,
          paddingBottom: bottomPadding,
          paddingTop: topPadding,
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarLabelStyle: {
          fontSize: 13,
          fontWeight: "600",
        },
        tabBarIconStyle: {
          marginBottom: 5
        },
      }}
    >
      <Tabs.Screen
        name="stations"
        options={{
          title: "Estaciones",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "list" : "list-outline"}
              size={20}
              color={color}
              style={{
                backgroundColor: focused ? "rgba(252, 233, 2, 0.15)" : "transparent",
                borderRadius: 12,
                padding: 2,
                overflow: "hidden",
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: "Mapa",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "map" : "map-outline"}
              size={20}
              color={color}
              style={{
                backgroundColor: focused ? "rgba(252, 233, 2, 0.15)" : "transparent",
                borderRadius: 12,
                padding: 2,
                overflow: "hidden",
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="nearby"
        options={{
          title: "Cercanas",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "navigate" : "navigate-outline"}
              size={20}
              color={color}
              style={{
                backgroundColor: focused ? "rgba(252, 233, 2, 0.15)" : "transparent",
                borderRadius: 12,
                padding: 2,
                overflow: "hidden",
              }}
            />
          ),
        }}
      />
    </Tabs>
  );
}