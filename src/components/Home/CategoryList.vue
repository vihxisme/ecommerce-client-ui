<template>
  <!-- Category -->
  <v-card class="w-full p-2 box-border bg-orange-100">
    <v-container :class="{ 'v-container--fluid': lgAndDown, 'v-container': xlAndUp }">
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
          <swiper-slide v-for="category in categories" :key="category.id" class="flex justify-center items-center">
            <div class="w-300-px h-400-px">
              <Category :category="category" @selected-category="handleCategoryClick" />
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
    </v-container>
  </v-card>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { useDisplay } from "vuetify/lib/framework.mjs";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import Category from "@/components/Products/Category.vue";
import { generateSlug } from "@/utils/slugify";
import { useCategoryStore } from "@/stores/useCategory";

const router = useRouter();
const { lgAndDown, xlAndUp } = useDisplay();

const categoryTitle = ref("Danh mục sản phẩm");
const categoryStore = useCategoryStore();
const categories = computed(() => categoryStore.categories);

onMounted(async () => {
  await categoryStore.fetchCategories();
  console.log("data: " + categories.value);
})

const handleCategoryClick = (id, name) => {
  categoryStore.setSelectedCategory(id);
  const categorySlug = categoryStore.getSlugByCategory(name);
  router.push(`/collections/${categorySlug}`);
};
</script>