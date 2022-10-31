<template>
    <div class="bar">
        <div class="logo-div">
            <img alt="Vue logo" class="logo" src="@/assets/ukg.svg" width="75" height="75" />
        </div>
        <div class="profile-info">
            <img alt="Profile Photo" class="prof-pic" src="@/assets/sample_profile.png" width="75" height="75" />
            <h2 class="name"><span class="first-name">{{first_name}}</span> <span class="last-name">{{last_name}}</span></h2>
        </div>
        <div class="control-buttons">
            <a>logout</a>
            <InputSwitch v-model="checked" label="employee"/>
        </div>
    </div>
    
</template>

<script>
export default {
    data() {
        return {
            checked: false,
            first_name: "Gordon",
            last_name:"Anderson"
        }
    }
}
</script>

<style scoped>
.profile-info{
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
}

.bar>.profile-info {
    flex-grow: 2;
}
.bar>.logo-div{
    flex-grow: 1;
}

.bar {
    display: flex;
    flex-direction: row; 
    align-items:center;
    gap: 10px;

    width: 100vw;
    height:40px;     
    padding:60px;
    background-color: #CFF3EF;
    color: #005151;
    font-size: 3;
    left:0;          
    top:0;          
    z-index:200;  
}
</style>
