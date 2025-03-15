<template>
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
</template>

<script setup>
import { ref } from "vue";

import BoxProduct from "../Products/BoxProduct.vue";

import image_insta6 from "@/assets/images/e-commerce/home/insta6.jpg";

const bestsellingProductTitle = ref("Sản phẩm bán chạy");
const bestSellingProductsAction = ref("Xem tất cả sản phẩm");


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
</script>