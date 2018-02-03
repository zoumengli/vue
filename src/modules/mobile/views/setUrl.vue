<!-- 页面结构入口 -->
<template style="height: 100%">
    <div class="guide">

        <div class="login">
            <h1 style="font-size: 18px">设置ip</h1>
            <div class="login-item">
                <span><mt-field  placeholder="" v-model="baseUrl"></mt-field></span>
            </div>
            <div class="login-btn">
                <mt-button type="primary" size="large" class="btn" @click="setBaseUrl">确 定</mt-button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data: function () {
            return {
                baseUrl:'http://www.icmes-print.com',
            }
        },
        mounted:function(){
            this.$bus.emit('set-title', '');
            //this.setBaseUrl();
        },
        methods :  {
            setBaseUrl(){
                sessionStorage.setItem("url",this.baseUrl);
                this.$router.push({path: '/login'});
            },
        }
    }
</script>
<style scoped>
    .guide{
        height:100%;
        width:100%;
        position:absolute;
        z-index: 99999;
        background-color: #edf4fc;
    }
    .login {
        padding: 40px;
        margin: 50px auto;
        background-color: white;

    }

    .login .login-user-icon {
        float: left;
        height: 35px;
        line-height: 35px;
    }

    .login .login-user-icon img, .login-pwd-icon img {
        width: 18px;
    }

    .login .login-pwd-icon {
        float: left;
        height: 35px;
        line-height: 35px;
    }

    .login .pwd-btn {
        float: right;
        padding: 5px 20px 30px 0;
        color: #9BCDFE;
    }

    .login .login-item {
        font-size: 15px;
        border: 1px solid #51A6FF;
        text-align: center;
        display: inline-block;
        border-radius: 20px;
        padding: 0 15px 0 10px;
        margin: 30px 0;
        width: 100%;

    }

    .login .mint-cell {
        min-height: 38px !important;
    }

    .login-bg img {
        width: 100%;
        height: 211px;
        vertical-align: middle;
    }

    .loginPage {
        margin-top: 40px;

    }
    .login-item *{
        border: 0!important;
    }

</style>