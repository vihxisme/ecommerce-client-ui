<template>
  <div class="w-full mt-26 rps-mb:mt-16">
    <Breadcrumb />

    <v-container :class="{ 'v-container--fluid': lgAndDown, 'v-container': xlAndUp }">
      <h2 class="text-center text-2xl font-bold my-4">Hệ thống cửa hàng</h2>
      <v-row>
        <!-- Bên trái: Tìm cửa hàng -->
        <v-col cols="12" md="4">
          <v-card class="pa-4" elevation="2">
            <h3 class="text-lg font-semibold mb-2">Tìm cửa hàng</h3>

            <v-select label="Chọn tỉnh thành" v-model="selectedCity" :items="cities" density="comfortable"
              variant="outlined" class="mb-4" />

            <v-select label="Chọn cửa hàng" v-model="selectedDistrict" :items="districts" density="comfortable"
              variant="outlined" class="mb-4" />

            <div v-for="store in filteredStores" :key="store.name" class="mb-4 border-b pb-3 text-left text-sm">
              <div class="d-flex align-center mb-1">
                <v-icon size="20" class="me-1">mdi-map-marker</v-icon>
                <span class="font-semibold mx-2">{{ store.name }}</span>
              </div>
              <div class="mx-2">{{ store.address }}</div>
              <div class="mx-2">
                Thời gian hoạt động:
                <strong>{{ store.hours }}</strong>
              </div>
              <div class="mx-2">
                Số điện thoại:
                <strong>{{ store.phone }}</strong>
              </div>
              <v-btn variant="text" color="primary" class="mt-1 px-0 mx-2" @click="handleViewMap(store.district)">
                Xem bản đồ
              </v-btn>
            </div>
          </v-card>
        </v-col>

        <!-- Bên phải: Bản đồ -->
        <v-col cols="12" md="8">
          <iframe width="100%" height="550" frameborder="0" style="border:0" :src="selectedMap"
            allowfullscreen></iframe>
        </v-col>
      </v-row>
    </v-container>

  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, watchEffect } from "vue";
import { useDisplay } from "vuetify/lib/framework.mjs";

import Breadcrumb from "@/components/Navigation/Breadcrumb.vue";

const { lgAndDown, xlAndUp } = useDisplay();

const cities = ['Hà Nội']
const districts = ['Đống Đa', 'Cầu Giấy', 'Hoàng Mai', 'Hai Bà Trưng', 'Thanh Xuân', 'Hoàn Kiếm', 'Tây Hồ']

const selectedCity = ref('Hà Nội')
const selectedDistrict = ref('Đống Đa')

// Danh sách cửa hàng mẫu
const stores = [
  {
    name: 'BELLION 49 CHÙA BỘC',
    address: 'Số 49, Chùa Bộc, Q.Đống Đa, Hà Nội',
    district: 'Đống Đa',
    hours: '8:30 - 22:00',
    phone: '0976 408 388',
    mapLink: 'https://maps.app.goo.gl/euUus4eaYoUs62Cs8',
    embedMap: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1862.3198183694683!2d105.82834807707299!3d21.00707766582715!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ac7fd193bc8d%3A0xd4f4fc5577b08bd1!2zNDkgUC4gQ2jDuWEgQuG7mWMsIFF1YW5nIFRydW5nLCDEkOG7kW5nIMSQYSwgSMOgIE7hu5lpLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1745046993048!5m2!1svi!2s" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade'
  },
  {
    name: 'BELLION 75 YÊN LÃNG',
    address: 'Số 75 Yên Lãng, Quận Đống Đa, TP. Hà Nội',
    district: 'Đống Đa',
    hours: '8:30 - 22:00',
    phone: '0969 963 658',
    mapLink: 'https://goo.gl/maps/3gWD7WgKRgA2',
    embedMap: 'https://www.google.com/maps/embed?pb=!1m27!1m12!1m3!1d59592.44999941108!2d105.77572752192627!3d21.011544267974!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m12!3e6!4m4!1s0x3135ad389dec69d7%3A0xcc85932ae91b7eb9!3m2!1d21.0114691!2d105.81692749999999!4m5!1s0x3135ad389dec69d7%3A0xcc85932ae91b7eb9!2zUXXDoW4gTmjhuq11IFThu7EgRG8sIDc1IFAuWcOqbiBMw6NuZywgVGjhu4tuaCBRdWFuZywgxJDhu5FuZyDEkGEsIEjDoCBO4buZaSwgVmnhu4d0IE5hbQ!3m2!1d21.0114691!2d105.81692749999999!5e0!3m2!1svi!2s!4v1745047290744!5m2!1svi!2s" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade'
  },
  {
    name: 'BELLION 128 CẦU GIẤY',
    address: 'Số 128 Cầu Giấy, Q. Cầu Giấy, Hà Nội',
    district: 'Cầu Giấy',
    hours: '8:30 - 22:00',
    phone: '0971 111 111',
    mapLink: 'https://maps.app.goo.gl/Jj7jYrkzobFA6sJYA',
    embedMap: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d938.3877177447242!2d105.80418926363829!3d21.028625769559607!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab421c783bb1%3A0x1ac18a3ae2f15619!2zMTI4IMSQLiBD4bqndSBHaeG6pXksIEzDoW5nIFRoxrDhu6NuZywgQ-G6p3UgR2nhuqV5LCBIw6AgTuG7mWksIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1745047375790!5m2!1svi!2s" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade'
  },
  {
    name: 'BELLION 56 GIÁP BÁT',
    address: 'Số 56 Giáp Bát, Q. Hoàng Mai, Hà Nội',
    district: 'Hoàng Mai',
    hours: '8:30 - 22:00',
    phone: '0972 222 222',
    mapLink: 'https://maps.app.goo.gl/hAbedt25qyWsPcKL7',
    embedMap: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3725.160177954415!2d105.83968707447983!3d20.986215389240048!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ac683e1da72d%3A0x9bd48605a9a39058!2zWMaw4bufbmcgQmlhIFPDoW5o!5e0!3m2!1svi!2s!4v1745047507453!5m2!1svi!2s" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade'
  },
  {
    name: 'BELLION 315 BẠCH MAI',
    address: 'Số 315 Bạch Mai, P. Bạch Mai, Q. Hai Bà Trưng, Hà Nội',
    district: 'Hai Bà Trưng',
    hours: '8:30 - 22:00',
    phone: '0972 222 222',
    mapLink: 'https://maps.app.goo.gl/5ASYw6171pYBYuMP9',
    embedMap: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d426.95503744325316!2d105.85062111210222!3d21.001370715656456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ad006caae7cb%3A0xe6edf0bdda23bbd2!2sWallace%20B%E1%BA%A1ch%20Mai!5e0!3m2!1svi!2s!4v1745047605749!5m2!1svi!2s" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade'
  },
  {
    name: 'BELLION 32 TỐ HỮU',
    address: 'Số 32 Tố Hữu, P. Nhân Chính, Q. Thanh Xuân, Hà Nội',
    district: 'Thanh Xuân',
    hours: '8:30 - 22:00',
    phone: '0972 222 222',
    mapLink: 'https://maps.app.goo.gl/TEp5K2SKKnRqgJ7a7',
    embedMap: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d232.80313837775137!2d105.79540476759671!3d20.998640521814902!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ad0ee121864b%3A0x2db175810e2fb119!2sTokyo%20Life!5e0!3m2!1svi!2s!4v1745047764519!5m2!1svi!2s" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade'
  },
  {
    name: 'BELLION 58B BÀ TRIỆU',
    address: 'Số 58B Bà Triệu, Hàng Bài, Q. Hoàn Kiếm, Hà Nội',
    district: 'Hoàn Kiếm',
    hours: '8:30 - 22:00',
    phone: '0972 222 222',
    mapLink: 'https://maps.app.goo.gl/cD5wWyVdzpFddWLX8',
    embedMap: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d232.76695437424198!2d105.85004425523314!3d21.02182914201522!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31345f23c58ddda5%3A0x377c6f6a559c08bf!2sCChat%20Clothes%20-%2058B%20B%C3%A0%20Tri%E1%BB%87u!5e0!3m2!1svi!2s!4v1745048033978!5m2!1svi!2s" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade'
  },
  {
    name: 'BELLION 264 ÂU CƠ',
    address: 'Số 264 Âu Cơ, P. Nhật Tân, Q. Tây Hồ, Hà Nội',
    district: 'Tây Hồ',
    hours: '8:30 - 22:00',
    phone: '0972 222 222',
    mapLink: 'https://maps.app.goo.gl/RUczHiLNo4qu2dHJ6',
    embedMap: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d527.8784364438874!2d105.8261485522359!3d21.07330370992233!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab184521061d%3A0xdd0939d28cffee1e!2s5AM%20Coffee%20Shop!5e0!3m2!1svi!2s!4v1745048360672!5m2!1svi!2s" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade'
  },
]


// Lấy danh sách cửa hàng theo quận
const filteredStores = computed(() => {
  return stores.filter(store => store.district === selectedDistrict.value)
})


// Lấy bản đồ của cửa hàng đầu tiên trong danh sách được chọn
const selectedMap = computed(() => {
  return filteredStores.value.length > 0
    ? filteredStores.value[0].embedMap
    : ''
})

const handleViewMap = (district) => {
  selectedDistrict.value = district;
}
</script>