import { fuelApi } from "../api";
import {
  StationResponse,
  Station,
  StationDetailResponse,
  StationDetail,
  StationHistoryApiResponse,
  StationHistory,
  NearbyStationResponse,
  NearbyStation,
} from "../../infrastructure/interfaces";
import { StationMapper } from "../../infrastructure/mappers";

export const getStationsByMunicipality = async (
  municipalityId: number
): Promise<Station[]> => {
  try {
    const { data } = await fuelApi.get<StationResponse[]>(
      `/estaciones/municipio/${municipalityId}`
    );
    return StationMapper.fromResponseList(data);
  } catch (error) {
    console.error("Error fetching stations by municipality:", error);
    throw error;
  }
};

export const getStationDetails = async (
  stationId: number
): Promise<StationDetail> => {
  try {
    const { data } = await fuelApi.get<StationDetailResponse>(
      `/estaciones/detalles/${stationId}`
    );
    return StationMapper.fromDetailResponse(data);
  } catch (error) {
    console.error("Error fetching station details:", error);
    throw error;
  }
};

export const getStationHistory = async (
  stationId: number,
  startDate: string,
  endDate: string
): Promise<StationHistory[]> => {
  try {
    const { data } = await fuelApi.get<StationHistoryApiResponse>(
      `/estaciones/historico/${stationId}`,
      {
        params: {
          fechaInicio: startDate,
          fechaFin: endDate,
        },
      }
    );
    return StationMapper.fromHistoryApiResponse(data);
  } catch (error) {
    console.error("Error fetching station history:", error);
    throw error;
  }
};

export const getNearbyStations = async (
  stationId: number,
  radius: number = 10
): Promise<NearbyStation[]> => {
  try {
    const { data } = await fuelApi.get<NearbyStationResponse[]>(
      `/estaciones/cerca/${stationId}`,
      {
        params: { radio: radius },
      }
    );
    return StationMapper.fromNearbyResponseList(data);
  } catch (error) {
    console.error("Error fetching nearby stations:", error);
    throw error;
  }
};

export const getStationsByRadius = async (
  latitude: number,
  longitude: number,
  radius: number
): Promise<NearbyStation[]> => {
  try {
    // Validar que los parámetros sean números válidos
    if (isNaN(latitude) || isNaN(longitude) || isNaN(radius)) {
      console.warn("Invalid parameters for getStationsByRadius:", { latitude, longitude, radius });
      return [];
    }

    console.log("[getStationsByRadius] Requesting with params:", { latitude, longitude, radius });

    const { data } = await fuelApi.get<NearbyStationResponse[]>(
      `/estaciones/radio`,
      {
        params: {
          latitud: latitude,
          longitud: longitude,
          radio: radius,
        },
      }
    );
    
    console.log("[getStationsByRadius] Response received:", {
      isArray: Array.isArray(data),
      length: Array.isArray(data) ? data.length : 'N/A',
    });

    // La API devuelve directamente un array de estaciones
    const stations = Array.isArray(data) ? data : [];
    return StationMapper.fromNearbyResponseList(stations);
  } catch (error: any) {
    // La API devuelve 404 cuando no hay estaciones en el radio especificado
    // Esto no es un error, simplemente significa que no hay resultados
    if (error?.response?.status === 404) {
      console.log("[getStationsByRadius] No stations found in radius (404)");
      return [];
    }
    console.error("Error fetching stations by radius:", error);
    throw error;
  }
};
