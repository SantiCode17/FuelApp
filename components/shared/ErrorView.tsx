import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface ErrorViewProps {
  message?: string;
  onRetry?: () => void;
}

export const ErrorView: React.FC<ErrorViewProps> = ({
  message = "Ha ocurrido un error",
  onRetry,
}) => {
  return (
    <View className="flex-1 items-center justify-center bg-background px-8">
      <View className="w-20 h-20 rounded-full bg-accent-red/20 items-center justify-center mb-6">
        <Ionicons name="warning" size={40} color="#A82001" />
      </View>
      <Text className="text-2xl font-bold text-text-primary text-center mb-2">
        ¡Vaya!
      </Text>
      <Text className="text-text-secondary text-center text-base mb-8">
        {message}
      </Text>
      {onRetry && (
        <TouchableOpacity
          onPress={onRetry}
          className="px-8 py-4 rounded-2xl active:opacity-80"
          style={{backgroundColor: '#FCE902'}}
        >
          <Text className="font-bold text-base" style={{color: '#010005'}}>Reintentar</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
