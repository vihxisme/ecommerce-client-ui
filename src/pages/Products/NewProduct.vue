<template>
  <div class="w-full mt-26 rps-mb:mt-16">
    <Breadcrumb />

    <ProductFilterMobile :drawer="showFilter" @update:drawer="showFilter = $event"></ProductFilterMobile>

    <v-container class="p-0" :class="{ 'v-container--fluid': lgAndDown, 'v-container': xlAndUp }">
      <v-card class="w-full px-2 shadow-none">
        <v-row>
          <v-col cols="0" lg="3" class="hidden lg:flex p-0 pt-8">
            <ProductFilter />
          </v-col>
          <v-col cols="12" lg="9" class="p-0">
            <v-container fluid>
              <v-container class="px-0 my-2" fluid>
                <div class="w-full block lg:flex justify-between items-center">
                  <h2 class="text-xl lg:text-2xl font-semibold uppercase font-montserrat my-4 lg:my-2 text-center">
                    Sản phẩm mới</h2>
                  <div class="flex justify-between items-center my-auto">
                    <v-btn class="lg:hidden capitalize border-solid border-gray-200" variant="outlined"
                      prepend-icon="mdi-filter-variant" flat @click="showFilter = true">Bộ
                      lọc</v-btn>
                    <v-select v-model="sortBy" label="Sắp xếp theo" :items="sort" width="250px" max-width="250px"
                      class="text-base lg:text-xl ct:v-select" :menu-props="{ maxHeight: 'auto' }" variant="outlined"
                      hide-details dense></v-select>
                  </div>
                </div>
              </v-container>
              <v-row>
                <v-col cols="12" sm="4" md="3" lg="3" xl="2" v-for="(prod, index) in displayedProducts" :key="index"
                  class="flex justify-center items-center">
                  <div class="w-250-px h-400-px">
                    <BoxProduct :product="prod" />
                  </div>
                </v-col>
              </v-row>

              <!-- Infinite Scroll -->
              <v-infinite-scroll @load="fetchMoreProducts">
                <div class="text-center" v-if="loading">
                  <v-progress-circular indeterminate :value="100" color="success"></v-progress-circular>
                </div>
              </v-infinite-scroll>

              <!-- Pagination -->
              <v-pagination v-model="pageNumber" :length="totalPage" :total-visible="5" @update:model-value="changePage"
                class="flex justify-center gap-4 items-center p-4 m-4 np:v-pagination">
                <template v-slot:prev="{ onClick }">
                  <v-btn icon @click="onClick" class="px-2 py-2 bg-gray-300 hover:bg-black hover:text-white rounded-50"
                    flat :disabled="pageNumber === 1">
                    <v-icon>mdi-chevron-left</v-icon>
                  </v-btn>
                </template>

                <template v-slot:item="{ page, isActive }">
                  <v-btn v-if="page !== '...'" icon @click="pageNumber = page" flat
                    class="px-2 py-2 rounded-md transition-colors rounded-50"
                    :class="pageNumber === page || isActive ? 'bg-black text-white' : 'bg-gray-200 hover:bg-black hover:text-white'">
                    {{ page }}
                  </v-btn>
                </template>

                <template v-slot:next="{ onClick }">
                  <v-btn icon @click="onClick" class="px-2 py-2 bg-gray-300 hover:bg-black hover:text-white rounded-md"
                    flat :disabled="pageNumber === totalPage">
                    <v-icon>mdi-chevron-right</v-icon>
                  </v-btn>
                </template>
              </v-pagination>
            </v-container>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useDisplay } from "vuetify/lib/framework.mjs";

import Breadcrumb from "@/components/Navigation/Breadcrumb.vue";
import ProductFilter from "@/components/Products/ProductFilter.vue";
import ProductFilterMobile from "@/components/Products/ProductFilterMobile.vue";
import BoxProduct from "@/components/Products/BoxProduct.vue";
import image_insta6 from "@/assets/images/e-commerce/home/insta6.jpg";

const { lgAndDown, xlAndUp } = useDisplay();

const showFilter = ref(false);

const newProduct = ref({
  product: Array.from({ length: 40 }, () => ({
    image: image_insta6,
    discount: 20,
    colors: 5,
    sizes: 4,
    name: "Áo len mới mới mới mới mới mới mới mới mới mới mới mới mới",
    code: "EWCW008678670",
    price: 600000,
    finalPrice: 480000,
  })),
  pageNumber: 1,
  pageSize: 40,
  totalPage: 10,
  totalElement: 255
});

const displayedProducts = ref([...newProduct.value.product]);
const pageNumber = ref(newProduct.value.pageNumber);
const totalPage = ref(newProduct.value.totalPage);
const loading = ref(false);

// Kiểm tra còn dữ liệu để tải không
const noMoreData = computed(() => displayedProducts.value.length >= newProduct.value.pageSize);

// Hàm gọi API (mock)
const fetchMoreProducts = async () => {
  if (loading.value || noMoreData.value) return;

  loading.value = true;

  setTimeout(() => {
    const moreProducts = Array.from({ length: 25 }, () => ({
      image: image_insta6,
      discount: 20,
      colors: 5,
      sizes: 4,
      name: "Lợn cưới áo mới",
      code: `EWCW008678670-${Math.random()}`,
      price: 600000,
      finalPrice: 480000,
    }));

    // Kiểm tra còn dữ liệu không trước khi thêm
    if (displayedProducts.value.length + moreProducts.length >= newProduct.value.totalElement) {
      displayedProducts.value.push(...moreProducts.slice(0, newProduct.value.totalElement - displayedProducts.value.length));
    } else {
      displayedProducts.value.push(...moreProducts);
    }

    // Kiểm tra lại điều kiện dừng tải
    if (displayedProducts.value.length >= newProduct.value.totalElement) {
      loading.value = false; // Không còn dữ liệu để tải nữa
    } else {
      loading.value = false;
    }
  }, 1000); // Giả lập gọi API
};

// cuộn lên đầu trang
watch(pageNumber, () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Chuyển trang bằng pagination
const changePage = (newPage) => {
  displayedProducts.value = [...newProduct.value.product]; // Reset danh sách
  pageNumber.value = newPage;

  // Cuộn về đầu trang
  window.scrollTo({
    top: 0,
    behavior: "smooth", // Cuộn mượt
  });
};

const sortBy = ref("default");

const sort = ref([
  { title: 'Sản phẩm nổi bật', value: 'default' },
  { title: 'Giá: Tăng dần', value: 'price_asc' },
  { title: 'Giá: Giảm dần', value: 'price_desc' },
  { title: 'Tên: A-Z', value: 'name_asc' },
  { title: 'Tên: Z-A', value: 'name_desc' },
  { title: 'Cũ nhất', value: 'oldest' },
  { title: 'Mới nhất', value: 'newest' }
]);


// Hàm sắp xếp
const sortProducts = () => {
  displayedProducts.value.sort((a, b) => {
    switch (sortBy.value) {
      case "price_asc":
        return a.finalPrice - b.finalPrice; // Giá tăng dần
      case "price_desc":
        return b.finalPrice - a.finalPrice; // Giá giảm dần
      case "name_asc":
        return a.name.localeCompare(b.name); // A-Z
      case "name_desc":
        return b.name.localeCompare(a.name); // Z-A
      case "oldest":
        return a.code.localeCompare(b.code); // Giả lập sản phẩm cũ nhất
      case "newest":
        return b.code.localeCompare(a.code); // Giả lập sản phẩm mới nhất
      default:
        return 0; // Không sắp xếp (Mặc định)
    }
  });
};

// Theo dõi sự thay đổi của sortBy để tự động sắp xếp
watch(sortBy, () => {
  sortProducts();
});
</script>

<style lang="scss" scoped>
.np\:v-row {
  ::v-deep(.v-row) {
    @media (min-width: 1024px) and (max-width: 1279px) {

      >.v-col:first-child {
        flex: 0 0 25% !important;
      }

      >.v-col:last-child {
        flex: 0 0 75% !important;
      }
    }
  }
}

.np\:v-pagination {

  ::v-deep(.v-pagination__prev),
  ::v-deep(.v-pagination__item),
  ::v-deep(.v-pagination__next) {
    .v-btn {
      width: 2.5rem;
      border-radius: 50%;
      // background-color: rgb(213, 213, 210);
    }
  }
}
</style>