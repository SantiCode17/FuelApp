import React, { useEffect, useRef } from "react";
import { TouchableOpacity, Text, View, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Station, NearbyStation } from "../../infrastructure/interfaces";

interface StationCardProps {
  station: Station | NearbyStation;
  onPress: () => void;
  showDistance?: boolean;
  index?: number;
}

const getPriceColor = (fuelTypeName: string): string => {
  const name = fuelTypeName.toLowerCase();
  if (name.includes("95")) return "#FCE902";
  if (name.includes("98")) return "#F59002";
  if (name.includes("diesel") || name.includes("diésel")) return "#22C55E";
  return "#A1A1AA";
};

export const StationCard: React.FC<StationCardProps> = ({
  station,
  onPress,
  showDistance = false,
  index = 0,
}) => {
  const nearbyStation = station as NearbyStation;
  const mainFuels = station.fuelPrices?.slice(0, 3) || [];
  
  const scale = useRef(new Animated.Value(0.95)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scale, {
        toValue: 1,
        tension: 50,
        friction: 8,
        delay: index * 50,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        delay: index * 50,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View style={{ transform: [{ scale }], opacity }}>
      <TouchableOpacity
        onPress={onPress}
        className="bg-surface mx-4 my-2 rounded-3xl overflow-hidden border border-border active:border-amarillo-400"
        activeOpacity={0.8}
      >
        <View className="p-5">
          <View className="flex-row items-start justify-between mb-3">
            <View className="flex-1 mr-3">
              {station.brand && (
                <View className="self-start bg-amarillo-400/10 px-3 py-1 rounded-full mb-2">
                  <Text className="text-amarillo-400 text-xs font-bold uppercase tracking-wide">
                    {station.brand}
                  </Text>
                </View>
              )}
              <Text className="text-lg font-bold text-text-primary" numberOfLines={2}>
                {station.name}
              </Text>
            </View>
            
            {showDistance && nearbyStation.distance !== undefined && (
              <View className="bg-naranja-400/20 px-3 py-2 rounded-xl">
                <Text className="text-naranja-400 text-sm font-bold">
                  {nearbyStation.distance.toFixed(1)} km
                </Text>
              </View>
            )}
          </View>

          <View className="flex-row items-center mb-4">
            <View className="w-6 h-6 rounded-full bg-surface-light items-center justify-center mr-2">
              <Ionicons name="location" size={12} color="#A1A1AA" />
            </View>
            <Text className="text-text-secondary text-sm flex-1" numberOfLines={1}>
              {station.address}
            </Text>
          </View>

          {mainFuels.length > 0 && (
            <View className="flex-row gap-2">
              {mainFuels.map((fuel, idx) => (
                <View
                  key={idx}
                  className="flex-1 bg-background-tertiary rounded-2xl p-3 items-center"
                >
                  <Text className="text-text-muted text-xs mb-1" numberOfLines={1}>
                    {fuel.fuelTypeName.length > 10
                      ? fuel.fuelTypeName.substring(0, 10)
                      : fuel.fuelTypeName}
                  </Text>
                  <Text
                    className="text-base font-bold"
                    style={{ color: getPriceColor(fuel.fuelTypeName) }}
                  >
                    {fuel.price.toFixed(3)}€
                  </Text>
                </View>
              ))}
            </View>
          )}

          {station.fuelPrices && station.fuelPrices.length > 3 && (
            <View className="mt-3 items-center">
              <Text className="text-text-muted text-xs">
                +{station.fuelPrices.length - 3} combustibles más
              </Text>
            </View>
          )}
        </View>

        <View className="h-1 flex-row">
          <View className="flex-1 bg-amarillo-400" />
          <View className="flex-1 bg-naranja-400" />
          <View className="flex-1 bg-rojo-400" />
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};
