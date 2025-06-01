import http from "../http";

export const paymentService = {
  createVNPayUrl: (request) => {
    return http.post(`/payment/v1/payment/create-vnpay-url`, {
      orderCode: request.orderCode,
      orderId: request.orderId,
      totalAmount: request.totalAmount,
    })
  },

  createTransactionVnPay: (request) => {
    return http.post(`/payment/v1/vnpay/transaction/create`, {
      vnp_TxnRef: request.vnp_TxnRef,
      vnp_OrderInfo: request.vnp_OrderInfo,
      vnp_ResponseCode: request.vnp_ResponseCode,
      vnp_TransactionNo: request.vnp_BankCode,
      vnp_TransactionStatus: request.vnp_TransactionStatus,
      vnp_Amount: request.vnp_Amount,
      vnp_CardType: request.vnp_CardType,
      vnp_PayDate: request.vnp_PayDate,
      vnp_IpAddr: request.vnp_IpAddr,
    });
  }
};