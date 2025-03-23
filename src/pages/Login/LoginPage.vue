<template>
  <div class="h-screen w-full bg-gradient-teal-blue">
    <v-container class="h-screen flex items-center justify-center mx-auto"
      :class="{ 'v-container--fluid': smAndDown, 'v-container': mdAndUp }">
      <v-row justify="center">
        <v-col cols="12" md="8" lg="6">
          <v-card elevation="5" class="w-full">
            <v-tabs v-model="tab" class="bg-gray-100" background-color="primary">
              <v-tab class="flex-1 text-center">Đăng nhập</v-tab>
              <v-tab class="flex-1 text-center">Đăng ký</v-tab>
            </v-tabs>

            <v-card-text v-if="tab === 0">
              <v-form>
                <div class="py-8">
                  <v-text-field label="Email or Tên đăng nhập" class="op:v-text-field" outlined required></v-text-field>
                  <v-text-field label="Mật khẩu" :type="showPassword ? 'text' : 'password'" class="op:v-text-field"
                    :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append-inner="togglePassword(showPassword)" @focus="isFocused = true"
                    @blur="isFocused = false" outlined required>
                  </v-text-field>
                </div>
                <v-btn block color="primary" class="mt-4">
                  Đăng Nhập
                </v-btn>
                <div class="py-2 flex justify-between items-center">
                  <router-link class="hover:underline hover:text-red-500">
                    Quên mật khẩu?
                  </router-link>
                  <span class="cursor-pointer hover:underline hover:text-red-500" @click="tab = 1">Bạn chưa có tài
                    khoản?</span>
                </div>
              </v-form>
            </v-card-text>

            <v-card-text v-if="tab !== 0">
              <v-form>
                <div class="py-8">
                  <div class="flex-mnw-768 gap-4">
                    <v-text-field label="Họ" class="op:v-text-field" outlined required></v-text-field>
                    <v-text-field label="Tên" class="op:v-text-field" outlined required></v-text-field>
                  </div>
                  <v-text-field label="Email" type="email" class="op:v-text-field" outlined required></v-text-field>
                  <v-text-field label="Số điện thoại" type="tel" class="op:v-text-field" outlined
                    required></v-text-field>
                  <v-text-field label="Mật khẩu" :type="showPassword ? 'text' : 'password'" class="op:v-text-field"
                    :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append-inner="() => togglePassword(showPassword)" @focus="isFocused = true"
                    @blur="isFocused = false" outlined required></v-text-field>
                  <v-text-field label="Nhập lại mật khẩu" :type="showConfirmPassword ? 'text' : 'password'"
                    class="op:v-text-field" :append-inner-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append-inner="() => toggleConfirmPassword(showConfirmPassword)" @focus="isFocused = true"
                    @blur="isFocused = false" outlined required></v-text-field>
                </div>
                <v-btn block color="primary" class="my-2">
                  Đăng Ký
                </v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useDisplay } from 'vuetify/lib/framework.mjs';

const { smAndDown, mdAndUp } = useDisplay();

const showPassword = ref(false);
const showConfirmPassword = ref(false);

const togglePassword = () => showPassword.value = !showPassword.value;

const toggleConfirmPassword = () => showConfirmPassword.value = !showConfirmPassword.value;

const tab = ref(0);

const isFocused = ref(false);
</script>

<style lang="scss" scoped>
.op\:v-text-field {
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