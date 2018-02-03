<!-- 页面结构入口 -->
<template>
	<div class="page-tabbar">
		<div class="page">
			<mt-button @click.native="popupVisible3 = true" class="screening" @click="popUp">
				<div style="text-align: left;">选择人员
					<span class="img">
					<img v-if="!isScreening" class="icon" width="25" height="25"
						 src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAABOklEQVRoQ+2YMQ6DMAxFnZuVm8CSQ8VLegN6E3qTsiaDq0ggdaoMsY2QzGxHfv/DxxDg5le4+fzgAFc76A64A50K+C3UKWB3uzvQLWHnAe7ALmCMMaeUxk5BD7eLORBjJACYSylTzvlzeJKTDdIAQERLrXWwghAHaEISUXNgQMTlpLDsNhWAHSKEMKWUZvY0JwrVAPZZiGhCxHxiNlaLOsDmRkbEiTXRwSITgG0mlYSyBFBJKFMAjYQyB5BOqEsAJBPKAX6WubYLca8VAEaJl9wVDqxE9JBaM6wB3qWUh+SiZwZARK9a6yg5fLtfrQCeWh876gB3XubEkuZftGk5IJo01gDiSWMGoJU0VgD3/q3C3SGk68QeYunBuOc5AFcprTp3QEtZ7rnuAFcprTp3QEtZ7rnuAFcprbovGk7LMbRsBkoAAAAASUVORK5CYII=">
					<img v-else class="icon" style="margin-top:5px;" width="15" height="15"
						 src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAABk0lEQVRoQ+2XTU7DMBCFPVlkCzeBG5CehCDFOVQcifQklBvATWCbRYwsNVLb/PhvxljVeNOFx8/93ptxVRB3suBOOASD5JYkJ8KJEDnArUVkbLAsJxJsHdFBToTI2GBZTiTYOqKDnAiRscGyi0Tath2EEK/BimkOHruuqy+vWm2tzGEWEAZoc0YyhVmF2AUxm5nBbEJYQTKC2YVwAjFFUsoTALykmePrW7TWn0qpyna30+9IXdePZVmehBBPNkHk/e9xHKthGH5suk4gRuQfYJwhnFtrdiMhjBeEN0iiZLwhgkCIYYIggkHOL9kzAJgH4ME2iI77v1rrSin15Vh/VeY87GviUkosmCiIqERmMASYaAgUkMg2Q4FAAwmEQYNABTFiTdNURVF8uAzrNE2Hvu/NY4GyooZ94wGoAeB979tprd+UUuYPHNpCBzm32SYMBQR6a13aK6VcwFBBkILcJkMJQQ4yw5hP7Jm4HS6SGUGbYA8hBvEwK0kpJ5LEZo9LOBEPs5KUciJJbPa4hBPxMCtJ6R98K6czxHExtQAAAABJRU5ErkJggg==">
				</span>
				</div>
			</mt-button>
			<div class="person">
				<a v-for="item in userNameArr">{{item}}</a>
			</div>
			<mt-popup v-model="popupVisible3" position="right" class="sendUser" :modal="true">
				<div class="selContent" style="height: 96%;overflow: scroll">
					<div>
						<div class="materialClass">
							<a @click="selMaterial($event)" v-for="item in userOptions"  :id='item.id'>{{item.name}}</a>
						</div>
					</div>
				</div>
				<div class="bottomBtn">
					<mt-button type="primary" @click="reset" style="background-color: #9bcdfe">重置</mt-button><mt-button @click.native="popupVisible3 = false"  type="primary"  @click="confirm">确定</mt-button>
				</div>
			</mt-popup>
			<div class="send-form">
				<div>
					<div>
						<label style="padding:10px 0;">消息</label>
						<mt-field label="" style="border: 1px solid #51A6FF;" placeholder="" type="textarea" rows="4" v-model="content"></mt-field>
					</div>
				</div>
				<div class="send-btn">
					<mt-button type="primary" size="large" @click="handleSend">发 送</mt-button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
    import * as AjaxApi from '../../../../lib/AjaxApi';
    import {sendMessgae,getTaskUserInfoAll} from '../../../../lib/api';
    import $ from '../../../../lib/jquery-3.2.0.min';
    import {Toast} from 'mint-ui';
	export default {
		data: function() {
			return {
                loading:false,
                content:'',
                popupVisible3: false,
                userOptions:[],
				userIdArr:[],
				userNameArr:[],
                isScreening:false
			}
		},
		mounted: function(){
			this.$bus.emit('set-title','发送消息');
			this.searchUserInfoAll();

			/*if(this.userIdArr.length===0){
			    $(".person").css("padding","0");
			}else {
                $(".person").css("padding","10px 20px");
			}*/
		},
		methods: {
            popUp(){
                this.isScreening = !this.isScreening;
            },
			handleSend(){
			    if(this.userIdArr.length===0){
                    Toast({
                        message: '需选择发送人',
                        iconClass: 'icon icon-success'
                    });
				}else  if(this.content === ''){
                    Toast({
                        message: '消息内容不能为空',
                        iconClass: 'icon icon-success'
                    });
				}else {

                    let user = JSON.parse(sessionStorage.getItem("user"));
                    let para = {};
                    para.data = JSON.stringify({
						"sendUserId":user.id,
						"content":this.content ,
						"receiveUserIdArry":this.userIdArr
                    });
                    AjaxApi.ajaxPost(sendMessgae,para,(response) => {
                        this.loading = false;
						console.log(response);
                        if(response.status===200){
                            Toast({
                                message: response.body.msg,
                                iconClass: 'mintui mintui-success'
                            });
                            this.content = '';
                            this.reset();//重置

                        }else {
                            Toast({
                                message: '发送失败！',
                                iconClass: 'icon icon-success'
                            });
                        }
                    });

				}

			},

            selMaterial(event){
                let xthis = event.target;
                if($(xthis).hasClass("hasBackground")){
                    $(xthis).removeClass("hasBackground")
                }else {
                    $(xthis).addClass("hasBackground");
                }
            },
            //重置
            reset(){
                //去掉图片
                $(".hasBackground").removeClass("hasBackground");
                this.userIdArr = [];
                this.userNameArr = [];
            },
            //确定
            confirm(){
                //取得人员id
                let users = $(".materialClass>a.hasBackground");
                for(let i = 0;i<users.length;i++){
                    this.userIdArr.push(users[i].id);
                    this.userNameArr.push(users[i].innerHTML);
                }
            },

            //人员
            searchUserInfoAll(){
                let para = {};
                AjaxApi.ajaxGet(getTaskUserInfoAll,para,(response) => {
                    this.loading = false;
                    this.userOptions = response.body;
                });
            },
		
        }
	}

</script>
<style scoped>
.send-form{
	color:#848CA4;
	background-color: #FFFFFF;
	padding: 0 20px;
	font-size: 15px;
	margin-top:10px;
	overflow: scroll;
}
.send-form label{
	display:inline-block;
}
.send-form .send-btn{
	padding: 10px 0;
	margin: 20px 30px;
}
	.sendUser{
		width: 50vw;
		height: 100vh;
		padding: 20px 10px 20px 20px;
	}
.bottomBtn{
	position: absolute;
	bottom: 0;
	left: 0;
	width: 100%;
}
.bottomBtn button{
	border-radius: 0;
	width: 50%;
	display: inline-block;
}
.bottomBtn button:active{
	background-color: white;
}
.materialClass{
	overflow: auto;
}
.materialClass a{
	display: block;
	float: left;
	margin-right: 10px;
	margin-bottom: 10px;
	text-align: center;
	height: 35px;
	line-height: 35px;
	width: calc((100% - 20px)/2);
	font-size: 16px;
	color: #848ca4;
	background-color: #edf4fc
}
.hasBackground{
	background-image: url("../../../../assets/icon/selected.png");
	background-repeat: no-repeat;
	background-position: bottom right;
}
.selectBtn{
	margin-left: -20px;
	color: #848CA4;
	background-color: #FFFFFF!important;
	padding: 10px 20px;
	font-size: 15px;
	margin-bottom: 10px;
	border-radius: 0!important;
	width: 100vw;
	border: 0;
}
.screening{
	color: #848CA4;
	background-color: #FFFFFF;
	padding: 10px 20px;
	font-size: 15px;
	border-radius: 0;
	width: 100vw;
	border: none;
	outline: 0;
	margin: 10px 0 0 0;
}

.img{
	width:20px;
	height:20px;
	text-align:center;
	float:right;
}
.mint-button--default{
	box-shadow:none;
}
.person{
	background-color: white;
	height:auto;
	padding: 10px 20px;
}
.person a{
	margin: 5px;

}
</style>