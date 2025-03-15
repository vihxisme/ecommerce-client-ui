<template>
  <v-card class="relative flex flex-col w-full h-full bg-white rounded-lg shadow-md overflow-hidden">
    <!-- Hình ảnh sản phẩm -->
    <div class="relative w-full h-full flex items-end justify-center bg-cover object-cover overflow-hidden">

      <!-- <router-link> -->
      <div :style="{ backgroundImage: `url(${category.image})` }"
        class="w-full h-full bg-cover bg-center transition-transform duration-300 ease-in-out group-hover:scale-105 hover:scale-6/5">
        <router-link class="w-full h-full block"></router-link>
      </div>
      <!-- </router-link> -->

      <!-- Nút thêm vào giỏ hàng & xem nhanh -->
      <div class="absolute w-full bottom-0 left-3 flex justify-between items-center space-x-2 bg-gray-100-opacity-50">
        <router-link class="uppercase text-base mx-2 my-2 p-2 hover:text-red-700">{{ category.name }}</router-link>

        <router-link class="mr-2">
          <v-icon class="mdi mdi-arrow-right-circle category-arrow" size="2rem"></v-icon>
        </router-link>
      </div>
    </div>
  </v-card>
</template>

<script setup>
import { defineProps, ref } from 'vue';

// Nhận dữ liệu sản phẩm từ props
defineProps({
  category: {
    type: Object,
    required: true
  }
});


</script>

<style lang="scss" scoped>
.bg-gray-100-opacity-50 {
  --tw-bg-opacity: 0.5;
  background-color: rgba(244, 244, 245, var(--tw-bg-opacity));
}


.category-arrow {
  border-radius: 50%;

  &:hover {
    color: white;
    background-color: black;
  }
}
</style>
