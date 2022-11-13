<template>
    <div class="comment">
        <h2 class="poster">{{poster}}</h2>
        <h3 class="content">{{content}}</h3>
        <h3 class="date">{{date}}</h3>
    </div>
</template>

<script>
export default {
    name: 'Comment',
    props: {
        content: String,
        poster: String,
        date: String, 
    }
}
</script>

<style scoped>
.comment{
    border-radius: 5px;
    padding-bottom: 10px;
    background-color: #DDDDDD;
    position: relative;
    margin: 10px;
}
.poster{
    padding-left: 10px;
}
.content{
    padding-left: 30px;
}
.date{
    position: absolute;
    top: 2%;
    right: 2%;
    
}
</style>