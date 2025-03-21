<template>
  <v-card class="relative flex flex-col w-full h-full bg-white rounded-lg shadow-md overflow-hidden">
    <ModalProduct :dialog="showModal" :product="product" @update:dialog="showModal = $event"></ModalProduct>
    <!-- Hình ảnh sản phẩm -->
    <div class="relative w-full h-7/10">
      <!-- Nhãn giảm giá -->
      <div v-if="product.discount"
        class="absolute top-10-px left-10-px bg-red-600 text-white text-xs px-2 py-1 rounded z-100">
        -{{ product.discount }}%
      </div>

      <!-- Hình ảnh sản phẩm -->
      <div class="w-full h-full flex items-end justify-center bg-cover object-cover overflow-hidden"
        @mouseover="isDisplayBtn = true" @mouseleave="isDisplayBtn = false">

        <!-- <router-link> -->
        <div :style="{ backgroundImage: `url(${product.image})` }"
          class="w-full h-full bg-cover bg-center transition-transform duration-300 ease-in-out group-hover:scale-105 hover:scale-6/5">
          <router-link :to="prodDetailsRoute" class="w-full h-full block"></router-link>
        </div>
        <!-- </router-link> -->

        <!-- Nút thêm vào giỏ hàng & xem nhanh -->
        <!-- Nút "Xem nhanh" -->
        <v-btn v-if="isDisplayBtn" icon
          class="bp:hidden absolute bottom-3 left-0 shadow-md mx-2 my-2 bg-transparent hover:bg-red-500 group"
          @mouseover="isHoveredQuickView = true" @mouseleave="isHoveredQuickView = false" @click="showModal = true">
          <div v-if="isHoveredQuickView" class="group-hover:opacity-100 transition duration-300">
            <!-- Text hiển thị khi hover -->
            <span class="absolute z-200 bottom-4r left-0 bg-black text-white text-xs px-2 py-1 rounded">Xem
              nhanh
            </span>
            <span class="absolute z-100 bottom-3-7r left-4/5r w-5 h-5 bg-black rotate-45"></span>
          </div>
          <v-icon class="mdi mdi-eye-outline"></v-icon>
        </v-btn>

        <!-- Nút "Thêm vào giỏ hàng" -->
        <v-btn v-if="isDisplayBtn" icon
          class="bp:hidden absolute bottom-3 right-0 shadow-md mx-2 my-2 bg-transparent hover:bg-red-500 group"
          @mouseover="isHoveredAddToCart = true" @mouseleave="isHoveredAddToCart = false" @click="showModal = true">
          <div v-if="isHoveredAddToCart" class="group-hover:opacity-100 transition duration-300">
            <!-- Text hiển thị khi hover -->
            <span class="absolute z-200 bottom-4r right-0 bg-black text-white text-xs px-2 py-1 rounded">
              Thêm vào giỏ hàng
            </span>
            <span class="absolute z-100 bottom-3-7r right-4/5r w-5 h-5 bg-black rotate-45"></span>
          </div>
          <v-icon class="mdi mdi-cart-outline text-lg"></v-icon>
        </v-btn>
      </div>

      <!-- Mobile: Giỏ hàng -->
      <div class="lg:hidden absolute bottom-1/2r right-1/2r">
        <font-awesome-icon :icon="faShoppingBag"
          class="rounded-50 text-xl bg-white border border-orange-500 p-2 cursor-pointer"
          @click="showModal = true"></font-awesome-icon>
      </div>
    </div>

    <!-- Thông tin sản phẩm -->
    <v-card-text class="relative flex-grow p-2">
      <div class="flex w-full justify-start items-center space-x-2 mt-1">
        <router-link>
          <h3 class="text-sm text-left capitalize mt-1 mx-2 clamp-2 overflow-hidden overflow-ellipsis">{{
            product.name }}
            - {{ textToUppercase(product.code) }}</h3>
        </router-link>
      </div>

      <!-- votes -->
      <div class="flex w-full justify-start items-center py-2 mx-2">
        <v-icon v-for="(item, index) in 5" :key="index" class="mdi mdi-star" size="16px" color="#DAA520"></v-icon>
      </div>


      <!-- Giá -->
      <div class="flex w-full justify-between items-center">
        <span v-if="product.finalPrice" class="text-red-500 text-left text-sm font-bold mx-2">{{
          formatPrice(product.finalPrice)
        }}₫</span>
        <span v-if="product.price" class="text-gray-400 text-sm line-through font-bold mx-2">{{
          formatPrice(product.price)
        }}₫</span>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { defineProps, ref } from 'vue';
import ModalProduct from './ModalProduct.vue';

import { faShoppingBag } from '@fortawesome/free-solid-svg-icons';

// Nhận dữ liệu sản phẩm từ props
defineProps({
  product: {
    type: Object,
    required: true
  }
});

const prodDetailsRoute = ref("/products/details")

const showModal = ref(false);

// Biến hover độc lập cho từng nút
const isHoveredQuickView = ref(false);
const isHoveredAddToCart = ref(false);
const isDisplayBtn = ref(false);

// Định dạng giá tiền
const formatPrice = (price) => price.toLocaleString("vi-VN");

// Chữ in hoa 
const textToUppercase = (text) => text.toUpperCase();

// Chỉ ẩn nút khi chuột thực sự rời khỏi vùng cha
const handleMouseLeave = (event) => {
  const isLeaving = !event.currentTarget.contains(event.relatedTarget);
  if (isLeaving) isDisplayBtn.value = false;
};
</script>

<style scoped>
@media (max-width: 1024px) {
  .bp\:hidden {
    display: none;
  }
}
</style>
