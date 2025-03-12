<template>
  <div>
    <!-- Header Top -->
    <v-container class="fixed top-0 left-0 bg-deep-purple-darken-4 py-2 overflow-hidden z-100" fluid>
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
  </div>
</template>

<script setup>
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
