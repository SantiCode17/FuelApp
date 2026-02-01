import { Drawer } from "expo-router/drawer";
import { DrawerContentScrollView, DrawerItemList, DrawerContentComponentProps } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import { View, Text, TouchableOpacity, Linking } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

function CustomDrawerContent(props: DrawerContentComponentProps) {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const menuItems = [
    { icon: "home", label: "Inicio", route: "/(stack)/(drawer)/(tabs)/stations" as const },
    { icon: "map", label: "Mapa", route: "/(stack)/(drawer)/(tabs)/map" as const },
    { icon: "navigate", label: "Cercanas", route: "/(stack)/(drawer)/(tabs)/nearby" as const },
  ];

  const handleNavigation = (route: string) => {
    router.push(route as any);
    props.navigation.closeDrawer();
  };

  const handleOpenApi = () => {
    Linking.openURL("https://precioil.es");
  };

  const handleOpenGitHub = () => {
    Linking.openURL("https://github.com/SantiCode17/FuelApp");
  };

  return (
    <View className="flex-1 bg-negro-400">
      <View 
        style={{ paddingTop: insets.top + 16 }}
        className="px-5 pb-6 border-b border-border"
      >
        <View className="flex-row items-center">
          <View className="w-14 h-14 rounded-2xl items-center justify-center" style={{backgroundColor: '#FCE902'}}>
            <Ionicons name="flash" size={28} color="#010005" />
          </View>
          <View className="ml-4">
            <Text className="text-2xl font-bold text-text-primary">FuelApp</Text>
            <Text className="text-text-muted text-sm">Ahorra en combustible</Text>
          </View>
        </View>
      </View>

      <View className="flex-1 pt-4 px-3">
        <Text className="text-text-muted text-xs font-semibold uppercase tracking-wider px-3 mb-3">
          Navegación
        </Text>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleNavigation(item.route)}
            className="flex-row items-center px-4 py-4 rounded-2xl mb-1 active:bg-surface-light"
            activeOpacity={0.7}
          >
            <View className="w-10 h-10 rounded-xl bg-surface-light items-center justify-center">
              <Ionicons name={item.icon as any} size={20} color="#FCE902" />
            </View>
            <Text className="text-text-primary font-semibold ml-4 text-base">
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}

        <View className="h-px bg-border my-4 mx-3" />

        <Text className="text-text-muted text-xs font-semibold uppercase tracking-wider px-3 mb-3">
          Información
        </Text>
        <TouchableOpacity
          onPress={handleOpenApi}
          className="flex-row items-center px-4 py-4 rounded-2xl mb-1"
          activeOpacity={0.7}
        >
          <View className="w-10 h-10 rounded-xl bg-surface-light items-center justify-center">
            <Ionicons name="cloud-outline" size={20} color="#A1A1AA" />
          </View>
          <View className="ml-4">
            <Text className="text-text-secondary font-medium text-base">
              Fuente de datos
            </Text>
            <Text className="text-text-muted text-xs">
              API PrecioIL.es
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleOpenGitHub}
          className="flex-row items-center px-4 py-4 rounded-2xl mb-1"
          activeOpacity={0.7}
        >
          <View className="w-10 h-10 rounded-xl bg-surface-light items-center justify-center">
            <Ionicons name="logo-github" size={20} color="#A1A1AA" />
          </View>
          <View className="ml-4">
            <Text className="text-text-secondary font-medium text-base">
              Repositorio
            </Text>
            <Text className="text-text-muted text-xs">
              github.com/SantiCode17/FuelApp
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <View 
        style={{ paddingBottom: insets.bottom + 16 }}
        className="px-5 pt-4 border-t border-border"
      >
        <View className="bg-surface rounded-2xl p-4">
          <View className="flex-row items-center">
            <View className="w-10 h-10 rounded-xl bg-amarillo-400/20 items-center justify-center">
              <Ionicons name="code-slash" size={20} color="#FCE902" />
            </View>
            <View className="flex-1 ml-3">
              <Text className="text-text-primary font-semibold text-sm">Desarrollado por</Text>
              <Text className="text-amarillo-400 text-xs font-medium">Santiago Sanchez March</Text>
            </View>
          </View>
        </View>
        <Text className="text-text-muted text-xs text-center mt-3">Versión 1.0.0</Text>
      </View>
    </View>
  );
}

export default function DrawerLayout() {
  return (
    <Drawer
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerStyle: {
          backgroundColor: "#0A0A0F",
        },
        headerTintColor: "#FCE902",
        headerTitleStyle: { 
          fontWeight: "bold",
          fontSize: 18,
        },
        headerShadowVisible: false,
        drawerStyle: {
          backgroundColor: "#0A0A0F",
          width: 300,
        },
        swipeEnabled: true,
        swipeEdgeWidth: 50,
      }}
    >
      <Drawer.Screen
        name="(tabs)"
        options={{
          title: "FuelApp",
          drawerItemStyle: { display: "none" },
        }}
      />
    </Drawer>
  );
}
