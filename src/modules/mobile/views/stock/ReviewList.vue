<!-- 页面结构入口 -->
<template>
	<div class="page">
		<div class="task">
			<ul class="list-ul">
				<li style="height:50px;line-height: 20px;font-size:18px;">
					<span><label style="font-weight: bolder;">条码号：</label><span class="f-blue">{{qrcode}}</span></span>
				</li>
			</ul>
			<div class="title">原材料信息</div>
			<ul class="list-ul task">
				<li>
					<div>
						<span class="li-item"><label>物料：</label>{{rawMaterielInfo.materielName}}</span>
						<span class="li-item"><label>批次：</label>{{rawMaterielInfo.materielLot}}</span>
					</div>
					<div>
						<span class="li-item"><label>供应商：</label>{{rawMaterielInfo.contactUnitName}}</span>
						<span class="li-item"><label>单位：</label>{{rawMaterielInfo.countName}}</span>
					</div>
					<div>
						<span class="li-item"><label>单价：</label>{{rawMaterielInfo.price}}</span>
						<span class="li-item"><label>负责人：</label>{{rawMaterielInfo.contactUnitName}}</span>
					</div>
					<div>
						<span class="li-item" style="width: 100%"><label>时间：</label>{{rawMaterielInfo.addTime}}</span>
					</div>
				</li>
			</ul>
			<div class="title">暂存区存放信息</div>
			<ul class="list-ul task">
				<li  v-for="(item,index) in tempStockList" :key="index">
					<div>
						<span class="li-item"><label>暂存区：</label>{{item.tempStockName}}</span>
						<span class="li-item"><label>区域：</label>{{item.tempStockArea}}</span>
					</div>
					<div>
						<span class="li-item"><label>工序：</label>{{item.processName}}</span>
						<span class="li-item"><label>类别：</label>{{item.typeStr}}</span>
					</div>
					<div>
						<span class="li-item"><label>负责人：</label>{{item.charge}}</span>
					</div>
					<div>
						<span class="li-item" style="width: 100%"><label>时间：</label>{{item.addTime}}</span>
					</div>
				</li>
			</ul>

			<!--<div class="tableContent">
				&lt;!&ndash;<table class="table-list">
					<tr>
						<th colspan="7" style="font-size: 18px;">原材料信息</th>
					</tr>
					<tr>
						<th>物料</th>
						<th>批次</th>
						<th>供应商</th>
						<th>单位</th>
						<th>单价</th>
						<th>时间</th>
						<th>负责人</th>
					</tr>
					<tr >
						<td>{{rawMaterielInfo.materielName}}</td>
						<td><span class="f-blue"></span>{{rawMaterielInfo.materielLot}}</td>
						<td><span>{{rawMaterielInfo.contactUnitName}}</span></td>
						<td><span>{{rawMaterielInfo.countName}}</span></td>
						<td><span>{{rawMaterielInfo.price}}</span></td>
						<td><span>{{rawMaterielInfo.addTime}}</span></td>
						<td><span>{{rawMaterielInfo.contactUnitName}}</span></td>
					</tr>
				</table>&ndash;&gt;
				<table class="table-list" style="margin-top: 20px;">
					<tr>
						<th colspan="6" style="font-size: 18px;">暂存区信息</th>
					</tr>
					<tr>
						<th>暂存区</th>
						<th>区域</th>
						<th>工序</th>
						<th>类别</th>
						<th>时间</th>
						<th>负责人</th>
					</tr>
					<tr v-for="(item,index) in tempStockList" :key="index">
						<td>{{item.tempStockName}}</td>
						<td><span class="f-blue">{{item.tempStockArea}}</span></td>
						<td><span>{{item.processName}}</span></td>
						<td><span>{{item.typeStr}}</span></td>
						<td><span>{{item.addTime}}</span></td>
						<td><span>{{item.charge}}</span></td>
					</tr>
				</table>
			</div>-->

		</div>
	</div>
</template>

<script>
    import * as AjaxApi from '../../../../lib/AjaxApi';
    import {getStockKB,getDeviceRunningRate,getMaterielTrace} from '../../../../lib/api';
    import {Toast} from 'mint-ui';
	export default {
		data: function() {
			return {
				selected:'1',
				pagination: {
                    items:[],
					total: 0,
					per_page: 10,
					from: 1,
					to: 0,
					current_page: 1
				},
                tableDate:[],
                rawMaterielInfo:{},//原材料
                tempStockList:[],//暂存区
				qrcode: '',
				isShowbar: true
			}
		},
		mounted: function(){
			this.qrcode = this.$route.params.qrcode;
			this.$bus.emit('set-title', '物料追溯');
            this.fetchItem();
		},
		methods: {
			fetchItem(){
                let para = {
					/* limit : this.pagination.per_page, // 页面大小
					 offset : (page-1)*this.pagination.per_page, // 页码
					 orders : '[{"col":"name","direct":"desc"}]',*/
					/*"name": this.searchVal,*/
                    barCode:this.qrcode,
                };
                AjaxApi.ajaxPost(getMaterielTrace,para,(response) => {
                    this.loading = false;
                    console.log(response.body);
					if(response.body.status){

                        this.rawMaterielInfo = response.body.rawMaterielInfo;
                        this.tempStockList = response.body.tempStockList;
                        console.log(this.rawMaterielInfo);
                        console.log(this.tempStockList);
					}else {
                        Toast({
                            message: response.body.msg,
                            position: 'middle',
                            duration: 2000
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
.title{
	font-size: 18px;
	margin-top: 20px;
	text-align: center;
}
</style>