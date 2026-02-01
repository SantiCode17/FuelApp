import React from "react";
import { ActivityIndicator, View } from "react-native";

interface LoaderProps {
  size?: "small" | "large";
  color?: string;
  fullScreen?: boolean;
}

export const Loader: React.FC<LoaderProps> = ({
  size = "large",
  color = "#FCE902",
  fullScreen = false,
}) => {
  if (fullScreen) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <ActivityIndicator size={size} color={color} />
      </View>
    );
  }

  return (
    <View className="items-center justify-center py-8">
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};
