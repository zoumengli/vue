<!-- 页面结构入口 -->
<template>
	<div class="page">
		<div>
			<ul class="list-ul">
				<li class="li-middle" @click="handleLink('/workOrder')">
					<span class="list-icon"><img slot="icon" src="../../../../assets/icon/list_icon/list_icon_1.png"></span>
					<span>维保工单</span>
					<span class="list-turn"><img slot="icon" :src="turnIcon"></span>
				</li>
				<li class="li-middle"  @click="handleLink('/query')">
					<span class="list-icon"><img slot="icon" src="../../../../assets/icon/list_icon/list_icon_1.png"></span>
					<span>维保查询</span>
					<span class="list-turn"><img slot="icon" :src="turnIcon"></span>
				</li>
				<li class="li-middle"  @click="handleLink('/registration')">
					<span class="list-icon"><img slot="icon" src="../../../../assets/icon/list_icon/list_icon_1.png"></span>
					<span>维保登记</span>
					<span class="list-turn"><img slot="icon" :src="turnIcon"></span>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import turnIcon from '../../../../assets/icon/icon_turn.png';
	export default {
		data: function() {
			return {
				turnIcon:'',
				isShowbar: true
			}
		},
		mounted: function(){
			this.turnIcon = turnIcon;
			this.$bus.emit('set-title', '维保');
		},
		methods: {
			handleLink(path){
				this.$router.push({path:path});
			}
		},
		components: {

		}
	}

</script>
<style>

</style>