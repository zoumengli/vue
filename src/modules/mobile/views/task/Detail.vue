<!-- 页面结构入口 -->
<template>
    <div class="page">
        <div class="task">
            <ul class="list-ul heauto">
                <li style="height: auto;padding: 10px 20px;" class="detail">
                    <div>
                        <span><label>任务：</label>{{item.taskCode}}</span>
                        <span><label>交货日期：</label>{{item.endTime}}</span>
                    </div>
                    <div>
                        <span><label>产品：</label><span class="f-blue">{{item.productName}}</span></span>
                        <span>
							<label>状态：</label>
							<span v-if="item.status==1" class="f-blue">未排产</span>
							<span v-if="item.status==2" class="f-blue">已排产</span>
							<span v-if="item.status==3" class="f-blue">生产中</span>
							<span v-if="item.status==4" class="f-blue">完成</span>
							<span v-if="item.status==5" class="f-blue">终止</span>
						</span>
                        <span><label>订单数：</label><span class="f-blue">{{item.amount}}</span></span>
                    </div>
                </li>
            </ul>
            <div class="task-title">排程计划</div>
            <ul class="list-ul">
                <li v-for="(item1,index) in pagination.items" :key="index">
                    <div>
                        <span class="li-item"><label>工序：</label>{{item1.processName}}</span>
                        <span class="li-item"><label>生产日期：</label>{{item1.realStart}}</span>
                    </div>
                    <div>
                        <span class="li-item"><label>机台：</label><span class="f-blue">{{item1.workNum}}</span></span>
                        <span class="li-item"><label>数量：</label><span class="f-blue">{{item1.planNum}}</span></span>
                    </div>
                    <div>
                        <span class="li-item"><label>班组：</label><span
                                class="f-blue">{{item1.workGroupName}}</span></span>
                        <span class="li-item"><label>工时：</label><span class="f-blue">{{item1.workHour}}</span></span>
                    </div>
                </li>
            </ul>
            <div class="more" @click="more" style="display: none">
                点击加载更多
            </div>
        </div>
    </div>
</template>

<script>
    import * as AjaxApi from '../../../../lib/AjaxApi';
    import {getPaiChengTable} from '../../../../lib/api';
    import {Toast} from 'mint-ui';
    export default {
        data: function () {
            return {
                selected: '1',
                pagination: {
                    items: [],
                    total: 0,
                    per_page: 8,
                    from: 1,
                    to: 0,
                    current_page: 1
                },
                progress: 70,
                isShowbar: true,
                item: {}
            }
        },
        mounted: function () {
            this.$bus.emit('set-title', '任务详情');
            this.fetchItem();
        },
        methods: {
            fetchItem(){
                this.item = this.$route.params.item;//获取路由跳转传递的参数
                let params = {
                    limit: this.pagination.per_page, // 页面大小
                    /*offset : (page-1)*this.pagination.per_page, // 页码*/
                    /*orders : '[{"col":"name","direct":"desc"}]',*/
                    taskId: this.item.taskId
                };
                AjaxApi.ajaxGet(getPaiChengTable, params, (response) => {
                    this.loading = false;
                    if (response.status === 200) {
                        this.pagination.items = response.body.data.rows;
                        if (response.body.data.total > this.pagination.per_page) {
                            //加载更多消失
                            document.getElementsByClassName("more")[0].style.display = "block";
                        } else {
                            document.getElementsByClassName("more")[0].style.display = "none";
                        }
                    } else {
                        Toast({
                            message: response.body.msg,
                            position: 'middle',
                            duration: 1000
                        });
                    }

                });

            },
            //加载更多
            more(){
                this.pagination.per_page += 8;
                this.fetchItem();
            },
        },
    }

</script>
<style scoped>
    .task li {
        line-height: 30px;
        /*padding: 0 20px;*/
    }

    .task .task-title {
        padding-left: 20px;
        height: 40px;
        line-height: 40px;
        font-size: 18px;
        margin-top: 10px;
    }

    .detail > div > span {
        width: 50%;
        display: inline-block;
        float: left;

    }
</style>