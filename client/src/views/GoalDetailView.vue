<script>
import axios from 'axios'

import CommentThread from '../components/goals/CommentThread.vue'
import CreateComment from '../components/CreateComment.vue'

import Dialog from 'primevue/Dialog'
import Divider from 'primevue/Divider'
import Tag from 'primevue/Tag'

import { PrimeIcons } from 'primevue/api';


export default {
    name: 'GoalDetailView',
    components:{
        Dialog,
        Tag,
        Divider,
        CommentThread,
        CreateComment,
    },
    data() {
        return {
            display: true,
            editing: false,
            description: "",
            status: "",
            dueDate: "",
            title: "",
            poster:"",
            comments: {},
            addComment: false,
            buttonDesc: "Add Comment",
            category: ""
            
        }
    },
    computed: {
        statusClass(){
            return this.status == "complete" ? 'p-tag-rounded text-color-secondary bg-green-300' 
            : this.status == "active" ? 'p-tag-rounded text-color-secondary bg-yellow-300'
            :'p-tag-rounded text-color-secondary bg-red-300';
        },
        statusText(){
            return this.status;
        },
        descHTML(){
            return this.description.replace(/\n/g, "<br/>");
        },
        statusIcon(){
            if(this.status=='inactive'){
                return PrimeIcons.PLAY;
            }else if(this.status=='active'){
                return PrimeIcons.CHECK_SQUARE;
            }
            return PrimeIcons.PAUSE;
        },
        statusTip(){
            if(this.status=='inactive'){
                return 'Begin Goal';
            }else if(this.status=='active'){
                return 'Complete Goal';
            }
            return 'Mark Goal Inactive';
        },
        nextStatus(){
            if(this.status=='inactive'){
                return 'active';
            }else if(this.status=='active'){
                return 'complete'
            }
            return 'inactive'
            
        }
    },
    mounted(){
        this.checkLogin()
        this.getGoalDetails()
        this.getGoalComments()
    },
    methods : {
        checkLogin(){
            this.auth = localStorage.getItem('token')
            return this.auth!=undefined;
        },
        exitDialog(){
            this.$router.push({name:'user', params:{userid: this.$route.params.userid}})
        },
        advanceStatus(){
            axios.post(`http://localhost:5000/goal/edit/${this.$route.params.goalid}`, {
                    title: this.title,
                    description: this.description,
                    endDate: this.dueDate,
                    status: this.nextStatus
                },{
                    headers: { Authorization: `Bearer ${this.auth}`}
                })
                .then((res) => {
                    if(res.status==401){
                        throw "Not authenticated!";
                    }
                    this.editing = false;

                    let data = res.data;
                    this.status = data.status;
                })
                .catch((err) => {
                    console.log(err)
                    this.$toast.add({severity:'error', summary: 'Status Change Failed', detail:'Please login again', life: 2000});
                    //this.$router.push({name:'home'})
                })
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
                },{
                    headers: { Authorization: `Bearer ${this.auth}`}
                })
                .then((res) => {
                    if(res.status==401){
                        throw "Not authenticated!";
                    }
                    this.editing = false;

                    let data = res.data;
                    this.title = data.title;
                    this.description = data.description;
                    this.dueDate = data.endDate; 
                    this.status = data.status;
                })
                .catch((err) => {
                    console.log(err)
                    this.$toast.add({severity:'error', summary: 'Save Failed', detail:'Please login again', life: 2000});
                    //this.$router.push({name:'home'})
                })
        },
        getGoalDetails(){
            if(!this.checkLogin()){
                this.$router.push({name:'home'})
                return;
            }
            axios.get(`http://localhost:5000/goal/${this.$route.params.goalid}`,
                {
                    headers:{ Authorization: `Bearer ${this.auth}`}
                })
                .then((res)=>{
                    let data = res.data;
                    console.log(data)
                    this.title = data.title;
                    this.dueDate = data.endDate;
                    this.description = data.description;
                    this.status = data.status;
                    this.category = data.category;

                    return axios.get(`http://localhost:5000/user/${data.poster}`, {
                        headers:{ Authorization: `Bearer ${this.auth}`}
                    })
                })
                .then((res)=>{
                    let data = res.data;
                    this.poster = `${data.firstName} ${data.lastName}`
                })
                .catch((err)=>{
                    this.$toast.add({severity:'error', summary: 'Retrieving Data failed', detail:'Please login again', life: 2000});
                })
        },
        getGoalComments(){
            axios.get(`http://localhost:5000/comment/goal/${this.$route.params.goalid}`,{
                    headers:{ Authorization: `Bearer ${this.auth}`}
                })
                .then((res)=>{
                    let data = res.data;
                    console.log(data);
                    this.comments = data;
                })
        },
        changeAddComment(){
            this.addComment = !this.addComment;
        },
        update(){
            this.changeAddComment();
            this.getGoalComments();
        },
        readable(date){
            var date2 = new Date(date);
            return date2.toDateString();
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
                <div>{{this.poster}}</div>
                <div>{{this.category.charAt(0).toUpperCase() + this.category.slice(1)}}</div>
                
            </div>
        </template>
        <div class="border-round-md w-full" style="margin-bottom:50px; margin-top:20px;">
            <div class="field grid justify-content-center">
                <span class="mx-1"><tag value="status" :class="statusClass">{{statusText}}</tag></span>
                <label for="due-date" class="col-fixed font-light" style="width:40">Due Date:</label>
                <span id="due-date" class="col">
                    <template v-if="editing">
                        <Calendar class="" v-model="dueDate"/>
                    </template>
                    <template v-else> 
                        {{new Date(this.dueDate).toDateString()}}
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
        </div>
        <div class="comment-head">
            <h3 class="font-medium">Comments:</h3>
            <Button v-if="!this.addComment" label="Add Comment" @click="changeAddComment()" class="p-button-sm bg-cyan-700"/>
            <Button v-if="this.addComment" label="Cancel" @click="changeAddComment()" class="p-button-sm p-button-text text-red-300"/>
        </div>
        <div>
            <div v-if="addComment">
                <CreateComment @close="update()"/>
            </div>
            <CommentThread :comments="this.comments"/>
        </div>
        <template #footer>
            <Button @click="advanceStatus()" v-tooltip="statusTip" class="p-button-link" :icon="statusIcon"></Button>
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
.comment-head{
    display: flex;
    justify-content: space-between;
}
</style>
