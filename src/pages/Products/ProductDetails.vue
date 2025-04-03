<template>
  <div v-if="productInfo" class="w-full mt-26 rps-mb:mt-16">
    <Breadcrumb />
    <v-snackbar v-model="isAddCart" :timeout="5000" location="top right" :color="isContentCart ? 'success' : 'error'">
      {{ isContentCart ? "Sản phẩm đã được thêm vào giỏ hàng!" : "Thêm sản phẩm thất bại!" }}
    </v-snackbar>

    <v-container class="p-0" :class="{ 'v-container--fluid': xsAndDown, 'v-container': smAndUp }">
      <v-row class="w-full py-4 m-0 flex justify-center">
        <v-col cols="12" md="5" xl="3" class="w-full mp:v-col">
          <!-- Hình ảnh sản phẩm -->
          <div class="relative group">
            <swiper @swiper="setMainSwiper" :modules="[Navigation, Thumbs]" :navigation="{
              nextEl: '.custom-next-img',
              prevEl: '.custom-prev-img',
            }" class="main-image-swiper" @slideChange="selectedImage = productImages[$event.realIndex].id">
              <swiper-slide v-for="item in productImages" :key="item.id">
                <v-img :src="getCloudinaryUrl(item.imageUrl)" height="500px" class="rounded-lg" :lazy-src="image_error"
                  gradient="to top, rgba(0,0,0,0.2), rgba(0,0,0,0.1)" contain>
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
              class="custom-prev-img absolute top-45p left-1/2r transform bg-gray-800/50 text-white p-2 rounded-full z-10 transition-all ease-linear">
              <v-icon color="red" size="2rem">mdi-arrow-left</v-icon>
            </v-btn>
            <v-btn icon
              class="custom-next-img absolute top-45p right-1/2r transform bg-gray-800/50 text-white p-2 rounded-full z-10 transition-all ease-linear">
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
                  :class="{ 'border-orange-500': selectedImage === item.id }"
                  @click="selectedImage = setSelectedImage(item.id); goToSlide(item.id);" contain>
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
              class="custom-prev-slide px-2 absolute left-1/2r top-25p transform bg-gray-800/50 text-white rounded-full z-10 transition-all ease-linear">
              <v-icon color="red" size="1.5rem">mdi-arrow-left</v-icon>
            </v-btn>
            <v-btn min-width="0.5rem"
              class="custom-next-slide px-2 absolute right-1/2r top-25p transform bg-gray-800/50 text-white rounded-full z-10 transition-all ease-linear">
              <v-icon color="red" size="1.5rem">mdi-arrow-right</v-icon>
            </v-btn>
          </div>
        </v-col>

        <v-col cols="12" md="7" xl="5" class="w-full py-2 mp:v-col">
          <!-- Thông tin sản phẩm -->
          <v-card-text class="mp:v-card-text text-left">
            <h3 class="text-xl font-semibold">{{ productInfo.name }}</h3>
            <p class="text-gray-500 py-2">Mã sản phẩm: <strong>{{ productInfo.productCode }}</strong></p>

            <div class="my-2">
              <span>Tình trạng: {{ productInfo?.status === 'ACTIVE' ? "Còn hàng" : "Hết hàng" }}</span>
              <span class="mx-4 text-gray-100 opacity-50">|</span>
              <span>Thương hiệu: {{ productInfo.brand }}</span>
            </div>

            <!-- votes -->
            <div class="flex w-full justify-start items-center my-2">
              <v-icon v-for="(item, index) in 5" :key="index" class="mdi mdi-star" size="16px" color="#DAA520"></v-icon>
            </div>

            <div class="bg-gray-100 py-2">
              <div class="flex justify-between items-center mx-2 my-auto">
                <span class="text-xl font-semibold"> Giá: </span>
                <span class="ext-red-600 font-bold text-lg">{{ formatPrice(productInfo.finalPrice) }}₫</span>
                <span v-if="productInfo.price" class="text-gray-400 text-lg line-through">
                  {{ formatPrice(productInfo.price) }}₫
                </span>
                <span v-if="productInfo.discountPercentage" class="bg-red-500 text-white px-2 py-1 text-xs rounded">
                  -{{ productInfo.discountPercentage }}%
                </span>
              </div>
            </div>
          </v-card-text>

          <!-- Màu sắc -->
          <v-card-text class="mp:v-card-text text-left">
            <h4 class="text-sm font-semibold py-4">Màu sắc:</h4>
            <div class="text-xxs">
              <v-btn v-for="color in variantColors" :key="color.colorId" @click="handleClickColor(color.colorId)"
                class="border border-gray-300 rounded-md px-1 py-1 shadow-none mx-1/5 my-1/5"
                :class="{ 'border-blueGray-100 bg-red-500 text-white': selectedColor === color.colorId }" flat
                size="small">
                <span class="capitalize font-normal">{{ color.colorName }}</span>
              </v-btn>
            </div>
          </v-card-text>

          <!-- Kích thước -->
          <v-card-text class="mp:v-card-text text-left">
            <h4 class="text-sm font-semibold py-4">Kích thước:</h4>
            <div class="text-xss">
              <v-btn v-for="size in variantSizes" :key="size.sizeId" @click="handleClickSize(size.sizeId)"
                class="border border-gray-300 rounded-md mx-1/5 my-1/5 px-1 py-1 shadow-none"
                :class="{ 'border-blueGray-100 bg-red-500 text-white': selectedSize === size.sizeId }" flat
                :disabled="!sizeFromColor.includes(size.sizeId)" size="small">
                <span class="capitalize font-normal">{{ size.sizeName }}</span>
              </v-btn>
            </div>
          </v-card-text>

          <!-- Số lượng -->
          <v-card-text class="flex items-center gap-2 p-0 text-left">
            <h4 class="text-sm font-semibold ml-4 mr-8 my-4">Số lượng:</h4>
            <v-btn class="mx-2 p-0 border border-gray-300 shadow-none mp:btn-minus" min-width="1.5rem" height="1.5rem"
              :disabled="!selectedColor || !selectedSize" @click="decreaseQuantity" flat>
              <v-icon>mdi-minus</v-icon>
            </v-btn>
            <span class="text-lg mx-2">{{ quantity }}</span>
            <v-btn class="mx-2 p-0 border border-gray-300 shadow-none mp:btn-plus" min-width="1.5rem" height="1.5rem"
              :disabled="!selectedColor || !selectedSize" @click="increaseQuantity" flat>
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-card-text>

          <!-- Nút Thêm vào giỏ -->
          <div class="px-4 py-8 flex justify-between items-center">
            <v-btn class="flex-1 flex-grow bg-red-500 text-white font-bold mx-2 rounded-md pd:v-btn"
              @click="handleClickAddCart">
              Thêm vào giỏ hàng
            </v-btn>
            <v-btn class="flex-1 flex-grow bg-red-500 text-white font-bold mx-2 rounded-md" @click="handleClickNewBuy">
              Mua ngay
            </v-btn>
          </div>

          <!-- Policy -->
          <!-- <div v-for="(item, index) in policies" :key="index">
            <div class="flex flex-wrap gap-6 py-2 mx-4">
              <font-awesome-icon :icon="item.icon" class="text-xl text-orange-500"></font-awesome-icon>
              <span class="text-sm fold-semibold">{{ item.text }}</span>
            </div>
          </div> -->
        </v-col>
      </v-row>

      <!-- Tab Header -->
      <div class="my-8">
        <v-tabs v-model="activeTab" class="mb-4 flex border-b" color="success">
          <v-tab v-for="(tab, index) in tabs" :key="index" class="flex-1 text-center">
            {{ tab.label }}
          </v-tab>
        </v-tabs>

        <!-- Tab Content -->
        <div class="p-4 text-left">
          <div :class="{ 'line-clamp': !expanded }" ref="contentRef">
            <!-- <h2 class="font-bold text-xl mb-2">{{ tabs[activeTab]?.label }}</h2> -->
            <p v-html="tabs[activeTab]?.content"></p>
          </div>
          <v-btn v-if="isOverflowing" @click="expanded = !expanded" class="text-blue-500 bg-gray-100 mt-2">{{ expanded ?
            'Thu gọn' :
            'Xem thêm' }}</v-btn>
        </div>
      </div>

    </v-container>
  </div>
</template>

<script setup>
import { ref, watch, nextTick, onMounted, watchEffect, computed } from "vue";
import { useDisplay } from "vuetify/lib/framework.mjs";
import { useRoute } from "vue-router";
import Breadcrumb from "@/components/Navigation/Breadcrumb.vue";

import { faShippingFast, faShield, faPhoneVolume, faSyncAlt, faCheckCircle, faHeadset } from "@fortawesome/free-solid-svg-icons";
import { getCloudinaryUrl } from "@/utils/cloudinary";
import { getProductDetails } from "@/services/apis/productService";
import { processProductImages, extractVariantData, extractVariantToSizes, extractVariantToColors, getSizeIdsByColorId } from "@/utils/productUtil";
import { useCartStateStore } from "@/stores/useCartStateStore";

import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import image_error from '@/assets/images/e-commerce/404/image_error.png';
import { useCartStore } from "@/stores/useCartStore";

const { xsAndDown, smAndUp, lgAndUp } = useDisplay();
const cartStore = useCartStore();
const cartStateStore = useCartStateStore();

const route = useRoute();

const policies = ref([
  { text: "Miễn phí giao hàng cho đơn hàng từ 500K", icon: faShippingFast },
  { text: "Hàng phân phối chính hãng 100%", icon: faShield },
  { text: "Đổi sản phẩm dễ dàng (Trong vòng 7 ngày khi còn nguyên tem mác)", icon: faPhoneVolume },
  { text: "Kiểm tra, thanh toán khi nhận hàng COD", icon: faSyncAlt },
  { text: "TỔNG ĐÀI 24/7 : 0918273645", icon: faCheckCircle },
  { text: "Hỗ trợ bảo hành, đổi sản phẩm tại tất cả store", icon: faHeadset },
]);

const loading = ref(false);
const productInfo = ref();
const productDetails = ref([]);
const productVariants = ref([]);
const variantColors = ref([]);
const variantSizes = ref([]);
const productImages = ref([]);

const fetchProductDetails = async () => {
  loading.value = true;
  try {
    const id = localStorage.getItem("product_detail");

    const res = await getProductDetails(id);
    productInfo.value = res.data.data;
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
    console.error("Product Details: API_Error: ", error);
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  fetchProductDetails();
  selectedColor.value = null;
  selectedSize.value = null;
});

watch(() => {
  fetchProductDetails();
});

watchEffect(() => {
  fetchProductDetails();
})

// Định dạng giá
const formatPrice = (price) => price.toLocaleString("vi-VN");


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

// State quản lý tab đang được kích hoạt
const activeTab = ref(0); // Mặc định tab đầu tiên được chọn
const expanded = ref(false);
const isOverflowing = ref(false);
const contentRef = ref(null);

// Danh sách các tabs
const tabs = ref([
  {
    label: "Mô tả sản phẩm",
    content: `
      <ul>
        <li>Áo Khoác nỉ vải hiệu ứng đáp logo Horse cao su FWCS004</li>
        <li>Được thiết kế theo đúng form chuẩn của nam giới Việt Nam</li>
        <li>Sản phẩm thuộc dòng Áo khoác nỉ cao cấp do TORANO sản xuất</li>
      </ul>`,
  },
  {
    label: "Đánh giá - Nhận xét",
    content: "Tính năng đang được cập nhập..."
  },
  {
    label: "Chính sách đổi trả",
    content: "Chính sách đổi trả đang được cập nhập...",
  },
  {
    label: "Chính sách bảo mật",
    content: "Thông tin về chính sách bảo mật đang được cập nhập...",
  },
  {
    label: "Câu hỏi thường gặp",
    content: "Danh sách các câu hỏi thường gặp đang được cập nhập...",
  },
]);

// Kiểm tra nếu nội dung dài quá thì hiển thị nút "Xem thêm"
const checkOverflow = () => {
  nextTick(() => {
    if (contentRef.value) {
      isOverflowing.value = contentRef.value.scrollHeight > contentRef.value.clientHeight;
    }
  });
};

// Kiểm tra lại mỗi khi activeTab thay đổi
watch(activeTab, () => {
  expanded.value = false; // Reset trạng thái khi chuyển tab
  checkOverflow();
});

onMounted(checkOverflow);

const isAddCart = ref(false);
const isContentCart = ref(false);
const productCart = ref();
const handleClickAddCart = () => {
  if (selectedColor.value === variant.value.colorId && selectedSize.value === variant.value.sizeId) {
    productCart.value = {
      id: productInfo.value.id,
      productCode: productInfo.value.productCode,
      name: productInfo.value.name,
      imageUrl: productInfo.value.productImageUrl,
      price: productInfo.value.price,
      finalPrice: productInfo.value.finalPrice,
      variantId: variant.value.id,
      colorId: variant.value.colorId,
      colorName: variant.value.colorName,
      sizeId: variant.value.sizeId,
      sizeName: variant.value.sizeName,
      stock: variant.value.stock,
      quantity: quantity.value
    };

    cartStore.addToCart(productCart.value);
    isAddCart.value = true;
    isContentCart.value = true;
  } else {
    isAddCart.value = false;
    isContentCart.value = false;
    console.log("isAddCart: ", isAddCart.value);
  }
}

const handleClickNewBuy = () => {
  cartStateStore.toggleCartState(!cartStateStore.cartState);
}
</script>

<style lang="scss" scoped>
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

.pd\:v-btn {
  ::v-deep(.v-btn__content) {
    @media (max-width: 600px) {
      font-size: 0.625rem;
      line-height: 0.875rem;
    }
  }
}

.line-clamp {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
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