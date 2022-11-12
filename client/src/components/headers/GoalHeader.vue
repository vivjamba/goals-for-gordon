<template>
  <div class="bar">
      <div class="title">
          <h3>Employee Goals</h3>

          <div class="filters">
            <span class="p-input-icon-left">
              <i class="pi pi-search"/>
              <InputText type="text" v-model="value3" class="w-24rem" placeholder="Search" />
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
          </div>
      </div>
  </div>
</template>

<script>
import { RouterLink, RouterView } from 'vue-router'
export default {
  name: 'GoalHeader',
  data() {
		return {
			checked: false,
      checked2: false,
      checked3: false
		}
	}

  
  
}


</script>

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

