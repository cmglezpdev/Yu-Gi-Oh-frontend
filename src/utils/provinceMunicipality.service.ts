import { type Province } from "@/types.d";
import { httpClient } from "./axios";


export async function getAllProvinces() {
  try {
    const provinces = await httpClient.get<Province[]>('/province');
    return provinces.data.map(p => ({ id: p.id, name: p.name }));
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getMunicipalities(provinceId: string) {
  try {
    const province = await httpClient.get<Province>(`/province/${provinceId}`);
    return province.data.municipalities.map(m => ({ id: m.id, name: m.name }));
  } catch (error) {
    console.error(error);
    return [];
  }
}
