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

    <!-- <v-card-actions class=" block m-4 p-4">
      <v-btn
        class="text-center text-lg bg-transparent uppercase rounded border-blueGray-300 md:text-xs hover:bg-orange-500 transition ease-in-out">
        <router-link>
          <span>{{ bestSellingProductsAction }}</span>
        </router-link>
      </v-btn>
    </v-card-actions> -->
  </v-card>
</template>

<script setup>
import { onMounted, ref, reactive } from "vue";

import BoxProduct from "../Products/BoxProduct.vue";

import { getTopProductsByRevenue } from "@/services/apis/productService";

const bestsellingProductTitle = ref("Sản phẩm bán chạy");
const bestSellingProductsAction = ref("Xem tất cả sản phẩm");
const bestSellingProducts = reactive([]);

const page = ref(2);
const size = ref(16);
const loading = ref(false);

const fetchNewProducts = async () => {
  loading.value = true;
  try {
    const request = {
      limit: size.value,
    };

    const res = await getTopProductsByRevenue(request);
    bestSellingProducts.length = 0; // clear trước
    bestSellingProducts.push(...res.data.data);
    console.log(res.data);
  } catch (error) {
    console.error("NewProductList: API_Error:", error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchNewProducts();
})
</script>