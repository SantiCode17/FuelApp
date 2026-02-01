import React, { useState, useCallback } from "react";
import { View, FlatList, TextInput, Text, RefreshControl } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useProvinces } from "../../../../../presentation/hooks";
import { ProvinceCard } from "../../../../../components/fuel";
import { Loader, ErrorView, EmptyView } from "../../../../../components/shared";

export default function ProvincesScreen() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const { data: provinces, isLoading, isError, refetch } = useProvinces();

  const filteredProvinces = provinces?.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
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
    return <ErrorView message="Error al cargar las provincias" onRetry={refetch} />;
  }

  if (!provinces || provinces.length === 0) {
    return <EmptyView title="Sin provincias" message="No se encontraron provincias" />;
  }

  return (
    <View className="flex-1 bg-background">
      <View className="px-4 pt-4 pb-2">
        <View className="flex-row items-center bg-surface rounded-2xl px-4 py-3 border border-border">
          <Ionicons name="search" size={20} color="#71717A" />
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Buscar provincia..."
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
          {filteredProvinces?.length || 0} provincias disponibles
        </Text>
      </View>

      <FlatList
        data={filteredProvinces}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <ProvinceCard
            province={item}
            index={index}
            onPress={() =>
              router.push({
                pathname: "/stations/municipalities/[provinceId]",
                params: { provinceId: item.id, provinceName: item.name },
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
  );
}
