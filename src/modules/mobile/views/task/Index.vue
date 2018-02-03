<!-- 页面结构入口 -->
<template>
	<div class="page">
		<div class="task">
			<div class="chart-pannel" style="border-bottom: 0">
				<h3>任务总完成率</h3>
				<div class="chart">
					<CircleProgress id="task_progress" :progress="progress"></CircleProgress>
					<!--<div id="chartPie" style="width:170px; height:165px;margin: 0 auto"></div>-->
				</div>
			</div>
			<ul class="list-ul task" v-for="(item,index) in pagination.items" :key="index">
				<li @click="handleLink(item)">
					<div>
						<span ><label>任务：</label><span>{{item.taskCode}}</span></span>
					</div>
					<div>
						<span class="li-item"><label>产品：</label><span class="f-blue">{{item.productName}}</span></span>
						<span class="li-item">
							<label>状态：</label>
							<span v-if="item.status==1" class="f-blue">未排产</span>
							<span v-if="item.status==2" class="f-blue">已排产</span>
							<span v-if="item.status==3" class="f-blue">生产中</span>
							<span v-if="item.status==4" class="f-blue">完成</span>
							<span v-if="item.status==5" class="f-blue">终止</span>
							<!--<span class="f-blue">{{item.status}}</span>-->
						</span>
						<span class="li-item"><label>订单数：</label><span class="f-blue">{{item.amount}}</span></span>
					</div>
				</li>
			</ul>
			<div class="more" @click="more" style="display: none">
				点击加载更多
			</div>
			<!--<div style="margin: 20px 50px;">
				<mt-button size="large" type="primary" @click="handleLink">追踪</mt-button>
			</div>-->
		</div>
	</div>
</template>

<script>
	import CircleProgress from '../../components/CircleProgress';
    import * as AjaxApi from '../../../../lib/AjaxApi';
    import {fetchDatas,fetchTableList} from '../../../../lib/CommonApi';
    import {getCompleteRate,getTaskProductProgressInfo} from '../../../../lib/api';
    import {Toast} from 'mint-ui';
	export default {
		data: function() {
			return {
                loading: false,
				selected:'1',
				pagination: {
                    items:[],
					total: 0,
					per_page: 5,
					from: 1,
					to: 0,
					current_page: 1
				},
				progress: '',
				isShowbar: true
			}
		},
        created:function () {
            this.fetchItems();
        },

		mounted: function(){
			this.$bus.emit('set-title', '任务');

		},
		methods: {
            //加载更多
            more(){
                this.pagination.per_page+= 5 ;
                this.fetchItems();
            },
			fetchItems(){
                AjaxApi.ajaxGet(getCompleteRate,{},(response) => {
                    this.progress =response.body.data;
                   // console.log(this.progress);
                   /* let data = response.body.data;
                    let data1 = 100 - data;
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
                            orient: '质量',
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
                                radius: [65, 75],
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
                                        name:'质量',
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

                let params = {
                    limit: this.pagination.per_page, // 页面大小
					/*offset : (page-1)*this.pagination.per_page, // 页码*/
					/*orders : '[{"col":"name","direct":"desc"}]',*/
                };
                AjaxApi.ajaxGet(getTaskProductProgressInfo,params,(response) => {

                    this.loading = false;
                    if(response.status===200){
                        this.pagination.items = response.body.data.rows;
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
			/*handleLink(id){
			    //任务详情
                this.$router.push({path:'/mobile/taskTrace/'+id});

			  /!*if(id){
					//跳转到任务详情页面
					this.$router.push({path:'/mobile/taskDetail/'+id});
				}else{
					//跳转到追踪页面
					this.$router.push({path:'/mobile/taskTrace'});
				}*!/
			},*/
            handleLink(item){
			    //任务追踪
               /* this.$router.push({path:'/mobile/taskDetail/'+item});*/
                this.$router.push({name:'taskDetail',params:{item:item}});
			}
		},
		components: {
			CircleProgress: CircleProgress
		}
	}

</script>
<style scoped>


</style>