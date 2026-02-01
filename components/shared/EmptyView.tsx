import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface EmptyViewProps {
  title?: string;
  message?: string;
  icon?: keyof typeof Ionicons.glyphMap;
}

export const EmptyView: React.FC<EmptyViewProps> = ({
  title = "Sin resultados",
  message = "No se encontraron elementos",
  icon = "file-tray-outline",
}) => {
  return (
    <View className="flex-1 items-center justify-center bg-background px-8">
      <View className="w-24 h-24 rounded-full bg-surface items-center justify-center mb-6">
        <Ionicons name={icon} size={48} color="#71717A" />
      </View>
      <Text className="text-xl font-bold text-text-primary text-center mb-2">
        {title}
      </Text>
      <Text className="text-text-secondary text-center text-base">
        {message}
      </Text>
    </View>
  );
};
