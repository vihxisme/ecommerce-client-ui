<template>
  <div class="w-full mt-26 rps-mb:mt-16">
    <Breadcrumb />

    <ProductFilterMobile :drawer="showFilter" @update:drawer="showFilter = $event"
      @update:price-range="priceRange = $event"></ProductFilterMobile>

    <v-container class="p-0 my-4" :class="{ 'v-container--fluid': lgAndDown, 'v-container': xlAndUp }">
      <v-card class="w-full px-2 shadow-none">
        <v-row>
          <v-col cols="0" lg="3" class="hidden lg:flex p-0 pt-8">
            <ProductFilter @update:price-range="priceRange = $event" />
          </v-col>
          <v-col cols="12" lg="9" class="p-0">
            <v-container fluid>
              <v-container class="px-0 my-2" fluid>
                <div class="w-full block lg:flex justify-between items-center">
                  <h2 class="text-xl lg:text-2xl font-semibold uppercase font-montserrat my-4 lg:my-2 text-center">
                    {{ pageTitle }}</h2>
                  <div class="flex justify-between items-center my-auto">
                    <v-btn class="lg:hidden capitalize border-solid border-gray-200" variant="outlined"
                      prepend-icon="mdi-filter-variant" flat @click="showFilter = true">
                      {{ filterTitle }}</v-btn>
                    <v-select v-model="sortBy" label="Sắp xếp theo" :items="sort" width="250px" max-width="250px"
                      class="text-base lg:text-xl ct:v-select" :menu-props="{ maxHeight: 'auto' }" variant="outlined"
                      hide-details dense></v-select>
                  </div>
                </div>
              </v-container>
              <v-row>
                <v-col cols="12" sm="4" md="3" lg="3" xl="2" v-for="product in filteredProducts" :key="product.id"
                  class="flex justify-center items-center">
                  <div class="w-250-px h-400-px">
                    <BoxProduct :product="product" />
                  </div>
                </v-col>
              </v-row>

              <!-- Infinite Scroll -->
              <!-- <v-infinite-scroll @load="fetchMoreProducts">
                <div class="text-center" v-if="loading">
                  <v-progress-circular indeterminate :value="100" color="success"></v-progress-circular>
                </div>
              </v-infinite-scroll> -->

              <!-- Pagination -->
              <v-pagination v-if="totalPages > 1" v-model="pageNumber" :length="totalPages" size="small" color="black"
                active-color="success" rounded="circle" :total-visible="5" @update:model-value="changePage"
                class="flex justify-center gap-4 items-center p-4 m-4">
              </v-pagination>
            </v-container>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue";
import { useDisplay } from "vuetify/lib/framework.mjs";

import Breadcrumb from "@/components/Navigation/Breadcrumb.vue";
import ProductFilter from "@/components/Products/ProductFilter.vue";
import ProductFilterMobile from "@/components/Products/ProductFilterMobile.vue";
import BoxProduct from "@/components/Products/BoxProduct.vue";
import { getPromoProduct } from "@/services/apis/productService";

const { lgAndDown, xlAndUp } = useDisplay();

const pageTitle = ref("Sản phẩm khuyến mãi");

const filterTitle = ref("Bộ lọc");
const showFilter = ref(false);

const promoProducts = ref([]);
const pageNumber = ref(1);
const pageSize = ref(16);
const totalPages = ref();
const totalElements = ref();
const loading = ref(false);

const priceRange = ref([0, 10000000]);

const filteredProducts = computed(() => {
  return promoProducts.value.filter((product) => {
    return product.finalPrice >= priceRange.value[0] && product.finalPrice <= priceRange.value[1];
  });
});


const fetchpromoProducts = async () => {
  loading.value = true;
  try {
    const request = {
      page: pageNumber.value - 1,
      size: pageSize.value,
    };

    const res = await getPromoProduct(request);
    promoProducts.value = res.data.data.content;
    totalPages.value = res.data.data.totalPages;
    totalElements.value = res.data.data.totalElements;
    console.log(res.data);
  } catch (error) {
    console.error("Promo Product: API_Error: ", error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchpromoProducts();
})

// cuộn lên đầu trang
watch(pageNumber, () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Chuyển trang bằng pagination
const changePage = (newPage) => {
  pageNumber.value = newPage;
  fetchpromoProducts();

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
  promoProducts.value.sort((a, b) => {
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
        return a.createdAt.localeCompare(b.createdAt); // Giả lập sản phẩm cũ nhất
      case "newest":
        return b.createdAt.localeCompare(a.createdAt); // Giả lập sản phẩm mới nhất
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
      --tw-bg-opacity: 1;
      background-color: rgba(228, 228, 231, var(--tw-bg-opacity));

      &:hover {
        --tw-opacity: 1;
        color: rgba(255, 255, 255, var(--tw-opacity));
        background-color: rgba(0, 0, 0, var(--tw-opacity));
      }

      @media (max-width: 680px) {
        font-size: 0.75rem;
        line-height: 1rem;
        width: 30px;
        height: 38px;
      }
    }
  }

  ::v-deep(.v-pagination__item--is-active) {
    >.v-btn {
      --tw-opacity: 1;
      color: rgba(255, 255, 255, var(--tw-opacity));
      background-color: rgba(0, 0, 0, var(--tw-opacity));
    }
  }
}
</style>