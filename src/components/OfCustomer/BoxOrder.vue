<template>
  <v-card class="p-4">
    <div class="flex justify-between gap-2">
      <div style="flex: 15%" class="flex justify-between items-center">
        <v-img :src="orderProduct.image" :width="80" class="h-full"></v-img>
      </div>
      <div style="flex: 85%" class="text-left">
        <h4 class="text-sm p-2">{{ orderProduct.name }} - {{ orderProduct.code }}</h4>
        <div class="flex items-center justify-between px-2">
          <div class="text-xs font-semibold text-gray-500">
            <span>{{ orderProduct.color }}</span>
            <span class="mx-2">|</span>
            <span>{{ orderProduct.size }}</span>
          </div>
          <div class="text-xs font-semibold text-gray-500">
            <span>×{{ orderProduct.quantity }}</span>
          </div>
        </div>
        <div class="text-sm flex flex-col justify-end px-2">
          <span class="text-red-600 text-right">Đơn giá: {{ formatPrice(orderProduct.price) }}₫</span>
          <span class="text-red-500 font-bold text-right">Tổng tiền(×{{ orderProduct.quantity }} sản phẩm): {{
            formatPrice(orderProduct.finalPrice) }}₫</span>
        </div>
      </div>
    </div>

    <v-card-actions class="flex justify-end">
      <v-btn class="border-2 border-primary" color="primary">Mua lại</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { ref, defineProps } from 'vue';

defineProps({
  orderProduct: {
    type: Object,
    required: true
  }
});

// Định dạng giá
const formatPrice = (price) => price.toLocaleString("vi-VN");
</script>