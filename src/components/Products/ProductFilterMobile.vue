<template>
  <v-navigation-drawer v-model="localDrawer" @update:model-value="handleClose" :width="300"
    class="w-300-px h-screen fixed top-0 left-0 shadow-lg"
    :class="{ 'slide-in-left': localDrawer, 'slide-in-right': !localDrawer }">
    <v-card class="h-screen">
      <v-card-title class="px-8 py-4 text-2xl uppercase border-b shadow bg-gray-200 flex justify-between items-center">
        <h2>{{ filterTitle }}</h2>
        <v-icon size="1.5rem" class="hover:text-red-600" @click="handleClose">mdi-close</v-icon>
      </v-card-title>

      <v-list class="px-4 py-8">
        <v-list-group v-model="isPriceRange" expand-icon="mdi-plus" collapse-icon="mdi-minus">
          <template v-slot:activator="{ props }">
            <v-list-item v-bind="props">
              <v-list-item-title class="text-left text-base font-semibold">{{ priceRangeTitle }}</v-list-item-title>
            </v-list-item>
          </template>

          <v-list-item class="pf:v-list-item__range-price">
            <v-range-slider v-model="priceRange" :min="0" :max="10000000" :step="10" color="blue"
              track-color="light-blue" thumb-color="red" thumb-label="always" class="px-2 py-8" ticks dense>
              <template v-slot:thumb-label="{ modelValue }">
                <span class="text-white">{{ formatPrice(modelValue) }}₫</span>
              </template>
            </v-range-slider>
          </v-list-item>
        </v-list-group>
      </v-list>

      <div class="w-full absolute bottom-0 px-4 py-4 border-t flex justify-between items-center">
        <v-btn class="border mx-2 flex-grow" flat @click="handleFiltered">Lọc</v-btn>
        <v-btn class="border mx-2 flex-grow" flat @click="handleClose">Hủy</v-btn>
      </div>
    </v-card>
  </v-navigation-drawer>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits } from "vue";

const props = defineProps({
  drawer: {
    type: Boolean,
    required: true
  }
});

// const overlayVisible = ref(false);

const emit = defineEmits(["update:priceRange", "update:drawer"]);

const localDrawer = ref(false);

// Lắng nghe sự thay đổi của trạng thái drawer
// watch(localDrawer, (newValue) => {
//   if (!newValue) {
//     setTimeout(() => {
//       overlayVisible.value = false;
//     }, 3000);
//   }
// });

// Đồng bộ `localDialog` với prop `dialog` qua watch
watch(() => props.drawer, (newVal) => {
  localDrawer.value = newVal;
  // overlayVisible.value = newVal;
});

// Emit sự kiện để báo với cha khi filter đóng
const handleClose = () => {
  localDrawer.value = false;
  emit('update:drawer', false); // Báo với component cha là modal đã đóng
};


const filterTitle = ref("Bộ lọc");


const isPriceRange = ref(false);
const priceRangeTitle = ref("Giá");
const priceRange = ref([0, 10000000]);

const handlePriceChange = (newValue) => {
  emit("update:priceRange", newValue);
}

const handleFiltered = () => {
  emit("update:priceRange", priceRange.value);
  handleClose();
}

const formatPrice = (price) => price.toLocaleString("vi-VN");
</script>

<style lang="scss" scoped>
.slide-in-left {
  animation: slideInLeft 0.5s ease-in-out;

  @keyframes slideInLeft {
    0% {
      transform: translateX(-100%);
    }

    100% {
      transform: translateX(0);
    }
  }
}

.slide-in-right {
  animation: slideInRight 0.5s ease-in-out;

  @keyframes slideInRight {
    0% {
      transform: translateX(0);
    }

    100% {
      transform: translateX(-100%);
    }
  }
}
</style>