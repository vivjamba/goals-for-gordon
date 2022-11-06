import { reactive } from 'vue'
import axios from 'axios'

export const session = reactive({
    email: "Kelli_Oneill@fluffybunnyconsulting.com",
    userLoading: true,
    user: {},
    goalsLoading: true,
    goals:[],

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

    logIn(){
        // TODO get legit token and not just id;
        // 1. Get MongoDB id
    },
    logOut(){
        // TODO: delete auhorization token
        this.email = ''
        this.firstName = ''
        this.lastName = ''
        this.positionTitle = ''
    }

   
})
