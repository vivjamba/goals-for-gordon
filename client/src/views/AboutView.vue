
<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { reactive, onMounted } from 'vue'

const state = reactive({
    users: {},
    isErr: false,
    errMsg: ""
})
</script>

<template>
  <div class="about">
    {{state.isErr ? state.errMsg : state.users}}
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
