import React from "react";
import { View, Text, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StationHistory } from "../../infrastructure/interfaces";

interface PriceHistoryProps {
  history: StationHistory[];
}

const getPriceColor = (fuelTypeName: string): string => {
  const name = fuelTypeName.toLowerCase();
  if (name.includes("95")) return "#FCE902";
  if (name.includes("98")) return "#F59002";
  if (name.includes("diesel") || name.includes("diésel")) return "#22C55E";
  return "#A1A1AA";
};

export const PriceHistory: React.FC<PriceHistoryProps> = ({ history }) => {
  if (!history || history.length === 0) {
    return (
      <View className="bg-surface rounded-3xl p-6 border border-border">
        <Text className="text-text-secondary text-center">
          No hay historial disponible
        </Text>
      </View>
    );
  }

  const fuelTypesMap = new Map<number, { name: string; prices: { date: string; price: number }[] }>();

  history.forEach((entry) => {
    entry.fuelPrices.forEach((fuel) => {
      if (!fuelTypesMap.has(fuel.fuelTypeId)) {
        fuelTypesMap.set(fuel.fuelTypeId, { name: fuel.fuelTypeName, prices: [] });
      }
      fuelTypesMap.get(fuel.fuelTypeId)!.prices.push({
        date: entry.date,
        price: fuel.price,
      });
    });
  });

  return (
    <View className="bg-surface rounded-3xl p-5 border border-border">
      <View className="flex-row items-center mb-5">
        <View className="w-10 h-10 rounded-xl bg-naranja-400/10 items-center justify-center mr-3">
          <Ionicons name="analytics" size={20} color="#F59002" />
        </View>
        <View>
          <Text className="text-xl font-bold text-text-primary">
            Historial de precios
          </Text>
          <Text className="text-text-muted text-sm">Últimos 30 días</Text>
        </View>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View>
          <View className="flex-row">
            <View className="w-28 p-3 bg-background-tertiary rounded-tl-xl">
              <Text className="font-bold text-text-primary text-sm">Tipo</Text>
            </View>
            {history.slice(0, 7).map((entry, index) => (
              <View
                key={index}
                className={`w-20 p-3 bg-background-tertiary items-center ${
                  index === history.slice(0, 7).length - 1 ? "rounded-tr-xl" : ""
                }`}
              >
                <Text className="text-xs text-text-secondary font-medium">
                  {new Date(entry.date).toLocaleDateString("es-ES", {
                    day: "2-digit",
                    month: "2-digit",
                  })}
                </Text>
              </View>
            ))}
          </View>

          {Array.from(fuelTypesMap.entries()).map(([fuelTypeId, data], rowIndex) => {
            const isLast = rowIndex === fuelTypesMap.size - 1;
            return (
              <View
                key={fuelTypeId}
                className={`flex-row ${!isLast ? "border-b border-border" : ""}`}
              >
                <View className={`w-28 p-3 justify-center ${isLast ? "rounded-bl-xl" : ""}`}>
                  <Text
                    className="text-sm font-semibold"
                    numberOfLines={2}
                    style={{ color: getPriceColor(data.name) }}
                  >
                    {data.name}
                  </Text>
                </View>
                {data.prices.slice(0, 7).map((priceData, index) => {
                  const prevPrice = index > 0 ? data.prices[index - 1]?.price : null;
                  const trend = prevPrice ? priceData.price - prevPrice : 0;

                  return (
                    <View
                      key={index}
                      className={`w-20 p-3 items-center justify-center ${
                        isLast && index === data.prices.slice(0, 7).length - 1 ? "rounded-br-xl" : ""
                      }`}
                    >
                      <Text className="text-sm font-bold text-text-primary">
                        {priceData.price.toFixed(3)}
                      </Text>
                      {trend !== 0 && (
                        <View className="flex-row items-center mt-1">
                          <Ionicons
                            name={trend > 0 ? "caret-up" : "caret-down"}
                            size={10}
                            color={trend > 0 ? "#A82001" : "#22C55E"}
                          />
                        </View>
                      )}
                    </View>
                  );
                })}
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};
