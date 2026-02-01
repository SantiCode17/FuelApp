import React, { useEffect, useRef } from "react";
import { TouchableOpacity, Text, View, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Province } from "../../infrastructure/interfaces";

interface ProvinceCardProps {
  province: Province;
  onPress: () => void;
  index?: number;
}

export const ProvinceCard: React.FC<ProvinceCardProps> = ({
  province,
  onPress,
  index = 0,
}) => {
  const translateY = useRef(new Animated.Value(30)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
        delay: index * 30,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        delay: index * 30,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View style={{ transform: [{ translateY }], opacity }}>
      <TouchableOpacity
        onPress={onPress}
        className="bg-surface mx-4 my-1.5 p-4 rounded-2xl flex-row items-center border border-border active:bg-surface-light"
        activeOpacity={0.7}
      >
        <View className="w-12 h-12 rounded-xl bg-amarillo-400/10 items-center justify-center">
          <Ionicons name="location" size={22} color="#FCE902" />
        </View>
        <View className="flex-1 ml-4">
          <Text className="text-base font-semibold text-text-primary">
            {province.name}
          </Text>
        </View>
        <View className="w-8 h-8 rounded-full bg-surface-light items-center justify-center">
          <Ionicons name="chevron-forward" size={16} color="#A1A1AA" />
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};
