import http from "./http";
import { mask } from "superstruct";
import { ProvinceSchema } from "@/structs";

export async function fetchDistricts(provinceCode) {
  const rdata = await http.get(`p/${provinceCode}`, { searchParams: { depth: 2 } }).json()
  const province = mask(rdata, ProvinceSchema)
  return province.districts
}

export async function searchDistrict(term, provinceCode) {
  const response = await http.get(`d/search/`, {
    searchParams: { q: `+${term.replace(/\s+/g, ' +')}`, p: provinceCode }
  }).json()
  return mask(response, array(DistrictShema))
}