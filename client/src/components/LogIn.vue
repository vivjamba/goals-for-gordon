<template>
    <div class="center">
        <h1>Sign In</h1>
        <form action="">
            <br>
            <input type="text" id="username" name="username" placeholder="Username">
            <br>
            <input type="password" id="pwd" name="pwd" placeholder="Password">
            <br>
            <input type="submit" value="Log-In">
        </form>
    </div>
    
</template>

<script>
export default {
    name: "LogIn",
    methods: {
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