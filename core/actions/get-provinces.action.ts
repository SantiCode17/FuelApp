import { fuelApi } from "../api";
import { ProvinceResponse, Province } from "../../infrastructure/interfaces";
import { ProvinceMapper } from "../../infrastructure/mappers";

export const getProvinces = async (): Promise<Province[]> => {
  try {
    const { data } = await fuelApi.get<ProvinceResponse[]>("/provincias");
    return ProvinceMapper.fromResponseList(data);
  } catch (error) {
    console.error("Error fetching provinces:", error);
    throw error;
  }
};
