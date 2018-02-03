<!-- 页面结构入口 -->
<template>
	<div class="page">
		<div class="tableContent" style="margin-top: 10px;">
			<table class="table-list">
				<tr>
					<th>机台号</th>
					<th>维保时间</th>
					<th>维保类型</th>
					<th>登记</th>
				</tr>
				<tr v-for="(item,index) in pagination.items" :key="index">
					<th><span class="f-blue">{{item.number}}</span></th>
					<th>{{item.time}}</th>
					<th v-if="item.type === 0">随机维保</th>
					<th v-if="item.type === 1">间隔维保</th>
					<th v-if="item.type === 2">天维保</th>
					<th v-if="item.type === 3">月维保</th>
					<th style="text-align: center" @click="handleLink(item)"><div class="register"></div></th>
				</tr>
			</table>
			<div class="more"  style="display: none">
				点击加载更多
			</div>
		</div>
	</div>
</template>

<script>
    import {Toast} from 'mint-ui';
    import * as AjaxApi from '../../../../lib/AjaxApi';
    import {getMaintenanceSet} from '../../../../lib/api';
    import $ from '../../../../lib/jquery-3.2.0.min';
    export default {
        data: function() {
            return {
                turnIcon:'',
				pagination: {
                    items:[],
                    total: 0,
                    per_page:'10',
                    from: 1,
                    to: 0,
                    current_page: 1
                },
            }
        },
        mounted: function(){
            this.$bus.emit('set-title', '维保工单');
            this.fetchItems();
        },
        methods: {
            fetchItems(){
                let id = this.$route.params.qrcode;
                let prams = {
                    limit: this.pagination.per_page, // 页面大小
                    deviceid:id,
				};

                AjaxApi.ajaxGet(getMaintenanceSet,prams,(response) => {
                    this.loading = false;
                    this.pagination.items = response.body.data.rows;
                });

			},
            handleLink(item){
				this.$router.push({name:'registration',params:{item:item}});
			},
        },
        components: {

        }
    }

</script>
<style scoped>
	.register{
		width: 22px;
		height: 22px;
		margin: auto;
		border-radius: 50%;
		/*background-color: #51a6ff;*/
		background-color: #9bcdfe;
		background-image: url("../../../../assets/icon/dengji.png");
		background-position: center center;
		background-repeat: no-repeat;
		background-size: 60% 60%;
	}
	.register:active{
		background-color: #51a6ff;
	}

</style>