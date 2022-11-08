<script>
import LandingHeader from '../components/headers/LandingHeader.vue'
import GoalContainer from '../components/goals/GoalContainer.vue'
import GoalHeader from '../components/headers/GoalHeader.vue'
import { store } from '../stores/session.js';


export default {
    name: 'LandingView',
    components:{
        LandingHeader,
        GoalHeader,
        GoalContainer
    },
    data() {
        return {
            store
        }
    },
    mounted(){
        this.store.getUserInfo(store.email)
    }
}
</script>

<template>
    <div id="landing-page">
        <LandingHeader 
            :first-name="store.firstName"
            :last-name="store.lastName"
            :email="store.email"
            :position-title="store.positionTitle"
            :is-manager="store.isManager"
        />
        <GoalHeader/>
        
    </div>
</template>

<style scoped>
#landing-page{
    height: 100vh;
    display: flex;
    flex-direction: column;
}

</style>
