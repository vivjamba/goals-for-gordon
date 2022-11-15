<template>
    <Fieldset :toggleable="true">
    <template #legend>
        {{poster}}
    </template>
	{{content}}
    </Fieldset>
</template>

<script>
import Fieldset from 'primevue/fieldset';
export default {
    name: 'Comment',
    props: {
        content: String,
        poster: String,
        date: String, 
    },
    components: {
        Fieldset,
    }
}
</script>

<style scoped>

</style>