<template>
  <v-navigation-drawer v-model="localSearch" @update:model-value="handleClose" height="100%"
    class="fixed top-0 left-0 right-0 shadow-lg" location="top" :temporary="true" scrim>
    <v-container :class="xlAndUp ? 'v-container' : 'v-container--fluid'"
      class="h-full bg-gray-100 flex flex-col justify-center items-center">
      <!-- <v-logo class="text-3xl font-bold">Tìm kiếm</v-logo>
      <v-text-field label="Tìm kiếm sản phẩm..." class="w-1/2 grow-0 st:v-text-field" append-inner-icon="mdi-magnify"
        outlined hide-details></v-text-field>
      <v-icon class="cursor-pointer hover:text-red-500" @click="handleClose">mdi-close</v-icon> -->
      <div class="flex justify-between items-center w-full px-8">
        <v-logo class="text-3xl font-bold">Tìm kiếm</v-logo>
        <v-icon class="cursor-pointer hover:text-red-500" @click="handleClose">mdi-close</v-icon>
      </div>
      <div class="flex justify-center items-center w-full mt-8">
        <v-text-field label="Tìm kiếm sản phẩm..." class="w-1/2 grow-0 st:v-text-field" append-inner-icon="mdi-magnify"
          outlined hide-details></v-text-field>
      </div>
    </v-container>
  </v-navigation-drawer>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits } from 'vue';
import { useDisplay } from 'vuetify/lib/framework.mjs';

const { xlAndUp } = useDisplay();

const props = defineProps({
  isSearch: {
    type: Boolean,
    default: false
  }
});

const localSearch = ref(false);

const emit = defineEmits(["update:isSearch"]);


// Đồng bộ `localSearch` với prop `isSearch` qua watch
watch(() => props.isSearch, (newVal) => {
  localSearch.value = newVal;
});

// Emit sự kiện để báo với cha khi filter đóng
const handleClose = () => {
  localSearch.value = false;
  emit('update:isSearch', false); // Báo với component cha là modal đã đóng
};
</script>

<style lang="scss" scoped>
.st\:v-text-field {
  ::v-deep(.v-field__input) {
    padding-top: 1.5rem;
    padding-bottom: 0;
  }
}
</style>