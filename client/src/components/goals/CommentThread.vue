<template>
    <div>
        <Comment content="content" date="date" poster="poster"/>
        <Comment content="content" date="date" poster="poster"/>
    </div>
    
</template>

<script>

import Comment from '../Comment.vue'
export default {
    name: 'GoalModalComment',
    components: {
        Comment,
    }
}
</script>

<style scoped>

</style>
