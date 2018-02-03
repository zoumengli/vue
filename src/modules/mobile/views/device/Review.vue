<!-- 页面结构入口 -->
<template>
	<div class="page">
		<div class="review-pannel">
            <div style="padding-top:40px;">
                <h3>条码扫描</h3>
				<img class="qrcode-img" slot="icon" src="../../../../assets/icon/icon_tiaoma.png">
				<div style="padding:10px 0;">
					<div class="qrcode-pannel">
						
					</div>
				</div>
            </div>
			<div>
				<h3>将条码放入框内即可自动扫描</h3>
			</div>
			<div class="list-btn">
				<mt-button style="width:40%;" size="normal" type="primary" @click="handleLink">
					<img class="img" src="../../../../assets/icon/icon_btn_shoudong.png" width="12" slot="icon">手动录入
				</mt-button>
				<mt-button style="width:40%;" size="normal" type="primary">
					<img class="img" src="../../../../assets/icon/icon_btn_sdt.png" width="12" slot="icon">打开手电筒
				</mt-button>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data: function() {
			return {
				selectedIcon:'',
				pagination: {
                    items:[],
					total: 0,
					per_page: 10,
					from: 1,
					to: 0,
					current_page: 1
				},
                taskData:[],
                currTask:{},
				progress: 70,
				isShowbar: true
			}
		},
		mounted: function(){
			this.$bus.emit('set-title', '巡检');
		},
		methods: {
			handleLink(){
				this.$router.push({path:'/mobile/deviceMaintain'});
			}
		}
	}

</script>
<style scoped>
.review-pannel{
	text-align:center;
}
.qrcode-pannel{
	width:160px;
	height:160px;
	background-color: #FFFFFF;
	display:inline-block;
}
.qrcode-img{
	width:60px;
	padding:5px 0 10px 0;
}
.list-btn .img{
	margin-right:5px;
	margin-top:-7px;
}
</style>