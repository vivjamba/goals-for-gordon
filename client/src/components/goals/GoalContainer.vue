<template>
    <li v-for="goal in goals">
        <Button @click="() => openGoal(goal._id)" :label="goal.title"/>
    </li>
</template>

<script>
import Button from 'primevue/button'

export default {
    name: 'GoalContainer',
    props:['goals', 'openGoal'],
    components:{
        Button
    }
}
</script>

<style scoped>

</style>
