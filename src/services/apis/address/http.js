import ky from 'ky'

const BASE_API_URL = 'https://provinces.open-api.vn/api';

const http = ky.create({
  prefixUrl: BASE_API_URL,
})

export default http;