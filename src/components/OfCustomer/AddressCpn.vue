<template>
  <v-card class="py-8 shadow-none" color="transparent">
    <ModalAddress :dialog="showModal" @update:dialog="showModal = $event" />
    <v-card-title class="my-4 py-4 text-left border-b-2 border-black">
      <h2 class="capitalize">Địa chỉ</h2>
    </v-card-title>
    <div>
      <BoxAddress v-for="(address, index) in addresses" :key="index" :address="address" />
    </div>
    <v-card-actions class="flex justify-end px-8 my-4">
      <v-btn class="bg-primary px-4" prepend-icon="mdi-plus" color="white" @click="showModal = true">Thêm địa
        chỉ</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { ref } from 'vue';

import BoxAddress from './BoxAddress.vue';
import ModalAddress from './ModalAddress.vue';

const addresses = ref([
  {
    name: 'Nguyễn Văn A',
    phone: '0123456789',
    street_address: 'Số 1, Đường 1, Phường 1',
    ward_or_town: 'Phường 1',
    district: 'Quận 1',
    province_or_city: 'TP. Hồ Chí Minh',
    isDefault: false
  },
  {
    name: 'Nguyễn Văn B',
    phone: '0123456789',
    street_address: 'Số 2, Đường 2, Phường 2',
    ward_or_town: 'Phường 2',
    district: 'Quận 2',
    province_or_city: 'TP. Hồ Chí Minh',
    isDefault: true
  },
  {
    name: 'Nguyễn Văn C',
    phone: '0123456789',
    street_address: 'Số 3, Đường 3, Phường 3',
    ward_or_town: 'Phường 3',
    district: 'Quận 3',
    province_or_city: 'TP. Hồ Chí Minh',
    isDefault: false
  }
]);

const showModal = ref(false);
</script>