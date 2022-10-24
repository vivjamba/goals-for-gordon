
<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { reactive, onMounted } from 'vue'

const state = reactive({
    users: {},
    isErr: false,
    errMsg: ""
})

function call(){
    fetch('localhost:5000/dbtest')
        .then((response)=>respons.json())
        .then((data) => {
            console.log(data)
        })
        .catch((err) => {
            console.log("ERROR ALERT")
            state.errMsg = err;
            isErr = true;
        })
}
onMounted(()=>{
    call();
})
</script>

<template>
  <div class="about">
    <h1>This is an about page</h1>
    <br/>
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
