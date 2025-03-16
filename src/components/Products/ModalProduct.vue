<template>
  <v-dialog v-model="localDialog" @update:model-value="handleClose" max-width="1000px">
    <v-card class="w-full">
      <v-card-title class="fixed top-0 w-full bg-white flex justify-between items-center shadow-md z-100"
        style="border-radius: 4px;">
        <h3 class="mx-4 text-xl">Thông tin sản phẩm</h3>
        <v-btn icon @click="closeModal" class="shadow-none mp:btn-close">
          <v-icon class="hover:text-red-700">mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <!-- Nội dung modal -->
      <v-row class="w-full p-4 m-0 mt-16 flex justify-center">
        <v-col cols="12" md="6" class="w-full p-4">
          <!-- Hình ảnh sản phẩm -->
          <div class="relative group">
            <swiper @swiper="setMainSwiper" :modules="[Navigation, Thumbs]" :navigation="{
              nextEl: '.custom-next-img',
              prevEl: '.custom-prev-img',
            }" class="main-image-swiper" @slideChange="selectedImage = product.images[$event.realIndex]">
              <swiper-slide v-for="(image, index) in product.images" :key="index">
                <v-img :src="image" aspect-ratio="1" class="rounded-lg" />
              </swiper-slide>
            </swiper>
            <!-- Custom Navigation Buttons -->
            <v-btn icon
              class="custom-prev-img absolute top-40p left-1/2r transform bg-gray-800/50 text-white p-2 rounded-full z-10 transition-all ease-linear">
              <v-icon color="red" size="2rem">mdi-chevron-left</v-icon>
            </v-btn>
            <v-btn icon
              class="custom-next-img absolute top-40p right-1/2r transform bg-gray-800/50 text-white p-2 rounded-full z-10 transition-all ease-linear">
              <v-icon color="red" size="2rem">mdi-chevron-right</v-icon>
            </v-btn>
          </div>

          <!-- Swiper danh sách hình nhỏ -->
          <div class="relative group mt-3">
            <swiper @swiper="setThumbSwiper" :modules="[Navigation, Thumbs]" :slides-per-view="6" :space-between="10"
              :navigation="{
                nextEl: '.custom-next-slide',
                prevEl: '.custom-prev-slide',
              }" watch-slides-progress class="thumbnail-swiper">
              <swiper-slide v-for="(image, index) in product.images" :key="index">
                <v-img :src="image" width="60" height="60"
                  class="cursor-pointer border-2 border-gray-300 rounded-md hover:border-orange-500"
                  :class="{ 'border-orange-500': selectedImage === image }" @click="
                    selectedImage = image;
                  goToSlide(index);
                  " />
              </swiper-slide>
            </swiper>
            <!-- Custom Navigation Buttons -->
            <v-btn min-width="1rem"
              class="custom-prev-slide px-2 absolute left-1/2r top-20p transform bg-gray-800/50 text-white rounded-full z-10 transition-all ease-linear">
              <v-icon color="red" size="1.5rem">mdi-chevron-left</v-icon>
            </v-btn>
            <v-btn min-width="1rem"
              class="custom-next-slide px-2 absolute right-1/2r top-20p transform bg-gray-800/50 text-white rounded-full z-10 transition-all ease-linear">
              <v-icon color="red" size="1.5rem">mdi-chevron-right</v-icon>
            </v-btn>
          </div>
        </v-col>

        <v-col cols="12" md="6" class="w-full px-4 py-2">
          <!-- Thông tin sản phẩm -->
          <v-card-text>
            <h3 class="text-xl font-semibold">{{ product.name }}</h3>
            <p class="text-gray-500">Mã sản phẩm: <strong>{{ product.code }}</strong></p>

            <div class="py-2">
              <span>Tình trạng: Còn hàng</span>
              <span class="mx-4 text-gray-100 opacity-50">|</span>
              <span>Thương hiệu: DIDOT</span>
            </div>

            <div class="bg-gray-100 py-2">
              <span class="text-xl font-semibold mx-4"> Giá: </span>
              <span class="mt-2 text-red-600 font-bold text-lg">{{ formatPrice(product.finalPrice) }}₫</span>
              <span v-if="product.price" class="text-gray-400 text-lg line-through ml-2">
                {{ formatPrice(product.price) }}₫
              </span>
              <span v-if="product.discount" class="bg-red-500 text-white px-2 py-1 text-xs rounded ml-2">
                -{{ product.discount }}%
              </span>
            </div>
          </v-card-text>

          <!-- Màu sắc -->
          <v-card-text>
            <h4 class="text-sm font-semibold">Màu sắc:</h4>
            <div>
              <v-btn v-for="(color, index) in product.colors" :key="index" @click="selectedColor = color"
                class="border border-gray-300 rounded-md mx-2 px-3 py-1 shadow-none"
                :class="{ 'border-blueGray-100 bg-blueGray-100': selectedColor === color }">
                <span class="text-sm capitalize font-normal">{{ color }}</span>
              </v-btn>
            </div>
          </v-card-text>

          <!-- Kích thước -->
          <v-card-text>
            <h4 class="text-xs font-semibold">Kích thước:</h4>
            <div>
              <v-btn v-for="(size, index) in product.sizes" :key="index" @click="selectedSize = size.name"
                class="border border-gray-300 rounded-md mx-2 px-3 py-1 shadow-none"
                :class="{ 'border-blueGray-100 bg-blueGray-100': selectedSize === size.name }"
                :disabled="!size.available">
                <span class="text-xs capitalize font-normal">{{ size.name }}</span>
              </v-btn>
            </div>
          </v-card-text>

          <!-- Số lượng -->
          <v-card-text class="flex items-center">
            <h4 class="text-sm py-4 font-semibold">Số lượng:</h4>
            <v-btn class="mx-2 p-0 border border-gray-300 shadow-none mp:btn-minus" min-width="2rem" height="2rem"
              @click="decreaseQuantity">
              <v-icon>mdi-minus</v-icon>
            </v-btn>
            <span class="text-lg mx-2">{{ quantity }}</span>
            <v-btn class="mx-2 p-0 border border-gray-300 shadow-none mp:btn-plus" min-width="2rem" height="2rem"
              @click="increaseQuantity">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-card-text>

          <!-- Nút Thêm vào giỏ -->
          <v-card-action class="p-4">
            <v-btn class="mt-6 bg-red-500 text-white font-bold py-2 px-16 rounded-md">
              Thêm vào giỏ hàng
            </v-btn>
            <router-link class="py-2 px-8 mt-6 block underline hover:text-red-500">
              <span class="mx-2">Xem chi tiết giỏ hàng</span>
              <v-icon size="1.5rem">mdi-chevron-triple-right</v-icon>
            </router-link>
          </v-card-action>
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits, onMounted } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// Nhận dữ liệu sản phẩm từ props
const props = defineProps({
  dialog: {
    type: Boolean,
    required: true
  },
  product: {
    type: Object,
    required: true
  }
});

import insta1 from "@/assets/images/e-commerce/home/insta1.jpg";
import insta2 from "@/assets/images/e-commerce/home/insta2.jpg";
import insta3 from "@/assets/images/e-commerce/home/insta3.jpg";
import insta4 from "@/assets/images/e-commerce/home/insta4.jpg";
import insta5 from "@/assets/images/e-commerce/home/insta5.jpg";
import insta6 from "@/assets/images/e-commerce/home/insta6.jpg";

const product = {
  name: "Áo khoác da lộn basic cổ cao siêu xấu siêu không hợp siêu vỡ form siêu nát",
  code: "FWCL002",
  price: 850000,
  finalPrice: 649000,
  discount: 24,
  quantity: 19,
  images: [
    insta1, insta2, insta3, insta4, insta5, insta6, insta1, insta2, insta3, insta4, insta5, insta6,
  ],
  colors: ["Xanh rêu đậm", "Trắng kem đậm", "Be nhạt", "Dark Navy", "Nâu", "Đen"],
  sizes: [
    { name: "S", available: true },
    { name: "M", available: true },
    { name: "L", available: false },
    { name: "XL", available: false }
  ]
};

// Định nghĩa emit để có thể gửi sự kiện lên component cha
const emit = defineEmits(["update:dialog"]);

// Tạo biến cục bộ để kiểm soát trạng thái modal
const localDialog = ref(false);

// Đồng bộ `localDialog` với prop `dialog` qua watch
watch(() => props.dialog, (newVal) => {
  localDialog.value = newVal;
});

// Emit sự kiện để báo với cha khi modal đóng
const handleClose = () => {
  emit('update:dialog', false); // Báo với component cha là modal đã đóng
};

// Định dạng giá
const formatPrice = (price) => price.toLocaleString("vi-VN");

// Hàm đóng modal
const closeModal = () => {
  localDialog.value = false;
  emit("update:dialog", false)
};

// Hàm tăng/giảm số lượng
const increaseQuantity = () => { if (quantity.value < product.quantity) quantity.value++; }
const decreaseQuantity = () => {
  if (quantity.value > 1) quantity.value--;
};

// Biến trạng thái
const selectedImage = ref(product.images?.[0] || "");
const selectedColor = ref(null);
const selectedSize = ref(null);
const quantity = ref(1);

const mainSwiperRef = ref(null);
const thumbSwiperRef = ref(null);


const mainSwiper = ref(null);
const thumbSwiper = ref(null);

const setMainSwiper = (swiper) => {
  mainSwiper.value = swiper;
};

const setThumbSwiper = (swiper) => {
  thumbSwiper.value = swiper;
};

const goToSlide = (index) => {
  if (mainSwiper.value) {
    mainSwiper.value.slideTo(index);
  }
};

onMounted(() => {
  if (mainSwiperRef.value && thumbSwiperRef.value) {
    mainSwiperRef.value.swiper.controller.control = thumbSwiperRef.value.swiper;
    thumbSwiperRef.value.swiper.controller.control = mainSwiperRef.value.swiper;
  }
});

</script>

<style lang="scss" scoped>
.mp\:btn-close {
  background-color: none;

  &:hover {
    box-shadow: none;
    background-color: transparent;
  }
}

.mx-1\/5 {
  border-right: 0.2rem;
  border-left: 0.2rem;
}

.mp\:btn-plus,
.mp\:btn-minus {

  &:hover {
    box-shadow: none;
    background-color: transparent;
  }

  &:focus {
    box-shadow: none;
    background-color: transparent;
  }
}

/* Định dạng phần nội dung của v-dialog */
::v-deep(.v-card) {
  overflow-y: auto;

  /* Tùy chỉnh thanh cuộn */
  &::-webkit-scrollbar {
    position: fixed !important;
    width: 4px;
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

.group {

  .custom-next-img,
  .custom-prev-img,
  .custom-next-slide,
  .custom-prev-slide {
    display: none;
  }

  &:hover {

    .custom-next-img,
    .custom-prev-img,
    .custom-prev-slide,
    .custom-next-slide {
      display: flex;
    }
  }


}
</style>