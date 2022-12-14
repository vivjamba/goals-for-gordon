<template>
    <div class="surface-card p-4 shadow-2 border-round" style="margin: 20px;">
        <div class="title">
            <div class="font-medium text-900 mb-3" >{{getName(poster)}}</div>
            <img alt="Profile Photo" class="prof-pic" src="@/assets/sample_profile.png" width="50" height="50" />
        </div>
        <div class="font-medium text-700 mb-3" style="font-size: 12px;">{{content}}</div>
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
            this.auth = localStorage.getItem('token')
            axios.get(`http://localhost:5000/user/${id}`,
                {
                    headers: { Authorization: `Bearer ${this.auth}`}
                })
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
.title{
    display: flex;
    justify-content: space-between;
}
</style>