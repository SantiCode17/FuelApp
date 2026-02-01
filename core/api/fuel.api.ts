import axios from "axios";

const API_BASE_URL = "https://api.precioil.es";

export const fuelApi = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para logs de desarrollo
fuelApi.interceptors.request.use(
  (config) => {
    const params = config.params ? `?${new URLSearchParams(config.params).toString()}` : '';
    console.log(`[API] ${config.method?.toUpperCase()} ${config.url}${params}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

fuelApi.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // No loguear 404 del endpoint /estaciones/radio ya que es un comportamiento esperado
    // cuando no hay estaciones en el radio (ubicación fuera de España, etc.)
    const is404NoStations = error.response?.status === 404 && 
                            error.config?.url?.includes('/estaciones/radio');
    
    if (!is404NoStations) {
      const fullUrl = error.config?.url + (error.config?.params ? `?${new URLSearchParams(error.config.params).toString()}` : '');
      console.error("[API Error]", error.message, "URL:", fullUrl);
    }
    return Promise.reject(error);
  }
);

export default fuelApi;
