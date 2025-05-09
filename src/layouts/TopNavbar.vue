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
              class="text-3xl font-lobster font-serif no-select font-extrabold hover:text-blue-600 cursor-pointer transition duration-300"
              aria-label="Flatlogic">
              BELLION
            </router-link>

            <!-- Search & Cart Icons (Mobile/Tablet) -->
            <div class="lg:hidden">
              <div class="flex justify-between items-center gap-4 my-auto">
                <div class="cursor-pointer" icon aria-label="Search" @click="isSearch = true"><v-icon
                    class="mdi mdi-magnify icon-hover" size="1.6rem"></v-icon></div>
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
                    <v-list-item v-for="child in item.children" :key="child.text"
                      @click="handleMenuItemCategoryClick(child.id, child.link)"
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
              <div class="mx-2 cursor-pointer" icon aria-label="Search" @click="isSearch = true"><v-icon
                  class="mdi mdi-magnify icon-hover text-3xl font-bold"></v-icon></div>
              <div class="mx-2 cursor-pointer">
                <v-badge color="red" :content="totalItemCart" offset-x="0" offset-y="0">
                  <v-icon class="mdi mdi-cart-outline icon-hover text-3xl font-bold" @click="toggleCart"></v-icon>
                </v-badge>
              </div>

              <!-- notification -->
              <div>
                <v-menu v-if="authStore.isLoggedIn" offset-y location="bottom" transition="fade-transition">
                  <template #activator="{ props }">
                    <div v-bind="props" class="mx-2 cursor-pointer">
                      <v-badge color="red" :content="notificationsCount" offset-x="0" offset-y="0" bordered overlap>
                        <v-icon class="mdi mdi-bell-outline text-3xl font-bold icon-hover"></v-icon>
                      </v-badge>
                    </div>
                  </template>

                  <v-card min-width="300" class="py-2">
                    <v-list>
                      <v-list-item v-for="(notification, index) in notifications" :key="index"
                        class="cursor-pointer hover:bg-gray-100">
                        <v-list-item-title class="text-xs">{{ notification }}</v-list-item-title>
                      </v-list-item>
                      <v-list-item v-if="notifications.length === 0">
                        <v-list-item-title>Không có thông báo mới</v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-card>
                </v-menu>
                <div v-else class="mx-2 cursor-pointer">
                  <v-icon class="mdi mdi-bell-outline icon-hover text-3xl font-bold"></v-icon>
                </div>
              </div>

              <!-- Account menu -->
              <div>
                <v-menu v-if="authStore.isLoggedIn" open-on-hover location="bottom" transition="fade-transition">
                  <template #activator="{ props }">
                    <div v-bind="props" class="mx-2 cursor-pointer">
                      <v-icon icon="mdi-account-outline" class="text-3xl font-bold" />
                    </div>
                  </template>
                  <v-list class="w-200-px">
                    <v-list-item to="/account/of-customer" link>
                      <v-list-item-title>Hồ sơ</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="handleLogout" link>
                      <v-list-item-title>Đăng xuất</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
                <div v-else class="mx-2 cursor-pointer" @click="goToAuth"><v-icon
                    class="mdi mdi-account-outline icon-hover text-3xl font-bold"></v-icon></div>
              </div>
            </div>
          </v-container>
        </v-container>
      </v-app-bar>
    </v-container>

    <!-- Expanded components -->
    <MenuSidebar :drawer="drawer" :menu-items="menuItems" @update:drawer="drawer = $event" />
    <CartSidebar :is-cart="isCart" @update:is-cart="isCart = $event" />
    <SearchTopbar :is-search="isSearch" @update:is-search="isSearch = $event" />
  </div>
</template>

<script setup>
import { ref, onMounted, watchEffect, nextTick, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { toggleScroll } from "@/utils/scrollUtil";

import MenuSidebar from "@/components/Navigation/MenuSidebar.vue";
import CartSidebar from "@/components/Cart/CartSidebar.vue";
import SearchTopbar from "@/components/Search/SearchTopbar.vue";
import { useCategoryStore } from "@/stores/useCategory";
import { useCartStore } from "@/stores/useCartStore";
import { useCartStateStore } from "@/stores/useCartStateStore";
import { useAuthStore } from "@/stores/useAuthStore";

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();
const authState = computed(() => authStore.isLoggedIn);
const cartStore = useCartStore();
const totalItemCart = computed(() => cartStore.totalItems);

const drawer = ref(false);
const cartStateStore = useCartStateStore();
const isCart = computed({
  get: () => cartStateStore.cartState,
  set: (value) => cartStateStore.toggleCartState(value),
});
// Kiểm tra trạng thái giỏ hàng
const toggleCart = () => {
  cartStateStore.toggleCartState(!cartStateStore.cartState);
};

const isSearch = ref(false);

const categoryStore = useCategoryStore();

onMounted(() => {
  categoryStore.fetchCategories();
})

const menuItems = ref([
  { text: "Sản phẩm mới", link: "/collections/new" },
  { text: "Giảm giá", link: "/collections/onsale" },
  {
    text: "Áo",
    link: `/collections/${"ao"}/${"1"}`,
    children: [],
  },
  {
    text: "Quần",
    link: `/collections/${"quan"}/${"2"}`,
    children: [],
  },
  { text: "Hệ thống cửa hàng", link: "/store/he-thong-cua-hang" },
  // { text: "Ưu đãi", link: "/discount-promotion" }
]);


const onOutsideClick = () => {
  drawer.value = false;
};

const handleDrawerToggle = () => {
  drawer.value = !drawer.value;
  toggleScroll(drawer.value); // Gọi hàm để ẩn hoặc hiện thanh cuộn
};

// Tự động cập nhật menu items khi categories thay đổi
watchEffect(() => {
  // Cập nhật danh sách các category cho menu áo/quần
  menuItems.value.find((item) => item.text === "Áo").children = categoryStore.shirtCategories;
  menuItems.value.find((item) => item.text === "Quần").children = categoryStore.pantsCategories;
});

const handleMenuItemCategoryClick = async (categoryId, path) => {
  categoryStore.setSelectedCategory(categoryId);
  await nextTick();
  router.push(path);
}

const handleLogout = () => {
  authStore.logout();
  router.push("/home");
}

const goToAuth = () => {
  router.push("/auth")
}

const notifications = ref([
])

const notificationsCount = ref(notifications.value.length)
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
