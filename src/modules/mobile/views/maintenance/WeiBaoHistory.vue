<!-- 页面结构入口 -->
<template>
    <div class="page-tabbar">
        <div class="page">
            <div class="tableContent" style="margin-top: 10px;">
                <table class="table-list">
                    <tr>
                        <th>机台号</th>
                        <th>维保时间</th>
                        <th>维保类型</th>
                    </tr>
                    <tbody v-for="(item,index) in pagination.items" :key="index" @click="watchDetial($event)">
                    <tr style="height: 30px;border-top:1px solid #edf4fc;border-bottom: 1px solid #edf4fc">
                        <td><span class="f-blue">{{item.number}}</span></td>
                        <td>{{item.time}}</td>
                        <td v-if="item.type ==0">随机维保</td>
                        <td v-if="item.type ==1">间隔维保</td>
                        <td v-if="item.type ==2">天维保</td>
                        <td v-if="item.type ==3">月维保</td>
                    </tr>
                    <tr style="background-color: white;display: none">
                        <td colspan="3">{{item.remark}}</td>
                    </tr>
                    </tbody>
                </table>
                <div class="more" style="display: none">
                    点击加载更多
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {Toast} from 'mint-ui';
    import * as AjaxApi from '../../../../lib/AjaxApi';
    import {getDeviceMaintenance} from '../../../../lib/api';
    import $ from '../../../../lib/jquery-3.2.0.min';
    export default {
        data: function () {
            return {
                turnIcon: '',
                pagination: {
                    items: [],
                    total: 0,
                    per_page: '10',
                    from: 1,
                    to: 0,
                    current_page: 1
                },
            }
        },
        mounted: function () {
            this.$bus.emit('set-title', '维保记录');
            this.fetchItems();
        },
        methods: {
            fetchItems(){
                /* this.pagination.items = [
                 {number:'4545',time:'2017-07-20',type:'1',remark:'良好445555555553423423423'},
                 {number:'4545',time:'2017-07-20',type:'1',remark:'良好226555456446'},
                 {number:'4545',time:'2017-07-20',type:'1',remark:'良好226555456446'},
                 {number:'4545',time:'2017-07-20',type:'1',remark:'良好226555456446'},
                 {number:'4545',time:'2017-07-20',type:'1',remark:'良好226555456446'},
                 ];*/
                let id = this.$route.params.qrcode;
                let prams = {
                    barcode: id,
                };
                AjaxApi.ajaxGet(getDeviceMaintenance, prams, (response) => {
                    this.loading = false;
                    this.pagination.items = response.body.data.rows;
                });
            },
            watchDetial($event){
                let xthis = $event.target;
                if ($(xthis).parent().next().css("display") === "table-row") {
                    $(xthis).parent().next().css("display", "none");
                } else {
                    $(xthis).parent().next().css("display", "table-row");
                }
            }
        },
        components: {}
    }

</script>
<style scoped>
    .register {
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

    .register:active {
        background-color: #51a6ff;
    }

</style>