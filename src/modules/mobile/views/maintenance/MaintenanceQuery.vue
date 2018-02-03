<!-- 页面结构入口 -->
<template>
    <div class="page">

    </div>
</template>

<script>
    export default {
        data: function() {
            return {

            }
        },
        mounted: function(){
            this.$bus.emit('set-title', '维保查询');
        },
        methods: {

        },
        components: {

        }
    }

</script>
<style>

</style>