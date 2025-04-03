<template>
  <v-container class="p-0" :class="{ 'v-container--fluid': xsAndDown, 'v-container': smAndUp }">
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
          <v-form>
            <!-- Họ và tên -->
            <v-text-field v-model="name" label="Họ và tên" class="op:v-text-field" outlined required></v-text-field>

            <div class="flex-mnw-768 gap-4">
              <!-- Họ và tên -->
              <v-text-field v-model="email" label="Email" type="email" outlined required
                class="basic-3/5 op:v-text-field"></v-text-field>

              <!-- Số điện thoại -->
              <v-text-field v-model="tel" label="Số điện thoại" type="tel" outlined required
                class="basic-2/5 op:v-text-field"></v-text-field>
            </div>

            <!-- Địa chỉ -->
            <v-text-field v-model="address" label="Địa chỉ" class="op:v-text-field" outlined required></v-text-field>

            <div class="flex-mnw-768 gap-4">
              <!-- Tỉnh / Thành -->
              <v-select v-model="selectedProvince" :items="filteredProvinces" class="op:v-text-field"
                label="Tỉnh / Thành" outlined @focus="startSearchingProvince" item-title="name" return-object>
              </v-select>

              <!-- Quận / Huyện -->
              <v-select v-model="selectedDistrict" :items="filteredDistricts" class="bop:v-text-field"
                label="Quận / Huyện" outlined @focus="startSearchingDistrict" item-title="name" return-object>
              </v-select>

              <!-- Phường / Xã -->
              <v-select v-model="selectedWard" :items="filteredWards" class="op:v-text-field" label="Phường / Xã"
                outlined @focus="startSearchingWard" item-title="name" return-object>
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
            <v-alert v-if="selectedDistrict.code === -1" type="warning" border="left" color="yellow-lighten-4"
              icon="mdi-alert">
              Vui lòng chọn quận/huyện trước
            </v-alert>
            <v-alert v-else-if="selectedDistrict.code !== -1" type="info" border="left" color="blue-lighten-4"
              icon="mdi-map-marker">
              FreeShip
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
                    <v-icon color="success" size="2rem">{{ item.icon }}</v-icon>
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
              <span class="text-red-500 font-bold">0₫</span>
            </div>
          </v-card-text>
          <v-card-text class="w-full border-t text-base flex justify-between items-center px-4">
            <h4 class="text-left capitalize font-semibold">Tổng tiền:</h4>
            <span class="text-red-500 font-bold">{{ formatPrice(totalPrice) }}₫</span>
          </v-card-text>
        </v-card>

        <!-- Button đặt hàng -->
        <v-btn block color="success" class="my-8">Đặt hàng</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted, watch, defineProps, defineEmits, computed, watchEffect } from 'vue';
import { useDisplay } from 'vuetify/lib/framework.mjs';
import { useCartStore } from '@/stores/useCartStore';
import { useCartSelectionStore } from '@/stores/useCartSelectionStore';
import { getCloudinaryUrl } from '@/utils/cloudinary';
import { AddressService } from '@/services/apis/address';
import image_error from '@/assets/images/e-commerce/404/image_error.png';

const { xsAndDown, smAndUp } = useDisplay();
const cartStore = useCartStore();
const cartSelectionStore = useCartSelectionStore();
const cartSelectedKey = ref([]);
const cartItems = ref([]);

onMounted(() => {
  cartSelectedKey.value = cartSelectionStore.getSelectedKeys;
  cartItems.value = cartSelectedKey.value
    .map(key => cartStore.getCartItemByKey(key))
    .filter(item => item !== null);

  console.log("Checkout: ", cartItems.value);
})

const selectedPaymentMethod = ref('cod');
const paymentMethod = ref([
  {
    value: "cod",
    title: "Thanh toán khi giao hàng (COD)",
    icon: "mdi-package-variant-closed"
  },
  {
    value: "bank_transfer",
    title: "Chuyển khoản ngân hàng",
    icon: "mdi-bank-transfer"
  }
]);

const totalPrice = computed(() => {
  return cartItems.value
    .reduce((total, item) => total + item.finalPrice * item.quantity, 0);
});

// Định dạng giá
const formatPrice = (price) => price.toLocaleString("vi-VN");

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
const wardDefault = ref({ name: "Chọn đường/xã/phố/phường", code: -1 });
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
})

watch(selectedDistrict, (nValue) => {
  filteredWards.value = [wardDefault.value];
  selectedWard.value = filteredWards.value[0];
  if (nValue.code !== -1) {
    startSearchingWard();
  }
})

// form data
const name = ref();
const email = ref();
const tel = ref();
const note = ref();
const address = ref();
// 📝 Cập nhật địa chỉ tự động khi người dùng nhập hoặc chọn tỉnh/quận/xã
// const fullAddress = computed(() => {
//   const parts = [address.value];

//   if (selectedWard.value.code !== -1) parts.push(selectedWard.value.name);
//   if (selectedDistrict.value.code !== -1) parts.push(selectedDistrict.value.name);
//   if (selectedProvince.value.code !== -1) parts.push(selectedProvince.value.name);

//   return parts.filter(Boolean).join(', '); // Loại bỏ phần trống
// });
// 📌 Theo dõi sự thay đổi của tỉnh/quận/xã để cập nhật lại địa chỉ
// watch([selectedProvince, selectedDistrict, selectedWard], () => {
//   address.value = fullAddress.value;
// });
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