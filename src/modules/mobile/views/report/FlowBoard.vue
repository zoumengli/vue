<!-- 页面结构入口 -->
<template>
    <div class="page-tabbar">
        <div class="page">
            <div>
                <div class="trace-task" style="padding-right: 10px;">
                    <div>
                        <h3 style="font-size: 18px">任务：{{currTask.name}}</h3>
                    </div>
                    <div>
                    <span v-for="(item,index) in taskData" :key="index"
                          @click="handleSelectTask(item,index)" class="taskName">
                        <span class="task-item">{{item.name}}</span>
                        <span class="img">
                            <img slot="icon" :src="selectedIcon"
                                 :style="'display:'+(item.selected?'inline-block':'none')">
                        </span>
                    </span>
                    </div>
                </div>
                <div style="margin-left:16px;" class="flow-pannel">
                    <div class="el-steps is-vertical">
                        <div class="el-step is-vertical" style="margin-right: 0px; min-height: 100px;">
                            <div class="el-step__head is-finish is-text">
                                <div class="el-step__line is-vertical" style="margin-right: 0px;">
                                    <i class="el-step__line-inner"
                                       style="transition-delay: 0ms; border-width: 1px; height: 100%;"></i>
                                </div>
                                <span class="el-step__icon"><div></div></span>
                            </div>
                            <div class="el-step__main" style="margin-left: 0px;width:95%;">
                                <div class="el-step__title is-finish" style="width:100%">原料
                                    <div class="list-content">
                                        <!--<table class="table-list">
                                            <tr><td>库存数</td><td>领料数</td><td>任务数</td></tr>
                                            <tr><td><span class="f-blue">{{tableData.materielAmount}}</span></td><td><span class="f-blue">{{tableData.requisitionAmount}}</span></td><td><span class="f-blue">{{tableData.taskAmount}}</span></td></tr>
                                        </table>-->
                                        <ul>
                                            <li class="li-list">
                                                <div class="vertical-line"></div>
                                                <div>库存数</div>
                                                <div class="f-blue">{{tableData.materielAmount}}</div>
                                            </li>
                                            <li class="li-list">
                                                <div class="vertical-line"></div>
                                                <div>领料数</div>
                                                <div class="f-blue">{{tableData.requisitionAmount}}</div>
                                            </li>
                                            <li class="li-list">
                                                <div class="vertical-line"></div>
                                                <div>任务数</div>
                                                <div class="f-blue">{{tableData.taskAmount}}</div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="el-step__description is-finish"></div>
                            </div>
                        </div>
                        <div v-for="(item,index) in tableData.processList">
                            <div class="el-step is-vertical" style="margin-right: 0px; min-height: 100px;">
                                <div class="el-step__head is-finish is-text">
                                    <div class="el-step__line is-vertical" style="margin-right: 0px;">
                                        <i class="el-step__line-inner"
                                           style="transition-delay: 0ms; border-width: 1px; height: 100%;"></i>
                                    </div>
                                    <span class="el-step__icon"><div></div></span>
                                </div>
                                <div class="el-step__main" style="margin-left: 0px;width:95%;">
                                    <div class="el-step__title is-finish" style="width:100%">{{item.processName}}
                                        <div class="list-content">
                                            <ul>
                                                <li class="li-list">
                                                    <div class="vertical-line"></div>
                                                    <div>上料数</div>
                                                    <div class="f-blue">{{item.upAmount}}</div>
                                                </li>
                                                <li class="li-list">
                                                    <div class="vertical-line"></div>
                                                    <div>下料数</div>
                                                    <div class="f-blue">{{item.downAmount}}</div>
                                                </li>
                                                <li class="li-list">
                                                    <div class="vertical-line"></div>
                                                    <div>报工数</div>
                                                    <div class="f-blue">{{item.reportAmount}}</div>
                                                </li>
                                                <li class="li-list" v-for=" item1 in item.checkList">
                                                    <div class="vertical-line" style="background-color: #53c60f"></div>
                                                    <div>{{item1.categoryName}}</div>
                                                    <div class="f-green">{{item1.goodRateStr}}</div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="el-step__description is-finish"></div>
                                </div>
                            </div>
                            <div class="el-step is-vertical" style="margin-right: 0px;">
                                <div class="el-step__head is-finish is-text">
                                    <div class="el-step__line is-vertical" style="margin-right: 0px;">
                                        <i class="el-step__line-inner"
                                           style="transition-delay: 0ms; border-width: 1px; height: 100%;"></i>
                                    </div>
                                    <span class="el-step__icon"><div></div></span>
                                </div>
                                <div class="el-step__main" style="margin-left: 0px;width:95%;">
                                    <div class="el-step__title is-finish" style="width:100%">{{item.stockName}}
                                        <span><label style="color: #7d859f;margin-left: 10px;">数量：</label>{{item.stockAmount}}</span>
                                    </div>
                                    <div class="el-step__description is-finish"></div>
                                </div>
                            </div>
                        </div>

                        <!--<div class="el-step is-vertical" style="margin-right: 0px; min-height: 100px;">
                            <div class="el-step__head is-finish is-text">
                                <div class="el-step__line is-vertical" style="margin-right: 0px;">
                                    <i class="el-step__line-inner" style="transition-delay: 0ms; border-width: 1px; height: 100%;"></i>
                                </div>
                                <span class="el-step__icon"><div></div></span>
                            </div>
                            <div class="el-step__main" style="margin-left: 0px;width:95%;">
                                <div class="el-step__title is-finish" style="width:100%">喷码
                                    <div>
                                        <table class="table-list">
                                            <tr><td>任务量</td><td>上料数</td><td>下料数</td></tr>
                                            <tr><td>5000</td><td>2200</td><td>200</td></tr>
                                            <tr><td>报工数</td><td>首检</td><td>巡检</td></tr>
                                            <tr><td>500</td><td>90%</td><td>80%</td></tr>
                                        </table>
                                    </div>
                                </div>
                                <div class="el-step__description is-finish"></div>
                            </div>
                        </div>-->
                        <!--<div class="el-step is-vertical" style="margin-right: 0px; min-height: 100px;">
                            <div class="el-step__head is-finish is-text">
                                <div class="el-step__line is-vertical" style="margin-right: 0px;">
                                    <i class="el-step__line-inner" style="transition-delay: 0ms; border-width: 1px; height: 100%;"></i>
                                </div>
                                <span class="el-step__icon"><div></div></span>
                            </div>
                            <div class="el-step__main" style="margin-left: 0px;width:95%;">
                                <div class="el-step__title is-finish" style="width:100%">印刷
                                    <div>
                                        <table class="table-list">
                                            <tr><td>任务量</td><td>上料数</td><td>下料数</td></tr>
                                            <tr><td><span class="f-blue">5000</span></td><td>2200</td><td>200</td></tr>
                                            <tr><td>报工数</td><td>首检</td><td>巡检</td></tr>
                                            <tr><td>500</td><td>90%</td><td>80%</td></tr>
                                        </table>
                                    </div>
                                </div>
                                <div class="el-step__description is-finish"></div>
                            </div>
                        </div>-->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import CircleProgress from '../../components/CircleProgress';
    import selectedIcon from '../../../../assets/icon/selected.png';
    import * as AjaxApi from '../../../../lib/AjaxApi';
    import {fetchData} from '../../../../lib/CommonApi';
    import {getSchedualUnCompleteTask, getFlowKanBanInfo} from '../../../../lib/api';
    import {Toast} from 'mint-ui';
    export default {
        data: function () {
            return {
                selectedIcon: '',
                pagination: {
                    items: [],
                    total: 0,
                    per_page: 10,
                    from: 1,
                    to: 0,
                    current_page: 1
                },
                taskData: [],
                currTask: {},
                progress: 70,
                isShowbar: true,
                tableData: []

            }
        },
        mounted: function () {
            this.selectedIcon = selectedIcon;
            this.$bus.emit('set-title', '流转看板');
            this.getTask();
        },
        methods: {
            getTask(){
                AjaxApi.ajaxGet(getSchedualUnCompleteTask, {}, (response) => {
                    /*this.taskData = response.data;*/
                    let data = response.data;
                    let currTask;
                    for (let i = 0; i < data.length; i++) {
                        if (i === 0) {
                            data[i].selected = true;
                        } else {
                            data[i].selected = false;
                        }
                    }
                    this.taskData = data;
                    this.currTask = this.taskData[0];
                    currTask = this.currTask = this.taskData[0];
                    this.fetchItems(currTask);
                });
            },
            fetchItems(currTask){
                /*let task = fetchData(getSchedualUnCompleteTask,{});//获取任务
                 console.log(task);*/
                /*this.taskData = [
                 {name:'任务1',selected:true},
                 {name:'我的测试任务2',selected:false},
                 {name:'任务3',selected:false},
                 {name:'任务4',selected:false},
                 {name:'任务5',selected:false},
                 ];*/
                let para = {taskId: currTask.id};
                /*  debugger;*/
                AjaxApi.ajaxGet(getFlowKanBanInfo, para, (response) => {
                    if (response.status === 200) {
                        this.tableData = response.body;
                        /* console.log(response.body);*/
                    } else {
                        Toast({
                            message: response.body.msg,
                            position: 'middle',
                            duration: 1000
                        });
                    }
                });
            },
            handleSelectTask(item, index){
                for (let i in this.taskData) {
                    this.taskData[i].selected = false;
                }
                this.currTask = item;
                item.selected = true;
                this.fetchItems(item);
            }
        },
        components: {
            CircleProgress: CircleProgress
        }
    }

</script>
<style scoped>
    .trace-task {
        background-color: #FFFFFF;
        color: #848CA4;
        margin-top: 10px;
        padding: 0 20px;
    }

    .trace-task div {
      /*  padding-top: 10px;*/
    }

    .trace-task .task-item {
        background: #EDF4FC;
        height: 35px;
        line-height: 35px;
        display: inline-block;
        /*padding: 10px 20px;*/
    }

    .trace-task .img {
        width: 21px;
        display: inline-block;
        position: absolute;
        bottom: 0;
        right: 0;
    }

    .flow-pannel .table-list th {
        text-align: center;
    }

    .li-list {
        float: left;
        overflow: hidden;
        height: 60px;
        width: 33%;
        color: #7d859f;
        position: relative;
        padding-left: 10px;
    }

    .vertical-line {
        position: absolute;
        top: 10px;
        left: 0;
        width: 2px;
        height: 40px;
        background-color: #51a6ff;
    }

    .list-content {
        background-color: white;
        overflow: hidden;
        padding: 10px;
    }
    .taskName{
        text-align: center;
        display:inline-block;
        margin-bottom:10px;
        position: relative;
        width:calc((100% - 20px)/2);
        background-color: #EDF4FC;
        margin-right: 10px;
    }
    .page{
        margin-bottom: 0;
        height: calc(100% - 40px);
    }

</style>