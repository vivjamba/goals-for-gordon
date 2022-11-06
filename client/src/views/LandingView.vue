<script>
import { session } from '../stores/session.js';

import LandingHeader from '../components/headers/LandingHeader.vue'
import GoalContainer from '../components/goals/GoalContainer.vue'
import { RouterView } from 'vue-router'
import GoalDetailView from './GoalDetailView.vue'

export default {
    name: 'LandingView',
    components:{
        LandingHeader,
        GoalContainer,
        GoalDetailView
    },
    data() {
        return {
            session
        }
    },
    methods : {
        openGoal(goalid){
            this.$router.push({name:'goal', params:{ goalid }})
        },
    },
    mounted(){
        this.session.getUserInfo(this.$route.params.userid);
    }
}
</script>

<template>
    <div id="landing-page">
        <LandingHeader 
            :first-name="session.user.firstName"
            :last-name="session.user.lastName"
            :email="session.user.email"
            :position-title="session.user.positionTitle"
            :is-manager="session.user.isManager"
            :logout = "this.logOut"
            class="bg-primary"
        />
        <GoalContainer
            :goals="session.goals"
            :openGoal="this.openGoal"/>
        <RouterView> </RouterView>
    </div>
</template>

<style scoped>
#landing-page{
    height: 100vh;
    display: flex;
    flex-direction: column;
}

</style>
