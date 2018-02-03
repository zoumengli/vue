<!-- 页面结构入口 -->
<template>
    <div class="page-tabbar">
        <div class="page">
            <div class="chart-pannel" style="border: 0;overflow: hidden;padding-right: 20px;">
                <mt-field label="开始时间" placeholder="" type="date" v-model="startDate" class="dateInput"></mt-field>
                <mt-field label="结束时间" placeholder="" type="date" v-model="endDate" class="dateInput"></mt-field>
            </div>
            <div class="list-btn" style="background-color: white;padding: 20px 0;margin: 0 0 10px 0">
                <!--<mt-button style="width:40%;margin-right: 30px;" size="normal" type="primary" @click="search">查询</mt-button><mt-button style="width:40%;" size="normal" type="primary" @click="refresh">刷新</mt-button>-->
                <mt-button style="width:40%;margin-right: 30px;" size="normal" type="primary" @click="refresh">刷新</mt-button><mt-button style="width:40%;" size="normal" type="primary" @click="search">查询</mt-button>
            </div>
            <div class="tableContent">
                <table class="table-list">
                    <tr>
                        <th>任务</th>
                        <th>综合良率</th>
                        <th>检测项目</th>
                        <th>良品率</th>
                    </tr>
                    <tr v-for="(item,index) in pagination.items" :key="index">
                        <td>{{item.taskCode}}</td>
                        <td><span class="f-blue">{{item.totalGoodRateStr}}</span></td>
                        <td>
                            <table v-for='item1 in item.checkList' style="width: 100%">
                                <tr style="text-align: center"><td>{{item1.categoryName}}</td></tr>
                            </table>
                        </td>
                        <td>
                            <table v-for='item1 in item.checkList' style="width: 100%">
                                <tr style="text-align: center"><td><span  class="f-blue">{{item1.goodRateStr}}</span></td></tr>
                            </table>
                        </td>
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
    import {Toast} from 'mint-ui';
    import * as AjaxApi from '../../../../lib/AjaxApi';
    import { getAppReportQualityInfo} from '../../../../lib/api';
    export default {
        data: function () {
            return {
                selected: '1',
                pagination: {
                    items: [],
                    total: 0,
                    per_page: 10,
                    from: 1,
                    to: 0,
                    current_page: 1
                },
                startDate: '',
                endDate: '',
            }
        },
        mounted: function () {
            this.$bus.emit('set-title', '质量报表');
            this.fetchItems();
        },
        methods: {
            fetchItems(){
                let user = JSON.parse(sessionStorage.getItem("user"));
                let factoryId = user.factoryInfo.id;//工厂id
              /*  let factoryId;
                if(user.factoryInfo === null){
                    factoryId = user.factoryInfo.id;//工厂id
                }else {
                    factoryId= '';
                }*/
                let params = {
                    limit: this.pagination.per_page, // 页面大小
                    /*offset : (page-1)*this.pagination.per_page, // 页码*/
                    /*orders : '[{"col":"name","direct":"desc"}]',*/
                    factoryId: factoryId,//
                    startDate: this.startDate,
                    endDate: this.endDate
                };
                AjaxApi.ajaxPost(getAppReportQualityInfo, params, (response) => {
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
                    }

                });

            },
            search(){
                if ((new Date(this.startDate.replace(/\-/g, "\/"))) > (new Date(this.endDate.replace(/\-/g, "\/")))) {
                    Toast({
                        message: '开始时间不能大于结束时间',
                        position: 'middle',
                        duration: 1000
                    });
                } else {
                    this.fetchItems();
                }
            },
            //刷新
            refresh(){
                this.startDate = '';
                this.endDate = '';
                this.fetchItems();
            },
            //加载更多
            more(){
                this.pagination.per_page+= 10 ;
                this.fetchItems();
            },

        },
    }

</script>
<style scoped>
    .list-btn {
        margin: 20px 0;
        text-align: center;
        clear: both;
    }
    .dateInput  .mint-field-core{
        background-image: url("../../../../assets/icon/inputData.png");
        background-repeat: no-repeat;
        background-size: 20px 20px;
        background-position: right 5px center ;
        background-color: #ffffff;
        border: 1px solid #51a6ff !important;
        box-sizing: border-box;
        padding: 0 5px;
        color: #51a6ff;
    }
    .page{
        margin-bottom: 0;
        height: calc(100% - 40px);
    }
</style>