<script>
import { RouterLink, RouterView } from 'vue-router'

import CreateGoalView from '../../views/CreateGoalView.vue'

export default {
    name: 'GoalHeader',
    components:{
        CreateGoalView
    },
    props:{
        managerMode: Boolean,
        employees: Array
    },
    computed:{
        employeeOptions(){
            let ret = this.employees;
            ret.unshift(null);
            return ret;
        }

    },
    data() {
        return {
            selectedEmployee: null,
            search:"",
            inactives: false,
            actives: false,
            completes: false
        }
    },
    methods: {
        saveGoal(){
          this.$emit("saveGoal");
        },
        emitFilters(){
            this.$emit("filterChange", {
                selectedEmployee: this.selectedEmployee,
                search: this.search.toLowerCase(),
                inactives: this.inactives,
                actives: this.actives,
                completes: this.completes
            })
        },
        employeeLabel(emp){
            return `${emp.firstName} ${emp.lastName}`;
        }
    }
}
</script>

<template>
  <div class="bar">
      <div class="title">
          <h3>Employee Goals</h3>

          <div class="filters">
            <span class="p-input-icon-left">
              <i class="pi pi-search"/>
              <InputText type="text" @change="emitFilters" v-model="search" class="w-16rem" placeholder="Search" />
            </span>

            <Dropdown v-if="managerMode" @change="emitFilters" v-model="selectedEmployee" :options="this.employeeOptions" :optionLabel="this.employeeLabel" placeholder="Employee" :filter="true" class="w-16rem h-2rem" filterPlaceholder="Goal Filters"/>

            <div class="field-checkbox">
              <Checkbox inputId="binary" @change="emitFilters" v-model="inactives" :binary="true" />
              <label for="binary">Inactive</label>
            </div>

            <div class="field-checkbox">
              <Checkbox inputId="binary2" @change="emitFilters"  v-model="actives" :binary="true" />
              <label for="binary2">Active</label>
            </div>

            <div class="field-checkbox">
              <Checkbox inputId="binary3" @change="emitFilters" v-model="completes" :binary="true" />
              <label for="binary3">Complete</label>
            </div>
            <CreateGoalView v-if="!managerMode" @saveGoal="saveGoal()"></CreateGoalView>
            <!-- <Button label="Create Goal" class="p-button-raised p-button-rounded w-8rem"  /> -->
          </div>
      </div>
  </div>
</template>


<style scoped>
h3 {
font-weight: bold;
font-size: 1.5rem;
display: flex;
flex-direction: row;
}

.title {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.filters {
  display: flex;
  flex-direction: row;
  align-items:center;
  gap: 80px;
}
.bar {
  display: flex;
  flex-direction: row;
  align-items:center;
  gap: 10px;

  width: 100vw;
  height:40px;    
  padding:60px;
  color: #080403;
  font-size: 3;
  left:0;         
  top:0;         
  z-index:200; 
}
</style>

