import http from "../http";

export const submitOrder = (request) => {
  return http.post("/order/v1/order/submit-order", {
    orderRequest: {
      userId: request.variable_1.userId,
      totalAmount: request.variable_1.totalAmount,
      shippingFee: request.variable_1.shippingFee,
    },
    orderItemRequests: [
      ...request.variable_2.map(item => ({
        productId: item.productId,
        prodVariantId: item.prodVariantId,
        quantity: item.quantity,
        price: item.price,
        totalPrice: item.totalPrice,
      }))
    ],
    shippingAddressRequest: {
      name: request.variable_3.name,
      email: request.variable_3.email,
      phone: request.variable_3.phone,
      address: request.variable_3.address,
      ward: request.variable_3.ward,
      district: request.variable_3.district,
      province: request.variable_3.province,
      fullAddress: request.variable_3.fullAddress,
      note: request.variable_3.note,
    },
    paymentMethod: request.paymentMethod
  });
}