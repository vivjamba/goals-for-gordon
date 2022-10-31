import { reactive } from 'vue'
import axios from 'axios'

export const store = reactive({
    email: "Kelli_Oneill@fluffybunnyconsulting.com",
    // TODO: better fit to a reasonable model
    getUserInfo(email){
        this.userInfoLoading = true; 
        axios.get(`http://localhost:5000/user/${email}`)
            .then((res) => {
                console.log(res)
                let data = res['data'][0] 
                this.userInfoLoading = false; 
                this.firstName = data.firstName;
                this.lastName = data.lastName;
                this.positionTitle = data.positionTitle;
                this.isManager = data.isManager;
            })
            .catch((err) => {
                console.log(err)
            })
    }
   
})
