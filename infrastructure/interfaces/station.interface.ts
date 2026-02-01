export interface StationResponse {
  idEstacion: number;
  nombreEstacion: string;
  direccion: string;
  codPostal: string | number;
  latitud: number | string;
  longitud: number | string;
  idMunicipio?: number;
  nombreMunicipio?: string;
  localidad?: string;
  provincia?: string;
  provinciaDistrito?: string;
  horario?: string;
  marca?: string;
  margen?: string;
  tipoVenta?: string;
  lastUpdate?: string;
  Gasolina95?: number | null;
  Gasolina95_media?: number | null;
  Gasolina98?: number | null;
  Gasolina98_media?: number | null;
  Diesel?: number | null;
  Diesel_media?: number | null;
  DieselPremium?: number | null;
  DieselPremium_media?: number | null;
  DieselB?: number | null;
  DieselB_media?: number | null;
  GLP?: number | null;
  GLP_media?: number | null;
}

export interface StationDetailResponse extends StationResponse {
  idProvincia?: number;
}

export interface StationHistoryItemResponse {
  idPrecio: number;
  idEstacion: number;
  idFuelType: number;
  precio: string;
  timestamp: string;
}

export interface StationHistoryApiResponse {
  title: string;
  estacionId: string;
  periodo: {
    inicio: string;
    fin: string;
  };
  cantidadResultados: number;
  data: StationHistoryItemResponse[];
}

export interface NearbyStationResponse extends StationResponse {
  distancia: number;
}

export interface FuelPrice {
  fuelTypeId: number;
  fuelTypeName: string;
  price: number;
  averagePrice?: number;
}

export interface Station {
  id: number;
  name: string;
  address: string;
  postalCode: string;
  latitude: number;
  longitude: number;
  municipalityId: number;
  locality?: string;
  provinceName?: string;
  schedule?: string;
  brand?: string;
  lastUpdate?: string;
  fuelPrices: FuelPrice[];
}

export interface StationDetail extends Station {
  provinceId?: number;
}

export interface NearbyStation extends Station {
  distance: number;
}

export interface StationHistory {
  stationId: number;
  date: string;
  fuelPrices: FuelPrice[];
}

export interface PaginatedStationsResponse {
  data: StationResponse[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface PaginatedStations {
  data: Station[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
