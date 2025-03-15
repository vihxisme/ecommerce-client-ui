<template>
  <!-- Category -->
  <v-card class="w-full p-2 box-border bg-orange-100">
    <!-- title -->
    <v-card-title class="p-2 my-8 mx-8 text-center uppercase text-3xl md:text-xl text-black transition ease-in-out">
      <h2>{{ categoryTitle }}</h2>
    </v-card-title>

    <!-- nội dung -->
    <v-card-text class="relative bg-gray-200 rounded py-8 px-8 my-4">
      <swiper :modules="[Navigation, Pagination]" :slides-per-view="5" :breakpoints="{
        0: { slidesPerView: 1, spaceBetween: 4 },
        640: { slidesPerView: 2, spaceBetween: 8 },
        768: { slidesPerView: 3, spaceBetween: 10 },
        960: { slidesPerView: 4, spaceBetween: 12 },
        1200: { slidesPerView: 5, spaceBetween: 15 },
        1520: { slidesPerView: 5, spaceBetween: 17 },
        1921: { slidesPerView: 7, spaceBetween: 19 }
      }" :navigation="{ nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }"
        class="swiper-discounted-products relative w-full h-full py-8 pb-16 border-box">
        <swiper-slide v-for="(category, index) in categories" :key="index" class="flex justify-center items-center">
          <div class="w-300-px h-400-px">
            <Category :category="category" />
          </div>
        </swiper-slide>

        <!-- Nút prev & next -->
        <div class="swiper-button-prev swiper-disc-prod-button-prev">
          <!-- <v-icon class="mdi mdi-arrow-left"></v-icon> -->
        </div>
        <div class="swiper-button-next swiper-disc-prod-button-next">
          <!-- <v-icon class="mdi mdi-arrow-right" size="2rem"></v-icon> -->
        </div>
      </swiper>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { ref } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import Category from "@/components/Products/Category.vue";


import image_insta6 from "@/assets/images/e-commerce/home/insta6.jpg";

const categoryTitle = ref("Danh mục sản phẩm");
const categories = ref([
  { name: "Áo phông", image: image_insta6, link: "" },
  { name: "Áo len", image: image_insta6, link: "" },
  { name: "Áo polo", image: image_insta6, link: "" },
  { name: "Áo khoác", image: image_insta6, link: "" },
  { name: "Áo Blazer", image: image_insta6, link: "" },
  { name: "Áo sơ mi", image: image_insta6, link: "" },
  { name: "Áo Sweater", image: image_insta6, link: "" },
  { name: "Quần jean", image: image_insta6, link: "" },
  { name: "Quần Âu", image: image_insta6, link: "" },
  { name: "Quần thể thao", image: image_insta6, link: "" },
  { name: "Quần short", image: image_insta6, link: "" },
]);
</script>