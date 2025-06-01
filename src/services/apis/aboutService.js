import http from "../http";

export const aboutService = {
  getAllBanner: () => {
    return http.get(`/about/v1/banner/list-all`);
  }
}