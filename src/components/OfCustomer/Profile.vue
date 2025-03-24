<template>
  <v-card class="py-8 shadow-none">
    <v-card-text>
      <v-row>
        <v-col cols="12" md="8" order-md="1" order="2">
          <div class="gap-2 flex-mnw-768">
            <v-text-field label="Họ" class="grow p:v-text-field" outlined></v-text-field>
            <v-text-field label="Tên" class="grow p:v-text-field" outlined></v-text-field>
          </div>
          <div class="gap-2 flex-mnw-768">
            <div class="basic-3/5">
              <v-menu v-model="menu" :close-on-content-click="false" transition="scale-transition" max-width="290"
                @click:outside="menu = false">
                <template #activator="{ props }">
                  <v-text-field :model-value="formattedDate" label="Ngày sinh" outlined readonly v-bind="props"
                    class="p:v-text-field"></v-text-field>
                </template>
                <v-date-picker v-model="birthDate" @update:model-value="menu = false"></v-date-picker>
              </v-menu>
            </div>
            <div class="gap-2 items-center basic-2/5">
              <v-radio-group color="primary">
                <div class="flex justify-center gap-6">
                  <v-radio label="Nam" value="Male" class="inline-flex grow-0 p:v-radio"></v-radio>
                  <v-radio label="Nữ" value="Female" class="inline-flex grow-0 p:v-radio"></v-radio>
                </div>
              </v-radio-group>
            </div>
          </div>
          <div class="gap-2 flex-mnw-768">
            <v-text-field label="Email" type="email" class="basic-3/5 p:v-text-field" outlined required></v-text-field>
            <v-text-field label="Số điện thoại" type="tel" class="basic-2/5 p:v-text-field" outlined
              required></v-text-field>
          </div>

          <!-- Địa chỉ -->
          <v-text-field label="Địa chỉ" class="p:v-text-field" outlined required></v-text-field>

          <div class="flex-mnw-768 gap-2 capitalize">
            <!-- Tỉnh / Thành -->
            <v-select v-model="provincesOptions" :items="provinces" class="p:v-text-field" label="Tỉnh / Thành"
              outlined></v-select>

            <!-- Quận / Huyện -->
            <v-select v-model="districtsOptions" :items="districts" class="p:v-text-field" label="Quận / Huyện"
              outlined></v-select>

            <!-- Phường / Xã -->
            <v-select v-model="wardsOptions" :items="wards" class="p:v-text-field" label="Phường / Xã"
              outlined></v-select>
          </div>
        </v-col>
        <v-col cols="12" md="4" order-md="2" order="1">
          <!-- Avatar -->
          <v-avatar size="200" color="grey lighten-2">
            <v-img v-if="avatarUrl" :src="avatarUrl" />
            <v-icon v-else size="100">mdi-account</v-icon>
          </v-avatar>
          <!-- Nút chọn ảnh -->
          <div class="flex items-center justify-center gap-4 my-4 cursor-pointer" @click="triggerFileInput">
            <v-file-input ref="fileInputRef" accept="image/*" prepend-icon="mdi-camera" @change="onFileChange"
              class="grow-0" dense hide-details hide-input></v-file-input>
            <span class="text-sm font-semibold text-gray-500 hover:italic">Thay Avatar</span>
          </div>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions class="flex justify-center px-8">
      <v-btn class="bg-primary px-4" color="white">Cập nhập</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { ref, computed } from 'vue';

const menu = ref(false);
const birthDate = ref(null);


// Hàm định dạng ngày
const formattedDate = computed(() => {
  return birthDate.value
    ? new Date(birthDate.value).toLocaleDateString("vi-VN")
    : "";
});

const provinces = ref(['Chọn tỉnh/Thành Phố', 'Hà Nội', 'Hồ Chí Minh', 'Đà Nẵng', 'Thừa Thiên Huế']);
const districts = ref(['Chọn Quận/Huyện', 'Hoàn Kiếm', 'Ba Đình', 'Cầu Giấy', 'Huyện Dương Minh Châu']);
const wards = ref(['Chọn Phường/Xã', 'Phường 1', 'Phường 2', 'Phường 3', 'Xã Đông Hoàng Long']);

const provincesOptions = ref(provinces.value[0]);
const districtsOptions = ref(districts.value[0]);
const wardsOptions = ref(wards.value[0]);

const avatarUrl = ref("https://cdn.vuetifyjs.com/images/john.jpg");

const onFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      avatarUrl.value = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

const fileInputRef = ref(null);

// Hàm để kích hoạt click
const triggerFileInput = () => {
  if (fileInputRef.value) {
    fileInputRef.value.click();
  }
};

</script>

<style lang="scss" scoped>
.p\:v-text-field {
  ::v-deep(.v-field__input) {
    padding-top: 1.5rem;
    padding-bottom: 0;
  }
}

.p\:v-radio {
  ::v-deep(.v-label) {
    white-space: nowrap;
    word-wrap: normal;
  }
}

.flex-mnw-768 {
  @media (min-width: 768px) {
    display: flex;
  }
}
</style>