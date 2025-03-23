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
            <v-list-item v-for="(item, index) in cartItems" :key="index" class="border rounded-lg mb-2">
              <v-card-text class="p-0 m-0">
                <div class="flex justify-between gap-4">
                  <div style="flex: 10%" class=" flex justify-between items-center">
                    <v-img :src="item.image" :width="70" class="h-full"></v-img>
                  </div>
                  <div style="flex: 90%" class="text-left p-2">
                    <h4 class="text-sm">{{ capitalizeWord(item.name) }} - {{ item.code.toUpperCase()
                    }}</h4>
                    <span class="text-xxs font-semibold text-gray-500">{{ item.color }}</span>
                    <span class="text-xxs font-semibold text-gray-500 mx-2">|</span>
                    <span class="text-xxs font-semibold text-gray-500">{{ item.size }}</span>
                    <div class="my-2 mr-0 ml-auto flex justify-between cs:sm-block">
                      <div class="text-sm">
                        <span class="text-red-600 font-bold mr-2">{{ formatPrice(item.price) }}₫</span>
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
            <v-text-field label="Họ và tên" class="op:v-text-field" outlined required></v-text-field>

            <div class="flex-mnw-768 gap-4">
              <!-- Họ và tên -->
              <v-text-field label="Email" type="email" outlined required
                class="basic-3/5 op:v-text-field"></v-text-field>

              <!-- Số điện thoại -->
              <v-text-field label="Số điện thoại" type="tel" outlined required
                class="basic-2/5 op:v-text-field"></v-text-field>
            </div>

            <!-- Địa chỉ -->
            <v-text-field label="Địa chỉ" class="op:v-text-field" outlined required></v-text-field>

            <div class="flex-mnw-768 gap-4">
              <!-- Tỉnh / Thành -->
              <v-select v-model="provincesOptions" :items="provinces" class="op:v-text-field" label="Tỉnh / Thành"
                outlined></v-select>

              <!-- Quận / Huyện -->
              <v-select v-model="districtsOptions" :items="districts" class="bop:v-text-field" label="Quận / Huyện"
                outlined></v-select>

              <!-- Phường / Xã -->
              <v-select v-model="wardsOptions" :items="wards" class="op:v-text-field" label="Phường / Xã"
                outlined></v-select>
            </div>

            <!-- Ghi chú -->
            <v-textarea label="Ghi chú đơn hàng" outlined></v-textarea>
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
            <v-alert type="info" border="left" color="blue-lighten-4" icon="mdi-map-marker">
              Vui lòng chọn quận / huyện để có danh sách phương thức vận chuyển
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
import { ref, watch, defineProps, defineEmits, computed } from 'vue';
import { useDisplay } from 'vuetify/lib/framework.mjs';

import insta1 from "@/assets/images/e-commerce/home/insta1.jpg";

const { xsAndDown, smAndUp } = useDisplay();

const cartItems = ref([
  {
    image: insta1,
    code: "EDB30436464",
    name: "ÁO KHOÁC NỈ VẢI HIỆU ỨNG ĐÁP LOGO HORSE CAO SU FWCS004",
    color: "Nâu nhạt",
    size: "S",
    quantity: 1,
    price: 549000,
    selected: false,
  }
]);

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
    .reduce((total, item) => total + item.price * item.quantity, 0);
});

// Định dạng giá
const formatPrice = (price) => price.toLocaleString("vi-VN");

const increaseQuantity = (index) => {
  cartItems.value[index].quantity++;
};
const decreaseQuantity = (index) => {
  if (cartItems.value[index].quantity > 1) {
    cartItems.value[index].quantity--;
  }
};

const capitalizeWord = (sentense) => {
  return sentense.split(" ").map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }).join(" ");
}


const provinces = ref(['Hà Nội', 'Hồ Chí Minh', 'Đà Nẵng', 'Thừa Thiên Huế']);
const districts = ref(['Hoàn Kiếm', 'Ba Đình', 'Cầu Giấy', 'Huyện Dương Minh Châu']);
const wards = ref(['Phường 1', 'Phường 2', 'Phường 3', 'Xã Đông Hoàng Long']);

const provincesOptions = ref(provinces.value[0]);
const districtsOptions = ref(districts.value[0]);
const wardsOptions = ref(wards.value[0]);
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