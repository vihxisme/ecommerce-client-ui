<template>
  <div class="w-full">

    <!-- Khối lớn bao phủ toàn bộ menu -->
    <v-container class="w-full fixed top-5/2r tnb:top-0 bg-white left-0 xs:bg-gray-200 shadow-md z-100 p-0" fluid>

      <!-- Menu Navigation -->
      <v-app-bar elevation="5" color="bg-white" absolute scroll-off-screen>
        <v-container class="relative md:w-8/10 md:w-full h-full flex justify-center items-center mx-auto">
          <v-container class="w-full h-full flex justify-between items-center">

            <v-app-bar-nav-icon class="block lg:hidden" @click="drawer = !drawer"></v-app-bar-nav-icon>

            <!-- Logo -->
            <router-link variant="text" to="/home"
              class="text-3xl font-serif no-select font-extrabold hover:text-blue-600 cursor-pointer transition duration-300"
              aria-label="Flatlogic">
              BELLION
            </router-link>

            <!-- Search & Cart Icons (Mobile/Tablet) -->
            <div class="lg:hidden">
              <div class="flex justify-between items-center gap-4 my-auto">
                <router-link class="cursor-pointer" icon aria-label="Search"><v-icon class="mdi mdi-magnify icon-hover"
                    size="1.6rem"></v-icon></router-link>
                <div class="cursor-pointer">
                  <v-badge color="red" content="0" offset-x="0" offset-y="0">
                    <v-icon class="mdi mdi-cart-outline icon-hover" size="1.6rem" @click="isCart = true"></v-icon>
                  </v-badge>
                </div>
                <router-link class="cursor-pointer" icon aria-label="Account"><v-icon
                    class="mdi mdi-account-outline icon-hover" size="1.6rem"></v-icon></router-link>
              </div>
            </div>

            <!-- Menu Links (Nằm giữa) -->
            <div
              class="hidden lg:flex h-full no-select justify-center items-center font-poppins text-xl font-bold gap-6">
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
                    class="no-select w-200-px shadow-lg bg-white text-xl rounded-md translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
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
              <div class="mx-2 cursor-pointer">
                <v-badge color="red" content="0" offset-x="0" offset-y="0">
                  <v-icon class="mdi mdi-cart-outline icon-hover text-3xl font-bold" @click="isCart = true"></v-icon>
                </v-badge>
              </div>
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
    </v-container>
    <!-- Mobile Navigation Drawer -->
    <MenuSidebar :drawer="drawer" :menu-items="menuItems" @update:drawer="drawer = $event" />
    <CartSidebar :is-cart="isCart" @update:is-cart="isCart = $event" />
  </div>
</template>

<script setup>
import { ref } from "vue";

import { toggleScroll } from "@/utils/scrollUtil";

import MenuSidebar from "@/components/Navigation/MenuSidebar.vue";
import CartSidebar from "@/components/Cart/CartSidebar.vue";

const drawer = ref(false);
const isCart = ref(false);

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

.tnb\:top-0 {
  top: 2.5rem;

  @media (max-width: 1024px) {
    top: 0;
  }
}
</style>
