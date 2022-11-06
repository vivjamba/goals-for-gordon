<script>
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
            description: "I would like to learn Vue so that I can pass 320 and be helpful for the completion of the project.",
            status: "Completed",
            dueDate: "11/-7/2022",
            title: "Learn Vue"
        }
    },
    computed: {
        statusClass(){
            return this.status.toLowerCase() =='completed' ? 'p-tag-rounded text-color-secondary bg-green-300' : 'p-tag-rounded text-color-secondary bg-yellow-300';
        }
    },
    mounted(){
    },
    methods : {
        exitDialog(){
            this.$router.push({name:'user', params:{userid: "Kelli_Oneill@fluffybunnyconsulting.com"}})
        }
    }
}
</script>

<template class="">
    <Dialog class="w-10" modal='true' @after-hide="this.exitDialog()" v-model:visible="display">
        <template #header>
            <div>
                <h1>{{title}}</h1>
                <span><Tag value="status" :class="statusClass">{{status}}</Tag> Due Date: {{ dueDate }}</span>
            </div>
        </template>
        <div class="border-round-md w-full h-30rem">
            <Divider/>
            <p class="text-lg">{{ description }}</p>
            <CommentThread/>
        </div>
        <template #footer>
            <h5> Edit </h5>
        </template>
    </Dialog>
</template>

<style scoped>
</style>
