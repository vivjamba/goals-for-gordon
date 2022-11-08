<script>
import axios from 'axios'

import LandingHeader from '../components/headers/LandingHeader.vue'
import GoalContainer from '../components/goals/GoalContainer.vue'

import GoalHeader from '../components/headers/GoalHeader.vue'

import { RouterView } from 'vue-router'
import GoalDetailView from './GoalDetailView.vue'



export default {
    name: 'LandingView',
    components:{
        LandingHeader,
        GoalHeader,
        GoalContainer,
        GoalDetailView

    },
    data() {
        return {
            user: {},
            userLoading: true,
            goals:[],
            goalsLoading: true,

        }
    },
    methods : {
        openGoal(goalid){
            this.$router.push({name:'goal', params:{ goalid }})
        },
        getUserInfo(email){ // probably gonna be replaced with TOKEN
            this.userLoading = true; 
            // TODO: once we get mongoDB id, change to query by id
            axios.get(`http://localhost:5000/user/email/${email}`)
                .then((res) => {
                    console.log(res)
                    let data = res['data'][0] // FIXME see Trello
                    this.userLoading = false; 
                    this.user = data;
                    this.getGoals(this.user._id);
                })
                .catch((err) => {
                    console.log(err)
                });
        },
        getGoals(userid){
            this.goalsLoading = true;
            axios.get(`http://localhost:5000/goal/employee/${userid}`)
                .then((res) => {
                    this.goalsLoading = false;
                    this.goals = res.data;
                })
                .catch((err) => console.log(err));
        },
        logOut(){
            this.$router.push({name:'home'})
        }
        
        
    },
    mounted(){
        this.getUserInfo(this.$route.params.userid);
    }
}
</script>

<template>
    <div id="landing-page">
        <LandingHeader 
            :first-name="this.user.firstName"
            :last-name="this.user.lastName"
            :email="this.user.email"
            :position-title="this.user.positionTitle"
            :is-manager="this.user.isManager"
            :logout = "this.logOut"
            class="bg-primary"
        />

        <GoalHeader/>

        <GoalContainer 
            :goals="this.goals"
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
