import { create } from "zustand";
import * as Location from "expo-location";

interface LocationState {
  // Estado de permisos
  permissionStatus: Location.PermissionStatus | null;
  isPermissionLoading: boolean;
  
  // Ubicación del usuario
  userLocation: {
    latitude: number;
    longitude: number;
  } | null;
  isLocationLoading: boolean;
  locationError: string | null;
  
  // Acciones
  checkPermission: () => Promise<void>;
  requestPermission: () => Promise<boolean>;
  getUserLocation: () => Promise<void>;
  clearLocationError: () => void;
}

export const useLocationStore = create<LocationState>((set, get) => ({
  permissionStatus: null,
  isPermissionLoading: false,
  userLocation: null,
  isLocationLoading: false,
  locationError: null,

  checkPermission: async () => {
    set({ isPermissionLoading: true });
    try {
      const { status } = await Location.getForegroundPermissionsAsync();
      set({ permissionStatus: status, isPermissionLoading: false });
    } catch (error) {
      console.error("Error checking permission:", error);
      set({ isPermissionLoading: false });
    }
  },

  requestPermission: async () => {
    set({ isPermissionLoading: true });
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      set({ permissionStatus: status, isPermissionLoading: false });
      return status === Location.PermissionStatus.GRANTED;
    } catch (error) {
      console.error("Error requesting permission:", error);
      set({ isPermissionLoading: false });
      return false;
    }
  },

  getUserLocation: async () => {
    const { permissionStatus } = get();
    
    if (permissionStatus !== Location.PermissionStatus.GRANTED) {
      set({ locationError: "Permisos de ubicación no concedidos" });
      return;
    }

    set({ isLocationLoading: true, locationError: null });
    
    try {
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      
      console.log("[Location] User location obtained:", {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      
      set({
        userLocation: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        },
        isLocationLoading: false,
      });
    } catch (error) {
      console.error("Error getting location:", error);
      set({
        locationError: "No se pudo obtener la ubicación",
        isLocationLoading: false,
      });
    }
  },

  clearLocationError: () => {
    set({ locationError: null });
  },
}));
