<template>
  <div class="w-full mt-26 rps-mb:mt-16">
    <Breadcrumb />

    <v-container class="p-0" :class="{ 'v-container--fluid': xsAndDown, 'v-container': smAndUp }">
      <v-row class="w-full py-4 m-0 flex justify-center">
        <v-col cols="12" md="5" xl="3" class="w-full mp:v-col">
          <!-- Hình ảnh sản phẩm -->
          <div class="relative group">
            <swiper @swiper="setMainSwiper" :modules="[Navigation, Thumbs]" :navigation="{
              nextEl: '.custom-next-img',
              prevEl: '.custom-prev-img',
            }" class="main-image-swiper" @slideChange="selectedImage = product.images[$event.realIndex]">
              <swiper-slide v-for="(image, index) in product.images" :key="index">
                <v-img :src="image" aspect-ratio="16/9" class="rounded-lg" />
              </swiper-slide>
            </swiper>
            <!-- Custom Navigation Buttons -->
            <v-btn icon
              class="custom-prev-img absolute top-45p left-1/2r transform bg-gray-800/50 text-white p-2 rounded-full z-10 transition-all ease-linear">
              <v-icon color="red" size="2rem">mdi-arrow-left</v-icon>
            </v-btn>
            <v-btn icon
              class="custom-next-img absolute top-45p right-1/2r transform bg-gray-800/50 text-white p-2 rounded-full z-10 transition-all ease-linear">
              <v-icon color="red" size="2rem">mdi-arrow-right</v-icon>
            </v-btn>
          </div>

          <!-- Swiper danh sách hình nhỏ -->
          <div class="relative group mt-3">
            <swiper @swiper="setThumbSwiper" :modules="[Navigation, Thumbs]" :slides-per-view="6" :space-between="10"
              :breakpoints="{
                0: { slidesPerView: 7, spaceBetween: 4 },
                640: { slidesPerView: 8, spaceBetween: 8 },
                960: { slidesPerView: 6, spaceBetween: 12 }
              }" :navigation="{
                nextEl: '.custom-next-slide',
                prevEl: '.custom-prev-slide',
              }" watch-slides-progress class="thumbnail-swiper">
              <swiper-slide v-for="(image, index) in product.images" :key="index">
                <v-img :src="image" width="60" height="80"
                  class="cursor-pointer border-2 border-gray-300 rounded-md hover:border-orange-500"
                  :class="{ 'border-orange-500': selectedImage === image }" @click="
                    selectedImage = image;
                  goToSlide(index);
                  " />
              </swiper-slide>
            </swiper>
            <!-- Custom Navigation Buttons -->
            <v-btn min-width="0.5rem"
              class="custom-prev-slide px-2 absolute left-1/2r top-25p transform bg-gray-800/50 text-white rounded-full z-10 transition-all ease-linear">
              <v-icon color="red" size="1.5rem">mdi-arrow-left</v-icon>
            </v-btn>
            <v-btn min-width="0.5rem"
              class="custom-next-slide px-2 absolute right-1/2r top-25p transform bg-gray-800/50 text-white rounded-full z-10 transition-all ease-linear">
              <v-icon color="red" size="1.5rem">mdi-arrow-right</v-icon>
            </v-btn>
          </div>
        </v-col>

        <v-col cols="12" md="7" xl="5" class="w-full py-2 mp:v-col">
          <!-- Thông tin sản phẩm -->
          <v-card-text class="mp:v-card-text text-left">
            <h3 class="text-xl font-semibold">{{ product.name }}</h3>
            <p class="text-gray-500 py-2">Mã sản phẩm: <strong>{{ product.code }}</strong></p>

            <div class="my-2">
              <span>Tình trạng: Còn hàng</span>
              <span class="mx-4 text-gray-100 opacity-50">|</span>
              <span>Thương hiệu: DIDOT</span>
            </div>

            <!-- votes -->
            <div class="flex w-full justify-start items-center my-2">
              <v-icon v-for="(item, index) in 5" :key="index" class="mdi mdi-star" size="16px" color="#DAA520"></v-icon>
            </div>

            <div class="bg-gray-100 py-2">
              <div class="flex justify-between items-center mx-2 my-auto">
                <span class="text-xl font-semibold"> Giá: </span>
                <span class="ext-red-600 font-bold text-lg">{{ formatPrice(product.finalPrice) }}₫</span>
                <span v-if="product.price" class="text-gray-400 text-lg line-through">
                  {{ formatPrice(product.price) }}₫
                </span>
                <span v-if="product.discount" class="bg-red-500 text-white px-2 py-1 text-xs rounded">
                  -{{ product.discount }}%
                </span>
              </div>
            </div>
          </v-card-text>

          <!-- Màu sắc -->
          <v-card-text class="mp:v-card-text text-left">
            <h4 class="text-sm font-semibold py-4">Màu sắc:</h4>
            <div class="text-xxs">
              <v-btn v-for="(color, index) in product.colors" :key="index" @click="selectedColor = color"
                class="border border-gray-300 rounded-md px-1 py-1 shadow-none mx-1/5 my-1/5"
                :class="{ 'border-blueGray-100 bg-blueGray-100': selectedColor === color }" flat size="small">
                <span class="capitalize font-normal">{{ color }}</span>
              </v-btn>
            </div>
          </v-card-text>

          <!-- Kích thước -->
          <v-card-text class="mp:v-card-text text-left">
            <h4 class="text-sm font-semibold py-4">Kích thước:</h4>
            <div class="text-xss">
              <v-btn v-for="(size, index) in product.sizes" :key="index" @click="selectedSize = size.name"
                class="border border-gray-300 rounded-md mx-1/5 my-1/5 px-1 py-1 shadow-none"
                :class="{ 'border-blueGray-100 bg-blueGray-100': selectedSize === size.name }"
                :disabled="!size.available" flat size="small">
                <span class="capitalize font-normal">{{ size.name }}</span>
              </v-btn>
            </div>
          </v-card-text>

          <!-- Số lượng -->
          <v-card-text class="flex items-center gap-2 p-0 text-left">
            <h4 class="text-sm font-semibold ml-4 mr-8 my-4">Số lượng:</h4>
            <v-btn class="mx-2 p-0 border border-gray-300 shadow-none mp:btn-minus" min-width="1.5rem" height="1.5rem"
              @click="decreaseQuantity" flat>
              <v-icon>mdi-minus</v-icon>
            </v-btn>
            <span class="text-lg mx-2">{{ quantity }}</span>
            <v-btn class="mx-2 p-0 border border-gray-300 shadow-none mp:btn-plus" min-width="1.5rem" height="1.5rem"
              @click="increaseQuantity" flat>
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-card-text>

          <!-- Nút Thêm vào giỏ -->
          <div class="px-4 py-8 flex justify-between items-center">
            <v-btn class="flex-1 flex-grow bg-red-500 text-white font-bold mx-2 rounded-md pd:v-btn">
              Thêm vào giỏ hàng
            </v-btn>
            <v-btn class="flex-1 flex-grow bg-red-500 text-white font-bold mx-2 rounded-md">
              Mua ngay
            </v-btn>
          </div>

          <!-- Policy -->
          <!-- <div v-for="(item, index) in policies" :key="index">
            <div class="flex flex-wrap gap-6 py-2 mx-4">
              <font-awesome-icon :icon="item.icon" class="text-xl text-orange-500"></font-awesome-icon>
              <span class="text-sm fold-semibold">{{ item.text }}</span>
            </div>
          </div> -->
        </v-col>
      </v-row>

      <!-- Tab Header -->
      <div class="my-8">
        <v-tabs v-model="activeTab" class="mb-4 flex border-b">
          <v-tab v-for="(tab, index) in tabs" :key="index" class="flex-1 text-center">
            {{ tab.label }}
          </v-tab>
        </v-tabs>

        <!-- Tab Content -->
        <!-- <v-tabs-items v-model="activeTab" class="transition duration-300 ease-in-out">
        <v-tab-item v-for="(tab, index) in tabs" :key="index">
          <div class="p-4">
            <h2 class="font-bold text-xl mb-2">{{ tab.label }}</h2>
            <p v-html="tab.content"></p>
          </div>
        </v-tab-item>
      </v-tabs-items> -->

        <div class="p-4 text-left">
          <div :class="{ 'line-clamp': !expanded }" ref="contentRef">
            <!-- <h2 class="font-bold text-xl mb-2">{{ tabs[activeTab]?.label }}</h2> -->
            <p v-html="tabs[activeTab]?.content"></p>
          </div>
          <v-btn v-if="isOverflowing" @click="expanded = !expanded" class="text-blue-500 bg-gray-100 mt-2">{{ expanded ?
            'Thu gọn' :
            'Xem thêm' }}</v-btn>
        </div>
      </div>

    </v-container>
  </div>
</template>

<script setup>
import { ref, watch, nextTick, onMounted } from "vue";
import { useDisplay } from "vuetify/lib/framework.mjs";
import Breadcrumb from "@/components/Navigation/Breadcrumb.vue";

import { faShippingFast, faShield, faPhoneVolume, faSyncAlt, faCheckCircle, faHeadset } from "@fortawesome/free-solid-svg-icons";

import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

const { xsAndDown, smAndUp } = useDisplay();

import insta1 from "@/assets/images/e-commerce/home/insta1.jpg";
import insta2 from "@/assets/images/e-commerce/home/insta2.jpg";
import insta3 from "@/assets/images/e-commerce/home/insta3.jpg";
import insta4 from "@/assets/images/e-commerce/home/insta4.jpg";
import insta5 from "@/assets/images/e-commerce/home/insta5.jpg";
import insta6 from "@/assets/images/e-commerce/home/insta6.jpg";

const policies = ref([
  { text: "Miễn phí giao hàng cho đơn hàng từ 500K", icon: faShippingFast },
  { text: "Hàng phân phối chính hãng 100%", icon: faShield },
  { text: "Đổi sản phẩm dễ dàng (Trong vòng 7 ngày khi còn nguyên tem mác)", icon: faPhoneVolume },
  { text: "Kiểm tra, thanh toán khi nhận hàng COD", icon: faSyncAlt },
  { text: "TỔNG ĐÀI 24/7 : 0918273645", icon: faCheckCircle },
  { text: "Hỗ trợ bảo hành, đổi sản phẩm tại tất cả store", icon: faHeadset },
]);

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


// Định dạng giá
const formatPrice = (price) => price.toLocaleString("vi-VN");


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

// State quản lý tab đang được kích hoạt
const activeTab = ref(0); // Mặc định tab đầu tiên được chọn
const expanded = ref(false);
const isOverflowing = ref(false);
const contentRef = ref(null);

// Danh sách các tabs
const tabs = ref([
  {
    label: "Mô tả sản phẩm",
    content: `
      <ul>
        <li>Áo Khoác nỉ vải hiệu ứng đáp logo Horse cao su FWCS004</li>
        <li>Được thiết kế theo đúng form chuẩn của nam giới Việt Nam</li>
        <li>Sản phẩm thuộc dòng Áo khoác nỉ cao cấp do TORANO sản xuất</li>
      </ul>`,
  },
  {
    label: "Đánh giá - Nhận xét",
    content: "Tính năng đang được cập nhập..."
  },
  {
    label: "Chính sách đổi trả",
    content: "Chính sách đổi trả đang được cập nhập...",
  },
  {
    label: "Chính sách bảo mật",
    content: "Thông tin về chính sách bảo mật đang được cập nhập...",
  },
  {
    label: "Câu hỏi thường gặp",
    content: "Danh sách các câu hỏi thường gặp đang được cập nhập...",
  },
]);

// Kiểm tra nếu nội dung dài quá thì hiển thị nút "Xem thêm"
const checkOverflow = () => {
  nextTick(() => {
    if (contentRef.value) {
      isOverflowing.value = contentRef.value.scrollHeight > contentRef.value.clientHeight;
    }
  });
};

// Kiểm tra lại mỗi khi activeTab thay đổi
watch(activeTab, () => {
  expanded.value = false; // Reset trạng thái khi chuyển tab
  checkOverflow();
});

onMounted(checkOverflow);
</script>

<style lang="scss" scoped>
.group {

  .custom-next-img,
  .custom-prev-img,
  .custom-next-slide,
  .custom-prev-slide {
    display: none;
  }

  @media (min-width: 968px) {

    &:hover {

      .custom-next-img,
      .custom-prev-img,
      .custom-prev-slide,
      .custom-next-slide {
        display: flex;
      }
    }
  }

}

.pd\:v-btn {
  ::v-deep(.v-btn__content) {
    @media (max-width: 600px) {
      font-size: 0.625rem;
      line-height: 0.875rem;
    }
  }
}

.line-clamp {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>