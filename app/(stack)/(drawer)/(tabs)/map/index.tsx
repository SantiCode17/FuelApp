import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, Dimensions } from "react-native";
import { useRouter } from "expo-router";
import MapView, { Marker } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import { useLocation, useStationsByRadius } from "../../../../../presentation/hooks";
import { RadiusSelector, StationCard } from "../../../../../components/fuel";
import { Loader, ErrorView, Button } from "../../../../../components/shared";

const { height } = Dimensions.get("window");

export default function MapScreen() {
  const router = useRouter();
  const [radius, setRadius] = useState(10);
  const [showList, setShowList] = useState(false);

  const {
    permissionStatus,
    userLocation,
    isLocationLoading,
    locationError,
    initializeLocation,
    clearLocationError,
  } = useLocation();

  const {
    data: stations = [],
    isLoading: isLoadingStations,
    isError: isErrorStations,
    refetch,
  } = useStationsByRadius(
    userLocation?.latitude || null,
    userLocation?.longitude || null,
    radius
  );

  useEffect(() => {
    initializeLocation();
  }, []);

  if (isLocationLoading) {
    return (
      <View className="flex-1 bg-background items-center justify-center">
        <Loader />
        <Text className="mt-4 text-text-secondary">Obteniendo ubicación...</Text>
      </View>
    );
  }

  if (permissionStatus !== "granted") {
    return (
      <View className="flex-1 bg-background items-center justify-center px-8">
        <View className="w-24 h-24 rounded-full bg-amarillo-400/10 items-center justify-center mb-6">
          <Ionicons name="location" size={48} color="#FCE902" />
        </View>
        <Text className="text-2xl font-bold text-text-primary text-center mb-2">
          Permisos de ubicación
        </Text>
        <Text className="text-text-secondary text-center text-base mb-8">
          Necesitamos acceso a tu ubicación para mostrarte las estaciones cercanas
        </Text>
        <Button title="Permitir acceso" onPress={initializeLocation} fullWidth />
      </View>
    );
  }

  if (locationError) {
    return (
      <ErrorView
        message={locationError}
        onRetry={() => {
          clearLocationError();
          initializeLocation();
        }}
      />
    );
  }

  if (!userLocation) {
    return (
      <View className="flex-1 bg-background items-center justify-center px-8">
        <View className="w-24 h-24 rounded-full bg-surface items-center justify-center mb-6">
          <Ionicons name="navigate" size={48} color="#71717A" />
        </View>
        <Text className="text-xl font-bold text-text-primary text-center mb-2">
          Ubicación no disponible
        </Text>
        <View className="mt-6 w-full">
          <Button title="Reintentar" onPress={initializeLocation} fullWidth />
        </View>
      </View>
    );
  }

  if (showList) {
    return (
      <View className="flex-1 bg-background">
        <ScrollView 
          className="flex-1" 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          <View className="p-4">
            <RadiusSelector radius={radius} onRadiusChange={setRadius} />
          </View>

          <View className="flex-row mx-4 mb-4 bg-surface rounded-2xl p-1 border border-border">
            <TouchableOpacity
              onPress={() => setShowList(false)}
              className="flex-1 py-3 rounded-xl items-center flex-row justify-center"
              activeOpacity={0.7}
            >
              <Ionicons name="map" size={18} color="#71717A" />
              <Text className="ml-2 font-bold" style={{color: "#71717A"}}>
                Mapa
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setShowList(true)}
              className="flex-1 py-3 rounded-xl items-center flex-row justify-center bg-amarillo-400"
              activeOpacity={0.7}
            >
              <Ionicons name="list" size={18} color="#010005" />
              <Text className="ml-2 font-bold" style={{color: "#010005"}}>
                Lista ({stations.length})
              </Text>
            </TouchableOpacity>
          </View>

          {isLoadingStations && stations.length === 0 ? (
            <Loader />
          ) : isErrorStations ? (
            <View className="py-12 items-center">
              <Text className="text-text-secondary text-center">Error al cargar estaciones</Text>
            </View>
          ) : stations.length === 0 ? (
            <View className="py-12 items-center">
              <Ionicons name="car-outline" size={48} color="#71717A" />
              <Text className="text-text-secondary text-center mt-4">
                No hay estaciones en este radio
              </Text>
            </View>
          ) : (
            stations.map((item, index) => (
              <StationCard
                key={item.id}
                station={item}
                showDistance={true}
                index={index}
                onPress={() =>
                  router.push({
                    pathname: "/station/[id]",
                    params: { id: item.id },
                  })
                }
              />
            ))
          )}
        </ScrollView>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-background">
      <View className="p-4">
        <RadiusSelector radius={radius} onRadiusChange={setRadius} />
      </View>

      <View className="flex-row mx-4 mb-4 bg-surface rounded-2xl p-1 border border-border">
        <TouchableOpacity
          onPress={() => setShowList(false)}
          className="flex-1 py-3 rounded-xl items-center flex-row justify-center bg-amarillo-400"
          activeOpacity={0.7}
        >
          <Ionicons name="map" size={18} color="#010005" />
          <Text className="ml-2 font-bold" style={{color: "#010005"}}>
            Mapa
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setShowList(true)}
          className="flex-1 py-3 rounded-xl items-center flex-row justify-center"
          activeOpacity={0.7}
        >
          <Ionicons name="list" size={18} color="#71717A" />
          <Text className="ml-2 font-bold" style={{color: "#71717A"}}>
            Lista ({stations.length})
          </Text>
        </TouchableOpacity>
      </View>

      {isLoadingStations && stations.length === 0 ? (
        <Loader />
      ) : isErrorStations ? (
        <ErrorView message="Error al cargar estaciones" onRetry={() => refetch()} />
      ) : (
        <View className="flex-1 mx-4 mb-4 rounded-3xl overflow-hidden border border-border">
          <MapView
            style={{ flex: 1 }}
            initialRegion={{
              latitude: userLocation.latitude,
              longitude: userLocation.longitude,
              latitudeDelta: radius / 50,
              longitudeDelta: radius / 50,
            }}
            showsUserLocation
            showsMyLocationButton
          >
            {stations.map((station) => (
              <Marker
                key={station.id}
                coordinate={{
                  latitude: station.latitude,
                  longitude: station.longitude,
                }}
                title={station.name}
                description={station.address}
                onCalloutPress={() =>
                  router.push({
                    pathname: "/station/[id]",
                    params: { id: station.id },
                  })
                }
              >
                <View className="p-2 rounded-full shadow-lg" style={{backgroundColor: '#FCE902'}}>
                  <Ionicons name="flash" size={16} color="#010005" />
                </View>
              </Marker>
            ))}
          </MapView>

          <View className="absolute top-4 right-4 bg-surface px-4 py-2 rounded-xl border border-border">
            <Text className="text-amarillo-400 font-bold">
              {stations.length} estaciones
            </Text>
          </View>
        </View>
      )}
    </View>
  );
}
