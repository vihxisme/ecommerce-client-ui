import http from "../http";

export const getAddressListByUserId = (userId) => {
  return http.get(`/customer/v1/address/info`, {
    params: {
      customerId: userId
    }
  });
}

export const getProfileByUserId = (userId) => {
  return http.get(`/customer/v1/customer/info`, {
    params: {
      id: userId
    }
  });
}

export const updateProfileById = (request) => {
  return http.patch(`/customer/v1/customer/info/update`, {
    authUserId: request.authUserId,
    firstName: request.firstName,
    lastName: request.lastName,
    dob: request.dob,
    gender: request.gender,
    phone: request.phone,
    avatar: request.avatar,
  });
};

export const createAddress = (request) => {
  return http.post(`/customer/v1/address/create`, {
    customerID: request.customerID,
    name: request.name,
    phone: request.phone,
    address: request.address,
    ward: request.ward,
    district: request.district,
    province: request.province,
    fullAddress: request.fullAddress,
    isDefault: request.isDefault
  });
}

export const updateAddress = (request) => {
  return http.patch(`/customer/v1/address/update`, {
    id: request.id,
    customerID: request.customerID,
    name: request.name,
    phone: request.phone,
    address: request.address,
    ward: request.ward,
    district: request.district,
    province: request.province,
    fullAddress: request.fullAddress,
    isDefault: request.isDefault
  });
}

export const deleteAddress = (id) => {
  return http.delete(`/customer/v1/address/delete/${id}`);
}

export const markAsDefaultAddress = (request) => {
  return http.patch(`/customer/v1/address/update`, {
    id: request.id,
    customerID: request.customerID,
    isDefault: request.isDefault
  });
}
