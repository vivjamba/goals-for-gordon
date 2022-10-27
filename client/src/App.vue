<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import LogIn from './components/LogIn.vue'
import HomeView from './views/HomeView.vue'
</script>

<template>

    <RouterView></RouterView>
</template>

<style scoped>
header{
  margin-top: 20px;
}
.msg{
  margin-top: -60px;
}
</style>
