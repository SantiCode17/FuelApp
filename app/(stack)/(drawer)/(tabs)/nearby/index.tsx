import React, { useState } from "react";
import { View, Text, TextInput, FlatList, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useProvinces, useMunicipalities, useStationsByMunicipality } from "../../../../../presentation/hooks";
import { Loader, EmptyView } from "../../../../../components/shared";
import { Province, Municipality } from "../../../../../infrastructure/interfaces";

export default function NearbyIndexScreen() {
  const router = useRouter();
  const [selectedProvince, setSelectedProvince] = useState<Province | null>(null);
  const [selectedMunicipality, setSelectedMunicipality] = useState<Municipality | null>(null);
  const [selectedRadius, setSelectedRadius] = useState(10);
  const [showProvinces, setShowProvinces] = useState(false);
  const [showMunicipalities, setShowMunicipalities] = useState(false);
  const [searchProvince, setSearchProvince] = useState("");
  const [searchMunicipality, setSearchMunicipality] = useState("");

  const radiusOptions = [5, 10, 15, 20, 30, 50];

  const { data: provinces, isLoading: isLoadingProvinces } = useProvinces();
  const { data: municipalities, isLoading: isLoadingMunicipalities } = useMunicipalities(
    selectedProvince?.id || 0
  );
  const { data: stations, isLoading: isLoadingStations } = useStationsByMunicipality(
    selectedMunicipality?.id || 0
  );

  const filteredProvinces = provinces?.filter((p) =>
    p.name.toLowerCase().includes(searchProvince.toLowerCase())
  );

  const filteredMunicipalities = municipalities?.filter((m) =>
    m.name.toLowerCase().includes(searchMunicipality.toLowerCase())
  );

  // Componente para el header del selector de provincia
  const ProvinceHeader = () => (
    <View className="p-4">
      <View className="mb-4">
        <Text className="text-text-primary font-bold mb-3 text-base">Provincia</Text>
        <TouchableOpacity
          onPress={() => {
            setShowProvinces(!showProvinces);
            setShowMunicipalities(false);
          }}
          className="bg-surface border border-border rounded-2xl p-4 flex-row items-center justify-between active:bg-surface-light"
          activeOpacity={0.7}
        >
          <Text className={selectedProvince ? "text-text-primary" : "text-text-muted"}>
            {selectedProvince?.name || "Selecciona una provincia"}
          </Text>
          <View className="w-8 h-8 rounded-full bg-surface-light items-center justify-center">
            <Ionicons
              name={showProvinces ? "chevron-up" : "chevron-down"}
              size={16}
              color="#A1A1AA"
            />
          </View>
        </TouchableOpacity>

        {showProvinces && (
          <View className="bg-surface border border-border rounded-2xl mt-2 overflow-hidden">
            <View className="flex-row items-center px-4 py-3 border-b border-border">
              <Ionicons name="search" size={18} color="#71717A" />
              <TextInput
                placeholder="Buscar provincia..."
                placeholderTextColor="#71717A"
                value={searchProvince}
                onChangeText={setSearchProvince}
                className="flex-1 ml-3 text-text-primary"
              />
            </View>
            {isLoadingProvinces ? (
              <Loader size="small" />
            ) : filteredProvinces && filteredProvinces.length > 0 ? (
              <FlatList
                scrollEnabled={false}
                nestedScrollEnabled={false}
                data={filteredProvinces}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedProvince(item);
                      setSelectedMunicipality(null);
                      setShowProvinces(false);
                      setSearchProvince("");
                    }}
                    className="p-4 border-b border-border active:bg-surface-light"
                  >
                    <Text className="text-text-primary">{item.name}</Text>
                  </TouchableOpacity>
                )}
              />
            ) : (
              <View className="p-4">
                <Text className="text-text-muted text-center">Sin resultados</Text>
              </View>
            )}
          </View>
        )}
      </View>
    </View>
  );

  // Componente para el selector de municipio
  const MunicipalityHeader = () => (
    selectedProvince && (
      <View className="px-4 pb-4">
        <Text className="text-text-primary font-bold mb-3 text-base">Municipio</Text>
        <TouchableOpacity
          onPress={() => {
            setShowMunicipalities(!showMunicipalities);
            setShowProvinces(false);
          }}
          className="bg-surface border border-border rounded-2xl p-4 flex-row items-center justify-between active:bg-surface-light"
          activeOpacity={0.7}
        >
          <Text className={selectedMunicipality ? "text-text-primary" : "text-text-muted"}>
            {selectedMunicipality?.name || "Selecciona un municipio"}
          </Text>
          <View className="w-8 h-8 rounded-full bg-surface-light items-center justify-center">
            <Ionicons
              name={showMunicipalities ? "chevron-up" : "chevron-down"}
              size={16}
              color="#A1A1AA"
            />
          </View>
        </TouchableOpacity>

        {showMunicipalities && (
          <View className="bg-surface border border-border rounded-2xl mt-2 overflow-hidden">
            <View className="flex-row items-center px-4 py-3 border-b border-border">
              <Ionicons name="search" size={18} color="#71717A" />
              <TextInput
                placeholder="Buscar municipio..."
                placeholderTextColor="#71717A"
                value={searchMunicipality}
                onChangeText={setSearchMunicipality}
                className="flex-1 ml-3 text-text-primary"
              />
            </View>
            {isLoadingMunicipalities ? (
              <Loader size="small" />
            ) : filteredMunicipalities && filteredMunicipalities.length > 0 ? (
              <FlatList
                scrollEnabled={false}
                nestedScrollEnabled={false}
                data={filteredMunicipalities}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedMunicipality(item);
                      setShowMunicipalities(false);
                      setSearchMunicipality("");
                    }}
                    className="p-4 border-b border-border active:bg-surface-light"
                  >
                    <Text className="text-text-primary">{item.name}</Text>
                  </TouchableOpacity>
                )}
              />
            ) : (
              <View className="p-4">
                <Text className="text-text-muted text-center">Sin resultados</Text>
              </View>
            )}
          </View>
        )}
      </View>
    )
  );

  // Componente para el selector de radio
  const RadiusHeader = () => (
    selectedMunicipality && (
      <View className="px-4 pb-4">
        <Text className="text-text-primary font-bold mb-3 text-base">Radio de búsqueda</Text>
        <View className="flex-row flex-wrap gap-2">
          {radiusOptions.map((km) => (
            <TouchableOpacity
              key={km}
              onPress={() => setSelectedRadius(km)}
              className={`px-2.5 py-3 rounded-2xl border-2 items-center ${
                selectedRadius === km
                  ? "border-amarillo-400"
                  : "border-transparent bg-surface"
              }`}
              style={selectedRadius === km ? {backgroundColor: 'rgba(252, 233, 2, 0.15)'} : undefined}
              activeOpacity={0.7}
            >
              <Text
                className={`font-bold ${
                  selectedRadius === km ? "text-amarillo-400" : "text-text-secondary"
                }`}
              >
                {km} km
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    )
  );

  // Usar solo FlatList sin ScrollView
  const renderHeader = () => (
    <View>
      <ProvinceHeader />
      <MunicipalityHeader />
      <RadiusHeader />
      {selectedMunicipality && (
        <View className="px-4 py-3 mx-4 bg-surface rounded-xl border border-border mb-2">
          <Text className="text-text-secondary">
            Estaciones en <Text className="text-amarillo-400 font-bold">{selectedMunicipality.name}</Text>
          </Text>
        </View>
      )}
    </View>
  );

  if (!selectedMunicipality) {
    return (
      <View className="flex-1 bg-background">
        <FlatList
          data={[]}
          renderItem={null}
          ListHeaderComponent={renderHeader}
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  }

  if (isLoadingStations) {
    return (
      <View className="flex-1 bg-background">
        <FlatList
          data={[]}
          renderItem={null}
          ListHeaderComponent={renderHeader}
          ListFooterComponent={<Loader />}
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  }

  if (!stations || stations.length === 0) {
    return (
      <View className="flex-1 bg-background">
        <FlatList
          data={[]}
          renderItem={null}
          ListHeaderComponent={renderHeader}
          ListFooterComponent={
            <EmptyView
              title="Sin estaciones"
              message="No hay estaciones en este municipio"
              icon="car-outline"
            />
          }
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-background">
      <FlatList
        data={stations}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: "/nearby/[stationId]",
                params: { stationId: item.id, stationName: item.name, radius: selectedRadius },
              })
            }
            className="bg-surface my-1.5 mx-4 p-4 rounded-2xl flex-row items-center border border-border active:border-amarillo-400"
            activeOpacity={0.7}
          >
            <View className="w-12 h-12 rounded-xl bg-naranja-400/10 items-center justify-center">
              <Ionicons name="flash" size={22} color="#F59002" />
            </View>
            <View className="flex-1 ml-4">
              <Text className="text-text-primary font-semibold" numberOfLines={1}>
                {item.name}
              </Text>
              <Text className="text-text-muted text-sm mt-1" numberOfLines={1}>
                {item.address}
              </Text>
            </View>
            <View className="px-3 py-2 rounded-xl" style={{backgroundColor: '#FCE902'}}>
              <Text className="text-xs font-bold" style={{color: '#010005'}}>{selectedRadius} km</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
