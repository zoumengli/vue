<!-- 页面结构入口 -->
<template>
	<div class="page-tabbar">
		<div class="page">
			<div class="personal-bg">
				<img slot="icon" src="../../../../assets/icon/login-bg1.jpg">
				<!--<img slot="icon" src="../../../../assets/icon/login-bg.png">-->
			</div>
			<div class="my-header-icon">
				<img slot="icon" src="../../../../assets/icon/icon_info_port.png">
				<div class="name">{{user.name}}</div>
				<div class="name">ID: {{user.idno}}<span style="padding-left:10px;">{{user.roleStr}}</span></div>
				<div class="name" style="padding-bottom:20px;">手机：{{user.phone}}</div>
			</div>
			<ul class="list-ul personal-ul">
				<!--<li @click="handleLink('/sendMsg')">
					<span class="list-icon"><img slot="icon" src="../../../../assets/icon/icon_info_1.png"></span>
					<span>发送消息</span>
					<span class="list-turn"><img slot="icon" :src="turnIcon"></span>
				</li>-->
				<li @click="handleLink('/editPwd')">
					<span class="list-icon"><img slot="icon" src="../../../../assets/icon/icon_info_2.png"></span>
					<span>我的设置</span>
					<span class="list-turn"><img slot="icon" :src="turnIcon"></span>
				</li>
			</ul>
			<div style="margin: 20px 50px;">
				<mt-button size="large" type="primary" @click="handleLogout">退出登录</mt-button>
			</div>
		</div>
	</div>
</template>

<script>
	import turnIcon from '../../../../assets/icon/icon_turn.png';
	export default {
		data: function() {
			return {
				user:{},
				turnIcon:'',
				isShowbar: true,
				usrName:''
			}
		},
		mounted: function(){
			this.turnIcon = turnIcon;
			this.$bus.emit('set-title','我');
            this.user = JSON.parse(sessionStorage.getItem("user"));
            /*this.$bus.emit('set-name',this.user.name);*/
		},
		methods: {
			handleLink(path){
				this.$router.push({path:path});
			},
			handleLogout(){
				//退出登录，清空session，跳转到登录页面

				this.$router.push({path:'/login'});
			}
		},
		components: {

		}
	}

</script>
<style>
.my-header-icon{
	text-align:center;
	background-color: #FFFFFF;
}
.my-header-icon img{
	width: 90px;
	margin-top: -45px;
	height: 90px;
}
.my-header-icon .name{
	padding: 5px 0;
	color:#979DB1;
}
.personal-ul li{
	height: 70px !important;
	line-height:45px !important;
}
.personal-bg img{
	width:100%;
}
</style>