<!-- 页面结构入口 -->
<template>
	<div class="page">
		<div class="chart-pannel">
            <h3>设备开机率</h3>
			<div class="chart">
				<CircleProgress id="device_progress" :progress="progress"></CircleProgress>
				<!--<div id="chartPie" style="width:170px; height:170px;margin: 0 auto"></div>-->
			</div>
		</div>
		<div class="tableContent">
			<table class="table-list">
				<tr>
					<th>车间</th>
					<th>设备</th>
					<th>状态</th>
				</tr>
				<tr v-for="(item,index) in pagination.items" :key="index">
					<td>{{item.shopName}}</td>
					<td><span class="f-blue">{{item.number}}</span></td>
					<td>
						<!--<span :class="item.status=='在产'?'f-blue':'f-red'">{{item.status}}</span>-->
						<span v-if="item.status==0" class="f-blue" :class="item.status=='0'?'f-blue':'f-red'">在产</span>
						<span v-if="item.status==1" class="f-blue" :class="item.status=='0'?'f-blue':'f-red'">待料</span>
						<span v-if="item.status==2" class="f-blue" :class="item.status=='0'?'f-blue':'f-red'">故障</span>
						<span v-if="item.status==3" class="f-blue" :class="item.status=='0'?'f-blue':'f-red'">停机</span>
					</td>
				</tr>
			</table>
			<div class="more" @click="more" style="display: none">
				点击加载更多
			</div>
		</div>
		<div class="list-btn">
			<mt-button style="width:40%;margin-right: 30px;" size="normal" type="primary" @click="handleLink('/deviceMaintain')">巡检</mt-button><mt-button style="width:40%;" size="normal" type="primary" @click="handleLink('/scene')">现场</mt-button>
		</div>
	</div>
</template>

<script>
	import CircleProgress from '../../components/CircleProgress';
    import * as AjaxApi from '../../../../lib/AjaxApi';
    import $ from '../../../../lib/jquery-3.2.0.min';
    import {getDeviceRunningRate,deviceInfoList} from '../../../../lib/api';
	export default {
		data: function() {
			return {
				selected:'1',
				pagination: {
                    items:[],
					total: 0,
					per_page:'',
					from: 1,
					to: 0,
					current_page: 1
				},
				progress: '',
				isShowbar: true
			}
		},
		mounted: function(){
			this.$bus.emit('set-title', '设备');
			let he = $(".page").css("height");
			let tableHe = (parseInt(he) - 405);
			let num = Math.floor(tableHe/30);
            this.pagination.per_page = num + 1;
            this.fetchItems();
		},
		methods: {
            more(){
                this.pagination.per_page+= 6 ;
                this.fetchItems();
			},
			fetchItems(){
                let params = {
                    limit : this.pagination.per_page, // 页面大小
                    /*orders : '[{"col":"name","direct":"desc"}]',
                    "name": this.searchVal*/
                };
                AjaxApi.ajaxGet(deviceInfoList,params,(response) => {
                    if(response.status===200){
                        this.pagination.items = response.body.data.rows;
                        if(response.body.data.total>this.pagination.per_page){
                            //加载更多消失
                            document.getElementsByClassName("more")[0].style.display = "block";
                        }else {
                            document.getElementsByClassName("more")[0].style.display = "none";
                        }
                    }else {
                    }

                });

                AjaxApi.ajaxGet(getDeviceRunningRate,{},(response) => {
                    this.progress =response.body.data;

                    /*let data = (response.body.data).toFixed(3);
                    let data1 = (100 - data);
                    this.chartPie = echarts.init(document.getElementById('chartPie'));
                    this.chartPie.setOption({
                        title: {
                            text: data+'%',
                            x: 'center',
                            y: 'center',
                            itemGap: 20,
                            textStyle: {
                                color: '#00B9EF',
                                fontFamily: '微软雅黑',
                                fontSize: 30,
                                fontWeight: 'bolder'
                            }
                        },
                        tooltip: {
                            show: true,
                            formatter: "{a} <br/>{b} : {c} ({d}%)"
                        },
                        legend: {
                            orient: '开机率',
                            x: document.getElementById('chartPie').offsetWidth / 2,
                            y: 45,
                            itemGap: 12,
                            data: data
                        },
                        series: [
                            {
                                type: 'pie',
                                name:'',
                                clockWise: false,
                                radius: [63, 75],
                                itemStyle: {
                                    normal: {
                                        label: {show: false},
                                        labelLine: {show: false},
                                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                            offset: 0,
                                            color: '#49c500'
                                        }, {
                                            offset: 1,
                                            color: '#00b9ef'
                                        }])
                                    }
                                },
                                data: [
                                    {
                                        value:data,
                                        name:'开机率',
                                    },
                                    {
                                        value: data1,
                                        name: '1',
                                        tooltip: {
                                            show: false
                                        },
                                        itemStyle: {
                                            normal: {
                                                color: '#E5E9F2'
                                            },
                                            emphasis: {
                                                color: '#E5E9F2'
                                            }
                                        },
                                        hoverAnimation: false
                                    }
                                ]
                            }
                        ],
                        color: ['#00b9ef']
                    });*/
                });
			},
			handleLink(path){
				this.$router.push({path:path});
			}
		},
		components: {
			CircleProgress: CircleProgress
		}
	}

</script>
<style>

.list-btn{
	margin: 20px 0;
	text-align:center;
}
	.more{
		text-align: center;
	}

</style>