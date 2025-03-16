<template>
  <!-- Khối lớn bao phủ toàn bộ menu -->
  <div class="w-full h-16 fixed top-5/2r bg-white left-0 xs:bg-gray-200 shadow-md z-100">
    <!-- Menu Navigation -->
    <v-app-bar elevation="5" color="transparent" class="relative_imp max-w-screen-xl mx-auto">
      <v-container class="md:w-8/10 md:w-full h-full flex justify-center items-center mx-auto">
        <v-container class="w-full h-full flex justify-between items-center">

          <v-app-bar-nav-icon class="block lg:hidden" @click="drawer = !drawer"></v-app-bar-nav-icon>

          <!-- Logo -->
          <router-link variant="text" to="/home"
            class="text-2xl font-serif no-select font-extrabold hover:text-blue-600 cursor-pointer transition duration-300"
            aria-label="Flatlogic">
            BELLION
          </router-link>

          <!-- Search & Cart Icons (Mobile/Tablet) -->
          <div class="flex items-center gap-4 lg:hidden">
            <router-link class="mx-2 cursor-pointer" icon aria-label="Search"><v-icon
                class="mdi mdi-magnify icon-hover text-3xl font-bold"></v-icon></router-link>
            <router-link class="mx-2 cursor-pointer" icon aria-label="Cart">
              <v-badge color="red" content="1" offset-x="0" offset-y="0">
                <v-icon class="mdi mdi-cart-outline icon-hover text-3xl font-bold"></v-icon>
              </v-badge>
            </router-link>
          </div>

          <!-- Menu Links (Nằm giữa) -->
          <div class="hidden lg:flex h-full no-select justify-center items-center font-poppins text-xl font-bold gap-6">
            <div v-for="item in menuItems" :key="item.text" class="relative cursor-pointer group mx-2"
              @mouseleave="item.isOpen = false">
              <!-- Nếu có menu con -->
              <v-menu v-if="item.children" v-model="item.isOpen" attach="body" transition="scale-transition" offset-y>
                <template v-slot:activator="{ props }">
                  <router-link :to="item.link" v-bind="props"
                    class="menu-item text-sm font-sans flex items-center gap-1" @mouseenter="item.isOpen = true">
                    {{ item.text }}
                    <v-icon size="small" class="mdi mdi-chevron-down"></v-icon>
                  </router-link>
                </template>

                <!-- Nội dung menu con -->
                <v-list
                  class="no-select shadow-lg bg-white text-xl rounded-md translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
                  @mouseenter="item.isOpen = true" @mouseleave="item.isOpen = false">
                  <v-list-item v-for="child in item.children" :key="child.text" :to="child.link"
                    class="block w-full text-left px-4 py-2 text-sm dropdown-item font-light font-serif hover:bg-gray-100">
                    {{ child.text }}
                  </v-list-item>
                </v-list>
              </v-menu>

              <!-- Nếu không có menu con -->
              <router-link v-else :to="item.link" class="menu-item text-sm font-sans flex items-center gap-1">
                {{ item.text }}
              </router-link>
            </div>
          </div>

          <!-- Icons (Căn sát phải) -->
          <div class="hidden lg:flex gap-4 justify-center items-center h-full">
            <router-link class="mx-2 cursor-pointer" icon aria-label="Search"><v-icon
                class="mdi mdi-magnify icon-hover text-3xl font-bold"></v-icon></router-link>
            <router-link class="mx-2 cursor-pointer" icon aria-label="Cart">
              <v-badge color="red" content="0" offset-x="0" offset-y="0">
                <v-icon class="mdi mdi-cart-outline icon-hover text-3xl font-bold"></v-icon>
              </v-badge>
            </router-link>
            <router-link class="mx-2 cursor-pointer" icon aria-label="Notification">
              <v-badge color="red" content="0" offset-x="0" offset-y="0">
                <v-icon class="mdi mdi-bell-outline icon-hover text-3xl font-bold"></v-icon>
              </v-badge>
            </router-link>
            <router-link class="mx-2 cursor-pointer" icon aria-label="Account"><v-icon
                class="mdi mdi-account-outline icon-hover text-3xl font-bold"></v-icon></router-link>
          </div>
        </v-container>
      </v-container>
    </v-app-bar>

    <!-- Routes name -->
    <v-card v-if="breadcrumbs.length" class="w-full shadow-none bg-gray-200 p-0">
      <v-card-text class="py-2 px-16 text-left text-xs text-gray-500">
        <span v-for="(breadcrumb, index) in breadcrumbs" :key="index">
          <span class="mx-2">{{ breadcrumb }}</span>
          <span v-if="index < breadcrumbs.length - 1"> / </span>
        </span>
      </v-card-text>
    </v-card>

    <!-- Mobile Navigation Drawer -->
    <v-navigation-drawer class="z-1150_imp top-0 h-auto bottom-0 bg-white" v-model="drawer" temporary
      :scrim="scrimColor" @click:outside="onOutsideClick">
      <v-list>
        <div class="text-left flex items-center justify-between">
          <span class="block text-lg font-medium px-4 py-2 text-left">
            DANH MỤC
          </span>
          <v-btn class="bg-transparent custom:v-btn" @click="drawer = false">
            <v-icon class="mdi mdi-close"></v-icon>
          </v-btn>
        </div>
        <hr class="border-2 border-blue-500 shadow-md" />
      </v-list>

      <v-list class="flex flex-col">
        <!-- Đảm bảo danh sách hiển thị dọc -->
        <v-list-item v-for="item in menuItems" :key="item.text" class="text-left">
          <template v-if="!item.children">
            <!-- Menu không có con -->
            <router-link :to="item.link" class="block w-full text-lg font-medium px-4 py-2 text-left hover:bg-gray-200">
              {{ item.text }}
            </router-link>
          </template>

          <template v-else>
            <!-- Menu có con -->
            <v-list-group v-model="item.expanded" no-action append-icon="" class="text-left">
              <template v-slot:activator="{ props }">
                <v-list-item v-bind="props" @click="item.expanded = !item.expanded" class="text-left hover:bg-gray-200">
                  <v-list-item-title :class="{ 'text-red-500': item.expanded }" class="text-left">
                    {{ item.text }}
                  </v-list-item-title>
                </v-list-item>
              </template>

              <!-- Menu con -->
              <v-list-item v-for="child in item.children" :key="child.text" class="pl-6 text-left hover:bg-gray-200">
                <router-link :to="child.link" class="block w-full text-base font-light px-4 py-2 text-left">
                  {{ child.text }}
                </router-link>
              </v-list-item>
            </v-list-group>
          </template>
        </v-list-item>
      </v-list>

      <!-- Tài khoản (Chuyển xuống dưới trên mobile) -->
      <v-list class="fixed bottom-0 bg-white_imp">
        <hr />
        <v-list-item class="mt-auto hover:bg-gray-200"> <!-- mt-auto đẩy xuống cuối -->
          <router-link class="flex items-center gap-2 text-lg px-4 py-2" to="/">
            <v-icon class="mdi mdi-account-circle text-2xl"></v-icon>
            <h4 style="margin-left: 10px;">Thông tin tài khoản</h4>
          </router-link>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";

import { toggleScroll } from "@/utils/scrollUtil";

const drawer = ref(false);
const scrimColor = "rgba(0, 0, 0, 0.5)";

const menuItems = ref([
  { text: "Sản phẩm mới", link: "/products/new" },
  { text: "Giảm giá", link: "/products/promo" },
  {
    text: "Áo",
    link: "/products/shirt",
    children: [
      { text: "Áo phông", link: "/products/shirt/t-shirt" },
      { text: "Áo sơ mi", link: "/products/shirt/formal-shirt" },
      { text: "Áo Polo", link: "/products/shirt/polo-shirt" },
      { text: "Áo khoác", link: "/products/shirt/jacket" },
      { text: "Áo Sweater", link: "/products/shirt/sweater" },
      { text: "Áo len", link: "/products/shirt/wool-sweater" },
      { text: "Áo Blazer", link: "/products/shirt/blazer" },
    ],
  },
  {
    text: "Quần",
    link: "/products/pants",
    children: [
      { text: "Quần Jean", link: "/products/pants/jeans" },
      { text: "Quần Âu", link: "/products/pants/trousers" },
      { text: "Quần short", link: "/products/pants/shorts" },
    ],
  },
  { text: "Hệ thống cửa hàng", link: "/system-store" },
  { text: "Ưu đãi", link: "/discount-promotion" }
]);

const route = useRoute();

const routeNameMap = {
  "Home": "Trang chủ",
  "New Product": "Sản phẩm mới"
};

const breadcrumbs = computed(() => {
  if (route.name === "Home") return [];

  return route.matched.map((matchRoute) => {
    return matchRoute.name ? routeNameMap[matchRoute.name] : routeNameMap["Home"];
  });
});


const onOutsideClick = () => {
  drawer.value = false;
};

const handleDrawerToggle = () => {
  drawer.value = !drawer.value;
  toggleScroll(drawer.value); // Gọi hàm để ẩn hoặc hiện thanh cuộn
};

</script>

<style scoped>
.relative_imp {
  position: relative !important;
}

.overfow-visible_imp {
  overflow: visible !important;
}

.custom-v-list {
  all: unset;
}

.z-1150_imp {
  z-index: 1150 !important;
}

.z-1100 {
  z-index: 1100;
}
</style>
