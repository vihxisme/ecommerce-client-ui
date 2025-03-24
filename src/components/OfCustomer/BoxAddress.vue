<template>
  <v-card elevation="3" class="p-4 my-2 border rounded-md" color="transparent">
    <div class="md:flex justify-between items-center">
      <div class="text-left">
        <v-card-text class="p-2">{{ address.name }}</v-card-text>
        <v-card-text class="p-2">Sđt: {{ address.phone }}</v-card-text>
        <v-card-text class="p-2">Đc: {{ address.street_address }}, {{ address.ward_or_town }}, {{ address.district }},
          {{
            address.province_or_city }}</v-card-text>
        <div v-if="address.isDefault" class="p-2">
          <v-icon size="1.2rem" color="success">mdi-check</v-icon>
          <span class="text-sm mx-2 font-italic">Địa chỉ mặc định</span>
        </div>
      </div>
      <v-card-actions class="flex md:flex-col justify-end capitalize text-sm">
        <v-btn color="primary"><span class="text-sm capitalize">Cập nhập</span></v-btn>
        <v-btn color="primary"><span class="text-sm capitalize">Đặt làm mặc định</span></v-btn>
      </v-card-actions>
    </div>
  </v-card>
</template>

<script setup>
import { ref, defineProps } from 'vue';

defineProps({
  address: {
    type: Object,
    required: true
  }
});
</script>