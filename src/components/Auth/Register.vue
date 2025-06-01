<template>
  <v-container fluid>
    <v-snackbar v-model="isSuccess" :timeout="5000" location="center center" color="primary">
      <div class="flex flex-col gap-4 justify-center items-center">
        <v-progress-circular indeterminate color="white" />
        <span class="font-lobster text-lg">Đang xử lý</span>
      </div>
    </v-snackbar>
    <v-snackbar v-model="isNoti" :timeout="5000" location="top center" color="primary">
      {{ contentNoti }}
    </v-snackbar>
    <v-form>
      <v-card class="pt-4 shadow-none">
        <div>
          <v-text-field v-model="username" label="Tên đăng nhập" class="rgt:v-text-field" outlined
            required></v-text-field>
          <div class="flex-mnw-768 gap-4">
            <v-text-field v-model="firstName" label="Họ" class="rgt:v-text-field" outlined required></v-text-field>
            <v-text-field v-model="lastName" label="Tên" class="rgt:v-text-field" outlined required></v-text-field>
          </div>
          <v-text-field v-model="email" label="Email" type="email" class="rgt:v-text-field" outlined
            required></v-text-field>
          <v-text-field v-model="tel" label="Số điện thoại" type="tel" class="rgt:v-text-field" outlined
            required></v-text-field>
          <v-text-field v-model="password" label="Mật khẩu" :type="showPassword ? 'text' : 'password'"
            class="rgt:v-text-field" :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append-inner="() => togglePassword(showPassword)" @focus="isFocused = true" @blur="isFocused = false"
            outlined required></v-text-field>
          <v-text-field v-model="confirmPassword" label="Nhập lại mật khẩu"
            :type="showConfirmPassword ? 'text' : 'password'" class="rgt:v-text-field"
            :append-inner-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append-inner="() => toggleConfirmPassword(showConfirmPassword)" @focus="isFocused = true"
            @blur="isFocused = false" outlined required></v-text-field>
        </div>
        <v-btn block color="primary" class="my-4" @click="submitRegister">
          Đăng Ký
        </v-btn>
      </v-card>
    </v-form>
  </v-container>
</template>

<script setup>
import { ref, defineEmits } from "vue";
import { register } from "@/services/apis/authService";

const emit = defineEmits("update-tab");

const showPassword = ref(false);
const showConfirmPassword = ref(false);

const togglePassword = () => showPassword.value = !showPassword.value;

const toggleConfirmPassword = () => showConfirmPassword.value = !showConfirmPassword.value;

const isFocused = ref(false);

const username = ref();
const firstName = ref();
const lastName = ref();
const email = ref();
const tel = ref();
const password = ref();
const confirmPassword = ref();

const isSuccess = ref(false);
const isNoti = ref(false);
const contentNoti = ref();

const submitRegister = async () => {
  try {
    const request = {
      username: username.value,
      email: email.value,
      password: password.value,
      confirmPassword: confirmPassword.value,
      firstName: firstName.value,
      lastName: lastName.value,
      phone: tel.value
    };

    console.log("Info: ", request);

    const res = await register(request);
    if (res.data.data.id !== null) {
      isSuccess.value = true;
      setTimeout(() => {
        emit("update-tab", 0);
      }, 5000);
    } else {
      isNoti.value = true;
      contentNoti.value = "Lỗi trùng lặp thông tin!";
    }
    console.log("Register: ", res.data);
  } catch (error) {
    isNoti.value = true;
    contentNoti.value = "Có lỗi xảy ra!";
    console.log("Register: API_Error: ", error);
  }
}
</script>

<style lang="scss" scoped>
.rgt\:v-text-field {
  ::v-deep(.v-field__input) {
    padding-top: 1.5rem;
    padding-bottom: 0;
  }
}

.flex-mnw-768 {
  @media (min-width: 768px) {
    display: flex;
  }
}
</style>