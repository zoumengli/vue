<!-- 页面结构入口 -->
<template>

</template>

<script>

    export default{
        mounted: function(){
            this.$bus.emit('set-title', '现场');
        },
    }


</script>
<style>




</style>