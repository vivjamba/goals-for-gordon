
<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { reactive, onMounted } from 'vue'

const state = reactive({
    users: {},
    isErr: false,
    errMsg: ""
})

function examplefetch(){
    fetch(`http://localhost:5000/user/Iva_Page@fluffybunnyconsulting.com`)
        .then((response) => {
            console.log(response)
            return response
        })
        .then((response)=>response.json())
        .then((data) => {
            state.users = data[0]
        })
        .catch((err) => {
            console.log(err)
            state.errMsg = err;
            state.isErr = true;
        })
}
onMounted(()=>{
    examplefetch();
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
