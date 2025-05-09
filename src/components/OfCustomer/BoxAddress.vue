<template>
  <v-container class="py-2" fluid>
    <ModalAddress :dialog="showModal" :type-modal="typeModal" v-bind:address-mode="address"
      @update:dialog="showModal = $event" />
    <v-card elevation="3" class="p-4 border rounded-md" color="transparent">
      <div class="md:flex justify-between items-center">
        <div class="text-left">
          <v-card-text class="p-2 text-base font-semibold">{{ address.name }}</v-card-text>
          <v-card-text class="p-2">Sđt: {{ address.phone }}</v-card-text>
          <v-card-text class="p-2">Đc: {{ address.fullAddress }}</v-card-text>
          <div v-if="address.isDefault" class="p-2">
            <v-icon size="1.2rem" color="success">mdi-check</v-icon>
            <span class="text-sm mx-2 font-italic">Địa chỉ mặc định</span>
          </div>
        </div>
        <v-card-actions class="flex md:flex-col justify-end capitalize text-sm">
          <v-btn color="red" size="small" class="capitalize" :loading="deleteLoading"
            @click="deleteAddressById(address.id)">Xóa</v-btn>
          <v-btn color="primary" size="small" class="capitalize" @click="showModal = true">Cập nhập</v-btn>
          <v-btn color="primary" size="small" class="capitalize" :loading="markLoading"
            @click="markDefaultAddress(address.id)">Đặt
            làm mặc định</v-btn>
        </v-card-actions>
      </div>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, defineProps } from 'vue';
import ModalAddress from './ModalAddress.vue';
import { deleteAddress, markAsDefaultAddress } from '@/services/apis/customerService';
import { useAuthStore } from '@/stores/useAuthStore';

const authStore = useAuthStore();

defineProps({
  address: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['update:noti', 'update:fetch']);

const typeModal = ref("UPDATE");
const showModal = ref(false);

const noti = ref({
  message: null,
  type: null,
  show: false
});

const deleteLoading = ref(false);
const deleteAddressById = async (addressId) => {
  try {
    deleteLoading.value = true;
    const res = await deleteAddress(addressId);
    if (res.status === 200) {
      // Handle success case
      noti.value = {
        message: "Xóa địa chỉ thành công",
        type: "success",
        show: true
      };
    } else {
      noti.value = {
        message: "Xóa địa chỉ thất bại",
        type: "error",
        show: true
      };
    }

    emit('update:noti', noti.value);
    emit('update:fetch', true); // Trigger fetch to refresh the address list
  } catch (error) {
    noti.value = {
      message: "Có lỗi xảy ra khi xóa địa chỉ",
      type: "error",
      show: true
    };
    emit('update:noti', noti.value);
    console.error("Error deleting address:", error);
  } finally {
    deleteLoading.value = false;
  }
};

const markLoading = ref(false);
const markDefaultAddress = async (addressId) => {
  try {
    markLoading.value = true;
    const request = {
      id: addressId,
      customerID: authStore.user.userID || null,
      isDefault: true
    }
    const res = await markAsDefaultAddress(request);
    if (res.status === 200) {
      noti.value = {
        message: "Đặt địa chỉ mặc định thành công",
        type: "success",
        show: true
      };
    } else {
      noti.value = {
        message: "Đặt địa chỉ mặc định thất bại",
        type: "error",
        show: true
      };
    }

    emit('update:noti', noti.value);
    emit('update:fetch', true); // Trigger fetch to refresh the address list
  } catch (error) {
    noti.value = {
      message: "Có lỗi xảy ra khi đặt địa chỉ mặc định",
      type: "error",
      show: true
    };
    emit('update:noti', noti.value);
    console.error("Error marking address as default:", error);
  } finally {
    markLoading.value = false;
  }
};
</script>