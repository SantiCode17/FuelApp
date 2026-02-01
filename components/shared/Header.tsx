import React from "react";
import { View, Text } from "react-native";

interface HeaderProps {
  title: string;
  subtitle?: string;
}

export const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  return (
    <View className="bg-background-secondary px-6 py-8">
      <Text className="text-3xl font-bold text-text-primary">{title}</Text>
      {subtitle && (
        <Text className="text-text-secondary mt-2 text-base">{subtitle}</Text>
      )}
    </View>
  );
};
