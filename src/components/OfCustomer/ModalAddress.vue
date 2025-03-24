<template>
  <v-dialog v-model="localDialog" @update:model-value="handleClose" class="ma:v-dialog">
    <v-card>
      <v-card-title
        class="fixed rounded-t w-full bg-white top-0 border-b-2 shadow-md flex justify-between items-center py-4 z-100">
        <h2 class="capitalize text-xl">Thêm địa chỉ</h2>
        <v-icon class="hover:text-red-700" @click="handleClose">mdi-close</v-icon>
      </v-card-title>
      <v-card-text class="mt-16 pb-0">
        <v-text-field label="Họ và tên" class="p:v-text-field" outlined required></v-text-field>
        <v-text-field label="Số điện thoại" class="p:v-text-field" outlined required></v-text-field>
        <v-text-field label="Địa chỉ" class="p:v-text-field" outlined required></v-text-field>
        <v-select v-model="provincesOptions" :items="provinces" class="ma:v-text-field" label="Tỉnh / Thành"
          outlined></v-select>
        <v-select v-model="districtsOptions" :items="districts" class="ma:v-text-field" label="Quận / Huyện"
          outlined></v-select>
        <v-select v-model="wardsOptions" :items="wards" class="p:v-text-field" label="Phường / Xã" outlined></v-select>
        <v-checkbox v-model="isDefault" label="Đặt làm địa chỉ mặc định" class="capitalize" color="success"
          hide-details></v-checkbox>
      </v-card-text>
      <v-card-actions class="w-full flex justify-end gap-6 mb-4 px-8">
        <v-btn class="bg-primary" color="white">Lưu</v-btn>
        <v-btn class="bg-error" color="white" @click="handleClose">Hủy</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, defineProps, watch } from 'vue';

const props = defineProps({
  dialog: {
    type: Boolean,
    required: true
  }
});

const isDefault = ref(false);

// Định nghĩa emit để có thể gửi sự kiện lên component cha
const emit = defineEmits(["update:dialog"]);

// Tạo biến cục bộ để kiểm soát trạng thái modal
const localDialog = ref(false);

// Đồng bộ `localDialog` với prop `dialog` qua watch
watch(() => props.dialog, (newVal) => {
  localDialog.value = newVal;
});

// Emit sự kiện để báo với cha khi modal đóng
const handleClose = () => {
  emit('update:dialog', false); // Báo với component cha là modal đã đóng
};

const provinces = ref(['Chọn tỉnh/Thành Phố', 'Hà Nội', 'Hồ Chí Minh', 'Đà Nẵng', 'Thừa Thiên Huế']);
const districts = ref(['Chọn Quận/Huyện', 'Hoàn Kiếm', 'Ba Đình', 'Cầu Giấy', 'Huyện Dương Minh Châu']);
const wards = ref(['Chọn Phường/Xã', 'Phường 1', 'Phường 2', 'Phường 3', 'Xã Đông Hoàng Long']);

const provincesOptions = ref(provinces.value[0]);
const districtsOptions = ref(districts.value[0]);
const wardsOptions = ref(wards.value[0]);
</script>

<style lang="scss" scoped>
.ma\:v-dialog {
  ::v-deep(.v-overlay__content) {
    max-width: 500px;

    @media (max-width: 968px) {
      width: 100%;
      margin: 0;
      bottom: 0;
      top: 10%;
    }
  }
}

/* Định dạng phần nội dung của v-dialog */
::v-deep(.v-card) {
  overflow-y: auto;

  /* Tùy chỉnh thanh cuộn */
  &::-webkit-scrollbar {
    position: fixed !important;
    width: 4px;
    right: 0 !important;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }
}
</style>