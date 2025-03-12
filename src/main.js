import { createApp } from "vue";
import App from "./App.vue";

// Vue Router
import { createRouter, createWebHistory } from "vue-router";
import routes from "@/routes/routes";

// Vuetify
import "vuetify/styles"; // Vuetify styles
import { createVuetify } from "vuetify";
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

// tiktok logo
import tiktoklogo from '@/assets/images/documentation/tiktok-logo.svg';

// Material Design Icons (MDI)
import "@mdi/font/css/materialdesignicons.css";

// SCSS Styles
import "@/styles/index.scss";

const customIcons = {
  tiktok: {
    component: tiktoklogo, // Định nghĩa component SVG
  },
};

// Khởi tạo Vue Router
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Khởi tạo Vuetify
const vuetify = createVuetify({
  icons: {
    defaultSet: 'mdi',  // Sử dụng Material Design Icons
    aliases,
    sets: {
      mdi,
      custom: customIcons,
    },
  },
  components,
  directives,
})

// Khởi tạo ứng dụng Vue
const app = createApp(App);

app.use(router); // Đăng ký Vue Router
app.use(vuetify); // Đăng ký Vuetify

app.mount("#app"); // Mount ứng dụng vào phần tử #app
