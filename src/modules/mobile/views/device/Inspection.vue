<!-- 页面结构入口 -->
<template>
	<div class="page">
		<div class="send-form">
			<div>
				<div>
					<div class="bottomLine">
						<mt-field label="机台号" placeholder="" v-model="form.deviceid"></mt-field>
					</div>
					<div class="bottomLine">
						<mt-field label="耗时" placeholder="小时/h" v-model="form.wastetime"></mt-field>
					</div>
					<div class="bottomLine">
						<label class="leftLabel">检修类别</label>
						<mt-radio  v-model="form.maintenanceType" :options=options></mt-radio>
					</div>
					<div class="bottomLine" style="position: relative">
						<label class="" style="height: 48px;line-height: 48px;margin-right: 10px" >维修人员</label>
						<div class="page-picker-wrapper">
							<mt-picker :slots="userOptions" @change="onUserChange" :visible-item-count="1"></mt-picker>
						</div>
						<img  class="icon" style="margin-top:5px;" width="15" height="15"
							  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAABk0lEQVRoQ+2XTU7DMBCFPVlkCzeBG5CehCDFOVQcifQklBvATWCbRYwsNVLb/PhvxljVeNOFx8/93ptxVRB3suBOOASD5JYkJ8KJEDnArUVkbLAsJxJsHdFBToTI2GBZTiTYOqKDnAiRscGyi0Tath2EEK/BimkOHruuqy+vWm2tzGEWEAZoc0YyhVmF2AUxm5nBbEJYQTKC2YVwAjFFUsoTALykmePrW7TWn0qpyna30+9IXdePZVmehBBPNkHk/e9xHKthGH5suk4gRuQfYJwhnFtrdiMhjBeEN0iiZLwhgkCIYYIggkHOL9kzAJgH4ME2iI77v1rrSin15Vh/VeY87GviUkosmCiIqERmMASYaAgUkMg2Q4FAAwmEQYNABTFiTdNURVF8uAzrNE2Hvu/NY4GyooZ94wGoAeB979tprd+UUuYPHNpCBzm32SYMBQR6a13aK6VcwFBBkILcJkMJQQ4yw5hP7Jm4HS6SGUGbYA8hBvEwK0kpJ5LEZo9LOBEPs5KUciJJbPa4hBPxMCtJ6R98K6czxHExtQAAAABJRU5ErkJggg==">
					</div>
					<div>
					</div>
					<label class="leftLabel" style="margin-right: 10px">备注</label>
					<mt-field label="" placeholder="" type="textarea" rows="1" v-model="form.remark"></mt-field>

				</div>
				<div style="margin-top: 20px;padding: 15px 0; ">
					<mt-button type="primary" size="small" style="border-radius: 5px" @click="addAccessories">更换配件</mt-button>
					<div>
						<template>
							<div v-for="(accessories,index) in form.accessoriesList">
								<div style="position: relative" class="bottomLine">
									<label class="" style="height: 48px;line-height: 48px;margin-right: 10px" >配件信息</label>
									<div class="page-picker-wrapper">
										<mt-picker :slots="materialOptions" @change="onMaterialChange" :visible-item-count="1"></mt-picker>
									</div>
									<img  class="icon" style="margin-top:5px;" width="15" height="15"
										  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAABk0lEQVRoQ+2XTU7DMBCFPVlkCzeBG5CehCDFOVQcifQklBvATWCbRYwsNVLb/PhvxljVeNOFx8/93ptxVRB3suBOOASD5JYkJ8KJEDnArUVkbLAsJxJsHdFBToTI2GBZTiTYOqKDnAiRscGyi0Tath2EEK/BimkOHruuqy+vWm2tzGEWEAZoc0YyhVmF2AUxm5nBbEJYQTKC2YVwAjFFUsoTALykmePrW7TWn0qpyna30+9IXdePZVmehBBPNkHk/e9xHKthGH5suk4gRuQfYJwhnFtrdiMhjBeEN0iiZLwhgkCIYYIggkHOL9kzAJgH4ME2iI77v1rrSin15Vh/VeY87GviUkosmCiIqERmMASYaAgUkMg2Q4FAAwmEQYNABTFiTdNURVF8uAzrNE2Hvu/NY4GyooZ94wGoAeB979tprd+UUuYPHNpCBzm32SYMBQR6a13aK6VcwFBBkILcJkMJQQ4yw5hP7Jm4HS6SGUGbYA8hBvEwK0kpJ5LEZo9LOBEPs5KUciJJbPa4hBPxMCtJ6R98K6czxHExtQAAAABJRU5ErkJggg==">
								</div>
								<div class="bottomLine">
									<mt-field label="更换数量" style="padding: 0;" placeholder="" type="number" v-model="accessories.amount"></mt-field>
								</div>
								<div class="bottomLine">
									<label class="leftLabel" >更换类别</label>
									<mt-radio v-model="accessories.type" :options=options1></mt-radio>
								</div>

							</div>
						</template>
					</div>

				</div>
			</div>

			<div class="send-btn">
				<mt-button type="primary" size="large" @click="handleSubmit">提 交</mt-button>
			</div>
		</div>
		<mt-actionsheet :actions="actions" v-model="sheetVisible"></mt-actionsheet>
	</div>
</template>

<script>
	import { Toast } from 'mint-ui';
    import * as AjaxApi from '../../../../lib/AjaxApi';
    import {getMaterielInfoAll,getTaskUserInfoAll,editDeviceOverhaul,getDeviceListById} from '../../../../lib/api';
	export default {
        data: function() {
			return {
				sheetVisible: false,
				actions: [],
                value:'',
                options:[],
                options1:[],
                userOptions:[{values:[]}],
                materialOptions: [{values:[]}],
                userName:'',
                materialName:'',
                deviceMsg:[],//设备
                userMsg:[],//人员
                materialMsg:[],//配件
                form:{
                    deviceid:'',//机台号id
                    maintenanceType:'',//检修类型
                    userid:'',  //人员
                    wastetime:'',//检修耗时
                    addtime:'',//检修时间
                    remark:'',//检修备注
                    accessoriesList:[{
                        materielInfo:{
                            id:''//物料id
                        },
                        amount:'',//更换数量
                        type:''//更换类别
                    }],
                },
			}
		},
		mounted: function(){
			this.$bus.emit('set-title','维保');
			this.searchMaterielInfoAll();
			this.searchUserInfoAll();
			this.getDeviceListById();

            this.options = [
                {
                    label: '维护',
                    value: '1'
                },
                {
                    label: '维修',
                    value: '2'
                }
            ];
            this.options1 = [
                {
                    label: '更换',
                    value: '1'
                },
                {
                    label: '废弃',
                    value: '2'
                }
            ];
		},
		methods: {
            //新增配件
            addAccessories(){
                this.form.accessoriesList.push({
                    materielInfo:{
                        id:''//物料id
                    },
                    amount:'',//更换数量
                    type:''//更换类别
                });
            },
            // 物料
            searchMaterielInfoAll(){
                let para = {};
                AjaxApi.ajaxGet(getMaterielInfoAll,para,(response) => {
                    this.loading = false;
                    let xthis = this;
                    response.body.forEach(function (item,index) {
                        xthis.materialOptions[0].values.push(item.name);
                    });
                });
            },
            getDeviceListById(){
                let para = {};
                AjaxApi.ajaxGet(getDeviceListById,para,(response) => {
                    this.loading = false;
                    this.deviceMsg = response.body;
                });
			},

            //人员
            searchUserInfoAll(){
                let para = {};
                AjaxApi.ajaxGet(getTaskUserInfoAll,para,(response) => {
                    this.loading = false;
                    //NProgress.done();
                   /* this.userOptions = response.body;*/
                    let xthis = this;
                    response.body.forEach(function (item,index) {
                        xthis.userOptions[0].values.push(item.name);
                    });
                });
            },
            onMaterialChange(picker, values) {
                this.materialName = values[0];
            },
            onUserChange(picker, values){
                this.userName =  values[0];
			},

            //提交
            handleSubmit(){
                //机台id、人员id


                let params = {data:''};
                params.data = JSON.stringify(this.form);
                AjaxApi.ajaxPost(editDeviceOverhaul,params,(response) => {
                    if(response.body.status){
						/* this.$message(response.body.msg);*/
                        Toast({
                            message: response.body.msg,
                            position: 'middle',
                            duration: 1000
                        });

                    }
                });

            }


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
	margin: 20px 30px;
}
.upload-img{
	padding:10px 0;
}
.video-img{
	float: right;
	padding-left:10px;
}
.mint-radiolist .mint-cell{
	display: inline-block;
}
	.leftLabel{
		float: left;
		line-height: 48px;
		height: 48px;
		margin-right: 20px;
	}

	.page-picker-wrapper{
		display: inline-block;
		text-align: right;
		width: 73%;
/*		width: calc(100% - 48px);*/
		vertical-align: middle;
	}
.icon{
	position: absolute;
	top: 20%;
	right: 0;
}

</style>