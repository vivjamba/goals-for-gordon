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
        }
    },
    computed: {
        statusClass(){
            return this.status ? 'p-tag-rounded text-color-secondary bg-green-300' : 'p-tag-rounded text-color-secondary bg-yellow-300';
        },
        statusText(){
            return this.status ? 'Completed' : 'In Progress';
        },
        descHTML(){
            return this.description.replace(/\n/g, "<br/>");
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
        save(){
            axios.post(`http://localhost:5000/goal/edit/${this.$route.params.goalid}`, {
                    title: this.title,
                    description: this.description,
                    endDate: this.dueDate,
                    status: this.status
                })
                .then((res) => {
                    this.editing = false;

                    let data = res.data;
                    this.title = data.title;
                    this.description = data.description;
                    this.dueDate = data.endDate; 
                    this.status = data.status;
                })
                .catch((err) => {
                    console.error(err);
                })
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
        <template #header class="p-0 m-0">
            <div class="field max-h-4rem">
                <template v-if="editing" class="">
                    <InputText class="p-inputtext-lg w-full m-1" v-model="title"/>
                </template>
                <template v-else>
                    <h1>{{title}}</h1>
                </template>
            </div>
        </template>
        <div class="border-round-md w-full h-24rem">
            <div class="field grid">
                <span class="mx-1"><tag value="status" :class="statusClass">{{statusText}}</tag></span>
                <label for="due-date" class="col-fixed font-light" style="width:40">Due Date:</label>
                <span id="due-date" class="col">
                    <template v-if="editing">
                        <Calendar class="" v-model="dueDate"/>
                    </template>
                    <template v-else> 
                        {{ " " + dueDate.toString().substring(0,10) }}
                    </template>
                </span>
            </div>
            <div id="due-date">
                <template v-if="editing">
                    <Textarea v-model="description" rows="10" cols="60" />
                </template>
                <template v-else> 
                    <p class="text-md"><span v-html="descHTML"></span></p>
                </template>
            </div>

            <CommentThread/>
        </div>
        <template #footer>
            <template v-if="editing">
                <Button label="Save" @click="save()" class="p-button-link" icon="pi pi-save"></Button>
            </template>
            <template v-else>
                <Button label="Edit" @click="edit()" class="p-button-link" icon="pi pi-file-edit"></Button>
            </template>
        </template>
    </Dialog>
</template>

<style scoped>

</style>
