<template>
  <v-app>
    <ContentHeader />
    <TopNavbar />
    <Content />
    <ContentFooter />
  </v-app>
</template>

<script setup>
import ContentHeader from "./ContentHeader.vue";
import TopNavbar from "./TopNavbar.vue";
import Content from "./Content.vue";
import ContentFooter from "./ContentFooter.vue";
</script>
