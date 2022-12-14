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
            employeeGoals:[],
            goalsLoading: true,
            auth:undefined,
            managerMode: false,
            employees:[],
            filters: {}
        }
    },
    computed:{
        displayGoals(){
            if(this.managerMode){
                let ret = this.employeeGoals.filter(g => g!=undefined); 
                if(this.filters.actives == true ||
                    this.filters.inactives==true ||
                    this.filters.completes==true){
                    ret = ret.filter(goal => {
                        return (goal.status=='complete' && this.filters.completes==true) ||
                        (goal.status=='active' && this.filters.actives==true) ||
                        (goal.status=='inactive' && this.filters.inactives==true)
                    })
                }
                if(this.filters.search != undefined && this.filters.search.length>0){
                    ret = ret.filter(g => g.title.toLowerCase().search(this.filters.search)>-1);
                }
                if(this.filters.selectedEmployee!=null){
                    ret = ret.filter(g => g.poster == this.filters.selectedEmployee._id)
                }
                return ret;
            }else{
                let ret = this.goals.filter(g => g!=undefined); 
                if(this.filters.actives == true ||
                    this.filters.inactives==true ||
                    this.filters.completes==true){
                    ret = ret.filter(goal => {
                        return (goal.status=='complete' && this.filters.completes==true) ||
                        (goal.status=='active' && this.filters.actives==true) ||
                        (goal.status=='inactive' && this.filters.inactives==true)
                    })
                }
                if(this.filters.search != undefined && this.filters.search.length>0){
                    ret = ret.filter(g => g.title.toLowerCase().search(this.filters.search)>-1);
                }
                return ret;
            }
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
            if(!this.checkLogin()){
                this.$toast.add({severity:'error', summary: 'Authentication Expired', detail:'Please login again', life: 2000});
                this.$router.push({name:'home'})
                return;
            }
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
                    this.getEmployeeGoals();
                })
                .catch((err) => {
                    console.log(err)
                });
        },
        getGoals(userid){
            if(!this.checkLogin()){
                this.$toast.add({severity:'error', summary: 'Authentication Expired', detail:'Please login again', life: 2000});
                this.$router.push({name:'home'})
                return;
            }
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
        getEmployeeGoals(){
            let promiseArray = [];
            axios.get(
                `http://localhost:5000/user/manager/listEmployees/${this.user.employeeId}/${this.user.companyId}`,
                {
                    headers:{Authorization: `Bearer ${this.auth}`}
                })
                .then((res) => {
                    this.employees = res.data;
                    this.employeeGoals = [];
                    for(let i = 0; i < res.data.length; i++){
                        promiseArray.push(
                            axios.get(`http://localhost:5000/goal/employee/${res.data[i]._id}`),{
                                headers:{Authorization: `Bearer ${this.auth}`}
                            });
                    }
                    Promise.all(promiseArray).then((values) => {
                            for(let i = 0; i < values.length; i++){
                                this.employeeGoals = this.employeeGoals.concat(values[i].data);
                            }
                    })
                    .catch((err) => console.log(err));
                 })
                 .catch((err) => console.log(err));
        },
        logOut(){
            localStorage.removeItem('token')
            this.auth = undefined
            this.$router.push({name:'home'})
            this.$toast.add({severity:'success', summary: 'Logout Success', detail:'', life: 1000});
        },
        handleManagerMode(event){
            this.managerMode = event;
        },
        handleFilter(event){
            console.log("ENEVTN")
            console.log(event);
            this.filters = event;
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
	    @manager-mode='handleManagerMode' 
            :first-name="this.user.firstName"
            :last-name="this.user.lastName"
            :email="this.user.email"
            :position-title="this.user.positionTitle"
            :is-manager="this.user.isManager"
            :log-out = "this.logOut"
            class="bg-primary"
        />

        <GoalHeader 
            @saveGoal="this.getGoals(this.user._id)"
            @filterChange="handleFilter"
            :employees="employees"
            :managerMode="managerMode"/>

        <GoalContainer 
            :goals="displayGoals"
            :openGoal="this.openGoal"
            :manageMode="managerMode"/>
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
