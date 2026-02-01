import { useQuery } from "@tanstack/react-query";
import {
  getStationsByMunicipality,
  getStationDetails,
  getStationHistory,
  getNearbyStations,
  getStationsByRadius,
} from "../../core/actions";

export const useStationsByMunicipality = (municipalityId: number) => {
  return useQuery({
    queryKey: ["stations", "municipality", municipalityId],
    queryFn: () => getStationsByMunicipality(municipalityId),
    enabled: municipalityId > 0,
    staleTime: 1000 * 60 * 5, // 5 minutos
  });
};

export const useStationDetails = (stationId: number) => {
  return useQuery({
    queryKey: ["station", "details", stationId],
    queryFn: () => getStationDetails(stationId),
    enabled: stationId > 0,
    staleTime: 1000 * 60 * 5, // 5 minutos
  });
};

export const useStationHistory = (
  stationId: number,
  startDate: string,
  endDate: string
) => {
  return useQuery({
    queryKey: ["station", "history", stationId, startDate, endDate],
    queryFn: () => getStationHistory(stationId, startDate, endDate),
    enabled: stationId > 0 && !!startDate && !!endDate,
    staleTime: 1000 * 60 * 30, // 30 minutos
  });
};

export const useNearbyStations = (stationId: number, radius: number = 10) => {
  return useQuery({
    queryKey: ["stations", "nearby", stationId, radius],
    queryFn: () => getNearbyStations(stationId, radius),
    enabled: stationId > 0,
    staleTime: 1000 * 60 * 5, // 5 minutos
  });
};

export const useStationsByRadius = (
  latitude: number | null,
  longitude: number | null,
  radius: number
) => {
  const isValidCoordinates = 
    latitude !== null && 
    longitude !== null && 
    !isNaN(latitude) && 
    !isNaN(longitude) && 
    radius > 0;

  return useQuery({
    queryKey: ["stations", "radius", latitude, longitude, radius],
    queryFn: () => getStationsByRadius(latitude!, longitude!, radius),
    enabled: isValidCoordinates,
    staleTime: 1000 * 60 * 5, // 5 minutos
    retry: false, // Evitar reintentos en caso de error
  });
};
