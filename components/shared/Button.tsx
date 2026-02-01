import React from "react";
import { TouchableOpacity, Text, View } from "react-native";

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  disabled?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = "primary",
  disabled = false,
  fullWidth = false,
  icon,
}) => {
  const baseClasses = "rounded-2xl items-center justify-center flex-row";
  const widthClass = fullWidth ? "w-full" : "";

  if (variant === "primary") {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled}
        className={`${baseClasses} ${widthClass} ${disabled ? "opacity-50" : ""}`}
        activeOpacity={0.8}
      >
        <View className="px-8 py-4 rounded-2xl flex-row items-center justify-center w-full" style={{backgroundColor: '#FCE902'}}>
          {icon && <View className="mr-2">{icon}</View>}
          <Text className="font-bold text-base" style={{color: '#010005'}}>{title}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  if (variant === "secondary") {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled}
        className={`${baseClasses} ${widthClass} bg-surface-light px-8 py-4 ${disabled ? "opacity-50" : ""}`}
        activeOpacity={0.8}
      >
        {icon && <View className="mr-2">{icon}</View>}
        <Text className="text-text-primary font-bold text-base">{title}</Text>
      </TouchableOpacity>
    );
  }

  if (variant === "outline") {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled}
        className={`${baseClasses} ${widthClass} border-2 border-amarillo-400 px-8 py-4 ${disabled ? "opacity-50" : ""}`}
        activeOpacity={0.8}
      >
        {icon && <View className="mr-2">{icon}</View>}
        <Text className="text-amarillo-400 font-bold text-base">{title}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      className={`${baseClasses} ${widthClass} px-8 py-4 ${disabled ? "opacity-50" : ""}`}
      activeOpacity={0.6}
    >
      {icon && <View className="mr-2">{icon}</View>}
      <Text className="text-text-secondary font-semibold text-base">{title}</Text>
    </TouchableOpacity>
  );
};
