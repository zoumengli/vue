<!-- 页面结构入口 -->
<template style="height: 100%">
    <div class="loginPage">
        <div class="login-bg">
            <img slot="icon" src="../../../../assets/icon/login-bg.png">
        </div>
        <div class="login">
            <div class="login-item">
                <span class="login-user-icon"><img slot="icon" src="../../../../assets/icon/icon-login-zh.png"></span>
                <span><mt-field label="" placeholder="手机号/用户名" v-model="username"></mt-field></span>
            </div>
            <div class="login-item">
                <span class="login-pwd-icon"><img slot="icon" src="../../../../assets/icon/icon-login-mima.png"></span>
                <span><mt-field label="" placeholder="密码" type="password" v-model="password"></mt-field></span>
            </div>
            <div>
                <span class="pwd-btn" style="float: left;padding-left: 15px;" @click="setUrl"><a herf="">配置ip</a></span>
                <span class="pwd-btn"><a herf="">忘记密码</a></span>
            </div>
            <div class="login-btn">
                <mt-button type="primary" size="large" class="btn" @click="handleLogin">登 录</mt-button>
            </div>
        </div>
    </div>
</template>

<script>
  /*  window.onload=function(){
        console.log(document.getElementsByTagName('body'));
        document.getElementsByTagName('body').style.backgroundColor = "#FFFFFF";
    };*/

    import * as AjaxApi from '../../../../lib/AjaxApi';
    import $ from '../../../../lib/jquery-3.2.0.min';
    import {requestLogin} from '../../../../lib/api';
    import {Toast} from 'mint-ui';
    export default {
        data: function () {
            return {
                username: '',
                password: '',
                user:'',
            }
        },
        mounted: function () {
            this.$bus.emit('set-title', '登录');
            if(sessionStorage.getItem("user") !== null){
                this.user = JSON.parse(sessionStorage.getItem('user'));
                this.username = this.user.name;
                this.password = this.user.password;
            }
        },
        methods: {

            handleLogin(){
                if(sessionStorage.getItem("url") === null){
                    Toast({
                        message: '请先配置ip',
                        position: 'middle',
                        duration: 1000
                    });
                }else {
                    //调用后台登录接口获取，验证登录态
                    let loginParams = {userCode: this.username, pwd: this.password};
                    AjaxApi.ajaxPost(requestLogin, loginParams, (response) => {
                        //NProgress.done();
                        let {status, msg, data} = response.body;
                        if (status !== 1) {
                            Toast({
                                message: response.body.msg,
                                position: 'middle',
                                duration: 1000
                            });
                        } else {
                            sessionStorage.setItem('user', JSON.stringify(data));//保存用户信息
                            this.$router.push({path: '/mobile/message'});//进入消息
                        }
                    });

                }

            },
            setUrl(){
                this.$router.push({path:'/setUrl'});
            }
        },
        components: {}
    }

</script>
<style scoped>
    .login {
        padding: 40px;
        background-color: #FFFFFF;
        height: calc(100vh - 251px);
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
        margin: 5px 0;
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