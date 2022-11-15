<script>
import axios from 'axios'

import CommentThread from '../components/goals/CommentThread.vue'

import Dialog from 'primevue/Dialog'
import Divider from 'primevue/Divider'
import Tag from 'primevue/Tag'


export default {
    name: 'GoalDetailView',
    components:{
        Dialog,
        Tag,
        Divider,
        CommentThread
    },
    data() {
        return {
            display: true,
            editing: false,
            description: "",
            status: "",
            dueDate: "",
            title: "",

            cal: null
        }
    },
    computed: {
        statusClass(){
            return this.status ? 'p-tag-rounded text-color-secondary bg-green-300' : 'p-tag-rounded text-color-secondary bg-yellow-300';
        },
        statusText(){
            return this.status ? 'Completed' : 'In Progress';
        }
    },
    mounted(){
        this.getGoalDetails()
    },
    methods : {
        exitDialog(){
            this.$router.push({name:'user', params:{userid: this.$route.params.userid}})
        },
        edit(){
            this.editing = !this.editing;
        },
        getGoalDetails(){
            axios.get(`http://localhost:5000/goal/${this.$route.params.goalid}`)
                .then((res)=>{
                    let data = res.data;
                    console.log(data);
                    this.title = data.title;
                    this.dueDate = data.endDate;
                    this.description = data.description;
                    this.status = data.status;
                })
        }
    }
}
</script>

<template class="">
    <Dialog :draggable='false' class="w-10" modal='true' @after-hide="this.exitDialog()" v-model:visible="display">
        <template #header>
            <div>
                <div class="field max-h-4rem">
                    <template v-if="editing" class="">
                        <InputText class="p-inputtext-lg w-full m-1"/>
                    </template>
                    <template v-else>
                        <h1>{{title}}</h1>
                    </template>
                </div>
                <div class="field">
                    <tag value="status" :class="statusClass">{{statusText}}</tag> 
                    <label for="due-date">Due Date:</label>
                    <span id="due-date">
                        <template v-if="editing">
                            <Calendar class="" v-model="cal"/>
                        </template>
                        <template v-else> 
                            {{ " " + dueDate.toString().substring(0,10) }}
                        </template>
                    </span>
                </div>
            <Divider/>
            </div>
        </template>
        <div class="border-round-md w-full h-24rem">
            <p class="text-lg">{{ description }}</p>
            <CommentThread/>
        </div>
        <template #footer>
            <Button label="Edit" @click="edit()" class="p-button-link" icon="pi pi-file-edit"></Button>
        </template>
    </Dialog>
</template>

<style scoped>
</style>
