<!-- 页面结构入口 -->
<template>
	<div class="page-tabbar">
		<router-view></router-view>
		<mt-tabbar v-model="tabid" :fixed="true">
			<mt-tab-item :id="item.id" v-for="(item,index) in tabsData" :key="index">
				<img slot="icon" :src="item.selected?item.curr_icon:item.icon">{{item.name}}
			</mt-tab-item>
		</mt-tabbar>
	</div>
</template>

<script>
	import tab_icon_1 from '../../../assets/icon/tab_icon/tab_icon_1.png';
    import tab_icon_5 from '../../../assets/icon/tab_icon/tab_icon_5.png';
	import tab_icon_6 from '../../../assets/icon/tab_icon/tab_icon_6.png';
	import tab_icon_7 from '../../../assets/icon/tab_icon/icon_w_sele.png';
	import tab_icon_8 from '../../../assets/icon/tab_icon/icon_wb.png';
	import tab_icon_9 from '../../../assets/icon/tab_icon/icon_pj.png';

	import tab_icon_1_sel from '../../../assets/icon/tab_icon/tab_icon_1_sel.png';
    import tab_icon_5_sel from '../../../assets/icon/tab_icon/tab_icon_5_sel.png';
	import tab_icon_6_sel from '../../../assets/icon/tab_icon/tab_icon_6_sel.png';
	import tab_icon_7_sel from '../../../assets/icon/tab_icon/icon_w.png';
	import tab_icon_8_sel from '../../../assets/icon/tab_icon/icon_wb_sele.png';
	import tab_icon_9_sel from '../../../assets/icon/tab_icon/icon_pj_sele.png';

	export default {
		data: function() {
			return {
				tabid:'/mobile/taskList',
				tabsData:[
                    {name:'消息',id:'/mobile/message',icon:tab_icon_6,curr_icon:tab_icon_6_sel,selected:false},
					/*{name:'巡检',id:'/mobile/deviceMaintain',icon:tab_icon_1,curr_icon:tab_icon_1_sel,selected:false},*/
					{name:'维保',id:'/mobile/maintenance',icon:tab_icon_8,curr_icon:tab_icon_8_sel,selected:false},
                    {name:'质量',id:'/mobile/quality',icon:tab_icon_1,curr_icon:tab_icon_1_sel,selected:false},
					{name:'报表',id:'/mobile/report',icon:tab_icon_5,curr_icon:tab_icon_5_sel,selected:false},
                    {name:'我',id:'/mobile/personal',icon:tab_icon_7,curr_icon:tab_icon_7_sel,selected:false}
				],
				iconData:[],
				isShowbar: true
			}
		},
		mounted: function(){
			for(let i in this.tabsData){
				if(this.$route.path == this.tabsData[i].id){
					this.tabid = this.tabsData[i].id;
				}
			}
		},
		methods: {

		},
		watch: {
			'$route': function(newRoute){//监听路由变化
				for(let i in this.tabsData){
					if(newRoute.path == this.tabsData[i].id){
						this.tabid = this.tabsData[i].id;
					}
				}
			},
			'tabid': function(newVal,oldVal){
				for(let i in this.tabsData){
					this.tabsData[i].selected = false;
					if(this.tabsData[i].id == newVal){
						this.tabsData[i].selected = true;
					}
				}
				this.$router.push({path:newVal});
			}
		},
		components: {}
	}

</script>

<style>
	.mint-tab-item-icon>img{
		width: 90%;
		height:90%;
	}
	.mint-tabbar>.mint-tab-item.is-selected{
		background-color: white !important;
	}
</style>