<template>
    <div class="bar">
        <div class="logo-div">
            <img alt="Vue logo" class="logo" src="@/assets/ukg.svg" width="75" height="75" />
        </div>
        <div class="profile-info">
            <img alt="Profile Photo" class="prof-pic" src="@/assets/sample_profile.png" width="75" height="75" />
            <div class="text-info">
                <h2 class="name"><span class="first-name">{{firstName}}</span> <span class="last-name">{{lastName}}</span></h2>
                <div class="role">
                    <h3>{{positionTitle}}</h3>
                </div>
            </div>
        </div>
        <div class="control-buttons">
            {{email}}
            <span class="p-button-set">
                <Button icon="pi pi-cog" class="p-button-link" />
                <Button @click="$router.push('/')" icon='pi pi-sign-out' label="logout" class="p-button-link"/>
            </span>
            <InputSwitch v-if="isManager" v-model="checked" class="manager-switch"/>
        </div>
    </div>
    
</template>

<script>
import { RouterLink, RouterView } from 'vue-router'
export default {
    props:{
        firstName: String,
        lastName: String,
        email: String,
        positionTitle: String,
        isManager: Boolean
    },
    data() {
        return {
            checked: false,
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
.role{
    display: flex;
    flex-direction: row;
    gap: 10px;
}
.manager-switch {
    scale:.7;
}

.control-buttons {
    display: flex;
    flex-direction:column;
    align-items: flex-end;
    justify-content: flex-start;

}
.control-buttons>.p-button-set {

}

.bar>.profile-info {
    flex-grow: 2;
}
.bar>.control-buttons P{
    flex-grow: 1;
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
