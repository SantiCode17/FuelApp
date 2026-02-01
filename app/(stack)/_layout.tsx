import { Stack } from "expo-router";

export default function StackLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "#0A0A0F" },
      }}
    >
      <Stack.Screen name="(drawer)" />
      <Stack.Screen
        name="station/[id]"
        options={{
          headerShown: true,
          headerTitle: "Detalles",
          headerStyle: { backgroundColor: "#121218" },
          headerTintColor: "#FCE902",
          headerTitleStyle: { fontWeight: "bold" },
          headerShadowVisible: false,
        }}
      />
    </Stack>
  );
}
