<template>
  <div class="w-full h-auto mt-26">
    <Banner />

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

    <!-- Sản phẩm mới -->
    <v-card class="w-full p-2 box-border">
      <!-- title -->
      <v-card-title class="p-2 my-8 mx-8 text-center uppercase text-3xl md:text-xl text-black transition ease-in-out">
        <h2>{{ newProductsTitle }}</h2>
      </v-card-title>

      <v-card-text class="relative rounded py-8 px-8 my-4">
        <v-container class="w-full p-2 mx-auto">
          <v-row>
            <v-col cols="12" sm="6" md="4" lg="3" xl="2" v-for="(product, index) in newProducts" :key="index"
              class="flex justify-center items-center">
              <div class="w-270-px h-400-px">
                <BoxProduct :product="product" />
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-card-action class=" block m-4 p-4">
        <v-btn
          class="text-center text-lg bg-transparent uppercase rounded border-blueGray-300 md:text-xs hover:bg-orange-500 transition ease-in-out">
          <router-link>
            <span>{{ newProductsAction }}</span>
          </router-link>
        </v-btn>
      </v-card-action>
    </v-card>

    <!-- Sản phẩm khuyến mãi -->
    <v-card class="w-full p-2 box-border bg-orange-100">
      <!-- title -->
      <v-card-title class="p-2 my-8 mx-8 text-center uppercase text-3xl md:text-xl text-black transition ease-in-out">
        <h2>{{ discountedProductTitle }}</h2>
      </v-card-title>

      <!-- nội dung -->
      <v-card-text class="relative bg-gray-200 rounded py-8 px-8 my-4">
        <swiper :modules="[Autoplay, Navigation, Pagination]" :slides-per-view="6" :loop="true"
          :autoplay="{ delay: 7000 }" :breakpoints="{
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
          <swiper-slide v-for="(product, index) in products" :key="index" class="flex justify-center items-center">
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
            <span>{{ discountedProductAction }}</span>
          </router-link>
        </v-btn>
      </v-card-action>
    </v-card>

    <!-- Sản phẩm bán chạy -->
    <v-card class="w-full p-2 box-border">
      <!-- title -->
      <v-card-title class="p-2 my-8 mx-8 text-center uppercase text-3xl md:text-xl text-black transition ease-in-out">
        <h2>{{ bestsellingProductTitle }}</h2>
      </v-card-title>

      <v-card-text class="relative rounded py-8 px-8 my-4">
        <v-container class="w-full p-2 mx-auto">
          <v-row>
            <v-col cols="12" sm="6" md="4" lg="3" xl="2" v-for="(product, index) in bestSellingProducts" :key="index"
              class="flex justify-center items-center">
              <div class="w-270-px h-400-px">
                <BoxProduct :product="product" />
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-card-action class=" block m-4 p-4">
        <v-btn
          class="text-center text-lg bg-transparent uppercase rounded border-blueGray-300 md:text-xs hover:bg-orange-500 transition ease-in-out">
          <router-link>
            <span>{{ bestSellingProductsAction }}</span>
          </router-link>
        </v-btn>
      </v-card-action>
    </v-card>

    <v-card class="border-t p-4">
      <v-row>
        <v-col cols="12" sm="6" md="3" v-for="(item, index) in policies" :key="index">
          <v-card-text class="h-full flex justify-start items-center">
            <font-awesome-icon :icon="item.icon" class="fa-3x text-gray-500"></font-awesome-icon>
            <div class="text-left ml-6">
              <h3 class="capitalize text-sm font-bold my-2">{{ item.title }}</h3>
              <div>{{ item.text }}</div>
            </div>
          </v-card-text>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script setup>
import { ref, resolveDirective } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { faTruckFast, faRotate, faHeadset, faCreditCard } from "@fortawesome/free-solid-svg-icons";

import Banner from "@/layouts/Banner.vue";
import BoxProduct from "@/components/Products/BoxProduct.vue";
import Category from "@/components/Products/Category.vue";


import image_center from "@/assets/images/e-commerce/details/1-center.png";
import image_left from "@/assets/images/e-commerce/details/1-left.png";
import image_right from "@/assets/images/e-commerce/details/1-right.png";
import image_insta3 from "@/assets/images/e-commerce/home/insta3.jpg";
import image_insta6 from "@/assets/images/e-commerce/home/insta6.jpg";
import { icon } from "@fortawesome/fontawesome-svg-core";

const newProductsTitle = ref("Sản phẩm mới");
const newProductsAction = ref("Xem tất cả sản phẩm mới");


const discountedProductTitle = ref("Sản phẩm khuyến mãi");
const discountedProductAction = ref("Xem tất cả sản phẩm khuyến mãi");

const bestsellingProductTitle = ref("Sản phẩm bán chạy");
const bestSellingProductsAction = ref("Xem tất cả sản phẩm");

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

const products = ref(
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

const newProducts = ref(
  Array.from({ length: 12 }, () => ({
    image: image_insta3,
    discount: 20,
    colors: 5,
    sizes: 4,
    name: "Áo len mới cứng xuất khẩu siêu bền siêu đẹp giặt siêu bẩn",
    code: "EWCW008678670",
    price: 600000,
    finalPrice: 480000,
  }))
);

const bestSellingProducts = ref(
  Array.from({ length: 12 }, () => ({
    image: image_insta6,
    discount: 20,
    colors: 5,
    sizes: 4,
    name: "Áo len mới cứng bán siêu chạy siêu chạy",
    code: "EWCW008678670",
    price: 600000,
    finalPrice: 480000,
  }))
);

const policies = ref([
  { title: "Miễn phí vận chuyển", text: "Áp dụng cho mọi đơn hàng từ 500k", icon: faTruckFast },
  { title: "Dễ dàng đổi hàng", text: "Đổi hàng trong 7 ngày bất kể vì lí do gì", icon: faRotate },
  { title: "Hỗ trợ khách hàng", text: "HOTLINE 24/7: 0123456789", icon: faHeadset },
  { title: "Thanh toán đa dạng", text: "Thanh toán khi nhận hàng, Napas, Visa, Ví điện tử, Chuyển khoản", icon: faCreditCard },
]);
</script>

<style lang="scss" scoped>
.v-card-title {
  font-family: 'Montserrat', sans-serif;
}
</style>
