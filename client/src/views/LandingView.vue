<script>
import LandingHeader from '../components/headers/LandingHeader.vue'
import GoalContainer from '../components/goals/GoalContainer.vue'
import { store } from '../stores/session.js';
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
            store
        }
    },
    methods : {
        openGoal(goalid){
            this.$router.push({name:'goal', params:{ goalid }})
        },
    },
    mounted(){
        this.store.getUserInfo(this.$route.params.userid);
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
            :logout = "this.logOut"
            class="bg-primary"
        />
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
