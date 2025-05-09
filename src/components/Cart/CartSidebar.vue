<template>
  <v-navigation-drawer v-model="localCart" @update:model-value="handleClose" :width="drawerWidth" app
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
          <v-list-item v-for="item in cartItems" :key="item.key" class="shadow-md border rounded-lg mb-2">
            <v-checkbox v-model="item.selected" :width="30" style="padding: 0; margin: 0; height: 40px;" color="success"
              class="absolute top--1/2r left-0 cs:v-checkbox" ripple>
            </v-checkbox>

            <v-icon class="absolute cursor-pointer top-1/4r right-1/4r hover:text-red-500"
              @click="removeItem(item.key)">mdi-delete-outline</v-icon>

            <v-card-text class="mt-8 p-0 m-0">
              <div class="flex mb-2 justify-between">
                <div style="flex: 20%" class="flex justify-between items-center">
                  <v-img :src="getCloudinaryUrl(item.imageUrl)" :width="80" height="100" :lazy-src="image_error"
                    gradient="to top, rgba(0,0,0,0.2), rgba(0,0,0,0.1)">
                    <template v-slot:placeholder>
                      <v-row class="fill-height" align="center" justify="center">
                        <v-progress-circular indeterminate color="error"></v-progress-circular>
                      </v-row>
                    </template>
                  </v-img>
                </div>
                <div style="flex: 80%" class="relative text-left p-2">
                  <h4 class="text-sm">{{ item.name }} - {{ item.productCode }}</h4>
                  <span class="text-xxs font-semibold text-gray-500">{{ item.colorName }}</span>
                  <span class="text-xxs font-semibold text-gray-500 mx-2">|</span>
                  <span class="text-xxs font-semibold text-gray-500">{{ item.sizeName }}</span>
                  <div class="w-full mt-4 mb-0 flex justify-between">
                    <div class="text-sm">
                      <v-icon class="border cursor-pointer hover:bg-gray-200 p-2"
                        @click="decreaseQuantity(item.key)">mdi-minus</v-icon>
                      <span class="mx-2">{{ item.quantity }}</span>
                      <v-icon class="border cursor-pointer hover:bg-gray-200 p-2"
                        @click="increaseQuantity(item.key)">mdi-plus</v-icon>
                    </div>
                    <div class="text-sm">
                      <span class="text-red-600 font-bold mr-2">{{ formatPrice(item.finalPrice) }}₫</span>
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

      <div v-if="cartItems.length === 0" class="flex-1 w-full p-2 font-lobster">
        <V-img :src="emptyCart" class="p-8"></V-img>
        <v-card-text>
          <div class="w-full text-center">Chưa có sản phẩm nào trong giỏ hàng...😃🐷🐸</div>
        </v-card-text>
      </div>

      <div v-if="cartItems.length !== 0" class="w-full bg-white px-4 py-4 border-t font-lobster">
        <v-card-text class="w-full mt-2 text-base flex justify-between items-center p-0">
          <h4 class="text-left capitalize font-semibold">Tổng tiền:</h4>
          <span class="font-semibold text-red-500">{{ formatPrice(totalPrice) }}₫</span>
        </v-card-text>
        <v-btn class="bg-red-500 my-2 w-full text-white font-bold rounded-md" flat @click="handleClickPay">Thanh
          toán</v-btn>
      </div>
    </v-card>
  </v-navigation-drawer>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits, computed, onMounted } from "vue";
import { useDisplay } from "vuetify/lib/framework.mjs";
import { useRouter } from "vue-router";
import emptyCart from "@/assets/images/e-commerce/cart/empty-cart-pAeBGkae.svg";
import image_error from "@/assets/images/e-commerce/404/image_error.png";
import { getCloudinaryUrl } from "@/utils/cloudinary";
import { useCartStore } from "@/stores/useCartStore";
import { useCartSelectionStore } from "@/stores/useCartSelectionStore";

const { xs, sm, mdAndUp } = useDisplay();
const router = useRouter();

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

const cartSelectionStore = useCartSelectionStore();
const cartStore = useCartStore();
const cartViews = computed(() => cartStore.cartItems);
const cartItems = ref([]);

// Gán dữ liệu ngay khi component mounted
onMounted(() => {
  cartItems.value = cartViews.value.map(item => ({
    ...item,
    selected: false,
  }));
  console.log("cartItems: ", cartItems.value);
});

// Theo dõi sự thay đổi của cartViews và cập nhật cartItems
watch(cartViews, (newCart) => {
  cartItems.value = newCart.map(item => ({
    ...item,
    selected: false,
  }));
}, { deep: true });

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


// Xóa sản phẩm khỏi giỏ hàng
const removeItem = (key) => {
  cartStore.removeFromCart(key);
};

// Giảm số lượng sản phẩm
const decreaseQuantity = (key) => {
  if (cartStore.cart[key] && cartStore.cart[key].quantity > 1) {
    cartStore.cart[key].quantity--;
  }
};

// Tăng số lượng sản phẩm
const increaseQuantity = (key) => {
  if (cartStore.cart[key] && cartStore.cart[key].quantity < cartStore.cart[key].stock) {
    cartStore.cart[key].quantity++;
  }
};

// Định dạng giá
const formatPrice = (price) => price.toLocaleString("vi-VN");

// Hàm handleClick lấy ra các key của sản phẩm có selected = true và chuyển sang trang đặt hàng
const handleClickPay = () => {
  cartSelectionStore.clearSelection();

  const hasUnselected = cartItems.value.some(item => item.selected);
  if (!hasUnselected) {
    return;
  }

  const selectedKey = cartItems.value
    .filter(item => item.selected)
    .map(item => item.key);

  cartSelectionStore.addSelectedKeys(selectedKey);


  router.push("/checkout");
}
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