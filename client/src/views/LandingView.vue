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
            auth:undefined
        }
    },
    methods : {
        checkLogin(){
            this.auth = localStorage.getItem('token')
            return this.auth!=undefined;
        },
        openGoal(goalid){
            this.$router.push({name:'goal', params:{ goalid }})
        },
        getUserInfo(userid){ // probably gonna be replaced with TOKEN
            this.userLoading = true; 
            // TODO: once we get mongoDB id, change to query by id
            axios.get(`http://localhost:5000/user/${userid}`,
                {
                    headers:{Authorization: `Bearer ${this.auth}`}
                })
                .then((res) => {
                    console.log(res)
                    let data = res.data; // FIXME see Trello
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
            axios.get(`http://localhost:5000/goal/employee/${userid}`, 
                {
                    headers:{Authorization: `Bearer ${this.auth}`}
                })
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
        this.checkLogin();
        this.getUserInfo(this.$route.params.userid);

    },
    // A really bootleg way to check to see if we are on landing view
    watch: {
        $route(){
            if(this.$route.params.goalid==undefined){
                this.getGoals(this.user._id);
            }
        }
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
            :log-out = "this.logOut"
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
