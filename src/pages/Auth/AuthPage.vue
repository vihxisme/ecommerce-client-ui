<template>
  <div class="h-screen w-full bg-gradient-teal-blue">
    <v-container class="h-screen flex items-center justify-center mx-auto"
      :class="{ 'v-container--fluid': smAndDown, 'v-container': mdAndUp }">
      <v-row justify="center">
        <v-col cols="12" md="8" lg="6">
          <v-card elevation="5" class="w-full">
            <v-tabs v-model="tab" class="bg-gray-100" color="primary">
              <v-tab class="flex-1 text-center">Đăng nhập</v-tab>
              <v-tab class="flex-1 text-center">Đăng ký</v-tab>
            </v-tabs>

            <v-card>
              <div v-if="tab === 0">
                <login />
              </div>

              <div v-if="tab !== 0">
                <register @update-tab="tab = $event" />
              </div>
            </v-card>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useDisplay } from 'vuetify/lib/framework.mjs';

import Login from '@/components/Auth/Login.vue';
import Register from '@/components/Auth/Register.vue';

const { smAndDown, mdAndUp } = useDisplay();

const tab = ref(0);
</script>

<style lang="scss" scoped>
.op\:v-text-field {
  ::v-deep(.v-field__input) {
    padding-top: 1.5rem;
    padding-bottom: 0;
  }
}
</style>