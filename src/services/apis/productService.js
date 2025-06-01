import http from "../http";

export const getPromoProduct = (request) => {
  return http.get("/product/v1/products/only-discount", {
    params: {
      page: request.page,
      size: request.size,
    }
  });
}

export const getAllProduct = (request) => {
  return http.get("v1/products/info/all", {
    params: {
      page: request.page,
      size: request.size
    }
  });
}

export const getNewProducts = (request) => {
  return http.get("/product/v1/products/new", {
    params: {
      page: request.page,
      size: request.size
    }
  });
}

export const getProdByCategory = (categorieId, requestPage) => {
  return http.get("/product/v1/products/by-categorie", {
    params: {
      categorieId: categorieId,
      page: requestPage.page,
      size: requestPage.size
    }
  });
}

export const getProdByCateApparelType = (apparelType, request) => {
  return http.get("/product/v1/products/apparel-type", {
    params: {
      apparelType: apparelType,
      page: request.page,
      size: request.size
    }
  });
}

export const getProductDetails = (id) => {
  return http.get("/product/v1/products/detail-info", {
    params: {
      id: id
    }
  });
}

export const getAll = (request) => {
  return http.get(`/product/v1/products/info/all`, {
    params: {
      page: request.page,
      size: request.size
    }
  });
}

export const getTopProductsByRevenue = (request) => {
  return http.get(`/product/v1/products/top-product/with-discount`, {
    params: {
      limit: request.limit,
    }
  });
}
