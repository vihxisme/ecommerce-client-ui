<template>
  <div class="hidden lg:block w-full p-4 pl-8 border-r">
    <!-- Hiển thị nội dung lọc -->
    <div v-if="hasPriceChanged"
      class="w-full mt-4 mb-12 px-4 text-left text-2xl font-semibold transition-all ease-in-out duration-300">
      <h3>{{ filterAction }}</h3>
      <div class="flex items-center my-4 text-left text-gray-700 text-sm font-normal">
        <v-icon size="1rem" class="hover:text-red-500" @click="handleCloseFilterAction">mdi-close</v-icon>
        <span class="mx-1/5">Giá khoảng: </span>
        <span>{{ formatPrice(priceRange[0]) }}₫</span>
        <span class="mx-1/5">-</span>
        <span>{{ formatPrice(priceRange[1]) }}₫</span>
      </div>
    </div>

    <!-- Title -->
    <div class="w-full px-4 text-left text-2xl font-semibold">
      <h3>{{ filterTitle }}</h3>
    </div>

    <v-list>
      <!-- Lặp qua danh mục sản phẩm -->
      <v-list-group v-model="isCategoryOpen" expand-icon="mdi-plus" collapse-icon="mdi-minus">
        <template v-slot:activator="{ props }">
          <v-list-item v-bind="props">
            <v-list-item-title class="text-left text-base font-semibold">{{ categoryTitle }}</v-list-item-title>
          </v-list-item>
        </template>

        <!-- Hiển thị Áo, Quần -->
        <!-- <v-list-group v-for="category in categories" :key="category.name" v-model="category.isOpen"
          expand-icon="mdi-plus" collapse-icon="mdi-minus">
          <template v-slot:activator="{ props }">
            <v-list-item v-bind="props">
              <v-list-item-title class="text-left font-bold">{{ category.name }}</v-list-item-title>
            </v-list-item>
          </template> -->

        <!-- Hiển thị danh mục con khi click vào Áo hoặc Quần -->
        <!-- <v-list-item v-for="subCategory in category.subCategories" :key="subCategory"
            class="hover:bg-gray-100 cursor-pointer no-select">
            <v-list-item-title class="text-left">{{ subCategory }}</v-list-item-title>
          </v-list-item>
        </v-list-group> -->
        <v-list-group v-for="category in categories" :key="category.text" v-model="category.isOpen"
          expand-icon="mdi-plus" collapse-icon="mdi-minus">
          <template v-slot:activator="{ props }">
            <v-list-item v-bind="props" :to="category.link">
              <v-list-item-title class="text-left font-bold">{{ category.text }}</v-list-item-title>
            </v-list-item>
          </template>

          <v-list-item v-for="subCategory in category.children" :key="subCategory.text"
            class="hover:bg-gray-100 cursor-pointer no-select"
            @click="handleMenuItemCategoryClick(subCategory.id, subCategory.link)">
            <v-list-item-title class="text-left">{{ subCategory.text }}</v-list-item-title>
          </v-list-item>
        </v-list-group>
      </v-list-group>
    </v-list>

    <v-list>
      <v-list-group v-model="isPriceRange" expand-icon="mdi-plus" collapse-icon="mdi-minus">
        <template v-slot:activator="{ props }">
          <v-list-item v-bind="props">
            <v-list-item-title class="text-left text-base font-semibold">{{ priceRangeTitle }}</v-list-item-title>
          </v-list-item>
        </template>

        <v-list-item class="pf:v-list-item__range-price">
          <v-range-slider v-model="priceRange" :min="0" :max="10000000" :step="10" color="blue" track-color="light-blue"
            thumb-color="red" thumb-label="always" class="px-2 py-8" ticks dense
            @update:model-value="handlePriceChange">
            <template v-slot:thumb-label="{ modelValue }">
              <span class="text-white">{{ formatPrice(modelValue) }}₫</span>
            </template>
          </v-range-slider>
        </v-list-item>
      </v-list-group>
    </v-list>
  </div>
</template>

<script setup>
import { ref, computed, defineEmits, onMounted, watchEffect, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import { useCategoryStore } from '@/stores/useCategory';

const emit = defineEmits(["update:priceRange"]);

const categoryStore = useCategoryStore();
const router = useRouter();

const filterTitle = ref("Bộ lọc");

onMounted(() => {
  categoryStore.fetchCategories();
})

const categoryTitle = ref("Danh mục sản phẩm");
const categories = ref([
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
]);

// Tự động cập nhật menu items khi categories thay đổi
watchEffect(() => {
  // Cập nhật danh sách các category cho menu áo/quần
  categories.value.find((item) => item.text === "Áo").children = categoryStore.shirtCategories;
  categories.value.find((item) => item.text === "Quần").children = categoryStore.pantsCategories;
});

const handleMenuItemCategoryClick = async (categoryId, path) => {
  categoryStore.setSelectedCategory(categoryId);
  await nextTick();
  router.push(path);
}

const isCategoryOpen = ref(false);

const isPriceRange = ref(false);
const priceRangeTitle = ref("Giá");
const priceRange = ref([0, 10000000]);

const defaultPriceRange = ref([0, 10000000]);
const filterAction = ref("Bạn đang xem...");

// Tạo computed để kiểm tra xem giá trị hiện tại có khác giá trị mặc định hay không
const hasPriceChanged = computed(() => {
  return (
    defaultPriceRange.value[0] !== priceRange.value[0] ||
    defaultPriceRange.value[1] !== priceRange.value[1]
  );
});

const handleCloseFilterAction = () => {
  priceRange.value = defaultPriceRange.value;
  emit("update:priceRange", priceRange.value);
}

const handlePriceChange = (newValue) => {
  emit("update:priceRange", newValue);
}

// Định dạng giá tiền
const formatPrice = (price) => price.toLocaleString("vi-VN");
</script>

<style lang="scss" scoped>
::v-deep(.v-slider-thumb__label) {
  background-color: rgba(148, 177, 206, 0.9);

  &::before {
    color: rgba(148, 177, 206, 0.8);
  }
}

.pf\:v-list-item__range-price {

  ::v-deep(.v-list-item) {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}
</style>