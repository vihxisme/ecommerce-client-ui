<template>
  <v-dialog v-model="localDialog" @update:model-value="handleClose" class="mp:v-dialog">
    <v-card class="w-full">
      <v-snackbar v-model="notiShow" :timeout="5000" location="top right" :color="notiColor">
        {{ notiContent }}</v-snackbar>
      <v-card-title class="fixed top-0 w-full bg-white flex justify-between items-center shadow-md z-100"
        style="border-radius: 4px;">
        <h3 class="mx-4 text-xl">Thông tin sản phẩm</h3>
        <v-btn icon @click="closeModal" class="shadow-none mp:btn-close">
          <v-icon class="hover:text-red-700">mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <!-- Nội dung modal -->
      <v-row class="w-full p-4 m-0 mt-16 flex justify-center">
        <v-col cols="12" md="5" class="w-full p-4 mp:v-col">
          <!-- Hình ảnh sản phẩm -->
          <div class="relative group">
            <swiper @swiper="setMainSwiper" :modules="[Navigation, Thumbs]" :navigation="{
              nextEl: '.custom-next-img',
              prevEl: '.custom-prev-img',
            }" class="main-image-swiper" @slideChange="selectedImage = productImages[$event.realIndex].id">
              <swiper-slide v-for="item in productImages" :key="item.id">
                <v-img :src="getCloudinaryUrl(item.imageUrl)" aspect-ratio="1" class="rounded-lg"
                  :lazy-src="image_error" gradient="to top, rgba(0,0,0,0.2), rgba(0,0,0,0.1)">
                  <template v-slot:placeholder>
                    <v-row class="fill-height" align="center" justify="center">
                      <v-progress-circular indeterminate color="warning"></v-progress-circular>
                    </v-row>
                  </template>
                </v-img>
              </swiper-slide>
            </swiper>
            <!-- Custom Navigation Buttons -->
            <v-btn icon
              class="custom-prev-img absolute top-40p left-1/2r transform bg-gray-800/50 text-white p-2 rounded-full z-10 transition-all ease-linear">
              <v-icon color="red" size="2rem">mdi-arrow-left</v-icon>
            </v-btn>
            <v-btn icon
              class="custom-next-img absolute top-40p right-1/2r transform bg-gray-800/50 text-white p-2 rounded-full z-10 transition-all ease-linear">
              <v-icon color="red" size="2rem">mdi-arrow-right</v-icon>
            </v-btn>
          </div>

          <!-- Swiper danh sách hình nhỏ -->
          <div class="relative group mt-3">
            <swiper @swiper="setThumbSwiper" :modules="[Navigation, Thumbs]" :slides-per-view="6" :space-between="10"
              :breakpoints="{
                0: { slidesPerView: 7, spaceBetween: 4 },
                640: { slidesPerView: 8, spaceBetween: 8 },
                960: { slidesPerView: 6, spaceBetween: 12 }
              }" :navigation="{
                nextEl: '.custom-next-slide',
                prevEl: '.custom-prev-slide',
              }" watch-slides-progress class="thumbnail-swiper img-list:swiper">
              <swiper-slide v-for="item in productImages" :key="item.id">
                <v-img :src="getCloudinaryUrl(item.imageUrl)" width="60" height="80" :lazy-src="image_error"
                  gradient="to top, rgba(0,0,0,0.2), rgba(0,0,0,0.1)"
                  class="cursor-pointer border-2 border-gray-300 rounded-md hover:border-orange-500 img:v-img__placeholder"
                  :class="{ 'border-orange-500': selectedImage === item.id }" @click="
                    setSelectedImage(item.id);
                  goToSlide(item.id);
                  ">
                  <template v-slot:placeholder>
                    <v-row class="fill-height" align="center" justify="center">
                      <v-progress-circular indeterminate color="warning"></v-progress-circular>
                    </v-row>
                  </template>
                </v-img>
              </swiper-slide>
            </swiper>
            <!-- Custom Navigation Buttons -->
            <v-btn min-width="0.5rem"
              class="custom-prev-slide px-2 absolute left-1/2r top-20p transform bg-gray-800/50 text-white rounded-full z-10 transition-all ease-linear">
              <v-icon color="red" size="1.5rem">mdi-arrow-left</v-icon>
            </v-btn>
            <v-btn min-width="0.5rem"
              class="custom-next-slide px-2 absolute right-1/2r top-20p transform bg-gray-800/50 text-white rounded-full z-10 transition-all ease-linear">
              <v-icon color="red" size="1.5rem">mdi-arrow-right</v-icon>
            </v-btn>
          </div>
        </v-col>

        <v-col cols="12" md="7" class="w-full px-4 py-2 mp:v-col">
          <!-- Thông tin sản phẩm -->
          <v-card-text class="mp:v-card-text">
            <h3 class="text-xl font-semibold">{{ product.name }}</h3>
            <p class="text-gray-500 py-2">Mã sản phẩm: <strong>{{ product.productCode }}</strong></p>

            <div class="py-2">
              <span>Tình trạng: {{ product.status === 'ACTIVE' ? "Còn hàng" : "Hết hàng" }}</span>
              <span class="mx-4 text-gray-100 opacity-50">|</span>
              <span>Thương hiệu: {{ product.brand }}</span>
            </div>

            <div class="bg-gray-100 py-2">
              <div class="flex justify-between items-center mx-2 my-auto">
                <span class="text-xl font-semibold"> Giá: </span>
                <span class="ext-red-600 font-bold text-lg">{{ formatPrice(product.finalPrice) }}₫</span>
                <span v-if="product.price" class="text-gray-400 text-lg line-through">
                  {{ formatPrice(product.price) }}₫
                </span>
                <span v-if="product.discountPercentage" class="bg-red-500 text-white px-2 py-1 text-xs rounded">
                  -{{ product.discountPercentage }}%
                </span>
              </div>
            </div>
          </v-card-text>

          <!-- Màu sắc -->
          <v-card-text class="mp:v-card-text">
            <h4 class="text-sm font-semibold">Màu sắc:</h4>
            <div class="text-xxs">
              <v-btn v-for="color in variantColors" :key="color.colorId" @click="handleClickColor(color.colorId);"
                class="border border-gray-300 rounded-md px-1 py-1 shadow-none mx-1/5 my-1/5"
                :class="{ 'border-blueGray-100 bg-red-500 text-white': selectedColor === color.colorId }" flat
                size="small">
                <span class="capitalize font-normal">{{ color.colorName }}</span>
              </v-btn>
            </div>
          </v-card-text>

          <!-- Kích thước -->
          <v-card-text class="mp:v-card-text">
            <h4 class="text-sm font-semibold">Kích thước:</h4>
            <div class="text-xss">
              <v-btn v-for="size in variantSizes" :key="size.sizeId" @click="handleClickSize(size.sizeId)"
                class="border border-gray-300 rounded-md mx-1/5 my-1/5 shadow-none"
                :class="{ 'border-blueGray-100 bg-red-500 text-white': selectedSize === size.sizeId }" flat
                :disabled="!sizeFromColor.includes(size.sizeId)" size="small">
                <span class="capitalize font-normal">{{ size.sizeName }}</span>
              </v-btn>
            </div>
          </v-card-text>

          <!-- Số lượng -->
          <v-card-text class="flex items-center mp:v-card-text">
            <h4 class="text-sm font-semibold py-2">Số lượng:</h4>
            <v-btn class="mx-2 p-0 border border-gray-300 shadow-none mp:btn-minus" min-width="1.5rem" height="1.5rem"
              :disabled="!selectedColor || !selectedSize" @click="decreaseQuantity">
              <v-icon>mdi-minus</v-icon>
            </v-btn>
            <span class="text-lg mx-2">{{ quantity }}</span>
            <v-btn class="mx-2 p-0 border border-gray-300 shadow-none mp:btn-plus" min-width="1.5rem" height="1.5rem"
              :disabled="!selectedColor || !selectedSize" @click="increaseQuantity">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-card-text>

          <!-- Nút Thêm vào giỏ -->
          <div class="px-4 my-2">
            <v-btn class="bg-red-500 w-full text-white font-bold rounded-md" @click="handleClickAddCart">
              Thêm vào giỏ hàng
            </v-btn>
            <router-link :to="prodDetailsRoute" class="mt-2 block underline hover:text-red-500">
              <span>Xem thông tin chi tiết</span>
              <v-icon size="1.5rem">mdi-chevron-triple-right</v-icon>
            </router-link>
          </div>
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits, onMounted, computed, watchEffect } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { processProductImages, extractVariantData, extractVariantToSizes, extractVariantToColors, getSizeIdsByColorId } from "@/utils/productUtil";
import { getCloudinaryUrl } from "@/utils/cloudinary";
import { getProductDetails } from "@/services/apis/productService";
import { useCartStore } from "@/stores/useCartStore";

// Nhận dữ liệu sản phẩm từ props
const props = defineProps({
  dialog: {
    type: Boolean,
    required: true
  },
  productId: {
    type: String,
    required: true
  }
});

const cartStore = useCartStore();

// Tạo đường dẫn động đến trang chi tiết sản phẩm
const prodDetailsRoute = computed(() => `/products/details/${product.name}-${product.productCode}`);

const loading = ref(false);
const product = ref();
const productDetails = ref([]);
const productVariants = ref([]);
const variantColors = ref([]);
const variantSizes = ref([]);
const productImages = ref([]);

const fetchProduct = async () => {
  loading.value = true;
  try {
    const id = props.productId;
    console.log("productId: ", id);

    if (!id) {
      loading.value = false;
      throw new Error("Product not found");
    }

    const res = await getProductDetails(id);
    product.value = res.data.data;
    productDetails.value = res.data.data.productDetailsDTO;
    productVariants.value = extractVariantData(res.data.data.productVariantsDTO);
    variantColors.value = extractVariantToColors(productVariants.value);
    variantSizes.value = extractVariantToSizes(productVariants.value);
    productImages.value = processProductImages(res.data.data);
    console.log(res.data);
    console.log("color: ", variantColors.value);
    console.log("size: ", variantSizes.value);
    console.log("images: ", productImages.value);
    console.log("variant: ", productVariants.value);
  } catch (error) {
    console.error("Modal Product: API_Error: ", error);
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  fetchProduct();
})

const resetProductData = () => {
  product.value = null;
  productDetails.value = [];
  productVariants.value = [];
  variantColors.value = [];
  variantSizes.value = [];
  productImages.value = [];
  selectedImage.value = null;
  selectedColor.value = null;
  selectedSize.value = null;
  quantity.value = 1;
};

// Watch modal state
watch(() => props.dialog, (newVal) => {
  if (newVal)
    fetchProduct();

  // setTimeout(() => {
  //   resetProductData();
  // }, 1000);
});



// Định nghĩa emit để có thể gửi sự kiện lên component cha
const emit = defineEmits(["update:dialog"]);

// Tạo biến cục bộ để kiểm soát trạng thái modal
const localDialog = ref(false);

// Đồng bộ `localDialog` với prop `dialog` qua watch
watch(() => props.dialog, (newVal) => {
  localDialog.value = newVal;
});

// Emit sự kiện để báo với cha khi modal đóng
const handleClose = () => {
  emit('update:dialog', false); // Báo với component cha là modal đã đóng
};

// Định dạng giá
const formatPrice = (price) => price.toLocaleString("vi-VN");

// Hàm đóng modal
const closeModal = () => {
  localDialog.value = false;
  emit("update:dialog", false)
};

// Biến đo số lượng
const quantity = ref(1);
// Biến theo dõi variant theo sự thay đổi của selectedColor và selectedSize
const variant = computed(() => {
  return productVariants.value.find(item =>
    item.colorId === selectedColor.value && item.sizeId === selectedSize.value
  ) || null;
})
// Hàm tăng/giảm số lượng
const increaseQuantity = () => {
  if (variant.value != null && quantity.value < variant.value.stock)
    quantity.value++;
}
const decreaseQuantity = () => {
  if (variant.value != null && quantity.value > 1) quantity.value--;
};


// Biến trạng thái, giá trị mặc định ảnh được hiển thị
const selectedImage = ref();

const setSelectedImage = (index) => {
  selectedImage.value = index;
}

watchEffect(() => {
  const defaultImage = productImages.value.find(item => item.keyImg === "default");
  selectedImage.value = defaultImage ? defaultImage.id : productImages[0]?.id || "";
});

// biến trạng thái theo dõi color
const selectedColor = ref(null);
const handleClickColor = (colorId) => {
  selectedColor.value = colorId;
  selectedSize.value = null;
  quantity.value = 1;

  if (selectedColor.value != null) {
    sizeFromColor.value = getSizeIdsByColorId(productVariants.value, selectedColor.value);
  }
}

// biến trạng thái theo dõi size
const selectedSize = ref(null);
//biến trạng thái theo dõi size theo color
const sizeFromColor = ref([]);
const handleClickSize = (sizeId) => {
  if (selectedColor.value != null) {
    selectedSize.value = sizeId;
  }
}

const mainSwiperRef = ref(null);
const thumbSwiperRef = ref(null);


const mainSwiper = ref(null);
const thumbSwiper = ref(null);

const setMainSwiper = (swiper) => {
  mainSwiper.value = swiper;
};

const setThumbSwiper = (swiper) => {
  thumbSwiper.value = swiper;
};

const goToSlide = (id) => {
  const index = productImages.value.findIndex(item => item.id === id);

  if (index !== -1 && mainSwiper.value) {
    mainSwiper.value.slideTo(index);
  }
};

onMounted(() => {
  if (mainSwiperRef.value && thumbSwiperRef.value) {
    mainSwiperRef.value.swiper.controller.control = thumbSwiperRef.value.swiper;
    thumbSwiperRef.value.swiper.controller.control = mainSwiperRef.value.swiper;
  }
});

const notiShow = ref(false);
const notiColor = ref();
const notiContent = ref();

const isAddCart = ref(false);
const handleClickAddCart = () => {
  let productCart = {};
  if (selectedColor.value === variant.value.colorId && selectedSize.value === variant.value.sizeId) {
    productCart = {
      id: product.value.id,
      productCode: product.value.productCode,
      name: product.value.name,
      imageUrl: product.value.productImageUrl,
      price: product.value.price,
      finalPrice: product.value.finalPrice,
      variantId: variant.value.id,
      colorId: variant.value.colorId,
      colorName: variant.value.colorName,
      sizeId: variant.value.sizeId,
      sizeName: variant.value.sizeName,
      stock: variant.value.stock,
      quantity: quantity.value
    };

    cartStore.addToCart(productCart);
    isAddCart.value = true;
    notiColor.value = "success";
    notiContent.value = "Thêm vào giỏ hàng thành công!";
    notiShow.value = true;
  } else {
    notiColor.value = "success";
    notiContent.value = "Thêm vào giỏ hàng thất bại!";
    notiShow.value = true;
    isAddCart.value = false;
  }
}
</script>

<style lang="scss" scoped>
.mp\:btn-close {
  background-color: none;

  &:hover {
    box-shadow: none;
    background-color: transparent;
  }
}

.mx-1\/5 {
  border-right: 0.2rem;
  border-left: 0.2rem;
}

.mp\:btn-plus,
.mp\:btn-minus {

  &:hover {
    box-shadow: none;
    background-color: transparent;
  }

  &:focus {
    box-shadow: none;
    background-color: transparent;
  }
}

/* Định dạng phần nội dung của v-dialog */
::v-deep(.v-card) {
  overflow-y: auto;

  /* Tùy chỉnh thanh cuộn */
  &::-webkit-scrollbar {
    position: fixed !important;
    width: 4px;
    right: 0 !important;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }
}

.group {

  .custom-next-img,
  .custom-prev-img,
  .custom-next-slide,
  .custom-prev-slide {
    display: none;
  }

  @media (min-width: 968px) {

    &:hover {

      .custom-next-img,
      .custom-prev-img,
      .custom-prev-slide,
      .custom-next-slide {
        display: flex;
      }
    }
  }

}

.mp\:v-dialog {
  ::v-deep(.v-overlay__content) {
    max-width: 1000px;

    @media (max-width: 968px) {
      width: 100%;
      margin: 0;
      bottom: 0;
      top: 10%;
    }
  }
}

.mp\:v-col,
.mp\:v-card-text {
  @media (max-width: 680px) {
    padding-left: 0 !important;
    padding-right: 0 !important;
  }
}

.mp\:v-card_action {
  @media (max-width: 968px) {
    padding-left: 0;
    padding-right: 0;
  }
}

.img-list\:swiper {
  ::v-deep(.swiper-wrapper) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.img\:v-img__placeholder {
  ::v-deep(.v-img__placeholder) {
    display: flex;
    align-items: center;
  }
}
</style>