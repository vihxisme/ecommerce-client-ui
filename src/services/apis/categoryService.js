import http from "../http";

export const getCategory = () => http.get("/product/v1/categorie/info/all");