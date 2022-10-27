<script setup lang="ts">
import LogIn from '../components/LogIn.vue'
import IntroMsg from '../components/IntroMsg.vue'

</script>

<template>
    <header>
        <img alt="Vue logo" class="logo" src="@/assets/ukg.svg" width="250" height="250" />

        <div class="msg">
          <IntroMsg msg="Goals for Gordon" />
        </div>
    </header>

    <LogIn/>
</template>
