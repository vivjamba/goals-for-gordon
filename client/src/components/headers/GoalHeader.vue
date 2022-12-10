<script>
import { RouterLink, RouterView } from 'vue-router'

import CreateGoalView from '../../views/CreateGoalView.vue'

export default {
  name: 'GoalHeader',
  components:{
        CreateGoalView

    },
  data() {
		return {
			checked: false,
      checked2: false,
      checked3: false
		}
	},
  methods: {
    saveGoal(){
      this.$emit("saveGoal");
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
              <InputText type="text" v-model="value3" class="w-16rem" placeholder="Search" />
            </span>

            <Dropdown v-model="selectedCar" :options="cars" optionLabel="brand" placeholder="Filters" :filter="true" class="w-16rem h-2rem" filterPlaceholder="Goal Filters"/>

            <div class="field-checkbox">
              <Checkbox inputId="binary" v-model="checked" :binary="true" />
              <label for="binary">Inactive</label>
            </div>

            <div class="field-checkbox">
              <Checkbox inputId="binary2" v-model="checked2" :binary="true" />
              <label for="binary2">In-progress</label>
            </div>

            <div class="field-checkbox">
              <Checkbox inputId="binary3" v-model="checked3" :binary="true" />
              <label for="binary3">Completed</label>
            </div>
            <CreateGoalView @saveGoal="saveGoal()"></CreateGoalView>
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

