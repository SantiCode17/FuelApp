import {
  StationResponse,
  Station,
  FuelPrice,
  NearbyStationResponse,
  NearbyStation,
  StationHistoryApiResponse,
  StationHistoryItemResponse,
  StationHistory,
  StationDetailResponse,
  StationDetail,
  PaginatedStationsResponse,
  PaginatedStations,
} from "../interfaces";

enum FuelTypes {
  GASOLINA_95 = 1,
  GASOLINA_98 = 2,
  DIESEL = 3,
  DIESEL_PREMIUM = 4,
  GLP = 5,
  DIESEL_B = 6,
}

const FUEL_TYPE_NAMES: Record<number, string> = {
  [FuelTypes.GASOLINA_95]: "Gasolina 95",
  [FuelTypes.GASOLINA_98]: "Gasolina 98",
  [FuelTypes.DIESEL]: "Diésel",
  [FuelTypes.DIESEL_PREMIUM]: "Diésel Premium",
  [FuelTypes.GLP]: "GLP",
  [FuelTypes.DIESEL_B]: "Diésel B",
};

const API_FUEL_TYPE_MAP: Record<number, { id: number; name: string }> = {
  6: { id: FuelTypes.GASOLINA_95, name: FUEL_TYPE_NAMES[FuelTypes.GASOLINA_95] },
  8: { id: FuelTypes.GASOLINA_98, name: FUEL_TYPE_NAMES[FuelTypes.GASOLINA_98] },
  10: { id: FuelTypes.DIESEL, name: FUEL_TYPE_NAMES[FuelTypes.DIESEL] },
  13: { id: FuelTypes.DIESEL_PREMIUM, name: FUEL_TYPE_NAMES[FuelTypes.DIESEL_PREMIUM] },
  5: { id: FuelTypes.GLP, name: FUEL_TYPE_NAMES[FuelTypes.GLP] },
  11: { id: FuelTypes.DIESEL_B, name: FUEL_TYPE_NAMES[FuelTypes.DIESEL_B] },
};

const parsePrice = (value: number | string | null | undefined): number | undefined => {
  if (value === null || value === undefined) return undefined;
  const num = typeof value === 'number' ? value : parseFloat(value);
  return isNaN(num) ? undefined : num;
};

export class FuelPriceMapper {
  static extractFuelPrices(response: StationResponse): FuelPrice[] {
    const prices: FuelPrice[] = [];

    const g95 = parsePrice(response.Gasolina95);
    if (g95 !== undefined) {
      prices.push({
        fuelTypeId: FuelTypes.GASOLINA_95,
        fuelTypeName: FUEL_TYPE_NAMES[FuelTypes.GASOLINA_95],
        price: g95,
        averagePrice: parsePrice(response.Gasolina95_media),
      });
    }

    const g98 = parsePrice(response.Gasolina98);
    if (g98 !== undefined) {
      prices.push({
        fuelTypeId: FuelTypes.GASOLINA_98,
        fuelTypeName: FUEL_TYPE_NAMES[FuelTypes.GASOLINA_98],
        price: g98,
        averagePrice: parsePrice(response.Gasolina98_media),
      });
    }

    const diesel = parsePrice(response.Diesel);
    if (diesel !== undefined) {
      prices.push({
        fuelTypeId: FuelTypes.DIESEL,
        fuelTypeName: FUEL_TYPE_NAMES[FuelTypes.DIESEL],
        price: diesel,
        averagePrice: parsePrice(response.Diesel_media),
      });
    }

    const dieselPremium = parsePrice(response.DieselPremium);
    if (dieselPremium !== undefined) {
      prices.push({
        fuelTypeId: FuelTypes.DIESEL_PREMIUM,
        fuelTypeName: FUEL_TYPE_NAMES[FuelTypes.DIESEL_PREMIUM],
        price: dieselPremium,
        averagePrice: parsePrice(response.DieselPremium_media),
      });
    }

    const glp = parsePrice(response.GLP);
    if (glp !== undefined) {
      prices.push({
        fuelTypeId: FuelTypes.GLP,
        fuelTypeName: FUEL_TYPE_NAMES[FuelTypes.GLP],
        price: glp,
        averagePrice: parsePrice(response.GLP_media),
      });
    }

    const dieselB = parsePrice(response.DieselB);
    if (dieselB !== undefined) {
      prices.push({
        fuelTypeId: FuelTypes.DIESEL_B,
        fuelTypeName: FUEL_TYPE_NAMES[FuelTypes.DIESEL_B],
        price: dieselB,
        averagePrice: parsePrice(response.DieselB_media),
      });
    }

    return prices;
  }
}

export class StationMapper {
  static fromResponse(response: StationResponse): Station {
    const lat = typeof response.latitud === 'number' ? response.latitud : parseFloat(response.latitud);
    const lon = typeof response.longitud === 'number' ? response.longitud : parseFloat(response.longitud);
    
    return {
      id: response.idEstacion,
      name: response.nombreEstacion,
      address: response.direccion,
      postalCode: String(response.codPostal),
      latitude: lat,
      longitude: lon,
      municipalityId: response.idMunicipio || 0,
      locality: response.nombreMunicipio || response.localidad,
      provinceName: response.provinciaDistrito || response.provincia,
      schedule: response.horario,
      brand: response.marca,
      lastUpdate: response.lastUpdate,
      fuelPrices: FuelPriceMapper.extractFuelPrices(response),
    };
  }

  static fromResponseList(responses: StationResponse[]): Station[] {
    return responses.map(StationMapper.fromResponse);
  }

  static fromDetailResponse(response: StationDetailResponse): StationDetail {
    return {
      ...StationMapper.fromResponse(response),
      provinceId: response.idProvincia,
    };
  }

  static fromNearbyResponse(response: NearbyStationResponse): NearbyStation {
    return {
      ...StationMapper.fromResponse(response),
      distance: response.distancia,
    };
  }

  static fromNearbyResponseList(responses: NearbyStationResponse[]): NearbyStation[] {
    return responses.map(StationMapper.fromNearbyResponse);
  }

  static fromHistoryApiResponse(apiResponse: StationHistoryApiResponse): StationHistory[] {
    if (!apiResponse || !apiResponse.data || !Array.isArray(apiResponse.data)) {
      return [];
    }

    const groupedByTimestamp: Map<string, { stationId: number; date: string; prices: FuelPrice[] }> = new Map();

    for (const item of apiResponse.data) {
      const date = item.timestamp.split("T")[0];
      const key = `${item.idEstacion}-${date}`;
      
      if (!groupedByTimestamp.has(key)) {
        groupedByTimestamp.set(key, {
          stationId: item.idEstacion,
          date,
          prices: [],
        });
      }

      const fuelInfo = API_FUEL_TYPE_MAP[item.idFuelType];
      if (fuelInfo) {
        const price = parsePrice(item.precio);
        if (price !== undefined) {
          groupedByTimestamp.get(key)!.prices.push({
            fuelTypeId: fuelInfo.id,
            fuelTypeName: fuelInfo.name,
            price,
          });
        }
      }
    }

    return Array.from(groupedByTimestamp.values()).map(entry => ({
      stationId: entry.stationId,
      date: entry.date,
      fuelPrices: entry.prices,
    }));
  }

  static fromPaginatedResponse(response: PaginatedStationsResponse): PaginatedStations {
    return {
      data: StationMapper.fromResponseList(response.data || []),
      total: response.total,
      page: response.page,
      limit: response.limit,
      totalPages: response.totalPages,
    };
  }
}
