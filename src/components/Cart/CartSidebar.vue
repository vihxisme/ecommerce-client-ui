<template>
  <v-navigation-drawer v-model="localCart" @update:model-value="handleClose" :width="drawerWidth"
    class="h-screen fixed top-0 bottom-0 shadow-lg"
    :class="{ 'slide-in-left': !localCart, 'slide-in-right': localCart }" location="end" :temporary="true" scrim>

    <v-card class="h-screen flex flex-col">
      <v-toolbar flat class="px-2 shadow-md">
        <v-toolbar-title class="text-left">{{ cartTitle }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-icon class="hover:text-red-500 mx-2" @click="handleClose">mdi-close</v-icon>
      </v-toolbar>

      <div v-if="cartItems.length !== 0" class="flex-1 w-full p-2 scroll-y">
        <v-list>
          <v-list-item v-for="(item, index) in cartItems" :key="index" class="shadow-md border rounded-lg mb-2">
            <v-checkbox v-model="item.selected" :width="30" style="padding: 0; margin: 0; height: 40px;" color="success"
              class="absolute top--1/2r left-0 cs:v-checkbox" ripple>
            </v-checkbox>

            <v-icon class="absolute cursor-pointer top-1/4r right-1/4r hover:text-red-500">mdi-delete-outline</v-icon>

            <v-card-text class="mt-8 p-0 m-0">
              <div class="flex justify-between">
                <div style="flex: 20%">
                  <v-img :src="item.image" :width="80" height="100"></v-img>
                </div>
                <div style="flex: 80%" class="text-left p-2">
                  <h4 class="text-sm">{{ item.name }} - {{ item.code }}</h4>
                  <span class="text-xxs font-semibold text-gray-500">{{ item.color }}</span>
                  <span class="text-xxs font-semibold text-gray-500 mx-2">|</span>
                  <span class="text-xxs font-semibold text-gray-500">{{ item.size }}</span>
                </div>
              </div>

              <div class="w-8/10 my-2 px-2 mr-0 ml-auto flex justify-between cs:sm-block">
                <div class="text-sm">
                  <v-icon class="border cursor-pointer hover:bg-gray-200 p-2"
                    @click="decreaseQuantity(index)">mdi-minus</v-icon>
                  <span class="mx-2">{{ item.quantity }}</span>
                  <v-icon class="border cursor-pointer hover:bg-gray-200 p-2"
                    @click="increaseQuantity(index)">mdi-plus</v-icon>
                </div>
                <div class="text-sm">
                  <span class="text-red-600 font-bold mr-2">{{ formatPrice(item.price) }}₫</span>
                  <span v-if="item.price" class="text-gray-400 ml-2 line-through">
                    {{ formatPrice(item.price) }}₫
                  </span>
                </div>
              </div>
            </v-card-text>
          </v-list-item>
        </v-list>
      </div>

      <div v-if="cartItems.length === 0" class="flex-1 w-full p-2 font-lobster">
        <V-img :src="emptyCart" class="p-8"></V-img>
        <v-card-text>
          <div class="w-full text-center">Chưa có sản phẩm nào trong giỏ hàng...😃🐷🐸</div>
          <!-- <div class="my-4 px-4">
            <router-link to="/cart" class="underline hover:text-red-500 text-left">
              <span>Xem chi tiết giỏ hàng</span>
              <v-icon size="1.5rem">mdi-chevron-triple-right</v-icon>
            </router-link>
          </div> -->
        </v-card-text>
      </div>

      <div v-if="cartItems.length !== 0" class="w-full bg-white px-4 py-4 border-t font-lobster">
        <v-card-text class="w-full mt-2 text-base flex justify-between items-center p-0">
          <h4 class="text-left capitalize font-semibold">Tổng tiền:</h4>
          <span class="font-semibold text-red-500">{{ formatPrice(totalPrice) }}₫</span>
        </v-card-text>
        <v-btn class="bg-red-500 my-2 w-full text-white font-bold rounded-md" flat>Thanh toán</v-btn>
        <!-- <router-link to="/cart" class="mb-2 block underline hover:text-red-500 text-left">
          <span>Xem chi tiết giỏ hàng</span>
          <v-icon size="1.5rem">mdi-chevron-triple-right</v-icon>
        </router-link> -->
      </div>
    </v-card>
  </v-navigation-drawer>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits, computed } from "vue";
import { useDisplay } from "vuetify/lib/framework.mjs";

import emptyCart from "@/assets/images/e-commerce/cart/empty-cart-pAeBGkae.svg";
import insta1 from "@/assets/images/e-commerce/home/insta1.jpg";

const { xs, sm, mdAndUp } = useDisplay();

const drawerWidth = computed(() => {
  if (xs.value) return 300; // Kích thước nhỏ
  if (sm.value) return 500; // Kích thước vừa
  if (mdAndUp.value) return 500; // Kích thước lớn
  return 500; // Giá trị mặc định
});

const props = defineProps({
  isCart: {
    type: Boolean,
    required: true
  }
});

// const cartItems = ref([]);

const cartItems = ref([
  {
    image: insta1,
    code: "EDB30436464",
    name: "ÁO NỈ HỌA TIẾT IN LOGO GLORY FWTW012",
    color: "Xanh đá đậm",
    size: "S",
    quantity: 4,
    price: 450000,
    selected: false,
  },
  {
    image: insta1,
    code: "EDB30436464",
    name: "ÁO KHOÁC NỈ VẢI HIỆU ỨNG ĐÁP LOGO HORSE CAO SU FWCS004",
    color: "Nâu nhạt",
    size: "S",
    quantity: 1,
    price: 549000,
    selected: false,
  },
  {
    image: insta1,
    code: "EDB30436464",
    name: "ÁO KHOÁC NỈ VẢI HIỆU ỨNG ĐÁP LOGO HORSE CAO SU FWCS004",
    color: "Nâu nhạt",
    size: "S",
    quantity: 1,
    price: 549000,
    selected: false,
  },
  {
    image: insta1,
    code: "EDB30436464",
    name: "ÁO KHOÁC NỈ VẢI HIỆU ỨNG ĐÁP LOGO HORSE CAO SU FWCS004",
    color: "Nâu nhạt",
    size: "S",
    quantity: 1,
    price: 549000,
    selected: false,
  },
  {
    image: insta1,
    code: "EDB30436464",
    name: "ÁO KHOÁC NỈ VẢI HIỆU ỨNG ĐÁP LOGO HORSE CAO SU FWCS004",
    color: "Nâu nhạt",
    size: "S",
    quantity: 1,
    price: 549000,
    selected: false,
  },
  {
    image: insta1,
    code: "EDB30436464",
    name: "ÁO KHOÁC NỈ VẢI HIỆU ỨNG ĐÁP LOGO HORSE CAO SU FWCS004",
    color: "Nâu nhạt",
    size: "S",
    quantity: 1,
    price: 549000,
    selected: false,
  },
  {
    image: insta1,
    code: "EDB30436464",
    name: "ÁO KHOÁC NỈ VẢI HIỆU ỨNG ĐÁP LOGO HORSE CAO SU FWCS004",
    color: "Nâu nhạt",
    size: "S",
    quantity: 1,
    price: 549000,
    selected: false,
  },
  {
    image: insta1,
    code: "EDB30436464",
    name: "ÁO KHOÁC NỈ VẢI HIỆU ỨNG ĐÁP LOGO HORSE CAO SU FWCS004",
    color: "Nâu nhạt",
    size: "S",
    quantity: 1,
    price: 549000,
    selected: false,
  },
  {
    image: insta1,
    code: "EDB30436464",
    name: "ÁO KHOÁC NỈ VẢI HIỆU ỨNG ĐÁP LOGO HORSE CAO SU FWCS004",
    color: "Nâu nhạt",
    size: "S",
    quantity: 1,
    price: 549000,
    selected: false,
  },
  {
    image: insta1,
    code: "EDB30436464",
    name: "ÁO KHOÁC NỈ VẢI HIỆU ỨNG ĐÁP LOGO HORSE CAO SU FWCS004",
    color: "Nâu nhạt",
    size: "S",
    quantity: 1,
    price: 549000,
    selected: false,
  },
]);

const totalPrice = computed(() => {
  return cartItems.value
    .filter((item) => item.selected)
    .reduce((total, item) => total + item.price * item.quantity, 0);
});

const emit = defineEmits(["update:isCart"]);

const localCart = ref(false);


// Đồng bộ `localDialog` với prop `dialog` qua watch
watch(() => props.isCart, (newVal) => {
  localCart.value = newVal;
});

// Emit sự kiện để báo với cha khi filter đóng
const handleClose = () => {
  localCart.value = false;
  emit('update:isCart', false); // Báo với component cha là modal đã đóng
};


const cartTitle = ref("Giỏ hàng");


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
</script>

<style lang="scss" scoped>
.slide-in-left {
  animation: slideInLeft 0.5s ease-in-out;

  @keyframes slideInLeft {
    0% {
      transform: translateX(0);
    }

    100% {
      transform: translateX(100%);
    }
  }
}

.slide-in-right {
  animation: slideInRight 0.5s ease-in-out;

  @keyframes slideInRight {
    0% {
      transform: translateX(100%);
    }

    100% {
      transform: translateX(0);
    }
  }
}

.scroll-y {
  overflow-y: auto;

  /* Tùy chỉnh thanh cuộn */
  &::-webkit-scrollbar {
    position: fixed !important;
    width: 1px;
    right: 0 !important;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }
}

.cs\:v-checkbox {
  ::v-deep(.v-checkbox.v-selection-control) {
    min-height: 40px;
  }
}

.cs\:sm-block {
  @media (max-width: 600px) {
    display: block;
    width: 70%;
    text-align: left;
    padding-left: 0.5rem;
  }
}
</style>