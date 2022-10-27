<script>
import LandingHeader from '../components/headers/LandingHeader.vue'
import GoalContainer from '../components/goals/GoalContainer.vue'

export default {
    name: 'LandingView',
    components:{
        LandingHeader,
        GoalContainer
    }
}
</script>

<template>
    <LandingHeader/>
    <GoalContainer/>
</template>

<style scoped>

</style>
