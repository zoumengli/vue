<!-- 页面结构入口 -->
<template>
	<div class="page">
		<div>
			<ul class="list-ul">
				<li class="li-middle" @click="handleLink('/production')">
					<span class="list-icon"><img slot="icon" src="../../../../assets/icon/list_icon/list_icon_3.png"></span>
					<span>设备报表</span>
					<span class="list-turn"><img slot="icon" :src="turnIcon"></span>
				</li>
				<li class="li-middle"  @click="handleLink('/qualityReport')">
					<span class="list-icon"><img slot="icon" src="../../../../assets/icon/list_icon/list_icon_2.png"></span>
					<span>运维报表</span>
					<span class="list-turn"><img slot="icon" :src="turnIcon"></span>
				</li>
				<li class="li-middle"  @click="handleLink('/deviceReport')">
					<span class="list-icon"><img slot="icon" src="../../../../assets/icon/list_icon/list_icon_1.png"></span>
					<span>成本报表</span>
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
			this.$bus.emit('set-title', '报表');
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