import React, { useMemo } from "react";
import { View, ScrollView, Text, TouchableOpacity, Linking } from "react-native";
import { useLocalSearchParams, Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useStationDetails, useStationHistory } from "../../../presentation/hooks";
import { PriceList, PriceHistory } from "../../../components/fuel";
import { Loader, ErrorView } from "../../../components/shared";

export default function StationDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const stationId = parseInt(id || "0");

  const { startDate, endDate } = useMemo(() => {
    const end = new Date();
    const start = new Date();
    start.setDate(start.getDate() - 30);
    return {
      startDate: start.toISOString().split("T")[0],
      endDate: end.toISOString().split("T")[0],
    };
  }, []);

  const {
    data: station,
    isLoading: isLoadingStation,
    isError: isErrorStation,
    refetch: refetchStation,
  } = useStationDetails(stationId);

  const {
    data: history,
    isLoading: isLoadingHistory,
    isError: isErrorHistory,
  } = useStationHistory(stationId, startDate, endDate);

  const openMaps = () => {
    if (station) {
      const url = `https://www.google.com/maps/dir/?api=1&destination=${station.latitude},${station.longitude}`;
      Linking.openURL(url);
    }
  };

  if (isLoadingStation) {
    return <Loader fullScreen />;
  }

  if (isErrorStation || !station) {
    return <ErrorView message="Error al cargar los detalles" onRetry={refetchStation} />;
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: station.name.length > 20 ? station.name.substring(0, 20) + "..." : station.name,
        }}
      />
      <ScrollView className="flex-1 bg-background" showsVerticalScrollIndicator={false}>
        <View className="p-4">
          <View className="bg-surface rounded-3xl p-5 border border-border mb-4">
            <View className="flex-row items-start mb-4">
              <View className="w-14 h-14 rounded-2xl items-center justify-center" style={{backgroundColor: '#FCE902'}}>
                <Ionicons name="flash" size={28} color="#010005" />
              </View>
              <View className="flex-1 ml-4">
                {station.brand && (
                  <View className="self-start bg-amarillo-400/10 px-3 py-1 rounded-full mb-2">
                    <Text className="text-amarillo-400 text-xs font-bold uppercase tracking-wide">
                      {station.brand}
                    </Text>
                  </View>
                )}
                <Text className="text-xl font-bold text-text-primary">
                  {station.name}
                </Text>
              </View>
            </View>

            <View className="space-y-3">
              <View className="flex-row items-start">
                <View className="w-8 h-8 rounded-lg bg-surface-light items-center justify-center">
                  <Ionicons name="location" size={16} color="#A1A1AA" />
                </View>
                <Text className="text-text-secondary ml-3 flex-1 leading-5">
                  {station.address}
                </Text>
              </View>

              <View className="flex-row items-center mt-3">
                <View className="w-8 h-8 rounded-lg bg-surface-light items-center justify-center">
                  <Ionicons name="mail" size={16} color="#A1A1AA" />
                </View>
                <Text className="text-text-secondary ml-3">CP: {station.postalCode}</Text>
              </View>

              {(station.locality || station.provinceName) && (
                <View className="flex-row items-center mt-3">
                  <View className="w-8 h-8 rounded-lg bg-surface-light items-center justify-center">
                    <Ionicons name="business" size={16} color="#A1A1AA" />
                  </View>
                  <Text className="text-text-secondary ml-3">
                    {[station.locality, station.provinceName].filter(Boolean).join(", ")}
                  </Text>
                </View>
              )}

              {station.schedule && (
                <View className="flex-row items-center mt-3">
                  <View className="w-8 h-8 rounded-lg bg-surface-light items-center justify-center">
                    <Ionicons name="time" size={16} color="#A1A1AA" />
                  </View>
                  <Text className="text-text-secondary ml-3 flex-1">{station.schedule}</Text>
                </View>
              )}
            </View>

            <TouchableOpacity
              onPress={openMaps}
              className="mt-5 py-4 rounded-2xl flex-row items-center justify-center"
              style={{backgroundColor: '#FCE902'}}
              activeOpacity={0.8}
            >
              <Ionicons name="navigate" size={20} color="#010005" />
              <Text className="font-bold ml-2" style={{color: '#010005'}}>Cómo llegar</Text>
            </TouchableOpacity>
          </View>

          <View className="mb-4">
            <PriceList prices={station.fuelPrices} />
          </View>

          <View className="mb-8">
            {isLoadingHistory ? (
              <Loader />
            ) : isErrorHistory ? (
              <View className="bg-surface rounded-3xl p-6 border border-border">
                <Text className="text-text-secondary text-center">
                  No se pudo cargar el historial de precios
                </Text>
              </View>
            ) : (
              <PriceHistory history={history || []} />
            )}
          </View>
        </View>
      </ScrollView>
    </>
  );
}
