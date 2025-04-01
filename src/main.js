import { createApp } from "vue";
import { createPinia } from "pinia";
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

// font-awesome
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// Material Design Icons (MDI)
import "@mdi/font/css/materialdesignicons.css";

import "@/styles/style.css";

// SCSS Styles
import "@/styles/index.scss";

// Khởi tạo Vue Router
const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 };
  }
});

// Khởi tạo Vuetify
const vuetify = createVuetify({
  icons: {
    defaultSet: 'mdi',  // Sử dụng Material Design Icons
    aliases,
  },
  components,
  directives,
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        typography: {
          fontFamily: 'Montserrat, Roboto, sans-serif',
        },
      },
    },
  },
})

// Khởi tạo ứng dụng Vue
const app = createApp(App);

app.component('font-awesome-icon', FontAwesomeIcon);

app.use(vuetify); // Đăng ký Vuetify
app.use(createPinia()); // Đăng ký Pinia
app.use(router); // Đăng ký Vue Router

app.mount("#app"); // Mount ứng dụng vào phần tử #app
