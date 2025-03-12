<template>
  <v-app>
    <ContentHeader />
    <TopNavbar />
    <Banner />
    <Content />
    <ContentFooter />
  </v-app>
</template>

<script setup>
import ContentHeader from "./ContentHeader.vue";
import TopNavbar from "./TopNavbar.vue";
import Banner from "./Banner.vue";
import Content from "./Content.vue";
import ContentFooter from "./ContentFooter.vue";
</script>
