<template>
  <router-view v-slot="{ Component }">
    <component :is="Component"/>
  </router-view>
  <Alert/>
</template>

<script setup lang="ts">
  import {RouterView} from "vue-router";
  import Alert from "@ui/alert.vue";
</script>