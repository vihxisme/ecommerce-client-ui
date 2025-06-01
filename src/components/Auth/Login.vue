<template>
  <v-container fluid>
    <v-alert v-model="isShow" color="transparent">
      <span class="text-red-500 font-lobster">{{ contenAlert }}</span>
    </v-alert>
    <v-snackbar v-model="isSuccess" :timeout="7000" location="center center" color="success">
      <div class="flex flex-col gap-4 justify-center items-center">
        <span class="font-lobster text-lg">Đang xử lý</span>
        <v-progress-circular indeterminate color="white" />
      </div>
    </v-snackbar>
    <v-form>
      <div class="py-8">
        <v-text-field v-model="identifier" label="Email or Tên đăng nhập" class="lg:v-text-field" outlined
          required></v-text-field>
        <v-text-field v-model="password" label="Mật khẩu" :type="showPassword ? 'text' : 'password'"
          class="lg:v-text-field" :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append-inner="togglePassword(showPassword)" @focus="isFocused = true" @blur="isFocused = false"
          outlined required>
        </v-text-field>
      </div>
      <v-btn block color="primary" class="mt-4" @click="handleLogin">
        Đăng Nhập
      </v-btn>
      <div class="py-2 flex justify-between items-center">
        <router-link class="hover:underline hover:text-red-500">
          Quên mật khẩu?
        </router-link>
        <span class="cursor-pointer hover:underline hover:text-red-500" @click="updateTab">Bạn chưa có tài
          khoản?</span>
      </div>
    </v-form>
  </v-container>
</template>

<script setup>
import { ref, defineEmits } from "vue";
import { login } from "@/services/apis/authService";
import { useAuthStore } from "@/stores/useAuthStore";
import { useRouter } from "vue-router";

const router = useRouter();
const emit = defineEmits("update-tab");

const showPassword = ref(false);

const togglePassword = () => showPassword.value = !showPassword.value;

const isFocused = ref(false);
const isShow = ref(false);
const contenAlert = ref();

const isSuccess = ref(false);

const identifier = ref();
const password = ref();

const authStore = useAuthStore();

const handleLogin = async () => {
  try {
    isSuccess.value = true;
    const request = {
      identifier: identifier.value,
      password: password.value,
    }

    const res = await login(request);
    const data = res.data.data;

    console.log("Login: ", res.data);
    if (data.loginDTO.role === "CUSTOMER") {
      authStore.setAuth(data.token, data.loginDTO);


      setTimeout(() => {
        router.push("/home");
      }, 3000);

    } else {
      isShow.value = true;
      contenAlert.value = "Thông tin đăng nhập không chính xác!";
    }

  } catch (error) {
    isShow.value = true;
    contenAlert.value = "Có lỗi xảy ra!";
    console.log("Login: API_Error: ", error);
  } finally {
    isSuccess.value = false;
  }
}

const updateTab = () => {
  emit("update-tab", 1);
}
</script>

<style lang="scss" scoped>
.lg\:v-text-field {
  ::v-deep(.v-field__input) {
    padding-top: 1.5rem;
    padding-bottom: 0.2rem;
  }
}
</style>
