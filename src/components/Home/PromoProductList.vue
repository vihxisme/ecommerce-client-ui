<template>
  <!-- Sản phẩm khuyến mãi -->
  <v-card class="w-full p-2 box-border bg-orange-100">
    <v-container :class="{ 'v-container--fluid': lgAndDown, 'v-container': xlAndUp }">
      <!-- title -->
      <v-card-title class="p-2 my-8 mx-8 text-center uppercase text-3xl md:text-xl text-black transition ease-in-out">
        <h2>{{ promoProductTitle }}</h2>
      </v-card-title>

      <!-- nội dung -->
      <v-card-text class="relative bg-gray-200 rounded py-8 px-8 my-4">
        <swiper v-if="promoProducts.length" :ref="swiperRef" :modules="[Autoplay, Navigation, Pagination]"
          :slides-per-view="6" :loop="true" :autoplay="{ delay: 5000 }" :breakpoints="{
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

      <v-card-actions class="block m-4 p-4">
        <v-btn variant="elevated"
          class="text-center text-lg bg-transparent uppercase rounded border-blueGray-300 md:text-xs hover:bg-orange-500 transition ease-in-out">
          <router-link to="/collections/onsale">
            <span>{{ promoProductAction }}</span>
          </router-link>
        </v-btn>
      </v-card-actions>
    </v-container>
  </v-card>
</template>

<script setup>
import { ref, onMounted, reactive, nextTick, watch } from "vue";
import { useDisplay } from "vuetify/lib/framework.mjs";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { getPromoProduct } from "@/services/apis/productService";

import BoxProduct from "../Products/BoxProduct.vue";

const { lgAndDown, xlAndUp } = useDisplay();

const swiperRef = ref(null);

const promoProductTitle = ref("Sản phẩm khuyến mãi");
const promoProductAction = ref("Xem tất cả sản phẩm khuyến mãi");

const loading = ref(false);
const promoProducts = reactive([]);
const page = ref(1);
const size = ref(15);

const fetchProducts = async () => {
  loading.value = true;
  try {
    const request = {
      page: page.value - 1,
      size: size.value,
    };

    const res = await getPromoProduct(request);
    promoProducts.length = 0; // clear trước
    promoProducts.push(...res.data.data.content);
    console.log(res.data);

    // ✅ Bắt Swiper autoplay lại
    // await nextTick();
    // setTimeout(() => {
    //   if (swiperRef.value?.swiper) {
    //     swiperRef.value.swiper.autoplay.start(); // Khởi động autoplay
    //   }
    // }, 1000);
  } catch (error) {
    console.error("PromoProductList: API_Error:", error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchProducts();
})
</script>