<template>
    <div class="surface-card p-4 shadow-2 border-round" style="margin:21px;">
        <div class="text-2xl font-medium text-900 mb-3">Create Comment</div>
        <Textarea class="font-medium text-500 mb-3 border-round" style="width:100%;" v-model="text" :autoResize="true" rows="4"/>
        <Button label="Post Comment" @click="addComment()" class="bg-cyan-700"/>
    </div>
     
</template>

<script>

import axios from 'axios'

export default {
    name: 'CreateComment',
    methods:{
        addComment(){
            console.log(this.$route.params);
            this.auth = localStorage.getItem('token');
            axios.post(`http://localhost:5000/comment/create/`, {
                    content: this.text,
                    goal: this.$route.params.goalid,
                    poster: this.$route.params.userid,
                },{
                    headers: { Authorization: `Bearer ${this.auth}`}
                })
                .then((res) => {
                    console.log(res);
                    this.$emit('close');
                })
                .catch((err) => {
                    console.error(err);
                })
        }
    },
    data() {
        return {
            text: "",
        }
    }
}
</script>

<style scoped>
.text{
    padding: 20px;
}
</style>
