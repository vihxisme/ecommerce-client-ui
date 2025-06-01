<template>
  <v-container class="p-0" :class="{ 'v-container--fluid': lgAndDown, 'v-container': xlAndUp }">
    <div class="relative w-full h-600-px ct:h-400px ct:h-300-px transition-all duration-500 ease-in-out">
      <swiper v-if="slides.length" :modules="[Autoplay, Navigation, Pagination]" :slides-per-view="1" :loop="true"
        :autoplay="{ delay: 5000 }" :pagination="{ el: '.swiper-pagination', clickable: true }"
        :navigation="{ nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }" class="w-full h-full border-box">
        <swiper-slide v-for="(slide, index) in slides" :key="index">
          <div class="relative w-full h-full flex items-center justify-center">
            <v-img :src="getCloudinaryUrl(slide.bannerUrl)" cover class="w-full h-full" />
            <!-- <div class="absolute inset-0 bg-black bg-opacity-20"></div>
            <div class="text-left text-white relative z-10">
              <h2 class="text-xl md:text-base font-semibold">{{ slide.subtitle }}</h2>
              <h1 class="text-4xl md:text-2xl font-bold mt-2">{{ slide.title }}</h1>
              <button
                class="mt-4 px-6 py-2 bg-transparent border border-orange-500 rounded-md text-white font-semibold hover:bg-orange-500">
                {{ slide.buttonText }}
              </button>
            </div> -->
          </div>
        </swiper-slide>

        <!-- Thanh pagination dạng dấu ngang  -->
        <div class="swiper-pagination"></div>

        <!-- Nút prev & next -->
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
      </swiper>
    </div>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useDisplay } from "vuetify/lib/framework.mjs";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { aboutService } from "@/services/apis/aboutService";
import { getCloudinaryUrl } from "@/utils/cloudinary";
const { lgAndDown, xlAndUp } = useDisplay();

const slides = ref([]);

const fetchBanner = async () => {
  try {
    const res = await aboutService.getAllBanner();
    const data = res.data.data;

    slides.value = data;

    console.log("fetchBanner: ", res.data);
  } catch (error) {
    console.log("fetchBanner error: ", error);
  }
}

onMounted(() => {
  fetchBanner();
})
</script>
