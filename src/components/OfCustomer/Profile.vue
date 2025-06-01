<template>
  <v-card class="py-8 shadow-none" color="transparent">
    <v-snackbar v-model="noti.show" :timeout="5000" location="top right" :color="noti.type">{{ noti.message
    }}</v-snackbar>
    <v-form ref="formRef" v-model="formValid" lazy-validation>
      <v-card-title class="my-4 py-4 text-left border-b-2 border-black">
        <h2 class="capitalize">Hồ sơ của tôi</h2>
      </v-card-title>
      <v-card-text class="mt-8">
        <v-row>
          <v-col cols="12" md="9" order-md="1" order="2">
            <div class="gap-2 flex-mnw-768">
              <v-text-field v-model="firstName" label="Họ" class="grow p:v-text-field capitalize"
                outlined></v-text-field>
              <v-text-field v-model="lastName" label="Tên" class="grow p:v-text-field capitalize"
                outlined></v-text-field>
            </div>
            <div class="gap-2 flex-mnw-768">
              <v-menu v-model="menu" :close-on-content-click="false" transition="scale-transition" max-width="290"
                @click:outside="menu = false">
                <template #activator="{ props }">
                  <v-text-field :model-value="formattedDate" label="Ngày sinh" outlined readonly v-bind="props"
                    class="p:v-text-field"></v-text-field>
                </template>
                <v-date-picker v-model="birthDate" @update:model-value="menu = false"></v-date-picker>
              </v-menu>
            </div>
            <div class="gap-2 items-center">
              <v-radio-group v-model="gender" color="primary" label="Giới tính">
                <div class="flex justify-start items-center gap-6">
                  <v-radio label="Nam" value="Male" class="inline-flex grow-0 p:v-radio"></v-radio>
                  <v-radio label="Nữ" value="Female" class="inline-flex grow-0 p:v-radio"></v-radio>
                  <v-radio label="Khác" value="Other" class="inline-flex grow-0 p:v-radio"></v-radio>
                </div>
              </v-radio-group>
            </div>
            <div class="gap-2 flex-mnw-768">
              <v-text-field v-model="email" label="Email" type="email" class="basic-3/5 p:v-text-field" outlined
                required readonly></v-text-field>
              <v-text-field v-model="tel" label="Số điện thoại" type="tel" class="basic-2/5 p:v-text-field" outlined
                required></v-text-field>
            </div>
          </v-col>
          <v-col cols="12" md="3" order-md="2" order="1">
            <!-- Avatar -->
            <v-avatar :size="xsAndDown ? 100 : 150" color="grey lighten-2">
              <v-img v-if="avatar.url" :src="avatar.url" />
              <v-icon v-else size="100">mdi-account</v-icon>
            </v-avatar>
            <v-icon v-if="avatar.url" size="x-small" color="white"
              class="bg-red-500 p-2 absolute cursor-pointer rounded-50" @click="removeImageUrl">mdi-close</v-icon>
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
        <v-btn class="bg-primary px-4" color="white" :loading="loading" @click="updateProfile">Cập nhập</v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script setup>
import { ref, computed, watch, onMounted, defineEmits } from 'vue';
import { useDisplay } from 'vuetify/lib/framework.mjs';

import { getCloudinaryUrl } from '@/utils/cloudinary';
import { getProfileByUserId, updateProfileById } from '@/services/apis/customerService';
import { uploadImageToCloudinary } from '@/services/apis/cloudinaryService';
import { useAuthStore } from '@/stores/useAuthStore';
import { Date } from 'core-js';

const { xsAndDown } = useDisplay();
const authStore = useAuthStore();

const emit = defineEmits(['update:fetch']);

// form data
const firstName = ref();
const lastName = ref();
const address = ref();
const tel = ref();
const email = ref();
const gender = ref();

const menu = ref(false);
const birthDate = ref(null);


// Hàm định dạng ngày
const formattedDate = computed(() => {
  return birthDate.value
    ? new Date(birthDate.value).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
    : "";
});

const avatar = ref({
  url: null,
  file: null,
});

const onFileChange = (event) => {
  const file = event.target.files[0];
  if (!file || !isImageFile(file)) {
    alert('Vui lòng chọn file hình ảnh hợp lệ (jpg, png, gif, webp)');
    return;
  }

  avatar.value.file = file;
  const reader = new FileReader();
  reader.onload = (e) => {
    avatar.value.url = e.target.result;
  };
  reader.readAsDataURL(file);
};

const isImageFile = (file) => {
  const acceptedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  const fileName = file.name.toLowerCase();
  const extensionCheck = fileName.endsWith('.jpg') || fileName.endsWith('.jpeg') ||
    fileName.endsWith('.png') || fileName.endsWith('.gif') || fileName.endsWith('.webp');

  return acceptedTypes.includes(file.type) || extensionCheck;
};

const fileInputRef = ref(null);

// Hàm để kích hoạt click
const triggerFileInput = () => {
  if (fileInputRef.value) {
    fileInputRef.value.click();
  }
};

const removeImageUrl = () => {
  avatar.value = {
    url: null,
    file: null,
  }
};

// fetchAddressByUserId 
const originalAvatarUrl = ref(null);
const fetchAddressByUserId = async () => {
  try {
    const userId = authStore.user.userID;

    console.log("id: ", userId);

    const res = await getProfileByUserId(userId);
    const data = res.data.data;

    firstName.value = data.firstName;
    lastName.value = data.lastName;
    email.value = data.email;
    tel.value = data.phone;
    birthDate.value = new Date(data.dateOfBirth);
    gender.value = data.gender;
    avatar.value.url = getCloudinaryUrl(data.avatar);
    originalAvatarUrl.value = data.avatar; // Lưu URL gốc của avatar


    console.log("Avatar: ", avatar.value.url);
    console.log("Profile: ", res.data);
  } catch (error) {
    console.log("Profile: API_Error: ", error);
  }
}

onMounted(() => {
  fetchAddressByUserId();
})

function formatDate(date, format = 'yyyy/mm/dd') {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = (d.getMonth() + 1).toString().padStart(2, '0');
  const day = d.getDate().toString().padStart(2, '0');

  return format.replace('yyyy', year).replace('mm', month).replace('dd', day);
}

const loading = ref(false);
const formValid = ref(false);
const formRef = ref();
const noti = ref({
  message: null,
  type: null,
  show: false
});

const updateProfile = async () => {
  if (!formRef.value.validate()) return;

  try {
    loading.value = true;

    const imageUrl = avatar.value.url.split('/upload/');
    if (avatar.value.file && imageUrl !== originalAvatarUrl.value) {
      const uploadedUrl = await uploadImageToCloudinary(avatar.value.file);
      const filePath = uploadedUrl.split('/upload/')[1];
      avatar.value = {
        url: filePath,
        file: null
      }
    } else {
      avatar.value.url = originalAvatarUrl.value;
    }

    const request = {
      authUserId: authStore.user.id,
      firstName: firstName.value,
      lastName: lastName.value,
      dob: formatDate(birthDate.value, 'yyyy-mm-dd'),
      gender: gender.value,
      phone: tel.value,
      avatar: avatar.value.url,
    };

    const res = await updateProfileById(request);

    if (res.status === 200) {
      noti.value = {
        message: "Cập nhật thành công",
        type: "success",
        show: true
      };
    } else {
      noti.value = {
        message: "Cập nhật thất bại",
        type: "error",
        show: true
      };
    }

    fetchAddressByUserId();
    emit('update:fetch', true);
  } catch (error) {
    noti.value = {
      message: "Có lỗi xảy ra khi cập nhật",
      type: "error",
      show: true
    };
    console.log("Profile: API_Error: ", error);
  } finally {
    loading.value = false;
  }
}
</script>

<style lang="scss" scoped>
.p\:v-text-field {
  ::v-deep(.v-field__input) {
    padding-top: 1.5rem;
    padding-bottom: 0;
  }

  &.capitalize {
    ::v-deep(.v-field__input) {
      text-transform: capitalize;
    }
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