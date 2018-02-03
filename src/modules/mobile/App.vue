<!-- 页面结构入口 -->
<template>
	<div>
		<mt-header fixed :title="title" class="font-large">
			<!-- 点击展示左侧菜单面板 -->
			<mt-button icon="" slot="left" @click="handleSidePanel(true)" v-if="showMenu">
				<img class="icon" width="22" height="22" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAArUlEQVRoQ+2XQQ6AIBDE4OX68zX4hCElZFPvM0q7CescTZ7Z5BzDg9xmUiMagQjMqnqg7qO16yB19I3QyzwIBDaubWXkjTFcFPRCvEjG/yka0QhEwNGCwMa1GonRQUHXeAhsXNtqafTHKp4DILhGyzUeABtXeiHG6KCgRiCwca1GYnRQUCMQ2LjWNT5GBwVd4yGwcW0rI67x8RwAQS9EAOpWpUa28AFhjQBQtyo/yetE7imdKzcAAAAASUVORK5CYII=">
			</mt-button>
			<!-- 点击返回上一页面 -->
			<mt-button icon="back" slot="left" @click="$router.go(-1)" v-else-if="$route.name != 'login'"></mt-button>
			<mt-button icon="" slot="right" @click="handleSao('/manually')" v-if="showSao">
				<img class="icon" width="22" height="22" style="z-index: 100" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTAwNTIzMjQwNjMxIiBjbGFzcz0iaWNvbiIgc3R5bGU9IiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjIzNzkiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNOTI4IDU0NCA5NiA1NDRjLTE3LjY2NCAwLTMyLTE0LjMzNi0zMi0zMnMxNC4zMzYtMzIgMzItMzJsODMyIDBjMTcuNjk2IDAgMzIgMTQuMzM2IDMyIDMyUzk0NS42OTYgNTQ0IDkyOCA1NDR6TTgzMiA5MjhsLTE5MiAwYy0xNy42OTYgMC0zMi0xNC4zMDQtMzItMzJzMTQuMzA0LTMyIDMyLTMybDE5MiAwYzE3LjY2NCAwIDMyLTE0LjMzNiAzMi0zMmwwLTE2MGMwLTE3LjY5NiAxNC4zMDQtMzIgMzItMzJzMzIgMTQuMzA0IDMyIDMybDAgMTYwQzkyOCA4ODQuOTI4IDg4NC45MjggOTI4IDgzMiA5Mjh6TTM1MiA5MjggMTkyIDkyOGMtNTIuOTI4IDAtOTYtNDMuMDcyLTk2LTk2bDAtMTYwYzAtMTcuNjk2IDE0LjMzNi0zMiAzMi0zMnMzMiAxNC4zMDQgMzIgMzJsMCAxNjBjMCAxNy42NjQgMTQuMzY4IDMyIDMyIDMybDE2MCAwYzE3LjY2NCAwIDMyIDE0LjMwNCAzMiAzMlMzNjkuNjY0IDkyOCAzNTIgOTI4ek0xMjggMzg0Yy0xNy42NjQgMC0zMi0xNC4zMzYtMzItMzJMOTYgMTkyYzAtNTIuOTI4IDQzLjA3Mi05NiA5Ni05NmwxNjAgMGMxNy42NjQgMCAzMiAxNC4zMzYgMzIgMzJzLTE0LjMzNiAzMi0zMiAzMkwxOTIgMTYwQzE3NC4zNjggMTYwIDE2MCAxNzQuMzY4IDE2MCAxOTJsMCAxNjBDMTYwIDM2OS42NjQgMTQ1LjY2NCAzODQgMTI4IDM4NHpNODk2IDM4NGMtMTcuNjk2IDAtMzItMTQuMzM2LTMyLTMyTDg2NCAxOTJjMC0xNy42MzItMTQuMzM2LTMyLTMyLTMybC0xOTIgMGMtMTcuNjk2IDAtMzItMTQuMzM2LTMyLTMyczE0LjMwNC0zMiAzMi0zMmwxOTIgMGM1Mi45MjggMCA5NiA0My4wNzIgOTYgOTZsMCAxNjBDOTI4IDM2OS42NjQgOTEzLjY5NiAzODQgODk2IDM4NHoiIHAtaWQ9IjIzODAiIGZpbGw9IiNmZmZmZmYiPjwvcGF0aD48L3N2Zz4=">
			</mt-button>
		</mt-header>
		<router-view></router-view>

		<!--左侧菜单方法： this.$refs.sidePanel.open();  $refs.sidePanel.close()-->
		<side-panel :show="show" ref="sidePanel">
			<left-menu @change="handleSidePanel"></left-menu>
		</side-panel>
	</div>
</template>

<script>
	import './style/css/main.css';

	import SidePanel from '../../components/side-panel'
	import LeftMenu from './views/LeftMenu';
	export default {
		data: function() {
			return {
				title:'',
				show:false,
				showMenu: false,
                showSao: false,
				menuRoute:{
                    maintenance:true,
                    personal:true,
                    message:true,
                    quality:true,
                    report:true
				},
                saoRoute:{
                    maintenance:true,
                }
			}
		},
		watch: {
			'$route': function(newRoute){//监听路由变化
				//这里判断如果是底部菜单页面，则显示左侧菜单按钮，否则显示返回按钮
				if(this.menuRoute[newRoute.name]){
					this.showMenu = true;
				}else{
					this.showMenu = false;
				}
                if(this.saoRoute[newRoute.name]){
                    this.showSao = true;
                }else{
                    this.showSao = false;
                }
				
			}
		},
		created() {
			this.$bus.on('set-title', this.setTitle);
		},
		beforeDestroy() {
			this.$bus.off('set-title', this.setTitle);
		},
		mounted: function(){
			this.showMenu = !!this.menuRoute[this.$route.name];
		},
		methods: {
			handleSidePanel(flag){
				this.show = !this.show;
				if(flag){
					this.$refs.sidePanel.open();
				}else{
					this.$refs.sidePanel.close();
				}
			},

			setTitle(title){
				this.title = title;
			},
            handleSao(path){
                this.$router.push({path:path});
			}
		},
		components:{
			SidePanel,
			LeftMenu,
		}
	}

</script>
<style>
.mint-header,.mint-button--primary{
	background-color:#51A6FF;
}
.mint-header{
	padding: 0 20px;
}
.mint-button-text{
	font-size:15px;
}
.mint-button{
	border-radius:18px;
}
.mint-tabbar{
	background-color: white;
	/*border-top: 1px solid #dcdcdc;*/
}
</style>