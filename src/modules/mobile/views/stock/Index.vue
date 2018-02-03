<!-- 页面结构入口 -->
<template>
	<div class="page">
		<div class="chart-pannel">
			<div class="chart">
				<div id="chartPie" style="width:100%; height:300px;margin: 0 auto"></div>
			</div>
		</div>
		<div class="filtrate">
			<div class="search">
				<mt-field label="" placeholder="请输入配件名称" v-model="searchVal" class="serInput"></mt-field>
				<div class="iconBtn" @click="fetchItems()"></div>
			</div>
		</div>
		<div class="tableContent">
			<table class="table-list">
				<tr>
					<th>配件</th>
					<th>计量单位</th>
					<th>单价</th>
					<th>使用数</th>
					<th>库存数</th>
				</tr>
				<tr v-for="(item,index) in pagination.items" :key="index">
					<td>{{item.name}}</td>
					<td><span>{{item.unitName}}</span></td>
					<td><span>{{item.price}}</span></td>
					<td><span>{{item.consumAmount}}</span></td>
					<td><span class="f-blue">{{item.stockAmount}}</span></td>
				</tr>
			</table>
			<div class="more" @click="more" style="display: none">
				点击加载更多
			</div>
		</div>
	</div>

</template>

<script>
    import selectedIcon from '../../../../assets/icon/selected.png';
    import * as AjaxApi from '../../../../lib/AjaxApi';
    import $ from '../../../../lib/jquery-3.2.0.min';
    import {getStockKB,getMaterielInfoAll,getWareHouseInfoAll} from '../../../../lib/api';
    import echarts from 'echarts'
    import {Toast} from 'mint-ui';

	export default {
		data: function() {
			return {
                loading: false,
				pagination: {
                    items:[],
					total: 0,
					per_page:'10',
					from: 1,
					to: 0,
					current_page: 1
				},
                chartPie:null,
                searchVal:'',
			}
		},
		mounted: function(){
			this.$bus.emit('set-title', '配件');
           /* let he = $(".page").css("height");
            let tableHe = (parseInt(he) - 452);
            let num = Math.floor(tableHe/30);
            this.pagination.per_page = num + 1;*/
            this.fetchItems();
		},
		methods: {
            //加载更多
            more(){
                this.pagination.per_page+= 5 ;
                this.fetchItems();
            },
			fetchItems(){
                let para = {
                    limit: this.pagination.per_page, // 页面大小
                    "name": this.searchVal
                };
                AjaxApi.ajaxPost(getStockKB,para,(response) => {
                    this.loading = false;
                    if(response.status===200){
                        let data = response.body.data.rows;
                        this.pagination.items  = data;

                        let data_name=[];
                        let data_data=[];
                        let data_data1=[];
                        for(let i=0; i<data.length;i++){
                            data_name.push(data[i].name);//配件名称
                            data_data.push(data[i].stockAmount);//库存数
                            data_data1.push(data[i].consumAmount);//使用数
                        }

                        this.chartPie = echarts.init(document.getElementById('chartPie'));
                        this.chartPie.setOption({
                            tooltip: {},
                            legend: {
                                data:['库存数','使用数']
                            },
                            xAxis: {
                                data : data_name
                            },
                            yAxis: {},
                            grid:{
                                x:50,
                            },
                            series : [
                                {
                                    name:'库存数',
                                    type:'bar',
                                    barWidth:20,
                                    itemStyle:{
                                        normal:{
                                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                                offset: 0,
                                                color: '#51a6ff'
                                            }, {
                                                offset: 1,
                                                color: 'rgba(0, 158, 239, 0.4)'
                                            }])
                                        }
                                    },
                                    data:data_data
                                },
                                {
                                    name:'使用数',
                                    type:'bar',
                                    barWidth:20,
                                    itemStyle:{
                                        normal:{
                                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                                offset: 0,
                                                color: '#49c500'
                                            }, {
                                                offset: 1,
                                                color: 'rgba(73, 197, 0, 0.4)'
                                            }])
                                        }
                                    },
                                    data:data_data1
                                }
                            ],
                        });

                        if(response.body.data.total>this.pagination.per_page){
                            //加载更多消失
                            document.getElementsByClassName("more")[0].style.display = "block";
                        }else {
                            document.getElementsByClassName("more")[0].style.display = "none";
                        }
                    }else {
                        Toast({
                            message: response.body.msg,
                            position: 'middle',
                            duration: 1000
                        });
                    }
                });
			},
		},
	}

</script>
<style lang="less" scoped>
.screening {
	color: #848CA4;
	background-color: #FFFFFF;
	padding: 10px 20px;
	font-size: 15px;
	margin-bottom: 10px;
	border-radius: 0;
	width: 100vw;
	border: none;
	outline: 0;
}
.filtrate{
	color: #848CA4;
	background-color: #FFFFFF;
	padding: 10px 20px 0;
	width: 100vw;
}
.filtrate .search{
	border: 1px solid #edf4fc;
	border-radius: 20px;
	overflow: hidden;
}
.serInput{
	min-height: 40px;
	width: 70%;
	float: left;
	margin-left: 20px;

}
.iconBtn{
	width: 20%;
	float: right;
	height: 40px;
	background-color: #51a6ff;
	background-image: url("../../../../assets/icon/serachBtn.png");
	background-repeat: no-repeat;
	background-position: center center;
	background-size: 40% 70%;
}
.mint-button--default{
	box-shadow:none;
}

	.img{
		width:20px;
		height:20px;
		text-align:center;
		float:right;
	}
	.mint-popup-3{

	}
	.mint-popup-sel{
		width: 50%;
		height: 100%;
		background-color: wheat;
	}
	.bottomBtn{
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
	}
.bottomBtn button{
	border-radius: 0;
	width: calc(100% / 2);
	display: inline-block;
}
.bottomBtn button:active{
	background-color: white;
}
	.selContent{
		background-color: white;
	}
.materialClass,
.warehouseClass{
	overflow: auto;
	/*outline: 1px solid black;*/
}
.materialClass a,
.warehouseClass a{
	display: block;
	float: left;
	/*outline: 1px solid red;*/
	margin-bottom: 10px;
	padding: 5px 5px;
	font-size: 16px;
	color: #848ca4;
	background-color: #edf4fc;
	width: 100%;
	text-align: center;
}
	.topTitle{
		font-size: 18px;
		margin: 10px 0;

	}
	.hasBackground{
		background-image: url("../../../../assets/icon/selected.png");
		background-repeat: no-repeat;
		background-position: bottom right;
	}

</style>