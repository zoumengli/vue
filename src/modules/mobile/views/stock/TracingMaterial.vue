<!-- 页面结构入口 -->
<template>
    <div class="page-tabbar">
        <div class="page">
            <div class="qrcode-form">
                <div style="padding-bottom:10px;font-size:18px;">
                    <label>条码</label>
                </div>
                <mt-field label="" class="bottomLine" placeholder="请输入条码" v-model="qrcode"></mt-field>
                <div style="margin: 20px 30px;">
                    <mt-button size="large" type="primary" @click="handleSubmit">确 定</mt-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { Toast } from 'mint-ui';
    export default {
        data: function() {
            return {
                qrcode:''
            }
        },
        mounted: function(){
            this.$bus.emit('set-title', '手动录入');
        },
        methods: {
            handleSubmit(){
                if(!this.qrcode){
                    Toast({
                        message: '请输入条码'
                    });
                    return;
                }
                this.$router.push({name:'stockReviewList',params:{
                    qrcode:this.qrcode
                }});
            }
        }
    }

</script>
<style scoped>
    .qrcode-form{
        background-color: #FFFFFF;
        margin-top:10px;
        padding:10px 20px;
    }
</style>