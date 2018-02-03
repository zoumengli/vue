<!-- 页面结构入口 -->
<template>
    <div class="page-tabbar">
        <div class="page">
            <div class="send-form">
                <div>
                    <div class="bottomLine">
                        <label style="float:left;height:48px;line-height:48px;">机台号:</label>
                        <mt-field label="" placeholder="" :value="item.number"></mt-field>
                    </div>
                    <div class="bottomLine">
                        <label style="float:left;height:48px;line-height:48px;">登记人:</label>
                        <mt-field label="" :value="user.name" disabled></mt-field>
                    </div>
                    <div>
                        <label style="padding:10px 0;">详细信息</label>
                        <mt-field label="" style="border: 1px solid #51A6FF;" placeholder="" type="textarea" rows="4" v-model="form.content"></mt-field>
                    </div>
                </div>
                <div class="send-btn" style="margin: 20px 30px;">
                    <mt-button type="primary" size="large" @click="handleSend">登 记</mt-button>
                </div>
            </div>
            <mt-actionsheet :actions="actions" v-model="sheetVisible"></mt-actionsheet>
        </div>
    </div>
</template>

<script>
    import {Toast} from 'mint-ui';
    import * as AjaxApi from '../../../../lib/AjaxApi';
    import {editMaintenanceSet} from '../../../../lib/api';
    export default {
        data: function () {
            return {
                loading: false,
                sheetVisible: false,
                actions: [],
                form: {
                    barcode: '',
                    content: '',
                },
                user:'',
                item:''
            }
        },
        mounted: function () {
            this.$bus.emit('set-title', '维保登记');
            this.user = JSON.parse(sessionStorage.getItem("user"));
            this.item = this.$route.params.item;//参数
            console.log(this.item);
        },
        methods: {

            handleSend(){
                let para = {};
                para.data = JSON.stringify({
                    deviceid:this.item.deviceid,//设备id
                    userid:this.user.id,
                    remark:this.form.content,
                    type:this.item.type,
                });
                AjaxApi.ajaxPost(editMaintenanceSet, para, (response) => {
                    if (response.status === 200) {
                        Toast({
                            message: response.body.msg,
                            iconClass: 'mintui mintui-success'
                        });
                    } else {
                        Toast({
                            message: '提交失败！',
                            iconClass: 'icon icon-success'
                        });
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

    .upload-img {
        padding: 10px 0;
    }

    .video-img {
        float: right;
        padding-left: 10px;
    }

    .page-picker-wrapper {
        display: inline-block;
        text-align: right;
        width: 73%;
        /*		width: calc(100% - 48px);*/
        vertical-align: middle;
    }

    .icon {
        position: absolute;
        top: 20%;
        right: 0;
    }


</style>