<template>
  <!-- Header Top -->
  <v-container class="hidden lg:block fixed top-0 left-0 bg-deep-purple-darken-4 py-2 overflow-hidden z-100" fluid>
    <v-container class="p-0" :class="{ 'v-container--fluid': lgAndDown, 'v-container': xlAndUp }">
      <v-row justify="center" align="center">
        <v-col cols="10">
          <div class="marquee">
            <div class="marquee-inner">
              <span class="text-white text-caption marquee-text">
                {{ title_header }}
              </span>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script setup>
import { useDisplay } from 'vuetify/lib/framework.mjs';

const { lgAndDown, xlAndUp } = useDisplay();

const title_header = "Hotline: 0123 456 789 (8:30 - 22:00, Tất cả các ngày trong tuần)";
</script>

<style scoped>
/* Kiểm soát vùng hiển thị */
.marquee {
  position: relative;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  height: 1.5rem;
  display: flex;
  align-items: center;
}

/* Tạo dòng chữ chạy */
.marquee-inner {
  display: flex;
  width: max-content;
  animation: marqueeLoop 10s linear infinite;
}

/* Định nghĩa chuyển động */
@keyframes marqueeLoop {
  from {
    transform: translateX(200%);
  }

  to {
    transform: translateX(-100%);
  }
}
</style>
