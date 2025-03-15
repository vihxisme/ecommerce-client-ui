<template>
  <!-- Sản phẩm khuyến mãi -->
  <v-card class="w-full p-2 box-border bg-orange-100">
    <!-- title -->
    <v-card-title class="p-2 my-8 mx-8 text-center uppercase text-3xl md:text-xl text-black transition ease-in-out">
      <h2>{{ promoProductTitle }}</h2>
    </v-card-title>

    <!-- nội dung -->
    <v-card-text class="relative bg-gray-200 rounded py-8 px-8 my-4">
      <swiper :modules="[Autoplay, Navigation, Pagination]" :slides-per-view="6" :loop="true"
        :autoplay="{ delay: 5000 }" :breakpoints="{
          0: { slidesPerView: 1, spaceBetween: 4 },
          640: { slidesPerView: 2, spaceBetween: 8 },
          768: { slidesPerView: 3, spaceBetween: 10 },
          960: { slidesPerView: 4, spaceBetween: 12 },
          1200: { slidesPerView: 5, spaceBetween: 15 },
          1520: { slidesPerView: 6, spaceBetween: 17 },
          1921: { slidesPerView: 7, spaceBetween: 19 }
        }" :pagination="{ el: '.swiper-pagination', clickable: true, dynamicBullets: true, dynamicMainBullets: 5 }"
        :navigation="{ nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }"
        class="swiper-discounted-products relative w-full h-full py-8 pb-16 border-box">
        <swiper-slide v-for="(product, index) in promoProducts" :key="index" class="flex justify-center items-center">
          <div class="w-250-px h-370-px">
            <BoxProduct :product="product" />
          </div>
        </swiper-slide>

        <!-- Thanh pagination dạng dấu ngang -->
        <div class="swiper-pagination swiper-disc-prod-pagination"></div>

        <!-- Nút prev & next -->
        <div class="swiper-button-prev swiper-disc-prod-button-prev">
          <!-- <v-icon class="mdi mdi-arrow-left"></v-icon> -->
        </div>
        <div class="swiper-button-next swiper-disc-prod-button-next">
          <!-- <v-icon class="mdi mdi-arrow-right" size="2rem"></v-icon> -->
        </div>
      </swiper>
    </v-card-text>

    <v-card-action class="block m-4 p-4">
      <v-btn
        class="text-center text-lg bg-transparent uppercase rounded border-blueGray-300 md:text-xs hover:bg-orange-500 transition ease-in-out">
        <router-link>
          <span>{{ promoProductAction }}</span>
        </router-link>
      </v-btn>
    </v-card-action>
  </v-card>
</template>

<script setup>
import { ref } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import BoxProduct from "../Products/BoxProduct.vue";

import image_center from "@/assets/images/e-commerce/details/1-center.png";

const promoProductTitle = ref("Sản phẩm khuyến mãi");
const promoProductAction = ref("Xem tất cả sản phẩm khuyến mãi");

const promoProducts = ref(
  Array.from({ length: 15 }, () => ({
    image: image_center,
    discount: 50,
    colors: 5,
    sizes: 4,
    name: "Áo khoác gió 1 lớp mũ liền siêu siêu siêu giữ form",
    code: "EWCW007",
    price: 500000,
    finalPrice: 349000,
  }))
);
</script>