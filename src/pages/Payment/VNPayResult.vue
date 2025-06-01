<template>
  <v-app class="bg-gradient-purple-pink-to-b">
    <v-container
      class="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-blue-500 to-blue-700 p-6">
      <v-card class="w-1/2 rounded-2xl shadow-lg p-4 bg-black">
        <v-card-title class="flex flex-col items-center">
          <v-icon size="64" color="success">mdi-check-circle</v-icon>
          <h2 class="text-2xl font-bold mt-2">Giao dịch thành công</h2>
        </v-card-title>

        <v-divider class="my-4"></v-divider>

        <v-card-text class="space-y-2 text-sm text-gray-300">
          <v-card-text class="flex justify-between py-2"><span>Giá trị giao dịch:</span> <span class="font-semibold">{{
            vnpData.amount.toLocaleString() }} đ</span></v-card-text>
          <v-card-text class="flex justify-between py-2"><span>Ngân hàng:</span> <span>{{ vnpData.bankCode
              }}</span></v-card-text>
          <v-card-text class="flex justify-between py-2"><span>Mã giao dịch:</span> <span>{{ vnpData.transactionNo
              }}</span></v-card-text>
          <v-card-text class="flex justify-between py-2"><span>Phương thức:</span> <span>{{ vnpData.cardType
              }}</span></v-card-text>
          <v-card-text class="flex justify-between py-2"><span>Thông tin giao dịch:</span> <span>{{ vnpData.orderInfo
              }}</span></v-card-text>
          <v-card-text class="flex justify-between py-2"><span>Thời gian thanh toán:</span> <span>{{
            formatDate(vnpData.payDate)
              }}</span></v-card-text>
        </v-card-text>

        <v-divider class="my-4"></v-divider>

        <div class="flex justify-between text-lg font-bold text-gray-300">
          <span>Giá trị thanh toán</span>
          <span class="text-green-400">{{ vnpData.amount.toLocaleString() }}đ</span>
        </div>

        <div class="mt-6 text-center text-gray-400 text-sm">
          Chuyển đến trang chủ sau <span class="font-semibold">{{ countdown }}</span>s
        </div>
      </v-card>
    </v-container>
  </v-app>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const countdown = ref(15)
const router = useRouter()


const queryParams = new URLSearchParams(window.location.search);

const vnpData = {
  amount: Number(queryParams.get('vnp_Amount')) / 100,
  bankCode: queryParams.get('vnp_BankCode'),
  bankTranNo: queryParams.get('vnp_BankTranNo'),
  cardType: queryParams.get('vnp_CardType'),
  orderInfo: queryParams.get('vnp_OrderInfo'),
  payDate: queryParams.get('vnp_PayDate'),
  responseCode: queryParams.get('vnp_ResponseCode'),
  tmnCode: queryParams.get('vnp_TmnCode'),
  transactionNo: queryParams.get('vnp_TransactionNo'),
  transactionStatus: queryParams.get('vnp_TransactionStatus'),
  txnRef: queryParams.get('vnp_TxnRef'),
};

function formatDate(vnpPayDate) {
  if (!vnpPayDate) return "";

  const year = vnpPayDate.slice(0, 4);
  const month = vnpPayDate.slice(4, 6);
  const day = vnpPayDate.slice(6, 8);
  const hour = vnpPayDate.slice(8, 10);
  const minute = vnpPayDate.slice(10, 12);
  const second = vnpPayDate.slice(12, 14);

  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}


// onMounted(() => {
//   const timer = setInterval(() => {
//     countdown.value--
//     if (countdown.value <= 0) {
//       clearInterval(timer)
//       router.push('/') // điều hướng về trang chủ hoặc trang nào đó
//     }
//   }, 1000)
// })
</script>

<style scoped></style>
