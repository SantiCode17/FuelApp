import { fuelApi } from "../api";
import { MunicipalityResponse, Municipality } from "../../infrastructure/interfaces";
import { MunicipalityMapper } from "../../infrastructure/mappers";

export const getMunicipalitiesByProvince = async (
  provinceId: number
): Promise<Municipality[]> => {
  try {
    const { data } = await fuelApi.get<MunicipalityResponse[]>(
      `/municipios/provincia/${provinceId}`
    );
    return MunicipalityMapper.fromResponseList(data);
  } catch (error) {
    console.error("Error fetching municipalities:", error);
    throw error;
  }
};
