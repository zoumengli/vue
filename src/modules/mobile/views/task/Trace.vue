<!-- 页面结构入口 -->
<template>
    <div class="page">
        <div class="task">
            <div class="trace-task" style="padding-right: 10px;">
                <div>
                    <h3 style="font-size: 18px;">生产任务：{{task}}</h3>
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
            <div class="chart-pannel">
                <h3>{{currTask.name}}综合良品率</h3>
                <div class="chart">
                    <CircleProgress id="task_progress" :progress="progress"></CircleProgress>
                </div>
            </div>
            <div class="tableContent">
                <table class="table-list">
                    <tr>
                        <th width="35%">工序</th>
                        <th>设备</th>
                        <th>检测项目</th>
                        <th>良品率</th>
                    </tr>
                    <tr v-for="(item,index) in tableDate" :key="index">
                        <td>{{item.processName}}</td>
                        <td>{{item.deviceNumber}}</td>
                        <td><span class="f-blue">{{item.checkType}}</span></td>
                        <td><span class="f-blue">{{item.goodRateStr}}</span></td>
                    </tr>
                </table>
                <div class="more" @click="more" style="display: none">
                    点击加载更多
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import CircleProgress from '../../components/CircleProgress';
    import $ from '../../../../lib/jquery-3.2.0.min';
    import selectedIcon from '../../../../assets/icon/selected.png';
    import * as AjaxApi from '../../../../lib/AjaxApi';
    import {Toast} from 'mint-ui';
    import {getTaskAnalysisList, getSchedualUnCompleteTask,getTaskYieldInfo} from '../../../../lib/api';
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
                progress: '',
                isShowbar: true,
                tableDate: [],
                taskId: '',
                task: ''
            }
        },
        mounted: function () {
            this.selectedIcon = selectedIcon;
            this.$bus.emit('set-title', '任务');
            this.taskId = this.$route.params.id;
            /* console.log(this.taskId);*/
            this.fetchItems();
            this.getTask();
        },
        methods: {
            //加载更多
            more(){
                this.pagination.per_page+= 10 ;
                this.fetchItems();
            },
            getTask(){
                AjaxApi.ajaxGet(getSchedualUnCompleteTask, {}, (response) => {
                    let data = response.data;
                    for (let i = 0; i < data.length; i++) {
                        if (i === 0) {
                            data[i].selected = true;
                        } else {
                            data[i].selected = false;
                        }
                        if (data[i].id === this.taskId) {
                            this.currTask = data[i];
                            this.task = this.currTask.name;
                        }
                    }
                    this.taskData = data;
                    /*this.currTask = this.taskData[0];
                     currTask = this.currTask = this.taskData[0];
                     this.task = currTask.name;
                     this.fetchItems(currTask);*/
                });
            },
            fetchItems(){
                let taskId = this.$route.params.id;  //获取路由跳转传递的参数
                console.log(taskId)
                let params = {
                    limit: this.pagination.per_page, // 页面大小
                    taskId: taskId
                };
                AjaxApi.ajaxGet(getTaskAnalysisList, params, (response) => {

                    this.loading = false;
                    if(response.status===200){
                       /* if (response.body.data.rows.length > 0) {
                            this.progress = response.body.data.rows[0].yield;
                        }*/
                        this.loading = false;
                        this.tableDate = response.body.data.rows;
                        console.log(response.body.data.rows)
                        this.pagination.total = response.body.data.total;
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
                let para = {taskId:taskId};
                AjaxApi.ajaxGet(getTaskYieldInfo, para, (response) => {
                    this.loading = false;
                    if(response.status===200){
                        let data = response.body.data.yield;
                        data = parseFloat(data);
                        this.progress = data;
                    }else {
                        this.progress = '0';
                    }
                });



            },
            handleSelectTask(item, index){
                this.currTask = item;
                console.log(item.id);
                for (let i in this.taskData) {
                    this.taskData[i].selected = false;
                }
                item.selected = true;
                this.task = item.name;
                /*  $(this).css("background-image","url(../../../../assets/icon/selected.png)");*/
                let para = {"tasksInfo.id": item.id};
                AjaxApi.ajaxGet(getTaskAnalysisList, para, (response) => {
                    if (response.body.status) {
                       /* if (response.body.data.rows.length > 0) {
                            this.progress = response.body.data.rows[0].yield;
                        }
                        else {
                            this.progress = '0';
                        }*/
                        this.loading = false;
                        this.tableDate = response.body.data.rows;
                        console.log(response.body.data.rows)
                        if(response.body.data.total>this.pagination.per_page){
                            //加载更多消失
                            document.getElementsByClassName("more")[0].style.display = "block";
                        }else {
                            document.getElementsByClassName("more")[0].style.display = "none";
                        }
                    } else {}

                });

                AjaxApi.ajaxGet(getTaskYieldInfo, para, (response) => {
                    this.loading = false;
//                    console.log(para)
                    if(response.status===200){
                        let data = response.body.data.yield;
//                        console.log(response.body.data.yield)
                        data = parseFloat(data);
                        this.progress = data;
                    }else {
                        this.progress = '0';
                    }
                });


            }
        },
        components: {
            CircleProgress: CircleProgress
        }
    }

</script>
<style scoped>
    .task li {
        line-height: 30px;
        padding: 0 20px;
    }

    .trace-task {
        background-color: #FFFFFF;
        color: #848CA4;
        margin-top: 10px;
        padding: 0 20px;
    }

    .trace-task div {
        /*padding-top: 10px;*/
    }

    .trace-task .task-item {
        background: #EDF4FC;
        height: 35px;
        line-height: 35px;
        display: inline-block;
    }

    .trace-task .img {
        width: 21px;
        display: inline-block;
        position: absolute;
        bottom: 0;
        right: 0;
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
</style>