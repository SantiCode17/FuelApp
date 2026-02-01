import React, { useState, useCallback } from "react";
import { View, FlatList, TextInput, Text, RefreshControl } from "react-native";
import { useRouter, useLocalSearchParams, Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useMunicipalities } from "../../../../../../presentation/hooks";
import { MunicipalityCard } from "../../../../../../components/fuel";
import { Loader, ErrorView, EmptyView } from "../../../../../../components/shared";

export default function MunicipalitiesScreen() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const { provinceId, provinceName } = useLocalSearchParams<{
    provinceId: string;
    provinceName: string;
  }>();

  const {
    data: municipalities,
    isLoading,
    isError,
    refetch,
  } = useMunicipalities(parseInt(provinceId || "0"));

  const filteredMunicipalities = municipalities?.filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase())
  );

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch]);

  if (isLoading && !refreshing) {
    return <Loader fullScreen />;
  }

  if (isError) {
    return <ErrorView message="Error al cargar los municipios" onRetry={refetch} />;
  }

  if (!municipalities || municipalities.length === 0) {
    return (
      <EmptyView
        title="Sin municipios"
        message="No se encontraron municipios en esta provincia"
      />
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: provinceName || "Municipios" }} />
      <View className="flex-1 bg-background">
        <View className="px-4 pt-4 pb-2">
          <View className="flex-row items-center bg-surface rounded-2xl px-4 py-3 border border-border">
            <Ionicons name="search" size={20} color="#71717A" />
            <TextInput
              value={search}
              onChangeText={setSearch}
              placeholder="Buscar municipio..."
              placeholderTextColor="#71717A"
              className="flex-1 ml-3 text-text-primary text-base"
            />
            {search.length > 0 && (
              <Ionicons
                name="close-circle"
                size={20}
                color="#71717A"
                onPress={() => setSearch("")}
              />
            )}
          </View>
          <Text className="text-text-muted text-sm mt-3 ml-1">
            {filteredMunicipalities?.length || 0} municipios encontrados
          </Text>
        </View>

        <FlatList
          data={filteredMunicipalities}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, index }) => (
            <MunicipalityCard
              municipality={item}
              index={index}
              onPress={() =>
                router.push({
                  pathname: "/stations/list/[municipalityId]",
                  params: { municipalityId: item.id, municipalityName: item.name },
                })
              }
            />
          )}
          contentContainerStyle={{ paddingVertical: 8, paddingBottom: 20 }}
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
