<template>
  <v-dialog v-model="localDialog" @update:model-value="handleClose" class="ma:v-dialog"
    :class="{ 'slide-in-bottom': localDialog, 'slide-out-bottom': !localDialog }">
    <v-card>
      <v-card-title
        class="fixed rounded-t w-full bg-white top-0 border-b-2 shadow-md flex justify-between items-center py-4 z-100">
        <h2 class="capitalize text-xl">{{ titlemodal }}</h2>
        <v-icon class="hover:text-red-700" @click="handleClose">mdi-close</v-icon>
      </v-card-title>
      <v-form ref="formRef" v-model="formValid" lazy-validate lazy-errors>
        <v-card-text class="mt-16 pb-0">
          <v-text-field v-model="name" label="Họ và tên" class="ma:v-text-field"
            :rules="[v => !!v || 'Họ và tên này không được bỏ trống']" outlined required></v-text-field>
          <v-text-field v-model="tel" label="Số điện thoại" type="tel" class="ma:v-text-field"
            :rules="[v => !!v && /^\+?\d{9,15}$/.test(v) || 'Số điện thoại không hợp lệ']" outlined
            required></v-text-field>
          <v-text-field v-model="address" label="Địa chỉ" class="ma:v-text-field"
            :rules="[v => !!v || 'Địa chỉ không được bỏ trống!']" outlined required></v-text-field>
          <v-select v-model="selectedProvince" :items="filteredProvinces" class="op:v-text-field" label="Tỉnh / Thành"
            outlined @focus="startSearchingProvince" item-title="name"
            :rules="[v => !!v && selectedProvince.code !== -1 || 'Bạn chưa chọn tỉnh/thành phố!']" return-object>
          </v-select>
          <v-select v-model="selectedDistrict" :items="filteredDistricts" class="bop:v-text-field" label="Quận / Huyện"
            outlined @focus="startSearchingDistrict" item-title="name"
            :rules="[v => !!v && selectedDistrict.code !== -1 || 'Bạn chưa chọn quận/huyện!']" return-object>
          </v-select>
          <v-select v-model="selectedWard" :items="filteredWards" class="op:v-text-field" label="Phường / Xã" outlined
            @focus="startSearchingWard" item-title="name"
            :rules="[v => !!v && selectedWard.code !== -1 || 'Bạn chưa chọn phường/xã!']" return-object>
          </v-select>
          <v-checkbox v-model="isDefault" label="Đặt làm địa chỉ mặc định" class="capitalize" color="success"
            hide-details></v-checkbox>
        </v-card-text>
        <v-card-actions class="w-full flex justify-end gap-6 mb-4 px-8">
          <v-btn class="bg-primary" color="white" :loading="loading" @click="handleSave">Lưu</v-btn>
          <v-btn class="bg-error" color="white" @click="handleClose">Hủy</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, defineProps, watch, toRef } from 'vue';
import { AddressService } from '@/services/apis/address';
import { updateAddress, createAddress } from '@/services/apis/customerService';
import { useAuthStore } from '@/stores/useAuthStore';

const authStore = useAuthStore();

const props = defineProps({
  dialog: {
    type: Boolean,
    required: true
  },
  typeModal: {
    type: String,
    required: true,
  },
  addressMode: {
    type: Object,
    required: true
  }
});

// title modal
const titlemodal = ref();
// const typeModalRef = toRef(props, 'typeModal');
watch(() => props.typeModal, (newVal) => {
  if (newVal === 'ADD') {
    titlemodal.value = "Thêm địa chỉ";
  } else {
    titlemodal.value = "Cập nhập";
  }
}, { immediate: true })



// Định nghĩa emit để có thể gửi sự kiện lên component cha
const emit = defineEmits(["update:dialog", "update:noti", "update:fetch"]);

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

// data form
const name = ref();
const tel = ref();
const address = ref();
const isDefault = ref(false);

// --- SETUP ADDRESS --
const provinceDefault = ref({ name: "Chọn tỉnh/TP", code: -1, districts: [] });
const filteredProvinces = ref([provinceDefault.value]);
const selectedProvince = ref(filteredProvinces.value[0]);
const districtDefault = ref({ name: "Chọn quận/huyện", code: -1, wards: [] });
const filteredDistricts = ref([districtDefault.value]);
const selectedDistrict = ref(filteredDistricts.value[0]);
const wardDefault = ref({ name: "Chọn phố/xã", code: -1 });
const filteredWards = ref([wardDefault.value]);
const selectedWard = ref(filteredWards.value[0]);

const startSearchingProvince = async () => {
  if (filteredProvinces.value.length === 1) {
    const provinces = await AddressService.fetchProvinces();
    filteredProvinces.value = [provinceDefault.value, ...provinces];
  }
}

const startSearchingDistrict = async () => {
  if (filteredDistricts.value.length === 1 && selectedProvince.value.code !== -1) {
    const districts = await AddressService.fetchDistricts(selectedProvince.value.code);
    filteredDistricts.value = [districtDefault.value, ...districts];
  }
}

const startSearchingWard = async () => {
  if (filteredWards.value.length === 1 && selectedDistrict.value.code !== -1) {
    const wards = await AddressService.fetchWards(selectedDistrict.value.code);
    filteredWards.value = [wardDefault.value, ...wards];
  }
}

watch(selectedProvince, (nValue) => {
  filteredDistricts.value = [districtDefault.value];
  selectedDistrict.value = filteredDistricts.value[0];
  if (nValue.code !== -1) {
    startSearchingDistrict();
  }
})

watch(selectedDistrict, (nValue) => {
  filteredWards.value = [wardDefault.value];
  selectedWard.value = filteredWards.value[0];
  if (nValue.code !== -1) {
    startSearchingWard();
  }
})

watch(() => props.addressMode, async (newVal) => {
  name.value = newVal.name;
  tel.value = newVal.phone;
  address.value = newVal.address;
  isDefault.value = newVal.isDefault;

  await startSearchingProvince();
  selectedProvince.value = filteredProvinces.value.find(p => p.code === newVal.province) || provinceDefault.value;
  await startSearchingDistrict();
  selectedDistrict.value = filteredDistricts.value.find(d => d.code === newVal.district) || districtDefault.value;
  await startSearchingWard();
  selectedWard.value = filteredWards.value.find(w => w.code === newVal.ward) || wardDefault.value;
}, { immediate: true })

const formRef = ref();
const formValid = ref(false);
const noti = ref({
  message: null,
  type: null,
  show: false
});
const isClosed = ref(false);
const loading = ref(false);
const handleSave = async () => {
  if (!formRef.value.validate()) return;

  try {
    loading.value = true;
    const addressData = {
      id: props.addressMode.id || null,
      customerID: authStore.user.userID || null,
      name: name.value,
      phone: tel.value,
      address: address.value,
      isDefault: isDefault.value,
      province: selectedProvince.value.code,
      fullAddress: `${address.value}, ${selectedWard.value.name}, ${selectedDistrict.value.name}, ${selectedProvince.value.name}`,
      district: selectedDistrict.value.code,
      ward: selectedWard.value.code
    };

    if (props.typeModal === "ADD") {
      const res = await createAddress(addressData);
      if (res.status === 201) {
        noti.value = {
          message: "Thêm địa chỉ thành công",
          type: "success",
          show: true
        };
        isClosed.value = true;
      } else {
        noti.value = {
          message: "Thêm địa chỉ thất bại",
          type: "error",
          show: true
        };
      }
    } else if (props.typeModal === "UPDATE") {
      const res = await updateAddress(addressData);
      if (res.status === 200) {
        noti.value = {
          message: "Cập nhật địa chỉ thành công!",
          type: "success",
          show: true
        };
        isClosed.value = true;
      } else {
        noti.value = {
          message: "Cập nhật địa chỉ thất bại!",
          type: "error",
          show: true
        };
      }
    }

    console.log("noti: ", noti.value);
    emit('update:noti', noti.value);
    if (isClosed.value) {
      handleClose();
      emit('update:fetch', true);
    }
  } catch (error) {
    noti.value = {
      message: "Có lỗi xảy ra!",
      type: "error",
      show: true
    };
    emit('update:noti', noti.value);
    console.error("Error saving address:", error);
  } finally {
    loading.value = false;
  }

};
</script>

<style lang="scss" scoped>
.ma\:v-text-field {
  ::v-deep(.v-field__input) {
    padding-top: 1.5rem;
    padding-bottom: 0;
  }
}

.ma\:v-dialog {
  ::v-deep(.v-overlay__content) {
    max-width: 500px;

    @media (max-width: 968px) {
      width: 100%;
      margin: 0;
      bottom: 0;
      top: 10%;
      // animation: slide_in_bottom 0.5s ease;

      &.slide-in-bottom {
        animation: slide_in_bottom 0.5s ease;
      }

      &.slide-out-bottom {
        animation: slide_out_bottom 0.5s ease;
      }



    }

    &.slide-in-bottom {
      @media (max-width: 968px) {
        animation: slide_in_bottom 0.5s ease;
      }
    }

    &.slide-out-bottom {
      @media (max-width: 968px) {
        animation: slide_out_bottom 0.5s ease;
      }
    }
  }
}

@keyframes slide_in_bottom {
  from {
    transform: translateY(100%);
  }

  to {
    transform: translateY(0);
  }

}

@keyframes slide_out_bottom {
  from {
    transform: translateY(100%);
  }

  to {
    transform: translateY(0);
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