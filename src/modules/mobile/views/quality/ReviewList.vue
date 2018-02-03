<!-- 页面结构入口 -->
<template>
	<div class="page">
		<div class="task">
			<ul class="list-ul">
				<li>
					<div style="font-size:18px;">
						<span><label style="font-weight: bolder;">条码号：</label><span class="f-blue">{{qrcode}}</span></span>
					</div>
					<!--<div>
						<span class="pr20"><label>原材料：</label><span class="f-blue">卷纸1</span></span>
						<span class="pr20"><label>批次：</label><span class="f-blue">20170222</span></span>
					</div>-->
				</li>
			</ul>
			<ul class="list-ul">
				<li v-for="(item,index) in pagination.items" :key="index">
					<div>
						<span class="li-item"><label class="fontWeight">任务：</label><span>{{item.taskCode}}</span></span>
						<span class="li-item"><label class="fontWeight">工序：</label><span class="f-blue">{{item.processName}}</span></span>
					</div>
					<div>
						<span class="li-item"><label class="fontWeight">产品：</label><span>{{item.productName}}</span></span>
						<span class="li-item"><label class="fontWeight">机台号：</label><span>{{item.deviceNumber}}</span></span>
					</div>
					<div>
						<span class="li-item"><label class="fontWeight">检测项目：</label><span>{{item.typeName}}</span></span>
						<span class="li-item"><label class="fontWeight">良品率：</label><span class="f-blue">{{item.goodRateStr}}</span></span>
					</div>
					<div>
						<span class="li-item"><label class="fontWeight">人员：</label><span>{{item.operator}}</span></span>
					</div>
				</li>
			</ul>
			<div class="more" @click="more" style="background-color: white;display: none">
				点击加载更多
			</div>

		</div>
	</div>
</template>

<script>
    import * as AjaxApi from '../../../../lib/AjaxApi';
    import {getListByBarCode} from '../../../../lib/api';
    import {Toast} from 'mint-ui';
	export default {
		data: function() {
			return {
                loading:false,
				selected:'1',
				pagination: {
                    items:[],
					total: 0,
					per_page: 6,
					from: 1,
					to: 0,
					current_page: 1
				},
				qrcode: '',
				isShowbar: true
			}
		},
		mounted: function(){
			this.qrcode = this.$route.params.qrcode;
			this.$bus.emit('set-title', '追溯');
            this.fetchItem();
		},
		methods: {
            //加载更多
            more(){
                this.pagination.per_page+= 6 ;
                this.fetchItem();
            },
			fetchItem(){
                let params = {
                    limit: this.pagination.per_page, // 页面大小
                    barCode:this.qrcode
                };
                AjaxApi.ajaxGet(getListByBarCode,params,(response) => {
                    this.loading = false;
                    if(response.body.status===1){
                        this.pagination.items = response.body.data.rows;
                        if(response.body.data.total>this.pagination.per_page){
                            //加载更多消失
                            document.getElementsByClassName("more")[0].style.display = "block";
                        }else {
                            document.getElementsByClassName("more")[0].style.display = "none";
                        }
                    }else {
                        Toast({
                            message: response.body.msg,//请输入有效条码，
                            position: 'middle',
                            duration: 1000
                        });
                    }
                });

			}
		},
	}

</script>
<style scoped>
.task li{
	line-height:30px;
	padding: 10px 20px;
}
.task .task-title{
	padding-left:20px;
	height:50px;
	line-height:50px;
	font-size:18px;
}
	.fontWeight{
		font-weight: 600;
	}
</style>