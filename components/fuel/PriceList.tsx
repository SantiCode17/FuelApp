import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FuelPrice } from "../../infrastructure/interfaces";

interface PriceListProps {
  prices: FuelPrice[];
}

const getPriceColor = (fuelTypeName: string): string => {
  const name = fuelTypeName.toLowerCase();
  if (name.includes("95")) return "#FCE902";
  if (name.includes("98")) return "#F59002";
  if (name.includes("diesel") || name.includes("diésel")) return "#22C55E";
  if (name.includes("glp") || name.includes("gas")) return "#A82001";
  return "#A1A1AA";
};

const getPriceStatus = (price: number, average?: number): "low" | "high" | "neutral" => {
  if (!average) return "neutral";
  const diff = ((price - average) / average) * 100;
  if (diff < -2) return "low";
  if (diff > 2) return "high";
  return "neutral";
};

export const PriceList: React.FC<PriceListProps> = ({ prices }) => {
  if (!prices || prices.length === 0) {
    return (
      <View className="bg-surface rounded-3xl p-6 border border-border">
        <Text className="text-text-secondary text-center">
          No hay precios disponibles
        </Text>
      </View>
    );
  }

  return (
    <View className="bg-surface rounded-3xl p-5 border border-border">
      <View className="flex-row items-center mb-5">
        <View className="w-10 h-10 rounded-xl bg-amarillo-400/10 items-center justify-center mr-3">
          <Ionicons name="pricetag" size={20} color="#FCE902" />
        </View>
        <Text className="text-xl font-bold text-text-primary">
          Precios actuales
        </Text>
      </View>

      {prices.map((fuel, index) => {
        const status = getPriceStatus(fuel.price, fuel.averagePrice);
        const isLast = index === prices.length - 1;

        return (
          <View
            key={index}
            className={`py-4 ${!isLast ? "border-b border-border" : ""}`}
          >
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center flex-1">
                <View
                  className="w-3 h-3 rounded-full mr-3"
                  style={{ backgroundColor: getPriceColor(fuel.fuelTypeName) }}
                />
                <Text className="text-text-primary font-medium flex-1" numberOfLines={1}>
                  {fuel.fuelTypeName}
                </Text>
              </View>

              <View className="flex-row items-center">
                {status === "low" && (
                  <View className="bg-success/20 px-2 py-1 rounded-lg mr-2">
                    <Ionicons name="trending-down" size={14} color="#22C55E" />
                  </View>
                )}
                {status === "high" && (
                  <View className="bg-accent-red/20 px-2 py-1 rounded-lg mr-2">
                    <Ionicons name="trending-up" size={14} color="#A82001" />
                  </View>
                )}
                <Text
                  className="text-xl font-bold"
                  style={{ color: getPriceColor(fuel.fuelTypeName) }}
                >
                  {fuel.price.toFixed(3)}€
                </Text>
              </View>
            </View>

            {fuel.averagePrice && (
              <View className="flex-row items-center mt-2 ml-6">
                <Text className="text-text-muted text-sm">
                  Media nacional: {fuel.averagePrice.toFixed(3)}€
                </Text>
                <Text
                  className={`ml-2 text-sm font-semibold ${
                    status === "low" ? "text-success" : status === "high" ? "text-accent-red" : "text-text-muted"
                  }`}
                >
                  {status === "low" && "▼ Más barato"}
                  {status === "high" && "▲ Más caro"}
                </Text>
              </View>
            )}
          </View>
        );
      })}
    </View>
  );
};
