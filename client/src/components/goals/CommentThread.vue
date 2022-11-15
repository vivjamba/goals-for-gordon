<template>
    <div>
        <Comment content="comment number 1" date="2022-11-03" poster="FirstName LastName"/>
        <Comment content="test comment number 2" date="2022-11-03" poster="FirstName LastName"/>
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
