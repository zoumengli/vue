<!-- 页面结构入口 -->
<template>
	<div class="guide">
		<div class="guide-bg">
			<img slot="icon" src="../../../../assets/icon/guide1.png">
		</div>
		<div class="guide-bg">
			<img slot="icon" src="../../../../assets/icon/guide2.png">
		</div>
		<div class="guide-btn">
			<router-link to="/login">智能管理系统</router-link>
		</div>
	</div>
</template>

<script>

	export default {
		data: function() {
			return {
			}
		},
		mounted: function(){
			this.$bus.emit('set-title', '');
		},
		methods: {
			handleLogin(){
				//验证通过跳转到首页（任务页面）
				this.$router.push({path:'/mobile/task'});
			}
		},
		components: {

		}
	}
</script>
<style scoped>
	.guide{
        height:100%;
		width:100%;
		position:absolute;
        z-index: 99999;
		background-color: #FFFFFF;
	}
    .guide-bg {
        padding-top:40px;
    }
	.guide-bg img{
		width:100%;
	}
    .guide-btn{
        text-align:center;
        padding: 80px 0;
        font-size: 24px;
        color: #51A6FF;
    }
</style>