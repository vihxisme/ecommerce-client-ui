<template>
  <!-- Routes name -->
  <v-card v-if="breadcrumbs.length" class="w-full block shadow-none bg-gray-200 p-0">
    <v-container class="p-0" :class="{ 'v-container--fluid': lgAndDown, 'v-container': xlAndUp }">
      <v-card-text class="py-2 text-left text-xs text-gray-500 overflow-x-auto bc:v-card-text whitespace-nowrap">
        <span v-for="(breadcrumb, index) in breadcrumbs" :key="index">
          <span class="mx-2">{{ breadcrumb }}</span>
          <span v-if="index < breadcrumbs.length - 1">
            <v-icon class="bg-gray-200">mdi-chevron-right</v-icon>
          </span>
        </span>
      </v-card-text>
    </v-container>
  </v-card>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import { useDisplay } from "vuetify/lib/framework.mjs";
import { useCategoryStore } from "@/stores/useCategory";

const { lgAndDown, xlAndUp } = useDisplay();

const route = useRoute();

const categoryStore = useCategoryStore();

const routeNameMap = {
  "Home": "Trang chủ",
  "New Product": "Sản phẩm mới",
  "Promo Product": "Sản phẩm khuyến mãi",
  "Shirt": "Áo",
  "T-shirt": "Áo phông",
  "Formal-Shirt": "Áo sơ mi",
  "Polo-Shirt": "Áo Polo",
  "Jacket": "Áo khoác",
  "Sweater": "Áo Sweater",
  "Wool Sweater": "Áo len",
  "Blazer": "Áo Blazer",
  "Pants": "Quần",
  "Jeans": "Quần Jean",
  "Trousers": "Quần Âu",
  "Shorts": "Quần short",
  "Product Details": "Chi tiết sản phẩm",
  "Of Customer": "Tài khoản của tôi",
  "By Category": "Sản phẩm",
  "Shirt Pants": "Sản phẩm",
  "Store Locator": "Hệ thống cửa hàng"
};

const breadcrumbs = computed(() => {
  if (route.name === "Home") return [];

  const breadcrumbMap = {
    "Shirt Pants": (route) => [
      ...route.matched.map((matchRoute) => routeNameMap[matchRoute.name] || routeNameMap["Home"]),
      (route.params.apparelType === "1" ? "Áo" : "Quần"),
    ],
    "By Category": (route) => [
      ...route.matched.map((matchRoute) => routeNameMap[matchRoute.name] || routeNameMap["Home"]),
      categoryStore.getCategoryBySlug(route.params.categorySlug || ""),
    ],
    "Product Details": (route) => [
      ...route.matched.map((matchRoute) => routeNameMap[matchRoute.name] || routeNameMap["Home"]),
      (route.params.productName || "").replace(/-/g, " - "),
    ],
  };

  return breadcrumbMap[route.name] ? breadcrumbMap[route.name](route) : route.matched.map((matchRoute) => {
    return matchRoute.name ? routeNameMap[matchRoute.name] : routeNameMap["Home"];
  });
});
</script>

<style lang="scss" scoped>
.bc\:v-card-text {

  padding-left: 4rem;
  padding-right: 4rem;

  @media (max-width: 768px) {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }

  overflow-x: auto;

  /* Tùy chỉnh thanh cuộn */
  &::-webkit-scrollbar {
    height: 2px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }
}
</style>