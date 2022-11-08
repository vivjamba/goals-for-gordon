<template>

<DataTable :value="cars">
    <template #header>
        Normal Table
    </template>
    <Column field="vin" header="Vin"></Column>
    <Column field="year" header="Year"></Column>
    <Column field="brand" header="Brand"></Column>
    <Column field="color" header="Color"></Column>
</DataTable>
    
</template>

<script>
export default {
    name: 'GoalContainer'


}
</script>

<style scoped>

</style>