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
    <div id="landing-page">
        <LandingHeader/>
        <GoalContainer/>
    </div>
</template>

<style scoped>
#landing-page{
    height: 100vh;
    display: flex;
    flex-direction: column;
}

</style>
