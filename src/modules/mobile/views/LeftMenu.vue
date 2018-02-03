<template>
    <div class="left-menu font-large">
        <div class="header-icon" @click="myMessage">
            <img src="../../../assets/icon/leftbar_icon/leftbar-info.jpg"/>
            <h3>{{name}}</h3>
        </div>
        <ul class="list-menu">
            <li :class="item.selected?'active':''" v-for="(item,index) in menus" :key="index" @click="handleChange(item)">
                <span class="img">
                    <img :src="item.selected?item.curr_icon:item.icon"/>
                    <span class="badge" v-if="item.count">{{item.count}}</span>
                </span>
                <span class="title">{{item.name}}</span>
            </li>
        </ul>
    </div>
</template>

<script>
    import * as AjaxApi from '../../../lib/AjaxApi';
    import {getUserMessageTotal} from '../../../lib/api';
	import icon_1 from '../../../assets/icon/leftbar_icon/leftbar-icon-1.png';
	import icon_2 from '../../../assets/icon/leftbar_icon/leftbar-icon-2.png';
	import icon_3 from '../../../assets/icon/leftbar_icon/leftbar-icon-3.png';
	import icon_4 from '../../../assets/icon/leftbar_icon/leftbar-icon-4.png';
	import icon_5 from '../../../assets/icon/leftbar_icon/leftbar-icon-5.png';
    import icon_6 from '../../../assets/icon/leftbar_icon/leftbar-icon-6.png';
    import icon_7 from '../../../assets/icon/leftbar_icon/leftbar-icon-7.png';
    import icon_8 from '../../../assets/icon/leftbar_icon/icon_l_wb.png';
    import icon_9 from '../../../assets/icon/leftbar_icon/icon_l_pj.png';

	import icon_1_sel from '../../../assets/icon/leftbar_icon/leftbar-icon-1-sel.png';
	import icon_2_sel from '../../../assets/icon/leftbar_icon/leftbar-icon-2-sel.png';
	import icon_3_sel from '../../../assets/icon/leftbar_icon/leftbar-icon-3-sel.png';
	import icon_4_sel from '../../../assets/icon/leftbar_icon/leftbar-icon-4-sel.png';
	import icon_5_sel from '../../../assets/icon/leftbar_icon/leftbar-icon-5-sel.png';
    import icon_6_sel from '../../../assets/icon/leftbar_icon/leftbar-icon-6-sel.png';
    import icon_7_sel from '../../../assets/icon/leftbar_icon/leftbar-icon-7-sel.png';
    import icon_8_sel from '../../../assets/icon/leftbar_icon/icon_l_wb_sele.png';
    import icon_9_sel from '../../../assets/icon/leftbar_icon/icon_l_pj_sele.png';
	export default {
        data: function () {
            return {
                user:{},//用户信息
                menus:[
                    {name:'消息',path:'message',count:0,icon:icon_1,curr_icon:icon_1_sel,selected:true},
                    {name:'维保',path:'/mobile/maintenance',count:0,icon:icon_8,curr_icon:icon_8_sel,selected:false},
                    /*{name:'现场',path:'/mobile/scene',count:0,icon:icon_7,curr_icon:icon_7_sel,selected:false},
					{name:'巡检',path:'/mobile/deviceMaintain',count:0,icon:icon_6,curr_icon:icon_6_sel,selected:false},
					{name:'配件',path:'/mobile/stock',count:0,icon:icon_9,curr_icon:icon_9_sel,selected:false},*/
                    {name:'报表',path:'/mobile/report',count:0,icon:icon_9,curr_icon:icon_9_sel,selected:false},
				],
                name:'',
            }
        },
        /*created() {
            this.$bus.on('set-name', this.userName);
        },
        beforeDestroy() {
            this.$bus.off('set-name', this.userName);
        },*/

		mounted:function(){
            console.log(!(JSON.parse(sessionStorage.getItem("user"))===null));
            if(!(JSON.parse(sessionStorage.getItem("user"))===null)){
                this.user = JSON.parse(sessionStorage.getItem("user"));//获取用户信息
            }
		},
		methods :  {
			handleChange(item){
                for(let i in this.menus){
                    this.menus[i].selected = false;
                }
                item.selected = true;
                if(item.name ==='消息'){
                    /*item.path = '/mobile/message'+'?=userId'+this.user.id;*/
                    this.$router.push({name:item.path,params:{userId:this.user.id}});
                }else {
                    this.$router.push({path:item.path});
                }

                this.$emit('change',false);
            },
            myMessage(){
                this.$router.push({path:'/mobile/personal'});
                this.$emit('change',false);
            },

		}
	}
</script>
<style lang="less" scoped>
.left-menu {

    .header-icon{
        text-align:center;
        padding:20px 0 10px 0;
        img{
            width:100px;
        }
    }

    .list-menu{
        text-align:center;

        li{
            padding:15px;
        }
        li.active{
            background: #EDF4FC;
            color: #51A6FF;
        }
        .img .badge{
            top: .1rem;
            left: 50%;
            z-index: 5;
            height: 1.2rem;
            min-width: 1.2rem;
            padding: 0 .1rem;
            font-size: .9rem;
            line-height: 1.2rem;
            color: #fff;
            background: red;
            border-radius: .8rem;
            vertical-align:top;
            margin-top: -5px;
            margin-left:-1rem;
        }
        img{
            width: 30px;
        }

        .title{
            padding-left: 20px;
        }
    }

}
</style>