import React from "react";
import { View, Text, ScrollView, Dimensions } from "react-native";
import { useLocalSearchParams, useRouter, Stack } from "expo-router";
import MapView, { Marker } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import { useNearbyStations, useStationDetails } from "../../../../../presentation/hooks";
import { StationCard } from "../../../../../components/fuel";
import { Loader, ErrorView } from "../../../../../components/shared";

const { height } = Dimensions.get("window");

export default function NearbyStationsScreen() {
  const router = useRouter();
  const { stationId, stationName, radius: radiusParam } = useLocalSearchParams<{
    stationId: string;
    stationName: string;
    radius: string;
  }>();

  const id = parseInt(stationId || "0");
  const radius = parseInt(radiusParam || "10");

  const { data: station, isLoading: isLoadingStation } = useStationDetails(id);
  const {
    data: nearbyStations,
    isLoading: isLoadingNearby,
    isError: isErrorNearby,
    refetch,
  } = useNearbyStations(id, radius);

  if (isLoadingStation || isLoadingNearby) {
    return <Loader fullScreen />;
  }

  if (isErrorNearby) {
    return <ErrorView message="Error al cargar las estaciones cercanas" onRetry={refetch} />;
  }

  const centerLatitude = station?.latitude || 40.416775;
  const centerLongitude = station?.longitude || -3.70379;

  return (
    <>
      <Stack.Screen
        options={{
          title: stationName
            ? stationName.length > 20
              ? stationName.substring(0, 20) + "..."
              : stationName
            : "Estaciones cerca",
        }}
      />
      <ScrollView 
        className="flex-1 bg-background" 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <View style={{ height: height * 0.35 }} className="mx-4 mt-4 rounded-3xl overflow-hidden border border-border">
          <MapView
            style={{ flex: 1 }}
            scrollEnabled={false}
            zoomEnabled={false}
            initialRegion={{
              latitude: centerLatitude,
              longitude: centerLongitude,
              latitudeDelta: radius / 50,
              longitudeDelta: radius / 50,
            }}
          >
            {station && (
              <Marker
                coordinate={{
                  latitude: station.latitude,
                  longitude: station.longitude,
                }}
                title={station.name}
                description="Estación seleccionada"
              >
                <View className="p-3 rounded-full" style={{backgroundColor: '#FCE902'}}>
                  <Ionicons name="flag" size={18} color="#010005" />
                </View>
              </Marker>
            )}

            {nearbyStations?.map((nearbyStation) => (
              <Marker
                key={nearbyStation.id}
                coordinate={{
                  latitude: nearbyStation.latitude,
                  longitude: nearbyStation.longitude,
                }}
                title={nearbyStation.name}
                description={`${nearbyStation.distance.toFixed(1)} km`}
              >
                <View className="p-2 rounded-full" style={{backgroundColor: '#F59002'}}>
                  <Ionicons name="flash" size={14} color="#010005" />
                </View>
              </Marker>
            ))}
          </MapView>

          <View className="absolute top-4 right-4 bg-surface px-4 py-2 rounded-xl border border-border">
            <Text className="text-amarillo-400 font-bold">
              {nearbyStations?.length || 0} cercanas
            </Text>
          </View>
        </View>

        {station && (
          <View className="mx-4 mt-4 bg-surface rounded-2xl p-4 border border-border">
            <View className="flex-row items-center">
              <View className="w-12 h-12 rounded-xl items-center justify-center" style={{backgroundColor: '#FCE902'}}>
                <Ionicons name="flag" size={22} color="#010005" />
              </View>
              <View className="flex-1 ml-4">
                <Text className="text-text-primary font-bold text-base" numberOfLines={1}>
                  {station.name}
                </Text>
                <Text className="text-text-muted text-sm mt-1" numberOfLines={1}>
                  {station.address}
                </Text>
              </View>
            </View>
            <View className="mt-3 pt-3 border-t border-border flex-row items-center">
              <Ionicons name="radio" size={16} color="#F59002" />
              <Text className="text-naranja-400 ml-2 font-semibold">Radio de búsqueda: {radius} km</Text>
            </View>
          </View>
        )}

        <View className="mt-4">
          <View className="px-5 py-3">
            <Text className="text-text-secondary font-semibold">
              Estaciones en el área ({nearbyStations?.length || 0})
            </Text>
          </View>

          {!nearbyStations || nearbyStations.length === 0 ? (
            <View className="py-12 items-center px-8">
              <View className="w-20 h-20 rounded-full bg-surface items-center justify-center mb-4">
                <Ionicons name="car-outline" size={40} color="#71717A" />
              </View>
              <Text className="text-text-primary font-bold text-lg text-center mb-2">
                Sin estaciones cercanas
              </Text>
              <Text className="text-text-secondary text-center">
                No hay otras estaciones en un radio de {radius} km
              </Text>
            </View>
          ) : (
            <View>
              {nearbyStations.map((item, index) => (
                <StationCard
                  key={item.id}
                  station={item}
                  showDistance
                  index={index}
                  onPress={() =>
                    router.push({
                      pathname: "/station/[id]",
                      params: { id: item.id },
                    })
                  }
                />
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </>
  );
}
