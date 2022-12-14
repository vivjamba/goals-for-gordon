<template>

        <div class="grid">
            <DataTable :value="goalsClean" @row-click="openGoal($event.data._id)" class="col-10 col-offset-1 p-datatable-lg max-w-10" responsiveLayout="scroll">
                <Column field="title" header="Title"></Column>
                <Column field="status" header="Status" >
                    <template #body="{data}">
                        <tag value="status" :class="statusClass(data.status)">{{statusText(data.status)}}</tag> 
                    </template>
                </Column>
                <Column field="startDate" header="Start Date">
                    <template #body="{data}">
                        {{readable(data.startDate)}}
                    </template>
                </Column>
                <Column field="endDate" header="End Date">
                <template #body="{data}">
                        {{readable(data.endDate)}}
                    </template>
                </Column>
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
    computed:{
        goalsClean(){
            return this.goals.filter((goal) => {
                return goal!=null;
            })
        }
    },
    methods:{
        statusClass(status){
            return status == "complete" ? 'p-tag-rounded text-color-secondary bg-green-300' 
            : status == "active" ? 'p-tag-rounded text-color-secondary bg-yellow-300'
            : 'p-tag-rounded text-color-secondary bg-red-300';
        },
        statusText(status){
            return status;
        },
        readable(date){
            var date2 = new Date(date);
            return date2.toDateString();
        }
    }
}
</script>

<style scoped>

</style>
