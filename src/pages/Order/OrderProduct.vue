<template>
  <v-container class="p-0" :class="{ 'v-container--fluid': xsAndDown, 'v-container': smAndUp }">
    <v-overlay v-model="isProgeressBar" persistent class="flex items-center justify-center">
      <v-progress-circular indeterminate color="white" />
    </v-overlay>
    <v-snackbar v-model="notiShow" :timeout="5000" location="top right" :color="notiColor">
      {{ notiContent }}
    </v-snackbar>
    <v-card class="shadow-none border-b my-4">
      <v-card-title class="px-8">
        <router-link to="/" class="text-left">
          <h2 class="text-center text-3xl uppercase font-semibold font-pacifico">Bellion</h2>
        </router-link>
      </v-card-title>
    </v-card>

    <!-- Content -->
    <v-row>
      <v-col cols="12" lg="7">
        <div class="flex-1 w-full p-4">
          <v-list>
            <v-card-title>
              <h3 class="text-left font-semibold my-2 capitalize">Danh sách sản phẩm</h3>
            </v-card-title>
            <v-list-item v-for="item in cartItems" :key="item.id" class="border rounded-lg mb-2">
              <v-card-text class="p-0 m-0">
                <div class="flex justify-between gap-4">
                  <div style="flex: 10%" class="flex justify-between items-center">
                    <v-img :src="getCloudinaryUrl(item.imageUrl)" :lazy-src="image_error" aspect-ratio="1" :width="70"
                      class="h-full" gradient="to top, rgba(0,0,0,0.2), rgba(0,0,0,0.1)">
                      <template v-slot:placeholder>
                        <v-row class="fill-height" align="center" justify="center">
                          <v-progress-circular indeterminate color="warning"></v-progress-circular>
                        </v-row>
                      </template>
                    </v-img>
                  </div>
                  <div style="flex: 90%" class="text-left p-2">
                    <h4 class="text-sm">{{ capitalizeWord(item.name) }} - {{ item.productCode
                    }}</h4>
                    <div>
                      <span class="text-xxs font-semibold text-gray-500">{{ item.colorName }}</span>
                      <span class="text-xxs font-semibold text-gray-500 mx-2">|</span>
                      <span class="text-xxs font-semibold text-gray-500">{{ item.sizeName }}</span>
                    </div>
                    <div>
                      <span class="text-xxs font-semibold text-gray-500">×{{ item.quantity }}</span>
                    </div>
                    <div class="flex justify-between cs:sm-block">
                      <div class="text-sm">
                        <span class="text-red-600 font-bold gap-8">{{ formatPrice(item.finalPrice) }}₫</span>
                        <span v-if="item.price" class="text-gray-400 ml-2 line-through">
                          {{ formatPrice(item.price) }}₫
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </v-card-text>
            </v-list-item>
          </v-list>
        </div>

        <!-- Thông tin giao hàng -->
        <v-card class="shadow-none my-2 p-4">
          <v-card-title>
            <h2 class="text-left capitalize font-semibold">Thông tin giao hàng</h2>
          </v-card-title>
          <v-form ref="formRef" v-model="formValid">
            <!-- Họ và tên -->
            <v-text-field v-model="name" label="Họ và tên" class="op:v-text-field"
              :rules="[v => !!v || 'Họ và tên bắt buộc nhập!']" outlined required></v-text-field>

            <div class="flex-mnw-768 gap-4">
              <!-- Họ và tên -->
              <v-text-field v-model="email" label="Email" type="email"
                :rules="[v => !!v && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'Email không hợp lệ']" outlined required
                class="basic-3/5 op:v-text-field"></v-text-field>

              <!-- Số điện thoại -->
              <v-text-field v-model="tel" label="Số điện thoại" type="tel"
                :rules="[v => !!v && /^\+?\d{9,15}$/.test(v) || 'Số điện thoại không hợp lệ']" outlined required
                class="basic-2/5 op:v-text-field"></v-text-field>
            </div>

            <!-- Địa chỉ -->
            <v-text-field v-model="address" label="Địa chỉ" class="op:v-text-field"
              :rules="[v => !!v || 'Địa chỉ bắt buộc nhập!']" outlined required></v-text-field>

            <div class="flex-mnw-768 gap-4">
              <!-- Tỉnh / Thành -->
              <v-select v-model="selectedProvince" :items="filteredProvinces" class="op:v-text-field"
                label="Tỉnh / Thành" outlined @focus="startSearchingProvince" item-title="name"
                :rules="[v => !!v && selectedProvince.code !== -1 || 'Bạn chưa chọn tỉnh/thành phố!']" required
                return-object>
              </v-select>

              <!-- Quận / Huyện -->
              <v-select v-model="selectedDistrict" :items="filteredDistricts" class="bop:v-text-field"
                label="Quận / Huyện" outlined @focus="startSearchingDistrict" item-title="name"
                :rules="[v => !!v && selectedDistrict.code !== -1 || 'Bạn chưa chọn quận/huyện!']" required
                return-object>
              </v-select>

              <!-- Phường / Xã -->
              <v-select v-model="selectedWard" :items="filteredWards" class="op:v-text-field" label="Phường / Xã"
                outlined @focus="startSearchingWard" item-title="name"
                :rules="[v => !!v && selectedWard.code !== -1 || 'Bạn chưa chọn phường/xã!']" required return-object>
              </v-select>
            </div>

            <!-- Ghi chú -->
            <v-textarea v-model="note" label="Ghi chú đơn hàng" outlined></v-textarea>
          </v-form>
        </v-card>
      </v-col>

      <v-col cols="12" lg="5" class="p-8">
        <!-- Phương thức vận chuyển -->
        <v-card class="shadow-none border my-4">
          <v-card-title class="text-left p-4 bg-gray-100">
            <v-icon color="primary" class="mr-2">mdi-package-variant</v-icon>
            Phương thức vận chuyển
          </v-card-title>
          <v-card-text class="my-2">
            <v-alert v-if="selectedProvince.code === -1" type="warning" border="left" color="yellow-lighten-4"
              icon="mdi-alert">
              Vui lòng chọn tỉnh thành phố trước
            </v-alert>
            <v-alert v-else-if="selectedProvince.code !== -1" type="info" border="left" color="blue-lighten-4"
              icon="mdi-map-marker">
              {{ formatPrice(shippingFee) }}₫
            </v-alert>
          </v-card-text>
        </v-card>

        <!-- Phương thức thanh toán -->
        <v-card class="shadow-none border my-4">
          <v-card-title class="text-left p-4 bg-gray-100">
            <v-icon color="success" class="mr-2">mdi-cash</v-icon>
            Phương thức thanh toán
          </v-card-title>
          <v-card-text class="my-4">
            <v-radio-group v-model="selectedPaymentMethod" color="success">
              <v-row align="center" v-for="(item, index) in paymentMethod" :key="index" class="cursor-pointer"
                @click="selectedPaymentMethod = item.value">
                <v-col cols="1">
                  <div class="flex items-center justify-center">
                    <v-radio :value="item.value"></v-radio>
                  </div>
                </v-col>
                <v-col cols="10">
                  <div class="flex items-center gap-4">
                    <v-icon v-if="item.icon" color="success" style="width: 3rem; height: 2rem;">{{ item.icon }}</v-icon>
                    <v-img v-else-if="item.image" :src="item.image" :lazy-src="image_error" class="grow-0" width="3rem"
                      height="2rem">
                    </v-img>
                    <span class="capitalize">{{ item.title }}</span>
                  </div>
                </v-col>
              </v-row>
            </v-radio-group>
          </v-card-text>
        </v-card>

        <!-- Tổng tiền -->
        <v-card class="shadow-none my-4">
          <v-card-title>
            <h2 class="text-left capitalize font-semibold">Chi tiết thanh toán</h2>
          </v-card-title>
          <v-card-text class="w-full border-t px-4">
            <div class="w-full flex justify-between items-center py-2">
              <span class="text-left capitalize font-semibold">Đơn giá:</span>
              <span class="text-red-500 font-bold">{{ formatPrice(totalPrice) }}₫</span>
            </div>
            <div class="w-full flex justify-between items-center py-2">
              <span class="text-left capitalize font-semibold">Phí vận chuyển:</span>
              <span class="text-red-500 font-bold">{{ formatPrice(shippingFee) }}₫</span>
            </div>
          </v-card-text>
          <v-card-text class="w-full border-t text-base flex justify-between items-center px-4">
            <h4 class="text-left capitalize font-semibold">Tổng tiền:</h4>
            <span class="text-red-500 font-bold">{{ formatPrice(totalAmount) }}₫</span>
          </v-card-text>
        </v-card>

        <!-- Button đặt hàng -->
        <v-btn block color="success" class="my-8" @click="() => handleSubmitOrder()">Đặt hàng</v-btn>
      </v-col>
    </v-row>
    <pay-online-modal :dialog="showPaymentModal" />
  </v-container>
</template>

<script setup>
import { ref, onMounted, watch, defineProps, defineEmits, computed, watchEffect, watchPostEffect } from 'vue';
import { useDisplay } from 'vuetify/lib/framework.mjs';
import { useCartStore } from '@/stores/useCartStore';
import { useCartSelectionStore } from '@/stores/useCartSelectionStore';
import { useAuthStore } from '@/stores/useAuthStore';
import { getCloudinaryUrl } from '@/utils/cloudinary';
import { AddressService } from '@/services/apis/address';
import image_error from '@/assets/images/e-commerce/404/image_error.png';
import { submitOrder } from '@/services/apis/orderService';
import { paymentService } from '@/services/apis/paymentService';
import payment_1_img from '@/assets/images/e-commerce/footer/payment_1_img.png';

const { xsAndDown, smAndUp } = useDisplay();
const showPaymentModal = ref(false);
const cartStore = useCartStore();
const cartSelectionStore = useCartSelectionStore();
const authStore = useAuthStore();
const cartSelectedKey = ref([]);
const cartItems = ref([]);
const formRef = ref();
const formValid = ref(false);

onMounted(() => {
  cartSelectedKey.value = cartSelectionStore.getSelectedKeys;
  cartItems.value = cartSelectedKey.value
    .map(key => cartStore.getCartItemByKey(key))
    .filter(item => item !== null);

  console.log("Checkout: ", cartItems.value);
})

const selectedPaymentMethod = ref(null);
const paymentMethod = ref([
  {
    value: "cod",
    title: "Thanh toán khi giao hàng (COD)",
    icon: "mdi-package-variant-closed",
    image: null
  },
  {
    value: "vnpay",
    title: "Thanh toán qua VNPay",
    icon: null,
    image: payment_1_img
  }
]);

// Định dạng giá
const formatPrice = (price) => price.toLocaleString("vi-VN");

const totalPrice = computed(() => {
  return cartItems.value
    .reduce((total, item) => total + item.finalPrice * item.quantity, 0);
});

const capitalizeWord = (sentense) => {
  return sentense.split(" ").map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }).join(" ");
}


// --- SETUP ADDRESS --
const provinceDefault = ref({ name: "Chọn tỉnh/TP", code: -1, districts: [] });
const filteredProvinces = ref([provinceDefault.value]);
const selectedProvince = ref(filteredProvinces.value[0]);
const districtDefault = ref({ name: "Chọn quận/huyện", code: -1, wards: [] });
const filteredDistricts = ref([districtDefault.value]);
const selectedDistrict = ref(filteredDistricts.value[0]);
const wardDefault = ref({ name: "Chọn phường/xã", code: -1 });
const filteredWards = ref([wardDefault.value]);
const selectedWard = ref(filteredWards.value[0]);

const startSearchingProvince = async () => {
  if (filteredProvinces.value.length === 1) {
    const provinces = await AddressService.fetchProvinces();
    filteredProvinces.value = [provinceDefault.value, ...provinces];
  }
}

const startSearchingDistrict = async () => {
  if (filteredDistricts.value.length === 1 && selectedProvince.value.code !== -1) {
    const districts = await AddressService.fetchDistricts(selectedProvince.value.code);
    filteredDistricts.value = [districtDefault.value, ...districts];
  }
}

const startSearchingWard = async () => {
  if (filteredWards.value.length === 1 && selectedDistrict.value.code !== -1) {
    const wards = await AddressService.fetchWards(selectedDistrict.value.code);
    filteredWards.value = [wardDefault.value, ...wards];
  }
}

watch(selectedProvince, (nValue) => {
  filteredDistricts.value = [districtDefault.value];
  selectedDistrict.value = filteredDistricts.value[0];
  if (nValue.code !== -1) {
    startSearchingDistrict();
  }
  shippingFee.value = calculateShippingFee(selectedProvince.value.code, totalPrice.value);
})

watch(selectedDistrict, (nValue) => {
  filteredWards.value = [wardDefault.value];
  selectedWard.value = filteredWards.value[0];
  if (nValue.code !== -1) {
    startSearchingWard();
  }
})

const getPaymentStatus = (status) => {
  switch (status) {
    case 'cod': return 3;
    case 'vnpay': return 4;
    default: return 3;
  }
};

// form data
const name = ref();
const email = ref();
const tel = ref();
const note = ref();
const address = ref();
const shippingFee = computed(() => { return calculateShippingFee(selectedProvince.value.code, totalPrice.value) || 0 });
const shippingAddressRequest = ref();
const orderRequest = ref();
const orderItemRequest = ref();

const getDataFrom = () => {
  shippingAddressRequest.value = {
    name: name.value,
    email: email.value,
    phone: tel.value,
    address: address.value,
    ward: selectedWard.value.code,
    district: selectedDistrict.value.code,
    province: selectedProvince.value.code,
    fullAddress: `${address.value}, ${selectedWard.value.name}, ${selectedDistrict.value.name}, ${selectedProvince.value.name}`,
    note: note.value,
  }
}

const getOrderData = () => {
  orderRequest.value = {
    userId: authStore?.user?.userID || null,
    totalAmount: totalAmount.value,
    shippingFee: shippingFee.value,
  }
}

const getOrderItemData = () => {
  orderItemRequest.value = cartItems.value.map(item => {
    return {
      productId: item.id,
      prodVariantId: item.variantId,
      quantity: item.quantity,
      price: item.finalPrice,
      totalPrice: item.finalPrice * item.quantity,
    }
  })
}

const isProgeressBar = ref(false);
const notiShow = ref(false);
const notiColor = ref();
const notiContent = ref();
const handleSubmitOrder = async () => {
  const { valid } = await formRef.value.validate(); // ✅ Vuetify 3 format
  console.log("valid: ", valid);
  if (!valid) return;
  try {
    isProgeressBar.value = true;
    getDataFrom();
    getOrderData();
    getOrderItemData();
    const request = {
      variable_1: orderRequest.value,
      variable_2: orderItemRequest.value,
      variable_3: shippingAddressRequest.value,
      paymentMethod: getPaymentStatus(selectedPaymentMethod.value),
    };

    const res = await submitOrder(request);
    if (res.status === 200 || res.status === 201) {
      notiColor.value = "success";
      notiContent.value = "Yêu cầu đặt hàng của bạn đã được gửi đi. Đơn hàng của bạn sẽ được xử lý trong thời gian sớm nhất!";
    } else {
      notiColor.value = "error";
      notiContent.value = "Đặt hàng thất bại!";
    }

    notiShow.value = true;
    isProgeressBar.value = false;

    if (selectedPaymentMethod.value === "vnpay") {
      const paymentRequest = {
        orderId: res.data.data.id,
        orderCode: res.data.data.orderCode,
        totalAmount: res.data.data.totalAmount,
      };
      const paymentResponse = await paymentService.createVNPayUrl(paymentRequest);

      if (paymentResponse.status === 200) {
        setTimeout(() => {
          window.location.href = paymentResponse.data.data;
        }, 1000);
      }
    }

    console.log("Log SubmitOrder: ", res.data);
  } catch (error) {
    isProgeressBar.value = false;
    notiColor.value = "error";
    notiContent.value = "Đặt hàng thất bại!";
    notiShow.value = true;
    console.log("OrderProduct: SubmitOrder: API_Error:", error);
  } finally {
    isProgeressBar.value = false;
  }
}

const orderWithCode = async () => {
  try {
    isProgeressBar.value = true;
    getDataFrom();
    getOrderData();
    getOrderItemData();
    const request = {
      variable_1: orderRequest.value,
      variable_2: orderItemRequest.value,
      variable_3: shippingAddressRequest.value
    };

    const res = await submitOrder(request);
    if (res.data.data != null) {
      isProgeressBar.value = false;
      isNoti.value = true;
      isSuccess.value = true;
    } else {
      isProgeressBar.value = false;
      isNoti.value = true;
      isSuccess.value = false;
    }
    console.log("Log SubmitOrder: ", res.data);
  } catch (error) {
    isProgeressBar.value = false;
    isError.value = true;
    console.log("OrderProduct: SubmitOrder: API_Error:", error);
  }
}

const totalAmount = computed(() => { return totalPrice.value + shippingFee.value; });

// check shippingFee
function calculateShippingFee(provinceCode, orderTotal) {
  const FREE_SHIPPING_THRESHOLD = 500000;
  if (orderTotal >= FREE_SHIPPING_THRESHOLD) return 0;

  if (provinceCode === 1 || provinceCode === -1) return 0; // Hà Nội

  const regionCodes = {
    mienBac: [
      2, 4, 6, 8, 10, 11, 12, 14, 15, 17, 19, 20, 22, 24, 25, 26, 27,
      30, 31, 33, 34, 35, 36, 37 // Hà Giang → Ninh Bình
    ],
    bacTrungBo: [38, 40, 42, 44, 45, 46], // Thanh Hóa → Huế
    namTrungBoTayNguyen: [48, 49, 51, 52, 54, 56, 58, 60, 62, 64, 66, 67, 68], // Đà Nẵng → Lâm Đồng
    namBo: [70, 72, 74, 75, 77, 79, 80, 82, 83, 84, 86, 87, 89, 91, 92, 93, 94, 95, 96]
  };

  if (regionCodes.mienBac.includes(provinceCode)) return 19000;
  if (regionCodes.bacTrungBo.includes(provinceCode)) return 24000;
  if (regionCodes.namTrungBoTayNguyen.includes(provinceCode)) return 29000;
  if (regionCodes.namBo.includes(provinceCode)) return 35000;

  // Nếu không rõ => phí mặc định
  return 35000;
}
</script>

<style lang="scss" scoped>
.op\:v-select {

  ::v-deep(.v-field__input) {
    padding: 0;
  }
}

.basic-mw-768 {
  @media (max-width: 768px) {
    flex: 100%;
  }
}

.flex-mnw-768 {
  @media (min-width: 768px) {
    display: flex;
  }
}

.op\:v-text-field {
  ::v-deep(.v-field__input) {
    padding-top: 1.5rem;
    padding-bottom: 0;
  }
}
</style>