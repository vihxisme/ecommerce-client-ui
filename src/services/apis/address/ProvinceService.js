import http from "./http";
import { array, mask } from "superstruct";
import { ProvinceSchema } from "@/structs";

export async function fetchProvinces() {
  const rdata = await http.get(`p/`).json()
  return mask(rdata, array(ProvinceSchema))
}

export async function searchProvince(term) {
  const response = await http.get(`p/search/`, {
    searchParams: { q: `+${term.replace(/\s+/g, ' +')}` } // markRequireAll function logic
  }).json()
  // const maskers = mask(response, array(ProvinceSchema));
  // console.log("Province: ", maskers);
  return mask(response, array(ProvinceSchema))
}