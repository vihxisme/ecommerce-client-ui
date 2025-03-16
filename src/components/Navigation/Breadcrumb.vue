<template>
  <!-- Routes name -->
  <v-card v-if="breadcrumbs.length" class="w-full block shadow-none bg-gray-200 p-0">
    <v-card-text class="py-2 px-16 text-left text-xs text-gray-500">
      <span v-for="(breadcrumb, index) in breadcrumbs" :key="index">
        <span class="mx-2">{{ breadcrumb }}</span>
        <span v-if="index < breadcrumbs.length - 1">
          <v-icon class="bg-gray-200">mdi-chevron-right</v-icon>
        </span>
      </span>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";

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
</script>