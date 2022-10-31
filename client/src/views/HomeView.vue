<script setup lang="ts">
import LogIn from '../components/LogIn.vue'
import IntroMsg from '../components/IntroMsg.vue'

</script>

<style type="text/css">
#intro-header{
  margin-top: 20px;
}
.msg{
  margin-top: -60px;
}
#login-page{
    width: 100vw;
    padding: 20px;
    margin: 60px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 100px;
}
</style>

<template>
    <div id="login-page">
        <header id="intro-header">
            <img alt="Vue logo" class="logo" src="@/assets/ukg.svg" width="250" height="250" />
            <div class="msg">
              <IntroMsg msg="Goals for Gordon" />
            </div>
        </header>
        <LogIn/>
    </div>
</template>
