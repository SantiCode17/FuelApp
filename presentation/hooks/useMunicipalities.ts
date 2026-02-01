import { useQuery } from "@tanstack/react-query";
import { getMunicipalitiesByProvince } from "../../core/actions";

export const useMunicipalities = (provinceId: number) => {
  return useQuery({
    queryKey: ["municipalities", provinceId],
    queryFn: () => getMunicipalitiesByProvince(provinceId),
    enabled: provinceId > 0,
    staleTime: 1000 * 60 * 60, // 1 hora
  });
};
