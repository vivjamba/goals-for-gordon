<template>
    <div >
        <div v-for="comment in comments" :key="comment._id">
            <Comment :content="comment.content" :poster="comment.poster"/>
        </div>
    </div>
    
</template>

<script>


import Comment from '../Comment.vue'
export default {
    name: 'GoalModalComment',
    components: {
        Comment,
    },
    props:{
        comments: {}
    },
    methods:{
        
    },
}
</script>

<style scoped>

</style>
