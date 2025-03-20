<template>
  <!-- Mobile Navigation Drawer -->
  <v-navigation-drawer v-model="localDrawer" class="lg:hidden fixed top-0 h-screen bottom-0 bg-white" :width="300">
    <v-list class="shadow-md">
      <div class="text-left flex items-center justify-between mx-2">
        <span class="block text-lg font-medium px-4 py-2 text-left">
          DANH MỤC
        </span>
        <v-icon size="1.5rem" class="hover:text-red-500 mr-2" @click="handleClose">mdi-close</v-icon>
      </div>
      <!-- <hr class="border-2 border-blue-500 shadow-md" /> -->
    </v-list>

    <v-list class="flex flex-col">
      <!-- Đảm bảo danh sách hiển thị dọc -->
      <v-list-item v-for="item in menuItems" :key="item.text" class="text-left">
        <template v-if="!item.children">
          <!-- Menu không có con -->
          <router-link :to="item.link" class="block w-full text-lg font-medium px-4 py-2 text-left hover:bg-gray-200">
            {{ item.text }}
          </router-link>
        </template>

        <template v-else>
          <!-- Menu có con -->
          <v-list-group v-model="item.expanded" no-action append-icon="" class="text-left">
            <template v-slot:activator="{ props }">
              <v-list-item v-bind="props" @click="item.expanded = !item.expanded" class="text-left hover:bg-gray-200">
                <v-list-item-title :class="{ 'text-red-500': item.expanded }" class="text-left">
                  {{ item.text }}
                </v-list-item-title>
              </v-list-item>
            </template>

            <!-- Menu con -->
            <v-list-item v-for="child in item.children" :key="child.text" class="pl-6 text-left hover:bg-gray-200">
              <router-link :to="child.link" class="block w-full text-base font-light px-4 py-2 text-left">
                {{ child.text }}
              </router-link>
            </v-list-item>
          </v-list-group>
        </template>
      </v-list-item>
    </v-list>

    <!-- Tài khoản (Chuyển xuống dưới trên mobile) -->
    <v-list class="fixed bottom-0 bg-white_imp">
      <hr />
      <v-list-item class="mt-auto hover:bg-gray-200"> <!-- mt-auto đẩy xuống cuối -->
        <router-link class="flex items-center gap-2 text-lg px-4 py-2" to="/">
          <v-icon class="mdi mdi-account-circle text-2xl"></v-icon>
          <h4 style="margin-left: 10px;">Thông tin tài khoản</h4>
        </router-link>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { ref, defineProps, defineEmits, watch } from "vue";

const props = defineProps({
  drawer: {
    type: Boolean,
    required: true
  },
  menuItems: {
    type: Array,
    required: true
  }
});

const localDrawer = ref(false);

const emit = defineEmits(["update:drawer"]);

// Đồng bộ `localDrawer` với prop `drawer` qua watch
watch(() => props.drawer, (newVal) => {
  localDrawer.value = newVal;
});

const handleClose = () => {
  localDrawer.value = false;
  emit('update:drawer', false); // Báo với component cha là modal đã đóng
};

</script>