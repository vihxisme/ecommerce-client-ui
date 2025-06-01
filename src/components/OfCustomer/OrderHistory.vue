<template>
  <v-card class="py-8 shadow-none" color="transparent">
    <v-card-title class="my-4 py-4 text-left border-b-2 border-black">
      <h2 class="capitalize">Lịch sử mua hàng</h2>
    </v-card-title>

    <v-row>
      <v-col v-for="(order, index) in orders" :key="index" cols="12" md="6">
        <BoxOrder :orderProduct="order" />
      </v-col>
    </v-row>
  </v-card>
</template>

<script setup>
import { ref } from 'vue';

import BoxOrder from './BoxOrder.vue';

const orders = ref([
  {
    orderCode: "95996-49496-434",
    image: "https://cdn.vuetifyjs.com/images/cards/cooking.png",
    name: "Áo khoác da lộn basic cổ cao siêu xấu siêu không hợp siêu vỡ form siêu nát",
    code: "FWCL002",
    quantity: 2,
    color: "Đen",
    size: "XL",
    price: 850000,
    finalPrice: 649000,
  },
  {
    orderCode: "95996-49496-434",
    image: "https://cdn.vuetifyjs.com/images/cards/cooking.png",
    name: "Áo khoác da lộn basic cổ cao siêu xấu siêu không hợp siêu vỡ form siêu nát",
    code: "FWCL002",
    quantity: 2,
    color: "Đen",
    size: "XL",
    price: 850000,
    finalPrice: 649000,
  },
  {
    orderCode: "95996-49496-434",
    image: "https://cdn.vuetifyjs.com/images/cards/cooking.png",
    name: "Áo khoác da lộn basic cổ cao siêu xấu siêu không hợp siêu vỡ form siêu nát",
    code: "FWCL002",
    quantity: 2,
    color: "Đen",
    size: "XL",
    price: 850000,
    finalPrice: 649000,
  },
  {
    orderCode: "95996-49496-434",
    image: "https://cdn.vuetifyjs.com/images/cards/cooking.png",
    name: "Áo khoác da lộn basic cổ cao siêu xấu siêu không hợp siêu vỡ form siêu nát",
    code: "FWCL002",
    quantity: 2,
    color: "Đen",
    size: "XL",
    price: 850000,
    finalPrice: 649000,
  },
  {
    orderCode: "95996-49496-434",
    image: "https://cdn.vuetifyjs.com/images/cards/cooking.png",
    name: "Áo khoác da lộn basic cổ cao siêu xấu siêu không hợp siêu vỡ form siêu nát",
    code: "FWCL002",
    quantity: 2,
    color: "Đen",
    size: "XL",
    price: 850000,
    finalPrice: 649000,
  },
]);
</script>
