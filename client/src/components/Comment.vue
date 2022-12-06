<template>
    <div class="surface-card p-4 shadow-2 border-round" style="margin: 20px;">
        <div class="text-2xl font-medium text-900 mb-3">{{getName(poster)}}</div>
        <div class="font-medium text-500 mb-3">{{content}}</div>
    </div>
</template>

<script>
import Fieldset from 'primevue/fieldset';

import axios from 'axios'
export default {
    name: 'Comment',
    props: {
        content: String,
        poster: String,
        date: String, 
    },
    data(){
        return{
            readable_name: "",
        }
    },
    components: {
        Fieldset,
    }, 
    methods:{
        getName(id){
            axios.get(`http://localhost:5000/user/${id}`)
                .then((res)=>{
                    // console.log(res.data)
                    this.readable_name = res.data.firstName + " " + res.data.lastName;
                })
            return this.readable_name;
        },
    }
}
</script>

<style scoped>

</style>