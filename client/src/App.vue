<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import IntroMsg from './components/IntroMsg.vue'
import LogIn from './components/LogIn.vue'
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/ukg.svg" width="250" height="250" />

    <div class="msg">
      <IntroMsg msg="Goals for Gordon" />

      <!-- <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav> -->
    </div>
  </header>

  <LogIn/>
</template>

<style scoped>
header{
  margin-top: 20px;
}
.msg{
  margin-top: -60px;
}
</style>