<template>
  <div class="bg-gray-100">
    <v-container class="p-0" :class="{ 'v-container--fluid': lgAndDown, 'v-container': xlAndUp }">
      <v-row>
        <!-- Cột 1: Giới thiệu thương hiệu -->
        <v-col cols="12" sm="6" md="3" order="2" order-sm="1"
          class="text-left pt-16 mt-3 md:mt-3 md:border-r-2 md:border-b-2 p-8">
          <h3 class="text-red-600 font-bold text-xl my-2 py-2">{{ brandName }}</h3>
          <p class="text-gray-700 text-sm">
            {{ brandDescription }}
          </p>

          <!-- Social Icons -->
          <div class="flex flex-wrap space-x-2 mt-4">
            <a v-for="icon in socialIcons" :key="icon.name" :href="icon.link" target="_blank" rel="noopener noreferrer"
              class="mx-2">
              <v-btn variant="outlined" class="hover:bg-gray-400 icon-social-btn" x-small>
                <font-awesome-icon :icon="icon.name" class="text-base"></font-awesome-icon>
              </v-btn>
            </a>
          </div>

          <!-- Phương thức thanh toán -->
          <h4 class="text-base font-bold mt-4">{{ paymentTitle }}</h4>
          <div class="flex flex-wrap mt-2 gap-2">
            <img v-for="(img, i) in paymentMethods" :key="i" :src="img" width="50px" height="32px" class="h-8" />
          </div>
        </v-col>

        <!-- Cột 2: Thông tin liên hệ -->
        <v-col cols="12" sm="6" md="3" order="3" order-sm="2"
          class="text-left pt-16 md:mt-3 border-r-2 md:border-b-2 p-8">
          <h3 class="text-red-600 font-bold text-xl my-2 py-2">{{ contactTitle }}</h3>
          <div v-for="(value, key) in contactInfo" :key="key" class="text-sm">
            <p class="my-2">
              <span class="font-bold">{{ formatKey(key) }}:</span> {{ value }}
            </p>
          </div>

          <!-- Phương thức vận chuyển -->
          <h4 class="text-base font-bold mt-4">{{ shippingTitle }}</h4>
          <div class="flex flex-wrap mt-2 gap-2">
            <img v-for="(img, i) in shippingMethods" :key="i" :src="img" class="h-8" />
          </div>
        </v-col>

        <!-- Cột 3: Nhóm liên kết -->
        <v-col cols="12" sm="6" md="3" order="4" order-sm="3"
          class="text-left pt-16 md:mt-3 md:border-r-2 ct:border-b-2 p-8">
          <h3 class="text-red-600 font-bold text-xl my-2 py-2">{{ linkGroup }}</h3>
          <v-list class="text-sm space-y-2 bg-transparent">
            <v-list-item v-for="(link, i) in links" :key="i" :to="link"
              class="hover:text-red-500 text-base cursor-pointer leading-none py-2">
              • {{ link }}
            </v-list-item>
          </v-list>
        </v-col>

        <!-- Cột 4: Đăng ký nhận tin -->
        <v-col cols="12" sm="6" md="3" order="1" order-sm="4" class="text-left pt-16 md:mt-3 px-8 ct:pb-8">
          <h3 class="text-red-600 font-bold text-xl my-2 py-2">{{ subscriptionTitle }}</h3>
          <p class="text-sm">
            {{ subscriptionDescription }}
          </p>
          <!-- Form nhập email -->
          <v-text-field placeholder="Nhập email của bạn" outlined dense hide-details="auto"
            class="mt-3 custom-email-field text-base text-gray-500 focus:text-field p-3" :type="type"
            prepend-icon="mdi-email" @focus="(e) => e.preventDefault()"></v-text-field>
          <v-btn color="red" class="mt-2 text-white font-bold" block>
            {{ buttonText }}
          </v-btn>
        </v-col>
      </v-row>

      <!-- Copyright -->
      <div class="py-4 border-t-2 w-full mt-3">
        <span class="text-center text-sm text-gray-600">{{ copyright }}</span>
      </div>
    </v-container>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useDisplay } from "vuetify/lib/framework.mjs";
import { faFacebook, faTwitter, faInstagram, faTiktok, faYoutube } from "@fortawesome/free-brands-svg-icons";
import payment_1_img from '@/assets/images/e-commerce/footer/payment_1_img.png';
import payment_2_img from '@/assets/images/e-commerce/footer/payment_2_img.png';
import payment_3_img from '@/assets/images/e-commerce/footer/payment_3_img.png';
import payment_4_img from '@/assets/images/e-commerce/footer/payment_4_img.png';
import payment_5_img from '@/assets/images/e-commerce/footer/payment_5_img.png';
import payment_6_img from '@/assets/images/e-commerce/footer/payment_6_img.png';
import shipment_1_img from '@/assets/images/e-commerce/footer/shipment_1_img.png';
import shipment_2_img from '@/assets/images/e-commerce/footer/shipment_2_img.png';
import shipment_3_img from '@/assets/images/e-commerce/footer/shipment_3_img.png';
import shipment_4_img from '@/assets/images/e-commerce/footer/shipment_4_img.png';

const { lgAndDown, xlAndUp } = useDisplay();

// col-1
// Tiêu đề và mô tả thương hiệu
const brandName = ref("Thời trang BELLION");
const brandDescription = ref(
  "Hệ thống thời trang cho phái mạnh hàng đầu Việt Nam, hướng tới phong cách nam tính, lịch lãm và trẻ trung."
);

// Tiêu đề và phương thức thanh toán
const paymentTitle = ref("Phương thức thanh toán");
const paymentMethods = ref([
  payment_1_img, // VNPay
  payment_2_img, // ZaloPay
  payment_3_img, // Moca
  payment_4_img, // Kredivo
  payment_5_img, // Napas
  payment_6_img, // VISA
]);

// Các biểu tượng mạng xã hội
const socialIcons = ref([
  { name: faFacebook, link: "https://www.facebook.com" },
  { name: faTwitter, link: "https://www.twitter.com" },
  { name: faInstagram, link: "https://www.instagram.com" },
  { name: faTiktok, link: "https://www.tiktok.com" },
  { name: faYoutube, link: "https://www.youtube.com" }
]);

// col-2
const contactTitle = ref("Thông tin liên hệ");
const contactInfo = ref({
  address: "Tầng 999, tòa nhà A, số 444 xxx xxx, quận yyy yyy, zzz zzz",
  phone: "0123456789",
  fax: "0123456789",
  email: "cskh@bellion.vn"
});

const formatKey = (key) => {
  const map = {
    address: "Địa chỉ",
    phone: "Điện thoại",
    fax: "Fax",
    email: "Email"
  };
  return map[key] || key;
};

const shippingTitle = ref("Phương thức vận chuyển");
const shippingMethods = ref([
  shipment_1_img, // GHN
  shipment_2_img, // Ninja Van
  shipment_3_img, // Ahamove
  shipment_4_img, // J&T Express
]);


// col-3
const linkGroup = ref("Nhóm liên kết");
const links = ref(["Tìm kiếm", "Giới thiệu", "Chính sách đổi trả", "Chính sách bảo mật", "Liên hệ"]);
const type = ref("email");

// col-4
// Tiêu đề và mô tả
const subscriptionTitle = ref("Đăng ký nhận tin");
const subscriptionDescription = ref(
  "Để cập nhật những sản phẩm mới, nhận thông tin ưu đãi đặc biệt và thông tin giảm giá khác."
);
const buttonText = ref("ĐĂNG KÝ");

// Copyright
const copyright = ref("Copyright © 2025 Bellion");
</script>

<style scope></style>