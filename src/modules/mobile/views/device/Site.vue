<!-- 页面结构入口 -->
<template>
	<div class="page">
		<div class="page-site">
			<div class="search">
            	<mt-field label="" placeholder="请输入设备名称" v-model="name"></mt-field>
			</div>
			<div class="search-result">
                <span class="input-badge blue">运行：6666台</span>
                <span class="input-badge yellow">故障：6台</span>
                <span class="input-badge red">停机：4台</span>
			</div>
		</div>
	</div>
</template>

<script>
	import { Toast } from 'mint-ui';
	export default {
		data: function() {
			return {
				name:''
			}
		},
		mounted: function(){
			this.$bus.emit('set-title', '现场');
		},
		methods: {
			handleSubmit(){
				if(!this.qrcode){
					Toast({
						message: '请输入条码'
					});
					return;
				}
				this.$router.push({name:'qualityReviewList',params:{
					qrcode:this.qrcode
				}});
			}
		}
	}

</script>
<style lang="less">
.page-site{
	padding:0 20px;

	.search{
		background: #C4E0FD;
		font-size:15px;
		border:1px solid #C4E0FD;
		text-align:center;
		display:inline-block;
		border-radius:20px;
		padding:2px 10px;
		margin:10px 0;
		width: 100%;
	}
	.search{
		.mint-cell{
			min-height:35px !important;
		}
		.mint-cell-wrapper{
			padding:0 !important;
			background: #C4E0FD !important;
		}
		.mint-field-core{
			background: #C4E0FD !important;
		}
	}
	.search-result{
		text-align:center;
		span{
			margin: 0 5px;
		}
	}
}
.site-badge{
    
}
</style>