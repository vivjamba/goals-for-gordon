<template>
    <Button label="Add Goal" icon="pi pi-plus" @click="openModal" class="p-button-raised p-button-rounded bg-cyan-700" />
        <Dialog header="Add Goal" v-model:visible="displayModal" :breakpoints="{'960px': '75vw', '640px': '90vw'}" :style="{width: '30vw'}" :modal="true">
            <p class="m-0">
                <div class="user-input">
                    <h4>Goal Title </h4>
                    <InputText type="text" v-model="value"></InputText>
                    <h4>Goal Description</h4>
                    <Textarea v-model="value1" rows="5" cols="25" />
                    <h4>Start Date</h4>
                    <Calendar inputId="basic" v-model="date1" autocomplete="off" />
                    <h4>End Date</h4>
                    <Calendar inputId="basic" v-model="date2" autocomplete="off" />
                    <h4>Status</h4>
                    <Dropdown v-model="selectedStatus" :options="statuses" optionLabel="name" optionValue="code" placeholder="Select a Status" />
                </div>

                

            </p>
            <template #footer>
                <Button label="Cancel" icon="pi pi-times" @click="closeModal" class="p-button-text text-red-300"/>
                <Button label="Add" icon="pi pi-check" @click="closeModal" class="bg-cyan-700" autofocus />
            </template>
        </Dialog>
    
</template>

<script>

export default {
    name: 'CreateGoalView',
    data() {
		return {
            displayModal: false,
            position: 'center',
            date1: null,
            date2: null,
            selectedStatus: null,
            statuses: [
                {name: 'Inactive', code: 'inactive'},
                {name: 'In-progress', code: 'in-progress'},
                {name: 'Completed', code: 'completed'},
            ]
		}
	},
    methods: {
        openModal() {
            this.displayModal = true;
        },
        closeModal() {
            this.displayModal = false;
        },
    }
}
</script>

<style scoped lang="scss">
.p-button {
    margin: 0.3rem .5rem;
    min-width: 10rem;
}

p {
    margin: 0;
}

.confirmation-content {
    display: flex;
    align-items: center;
    justify-content: center;
}

.p-dialog .p-button {
    min-width: 6rem;
}

.user-input {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
