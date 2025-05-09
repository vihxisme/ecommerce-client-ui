<template>
  <v-card class="py-8 shadow-none" color="transparent">
    <v-snackbar v-model="noti.show" :timeout="5000" location="top right" :color="noti.type">{{ noti.message
    }}</v-snackbar>
    <ModalAddress :dialog="showModal" :type-modal="typeModal" :address-mode="address"
      @update:dialog="showModal = $event" @update:noti="noti = $event" @update:fetch="eventFetch" />
    <v-card-title class="my-4 py-4 text-left border-b-2 border-black">
      <h2 class="capitalize">Địa chỉ</h2>
    </v-card-title>
    <v-card-actions class="flex justify-end px-8 my-4">
      <v-btn class="bg-primary px-4" prepend-icon="mdi-plus" color="white" @click="showModal = true">Thêm địa
        chỉ</v-btn>
    </v-card-actions>
    <div>
      <BoxAddress v-for="(address, index) in addresses" :key="index" :address="address" @update:noti="noti = $event"
        @update:fetch="eventFetch" />
    </div>
  </v-card>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';

import BoxAddress from './BoxAddress.vue';
import ModalAddress from './ModalAddress.vue';
import { getAddressListByUserId } from '@/services/apis/customerService';
import { useAuthStore } from '@/stores/useAuthStore';

const authStore = useAuthStore();

//prop
const typeModal = ref("ADD");

const address = ref({
  id: null,
  customerId: null,
  name: null,
  phone: null,
  address: null,
  ward: null,
  district: null,
  province: null,
  isDefault: false
});
const addresses = ref([]);

const showModal = ref(false);
const noti = ref({
  message: null,
  type: null,
  show: false
});

const fetchAddressByUserId = async () => {
  try {
    const customerId = authStore.user.userID;

    const res = await getAddressListByUserId(customerId);
    const data = res.data.data;

    addresses.value = data;
  } catch (error) {
    console.log("Address: API_Error: ", error);
  }
}

onMounted(() => {
  fetchAddressByUserId();
})

const eventFetch = (value) => {
  if (value) {
    fetchAddressByUserId();
  }
}
</script>