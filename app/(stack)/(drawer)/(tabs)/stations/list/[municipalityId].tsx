import React, { useState, useCallback } from "react";
import { View, FlatList, Text, RefreshControl } from "react-native";
import { useRouter, useLocalSearchParams, Stack } from "expo-router";
import { useStationsByMunicipality } from "../../../../../../presentation/hooks";
import { StationCard } from "../../../../../../components/fuel";
import { Loader, ErrorView, EmptyView } from "../../../../../../components/shared";

export default function StationsListScreen() {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const { municipalityId, municipalityName } = useLocalSearchParams<{
    municipalityId: string;
    municipalityName: string;
  }>();

  const {
    data: stations,
    isLoading,
    isError,
    refetch,
  } = useStationsByMunicipality(parseInt(municipalityId || "0"));

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch]);

  if (isLoading && !refreshing) {
    return <Loader fullScreen />;
  }

  if (isError) {
    return <ErrorView message="Error al cargar las estaciones" onRetry={refetch} />;
  }

  if (!stations || stations.length === 0) {
    return (
      <EmptyView
        title="Sin estaciones"
        message="No se encontraron estaciones en este municipio"
        icon="car-outline"
      />
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: municipalityName || "Estaciones" }} />
      <View className="flex-1 bg-background">
        <View className="px-5 pt-4 pb-2">
          <Text className="text-text-muted text-sm">
            {stations.length} {stations.length === 1 ? "estación disponible" : "estaciones disponibles"}
          </Text>
        </View>

        <FlatList
          data={stations}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, index }) => (
            <StationCard
              station={item}
              index={index}
              onPress={() =>
                router.push({
                  pathname: "/station/[id]",
                  params: { id: item.id },
                })
              }
            />
          )}
          contentContainerStyle={{ paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor="#FCE902"
              colors={["#FCE902"]}
            />
          }
        />
      </View>
    </>
  );
}
