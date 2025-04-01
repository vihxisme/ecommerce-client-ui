<template>
  <!-- Sản phẩm mới -->
  <v-card class="w-full p-2 box-border">
    <!-- title -->
    <v-card-title class="p-2 my-8 mx-8 text-center uppercase text-3xl md:text-xl text-black transition ease-in-out">
      <h2>{{ newProductsTitle }}</h2>
    </v-card-title>

    <v-card-text class="relative rounded py-8 px-8 my-4">
      <v-container class="w-full p-2 mx-auto">
        <v-row>
          <v-col cols="12" sm="6" md="4" lg="3" xl="2" v-for="product in newProducts" :key="product.id"
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
</template>

<script setup>
import { ref, onMounted } from "vue";
import BoxProduct from "../Products/BoxProduct.vue";
import { getNewProducts } from "@/services/apis/productService";

const newProductsTitle = ref("Sản phẩm mới");
const newProductsAction = ref("Xem tất cả sản phẩm mới");

const loading = ref(false);
const newProducts = ref([]);
const page = ref(1);
const size = ref(16);

const fetchNewProducts = async () => {
  loading.value = true;
  try {
    const request = {
      page: page.value - 1,
      size: size.value,
    };

    const res = await getNewProducts(request);
    newProducts.value = res.data.data.content;
    console.log(res.data);
  } catch (error) {
    console.error("Lỗi khi lấy sản phẩm mới:", error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchNewProducts();
})
</script>