<!-- 页面结构入口 -->
<template>
	<div class="page-tabbar">
		<div class="page">
			<ul class="list-ul" style="max-height: 100%">
				<li class="li-middle list-badge" @click="handleLink('设备消息')" type="设备消息">
				<span class="list-icon">
					<img slot="icon" src="../../../../assets/icon/news_icon/news_icon_1.png">
					<span class="badge" v-if="news_1">{{news_1}}</span>
				</span>
					<span>设备消息</span>
					<span class="list-turn"><img slot="icon" :src="turnIcon"></span>
				</li>
				<li class="li-middle list-badge" @click="handleLink('配件消息')" type="配件消息">
				<span class="list-icon">
					<img slot="icon" src="../../../../assets/icon/news_icon/news_icon_2.png">
					<span class="badge" v-if="news_2">{{news_2}}</span>
				</span>
					<span>配件消息</span>
					<span class="list-turn"><img slot="icon" :src="turnIcon"></span>
				</li>
				<li class="li-middle list-badge" @click="handleLink('系统类消息')" type="系统类消息">
				<span class="list-icon">
					<img slot="icon" src="../../../../assets/icon/news_icon/news_icon_3.png">
					<span class="badge" v-if="news_3">{{news_3}}</span>
				</span>
					<span>系统类消息</span>
					<span class="list-turn"><img slot="icon" :src="turnIcon"></span>
				</li>
				<!--<li class="li-middle list-badge" @click="handleLink('设备消息')" type="设备消息">
				<span class="list-icon">
					<img slot="icon" src="../../../../assets/icon/news_icon/news_icon_4.png">
					<span class="badge" v-if="news_4">{{news_4}}</span>
				</span>
					<span>设备消息</span>
					<span class="list-turn"><img slot="icon" :src="turnIcon"></span>
				</li>
				<li class="li-middle list-badge" @click="handleLink('系统类消息')" type="系统类消息">
				<span class="list-icon">
					<img slot="icon" src="../../../../assets/icon/news_icon/news_icon_5.png">
					<span class="badge" v-if="news_5">{{news_5}}</span>
				</span>
					<span>系统类消息</span>
					<span class="list-turn"><img slot="icon" :src="turnIcon"></span>
				</li>-->
			</ul>
		</div>
	</div>

</template>

<script>
	import turnIcon from '../../../../assets/icon/icon_turn.png';
    import * as AjaxApi from '../../../../lib/AjaxApi';
    import {getUserMessageTotal} from '../../../../lib/api';
	export default {
		data: function() {
			return {
				turnIcon:'',
				isShowbar: true,
				newsAmount:[1,2,4,3,6],
                userId:'',
				news_1:0,
                news_2:0,
                news_3:0,
				tableData:[],
			}
		},
		mounted: function(){
			this.turnIcon = turnIcon;
			this.$bus.emit('set-title', '消息');
            this.getUserMessageTotal();
		},
		methods: {
		    //跳转消息详情
			handleLink(type){
				this.$router.push({path:"/messageList/"+type});
              /*  this.$router.push({name:'/mobile/messageList',params:{name:type}});*/
			},
            getUserMessageTotal(){
                let userId =  JSON.parse(sessionStorage.getItem("user"));//获取用户信息
                let para = {userId:userId.id};
               /* debugger;*/
                AjaxApi.ajaxGet(getUserMessageTotal,para,(response) => {

                    if (response.body.length > 0){
                        let news = response.body;
                        let $this = this;
                        news.forEach(function (item , index) {
							if (item.messageCategoryName == "设备消息"){
                                $this.news_1 = item.messageNum;
                            }
                            if (item.messageCategoryName == "配件消息"){
                                $this.news_2 = item.messageNum;
                            }
                            if (item.messageCategoryName == "系统类消息"){
                                $this.news_3 = item.messageNum;
                            }
                        });
					}
                });

			},


		},
		components: {

		}
	}

</script>
<style scoped>
.report-pannel{
	width: 100%;
}
.page{
	margin-bottom: 0;
	height: calc(100% - 40px);
}
</style>