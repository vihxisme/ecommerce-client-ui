<template>
  <div class="w-full h-auto mt-26 rps-mb:mt-14">
    <Banner></Banner>
    <CategoryList></CategoryList>
    <NewProductList></NewProductList>
    <PromoProductList></PromoProductList>
    <BestSellingProductList></BestSellingProductList>

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
import { ref } from "vue";

import { faTruckFast, faRotate, faHeadset, faCreditCard } from "@fortawesome/free-solid-svg-icons";

import Banner from "@/layouts/Banner.vue";
import CategoryList from "@/components/Home/CategoryList.vue";
import PromoProductList from "@/components/Home/PromoProductList.vue";
import NewProductList from "@/components/Home/NewProductList.vue";
import BestSellingProductList from "@/components/Home/BestSellingProductList.vue";

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
