<template>
    <div class="left-menu">
        <div class="trace-task">
            <div>
                <h3 style="font-size: 18px">物料</h3>
            </div>
            <div>
                <span v-for="(item,index) in taskData" :key="index"
                      style="padding-right:10px;display:inline-block;margin-bottom:25px;"
                      @click="handleSelectTask(item,index)">
                        <span class="task-item">{{item.name}}</span>
                        <span class="img">
                            <img slot="icon" :src="selectedIcon"
                                 :style="'display:'+(item.selected?'inline-block':'none')">
                        </span>
                </span>
            </div>
        </div>
        <div class="trace-task">
            <div>
                <h3 style="font-size: 18px">仓库</h3>
            </div>
            <div>
                <span v-for="(item,index) in taskData" :key="index"
                      style="padding-right:10px;display:inline-block;margin-bottom:25px;"
                      @click="handleSelectTask(item,index)">
                        <span class="task-item">{{item.name}}</span>
                        <span class="img">
                            <img slot="icon" :src="selectedIcon"
                                 :style="'display:'+(item.selected?'inline-block':'none')">
                        </span>
                </span>
            </div>
        </div>
        <div class="trace-task">
            <div>
                <h3 style="font-size: 18px">货位</h3>
            </div>
            <div>
                <span v-for="(item,index) in taskData" :key="index"
                      style="padding-right:10px;display:inline-block;margin-bottom:25px;"
                      @click="handleSelectTask(item,index)">
                        <span class="task-item">{{item.name}}</span>
                        <span class="img">
                            <img slot="icon" :src="selectedIcon"
                                 :style="'display:'+(item.selected?'inline-block':'none')">
                        </span>
                </span>
            </div>
        </div>
        <div class="trace-task" style="position: fixed;bottom: 0;left: 0">
            <button>aaaa</button>
        </div>
    </div>
</template>

<script>
    import selectedIcon from '../../../assets/icon/selected.png';
    import MtButton from "../../../../node_modules/mint-ui/packages/button/src/button";
	export default {
        components: {MtButton},
        data: function () {
            return {
                selectedIcon:'',
                taskData:[],
                currTask:{},
            }
        },
		mounted:function(){
            this.selectedIcon = selectedIcon;
            this.fetchItems();
		},
		methods :  {
            fetchItems(){
                this.taskData = [
                    {name:'螺丝',selected:true},
                    {name:'刀具',selected:false},
                    {name:'纸张',selected:false},
                    {name:'油墨',selected:false},
                    {name:'印版',selected:false},
                ];
                this.currTask = this.taskData[0];
            },

            handleSelectTask(item,index){
                this.currTask = item;
                for(let i in this.taskData){
                    this.taskData[i].selected = false;
                }
                item.selected = true;
                console.log(item);
            }



		}
	}
</script>
<style scoped>
    .trace-task{
        background-color: #FFFFFF;
        color:#848CA4;
        margin-top:10px;
        padding:0 12px;
        height: 200px;
        outline: 1px solid red;
        overflow-y: scroll;
    }
    .trace-task div{
        padding-top: 10px;
    }
    .trace-task .task-item{
        background: #EDF4FC;
        padding:8px 15px;
    }

    .trace-task .img{
        margin-left:-25px;
        margin-bottom:-10px;
        width:21px;
        display:inline-block;
    }
</style>