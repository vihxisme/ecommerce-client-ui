import * as ProvinceService from './ProvinceService';
import * as DistrictService from './DistrictService';
import * as WardService from './WardService';

export const AddressService = {
  fetchProvinces: ProvinceService.fetchProvinces,
  searchProvince: ProvinceService.searchProvince,
  fetchDistricts: DistrictService.fetchDistricts,
  searchDistrict: DistrictService.searchDistrict,
  fetchWards: WardService.fetchWards,
  searchWard: WardService.searchWard
}