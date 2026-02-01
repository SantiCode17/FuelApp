import { Stack } from "expo-router";
import { View, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

function CustomHeader({ title }: { title: string }) {
  const insets = useSafeAreaInsets();
  return (
    <View style={{ 
      backgroundColor: "#121218", 
      paddingTop: 20,
      paddingBottom: 18,
      paddingLeft: 14,
      justifyContent: "center",
    }}>
      <Text style={{ color: "#FCE902", fontWeight: "bold", fontSize: 20 }}>
        {title}
      </Text>
    </View>
  );
}

export default function StationsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "#121218" },
      }}
    >
      <Stack.Screen 
        name="index" 
        options={{ 
          headerShown: true,
          header: () => <CustomHeader title="Provincias" />
        }} 
      />
      <Stack.Screen 
        name="municipalities/[provinceId]" 
        options={{ 
          headerShown: true,
          header: () => <CustomHeader title="Municipios" />
        }} 
      />
      <Stack.Screen 
        name="list/[municipalityId]" 
        options={{ 
          headerShown: true,
          header: () => <CustomHeader title="Estaciones" />
        }} 
      />
    </Stack>
  );
}
