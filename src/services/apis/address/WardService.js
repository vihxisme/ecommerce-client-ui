import http from "./http";
import { mask } from "superstruct";
import { WardSchema, DistrictSchema } from "@/structs";

export async function fetchWards(districtCode) {
  const rdata = await http.get(`d/${districtCode}`, { searchParams: { depth: 2 } }).json()
  const district = mask(rdata, DistrictSchema)
  return district.wards
}

export async function searchWard(term, districtCode) {
  const response = await http.get(`w/search/`, {
    searchParams: { q: `+${term.replace(/\s+/g, ' +')}`, d: districtCode }
  }).json()
  return mask(response, array(WardSchema))
}