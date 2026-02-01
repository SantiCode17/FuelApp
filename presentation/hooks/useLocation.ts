import { useEffect } from "react";
import { useLocationStore } from "../store";

export const useLocation = () => {
  const {
    permissionStatus,
    isPermissionLoading,
    userLocation,
    isLocationLoading,
    locationError,
    checkPermission,
    requestPermission,
    getUserLocation,
    clearLocationError,
  } = useLocationStore();

  useEffect(() => {
    checkPermission();
  }, []);

  const initializeLocation = async () => {
    const granted = await requestPermission();
    if (granted) {
      await getUserLocation();
    }
  };

  return {
    permissionStatus,
    isPermissionLoading,
    userLocation,
    isLocationLoading,
    locationError,
    requestPermission,
    getUserLocation,
    initializeLocation,
    clearLocationError,
  };
};
