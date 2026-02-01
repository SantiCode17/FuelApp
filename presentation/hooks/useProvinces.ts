import { useQuery } from "@tanstack/react-query";
import { getProvinces } from "../../core/actions";

export const useProvinces = () => {
  return useQuery({
    queryKey: ["provinces"],
    queryFn: getProvinces,
    staleTime: 1000 * 60 * 60, // 1 hora
  });
};
