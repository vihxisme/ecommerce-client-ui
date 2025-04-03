import { string, number, array, record, object, size, optional, defaulted, assign } from 'superstruct';

// Định nghĩa schema cho "matches"
const SearchMatches = record(string(), size(array(number()), 2));

// Định nghĩa schema cho Base (bao gồm code, name và matches)
const BaseSchema = object({
  code: number(),
  name: string(),
  matches: optional(SearchMatches)
});

// Định nghĩa schema cho Ward (giống BaseSchema)
const WardSchema = BaseSchema;

// Định nghĩa schema cho District (mở rộng BaseSchema và thêm trường wards)
const DistrictSchema = assign(BaseSchema, object({
  wards: defaulted(array(WardSchema), [])
}));

// Định nghĩa schema cho Province (mở rộng BaseSchema và thêm trường districts)
const ProvinceSchema = assign(BaseSchema, object({
  districts: defaulted(array(DistrictSchema), [])
}));

// Bạn có thể xuất các schema để sử dụng trong các phần khác của ứng dụng
export {
  BaseSchema,
  WardSchema,
  DistrictSchema,
  ProvinceSchema
};
