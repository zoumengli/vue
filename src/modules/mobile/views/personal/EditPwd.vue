<!-- 页面结构入口 -->
<template>
	<div class="page-tabbar">
		<div class="page">
			<div class="pwd-form">
				<div class="bottomLine">
					<label>旧密码：</label>
					<mt-field label="" placeholder="" type="password" v-model="oldPassword"></mt-field>
				</div>
				<div class="bottomLine">
					<label>新密码：</label>
					<mt-field label="" placeholder="" type="password" v-model="password"></mt-field>
				</div>
				<div style="margin: 20px 30px;">
					<mt-button type="primary" size="large" @click="handleEditPwd">保 存</mt-button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
    import * as AjaxApi from '../../../../lib/AjaxApi';
    import {changePwd} from '../../../../lib/api';
    import { Toast } from 'mint-ui';
	export default {
		data: function() {
			return {
				oldPassword:'',
				password: ''
			}
		},
		mounted: function(){
			this.$bus.emit('set-title','我的设置');
		},
		methods: {
			handleEditPwd(){
                let user = JSON.parse(sessionStorage.getItem("user"));
                if(this.oldPassword === ''||this.password ===''){
                    Toast({
                        message: '请填写密码',
                        position: 'middle',
                        duration: 2000
                    });

				}else if (this.oldPassword === this.password){
                    Toast({
                        message: '新密码不能跟旧密码相同',
                        position: 'middle',
                        duration: 2000
                    });
				}else if(this.oldPassword === user.password){//判断旧密码是否正确
                    let params = {
                        userId: user.id,
                        oldPwd: this.oldPassword,
                        newPwd: this.password
                    };
                    AjaxApi.ajaxPost(changePwd,params,(response) => {
                        if(response.body.status===1){
                            Toast({
                                message: '修改成功',
                                position: 'middle',
                                duration: 2000
                            });
                            this.oldPassword = '';
                            this.password = '';

                        }else {
                            Toast({
                                message: '修改失败',
                                position: 'middle',
                                duration: 2000
                            });
                        }
                    });

				}else {
                    Toast({
                        message: '旧密码填写错误',
                        position: 'middle',
                        duration: 2000
                    });
                    /*this.$router.go(-1);//回到上一页*/
				}
			}
		
        }
	}

</script>
<style scoped>
.pwd-form{
	background-color: #FFFFFF;
	color:#848CA4;
	padding: 0 20px;
	font-size: 15px;
	overflow: scroll;
}
.pwd-form label{
	float:left;
	height:48px;
	line-height:48px;
}
</style>