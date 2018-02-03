<!-- 页面结构入口 -->
<template>
    <div class="page-tabbar">
        <div class="page">
            <div class="send-form">
                <div>
                    <div class="bottomLine">
                        <label style="float:left;height:48px;line-height:48px;">机台号:</label>
                        <mt-field label="" placeholder="" v-model="form.device"></mt-field>
                    </div>
                    <div class="bottomLine">
                        <label style="float:left;height:48px;line-height:48px;">检测数:</label>
                        <mt-field label="" placeholder="" v-model="form.amount" type="number"></mt-field>
                    </div>
                    <div class="bottomLine">
                        <label style="float:left;height:48px;line-height:48px;">登记人:</label>
                        <mt-field label="" :value="user.name" disabled></mt-field>
                    </div>
                    <!--<mt-button @click.native="openPrompt" size="large">打开 prompt 提示框</mt-button>-->
                    <div>
                        <label style="padding:10px 0;">不良原因</label>
                        <mt-button @click.native="openPrompt" style="float: right" class="addBtn">
                            <span><img style="width: 30px;height: 30px;"
                                       src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTAwNjE4MDIxODU2IiBjbGFzcz0iaWNvbiIgc3R5bGU9IiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjI0NjEiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNODY4LjQ2OTczOCA0MjIuMzI2NjU1SDYwMC40ODkzOFYxNTQuMzQ2Mjk3YzAtNDkuMzM1NjM4LTM5Ljk5MTgzLTg5LjMyNjQ0NS04OS4zMjY0NDQtODkuMzI2NDQ0cy04OS4zMjY0NDUgMzkuOTkxODMtODkuMzI2NDQ1IDg5LjMyNjQ0NHYyNjcuOTgwMzU4SDE1My44NTYxMzRjLTQ5LjMzNTYzOCAwLTg5LjMyNjQ0NSAzOS45OTE4My04OS4zMjY0NDUgODkuMzI2NDQ0IDAgNDkuMzM1NjM4IDM5Ljk5MTgzIDg5LjMyNjQ0NSA4OS4zMjY0NDUgODkuMzI2NDQ1aDI2Ny45ODAzNTd2MjY3Ljk4MDM1N2MwIDQ5LjMzNTYzOCAzOS45OTE4MyA4OS4zMjY0NDUgODkuMzI2NDQ1IDg5LjMyNjQ0NXM4OS4zMjY0NDUtMzkuOTkxODMgODkuMzI2NDQ0LTg5LjMyNjQ0NVY2MDAuOTgwNTY3aDI2Ny45ODAzNThjNDkuMzM1NjM4IDAgODkuMzI2NDQ1LTM5Ljk5MTgzIDg5LjMyNjQ0NC04OS4zMjY0NDQgMC4wMDEwMjMtNDkuMzM1NjM4LTM5Ljk5MDgwNi04OS4zMjc0NjgtODkuMzI2NDQ0LTg5LjMyNzQ2OHoiIGZpbGw9IiM5YmNkZmUiIHAtaWQ9IjI0NjIiPjwvcGF0aD48L3N2Zz4="
                                       alt=""></span>
                        </mt-button>
                        <div class="rejects">
                            <div class="item-list" v-for="item in badCause">
                                <div class="reason" @click="cause($event)" :id="item.id">{{item.name}}</div>
                                <div class="amount"><input type="number" autofocus="autofocus" placeholder="数量"
                                                           v-model="item.amount"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="send-btn" style="margin: 20px 30px;">
                    <mt-button type="primary" size="large" @click="handleSend">确 定</mt-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {Toast, MessageBox} from 'mint-ui';
    import * as AjaxApi from '../../../../lib/AjaxApi';
    import {badQualityList, editBadQuality, getDeviceInfo, addBadCategory} from '../../../../lib/api';
    import $ from '../../../../lib/jquery-3.2.0.min';

    export default {
        data: function () {
            return {
                loading: false,
                sheetVisible: false,
                form: {
                    device: '',
                    amount: '',
                    content: '',
                },
                user: '',
                badCause: [],
                deviceList: [],
                deviceId: ''
            }
        },
        mounted: function () {
            this.$bus.emit('set-title', '质量');
            this.user = JSON.parse(sessionStorage.getItem("user"));
            this.fetchItems();
            this.getDevice();
        },
        methods: {
            handleSend(){
                console.log(this.deviceList);
                for (let i = 0; i < this.deviceList.length; i++) {
                    if (this.deviceList[i].name === this.form.device) {//判断机台
                        this.deviceId = this.deviceList[i].id;
                        break;
                    }
                }

                if (this.form.device === '') {
                    Toast({
                        message: '请填写机台号。',
                        position: 'middle',
                        duration: 1000
                    });
                } else if (this.deviceId === '') {
                    Toast({
                        message: '该机台号不存在。',
                        position: 'middle',
                        duration: 1000
                    });
                } else if (this.form.amount === '') {
                    Toast({
                        message: '请填写检测数',
                        position: 'middle',
                        duration: 1000
                    });
                } else {
                    let checkBadDetailList = [];
                    let data = this.badCause;
                    for (let i = 0; i < data.length; i++) {
                        if (data[i].amount !== '') {
                            checkBadDetailList.push({
                                /*'badCategory.id': data[i].id,*/
                                badCategory:{id:data[i].id},
                                amount: data[i].amount
                            });
                        }
                    }
                    console.log(checkBadDetailList);
                    let da = {
                        operator:{id:this.user.id},
                        deviceInfo:{id:this.deviceId},
                        /*'operator.id': this.user.id,
                        'deviceInfo.id': this.deviceId,*/
                        amount: this.form.amount,
                        checkBadDetailList: checkBadDetailList
                    };
                    let prams = {};
                    prams.data = JSON.stringify(da);
                    AjaxApi.ajaxGet(editBadQuality, prams, (response) => {
                        this.loading = false;
                        console.log(response);
                        if (response.status === 200) {
                            Toast({
                                message: response.body.msg,
                                position: 'middle',
                                duration: 1000
                            });
                            if (response.data.status === 1) {
                                this.form.device = '';
                                this.form.amount = '';
                                this.fetchItems();
                                $(".amount").css("display", "none");
                                $(".reason").removeClass("hasBackImg");
                            }
                        } else {
                            Toast({
                                message: response.body.msg,
                                position: 'middle',
                                duration: 1000
                            });
                        }
                    });
                }
            },
            getDevice(){
                //机台号
                AjaxApi.ajaxGet(getDeviceInfo, {}, (response) => {
                    this.loading = false;
                    this.deviceList = response.body;
                });
            },
            fetchItems(){
                //查询不良品原因
                AjaxApi.ajaxGet(badQualityList, {}, (response) => {
                    this.loading = false;
                    response.body.forEach(function (item, index) {
                        item.amount = '';
                    });
                    this.badCause = response.body;
                });
            },
            cause($event){
                let xthis = $event.target;
                if ($(xthis).hasClass("hasBackImg")) {
                    $(xthis).removeClass("hasBackImg");
                    $(xthis).next().css("display", "none");
                } else {
                    $(xthis).addClass("hasBackImg");
                    $(xthis).next().css("display", "block");
                }
            },

            openPrompt() {
                MessageBox.prompt(' ', '请输入不良品原因').then(({value}) => {
                    if (value) {
                        console.log(value);
                        //新增不良品原因
                        let params = {};
                        params.data = JSON.stringify({name: value});
                        AjaxApi.ajaxPost(addBadCategory, params, (response) => {
                            this.loading = false;
                            console.log(response);
                            if (response.body.status === 1) {
                                this.fetchItems();
                            }
                        });
//                        MessageBox.alert(`不良品原因是 ${ value }`, '输入成功');
                    }
                });
            }

        }
    }

</script>
<style scoped>
    .send-form {
        color: #848CA4;
        background-color: #FFFFFF;
        padding: 0 20px;
        font-size: 15px;
        margin-top: 10px;
        overflow: scroll;
    }

    .send-form label {
        display: inline-block;
    }

    .send-form .send-btn {
        padding: 10px 0;
    }

    .rejects {
        width: 100%;
        overflow: scroll;
    }

    .amount {
        display: none;
    }

    .amount input {
        width: 100%;
        height: 40px;
        border: 1px solid #51a6ff;
        outline: none;
        text-align: center;
    }

    .reason {
        height: 40px;
        line-height: 40px;
        background-color: #edf4fc;
    }

    .item-list {
        text-align: center;
        float: left;
        width: calc((100% - 20px) / 3);
        margin-right: 10px;
        margin-bottom: 10px;
    }

    .item-list:nth-of-type(3n) {
        margin-right: 0;
    }

    .hasBackImg {
        background-image: url("../../../../assets/icon/selected.png");
        background-repeat: no-repeat;
        background-position: bottom right;
    }

    .addBtn {
        border-radius: 0;
        background-color: white;
        box-shadow: none;
    }


</style>