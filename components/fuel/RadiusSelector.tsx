import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface RadiusSelectorProps {
  radius: number;
  onRadiusChange: (value: number) => void;
}

export const RadiusSelector: React.FC<RadiusSelectorProps> = ({
  radius,
  onRadiusChange,
}) => {
  const radiusOptions = [5, 10, 20, 30, 50];

  return (
    <View className="bg-surface rounded-3xl p-5 border border-border">
      <View className="flex-row items-center justify-between mb-5">
        <View className="flex-row items-center">
          <View className="w-10 h-10 rounded-xl bg-amarillo-400/10 items-center justify-center mr-3">
            <Ionicons name="radio" size={20} color="#FCE902" />
          </View>
          <Text className="text-lg font-bold text-text-primary">
            Radio de búsqueda
          </Text>
        </View>
        <View className="px-4 py-2 rounded-xl" style={{backgroundColor: '#FCE902'}}>
          <Text className="font-bold text-lg" style={{color: '#010005'}}>{radius} km</Text>
        </View>
      </View>

      <View className="flex-row gap-2">
        {radiusOptions.map((value) => {
          const isSelected = radius === value;
          return (
            <TouchableOpacity
              key={value}
              onPress={() => onRadiusChange(value)}
              className={`flex-1 py-3 rounded-2xl items-center border-2 ${
                isSelected
                  ? "bg-amarillo-400/10 border-amarillo-400"
                  : "bg-background-tertiary border-transparent"
              }`}
              activeOpacity={0.7}
            >
              <Text
                className={`font-bold ${
                  isSelected ? "text-amarillo-400" : "text-text-secondary"
                }`}
              >
                {value}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};
