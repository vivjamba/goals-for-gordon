<template>
    <div class="center">
        <h1>Sign In</h1>
        <form @submit.prevent >
            <br>
            <input v-model="email" type="text" id="username" name="username" placeholder="Username">
            <br>
            <input v-model="password" type="password" id="pwd" name="pwd" placeholder="Password">
            <br>
            <input @click="logIn" type="submit" value="Log-In">
        </form >
    </div>
    
</template>

<script>
import axios from 'axios';
// TODO: stop sharing the login email in store with the same store in landingview
export default {
    name: "LogIn",
    data(){
        return {
            email:"",
            password:""
        }
    },
    methods: {
        logIn(){
            //this.$router.push({name:'user', params: { userid:this.email }});
            axios.post(`http://localhost:5000/user/login_jwt`, 
                {
                    email: this.email,
                    password: this.password
                })
                .then((res) => {
                    localStorage.setItem('token', res.data.token)
                    this.loginErr=false
                    this.$router.push({name:'user', params: { userid: res.data.id }});
                    this.$toast.add({severity:'success', summary: 'Login Success', detail:'', life: 1000});
                })
                .catch((err) => {
                    console.log(err)
                    if(err.response.status == 401){
                        this.$toast.add({severity:'error', summary: 'Incorrect email/pass', detail:'Please try again', life: 3000});
                    }
                    console.log(err)
                });
        }
    }
}
</script>

<style scoped>
.center {
text-align: center;
color: white;
border-radius: 4px;
background-color: #005151;
padding: 40px;
box-shadow: 0px 5px 18px 5px #AAAAAA;
}

input[type="text"],
input[type="password"]{
    width: 327.67px;
    height: 59.24px;
    left: 557.21px;
    top: 738.25px;

    background: #FFFFFF;
    border-radius: 4px;

    
    font-size: 20px;
    line-height: 20px;
    text-align: center;
    border: none;
    margin: 10px;
}
::placeholder{
    opacity: .75;
}

input:focus::placeholder {
  color: transparent;
}

input[type="submit"]{
    width: 327.67px;
    height: 59.24px;
    left: 557.21px;
    top: 738.25px;

    background: #66CBBD;
    border-radius: 4px;

    font-size: 20px;
    line-height: 20px;
    text-align: center;
    text-transform: capitalize;
    color: #FFFFFF;
    border: none;
    margin: 10px;
    margin-top: 40px;
}
input[type="submit"]:hover{
    background: #59b9ac;
}

</style>
