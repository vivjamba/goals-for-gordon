<template>
        <Button label="Add Goal" icon="pi pi-plus" @click="openModal" class="p-button-raised p-button-rounded bg-cyan-700" />
        <Dialog header="Add Goal" v-model:visible="displayModal" :breakpoints="{'960px': '75vw', '640px': '90vw'}" :style="{width: '30vw'}" :modal="true" :closeable="true">
            <p class="m-0">
                <div class="user-input">
                    <h4>Goal Title </h4>
                    <InputText type="text" v-model="title"></InputText>
                    <h4>Goal Description</h4>
                    <Textarea v-model="description" rows="5" cols="25" />
                    <h4>Start Date</h4>
                    <Calendar inputId="basic" v-model="startDate" autocomplete="off" />
                    <h4>End Date</h4>
                    <Calendar inputId="basic" v-model="endDate" autocomplete="off" />
                    <h4>Category</h4>
                    <Dropdown v-model="category" :options="categoryList" optionLabel="name" optionValue="code" placeholder="Select a Category" />
                    <h4>Status</h4>
                    <Dropdown v-model="status" :options="statusList" optionLabel="name" optionValue="code" placeholder="Select a Status" />
                </div>
            </p>
            <template #footer>
                <Button label="Cancel" icon="pi pi-times" @click="closeModal" class="p-button-text text-red-300"/>
                <Button label="Add" icon="pi pi-check" @click="save" class="bg-cyan-700" autofocus />
            </template>
        </Dialog>
</template>
<script>
import axios from "axios";
export default {
    name: 'CreateGoalView',
    data() {
        return {
            displayModal: false,
            position: 'center',
            title: null,
            description: null,
            startDate: null,
            endDate: null,
            category: null,
            status: null,
            statusList: [
                {name: 'Inactive', code: 'inactive'},
                {name: 'Active', code: 'active'},
                {name: 'Complete', code: 'complete'},
            ],
            categoryList: [
                {name: 'Developmental', code: 'developmental'},
                {name: 'Performance', code: 'performance'},
                {name: 'Personal', code: 'personal'},
            ]
        }
    },
    methods: {
        openModal() {
            this.displayModal = true;
        },
        closeModal() {
            this.displayModal = false;
            this.$router.push({name: 'user', params: {userid : this.$route.params.userid}})
            this.$emit("close")
        },
        save(){
            this.auth = localStorage.getItem('token');
            axios.post(`http://localhost:5000/goal/create`, {
                    title: this.title,
                    description: this.description,
                    startDate: this.startDate,
                    endDate: this.endDate,
                    category: this.category,
                    status: this.status,
                    poster: this.$route.params.userid,
                },
                {
                    headers: { Authorization: `Bearer ${this.auth}`}
                })
                .then((res) => {
                    this.$emit("saveGoal")
                    this.closeModal();
                })
                .catch((err) => {
                    console.error(err);
                })
        }
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



