<template>

        <div class="grid">
            <DataTable :value="goals" @row-click="openGoal($event.data._id)" class="col-10 col-offset-1 p-datatable-lg max-w-10" responsiveLayout="scroll">
                <Column field="title" header="Title"></Column>
                <Column field="status" header="Status" >
                    <template #body="{data}">
                        <tag value="status" :class="statusClass(data.status)">{{statusText(data.status)}}</tag> 
                    </template>
                </Column>
                <Column field="startDate" header="Start Date"></Column>
                <Column field="endDate" header="End Date"></Column>
            </DataTable>  
        </div>
</template>

<script>
import Button from 'primevue/button'
import Tag from 'primevue/Tag'

export default {

    name: 'GoalContainer',
    props:['goals', 'openGoal'],
    components:{
        Button,
        Tag
    },
    data(){
        return {
        }
    },
    methods:{
        statusClass(status){
            return status ? 'p-tag-rounded text-color-secondary bg-green-300' : 'p-tag-rounded text-color-secondary bg-yellow-300';
        },
        statusText(status){
            return status ? 'Completed' : 'In Progress';
        }
    }
}
</script>

<style scoped>

</style>
