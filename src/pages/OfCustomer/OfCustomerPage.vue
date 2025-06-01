<template>
  <div class="w-full mt-26 rps-mb:mt-16">
    <Breadcrumb />

    <v-container class="p-0 my-8" :class="{ 'v-container--fluid': xsAndDown, 'v-container': smAndUp }">
      <v-row>
        <v-col cols="12" sm="3" md="2" class="bg-gray-200 rounded">
          <v-card class="shadow-none py-8" color="transparent">
            <v-avatar :size="xsAndDown ? 50 : 100" color="grey lighten-2">
              <v-img v-if="avtUrl" :src="avtUrl" />
              <v-icon v-else size="100">mdi-account</v-icon>
            </v-avatar>
            <v-card-text class="p-2 text-center capitalize text-base font-semibold">
              {{ nameCustomer }}
            </v-card-text>
          </v-card>
          <v-tabs v-model="tab" background-color="transparent" color="primary"
            :direction="smAndUp ? 'vertical' : 'horizontal'" class="my-4 flex mx-2">
            <v-tab v-for="(tab, index) in tabs" :key="index" @click="tab = index" class="capitalize flex-grow">
              {{ tab }}
            </v-tab>
          </v-tabs>
        </v-col>

        <v-col cols="12" sm="9" md="10" class="bg-gray-100 rounded">
          <div v-if="tab === 0">
            <Profile @update:fetch="eventFetch" />
          </div>
          <div v-if="tab === 1">
            <AddressCpn />
          </div>
          <!-- <div v-if="tab === 2">
            <OrderHistory />
          </div> -->
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useDisplay } from "vuetify/lib/framework.mjs";

import { useAuthStore } from "@/stores/useAuthStore";
import { getProfileByUserId } from "@/services/apis/customerService";
import { getCloudinaryUrl } from "@/utils/cloudinary";

import Breadcrumb from "@/components/Navigation/Breadcrumb.vue";
import Profile from "@/components/OfCustomer/Profile.vue";
import AddressCpn from "@/components/OfCustomer/AddressCpn.vue";
import OrderHistory from "@/components/OfCustomer/OrderHistory.vue";

const { xsAndDown, smAndUp } = useDisplay();

const authStore = useAuthStore();

const tab = ref(0);
// const tabs = ["Hồ sơ của tôi", "Địa chỉ", "Đơn mua"];
const tabs = ["Hồ sơ của tôi", "Địa chỉ"];

const avtUrl = ref();
const nameCustomer = ref();

const fetchAddressByUserId = async () => {
  try {
    const userId = authStore.user.userID;

    console.log("id: ", userId);

    const res = await getProfileByUserId(userId);
    const data = res.data.data;

    avtUrl.value = getCloudinaryUrl(data.avatar);
    nameCustomer.value = data.firstName + " " + data.lastName;

    console.log("Profile: ", res.data);
  } catch (error) {
    console.log("Profile: API_Error: ", error);
  }
}

const eventFetch = (value) => {
  if (value) {
    fetchAddressByUserId();
  }
}

onMounted(() => {
  fetchAddressByUserId();
})
</script>