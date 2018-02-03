<!-- 页面结构入口 -->
<template>
    <div class="page-tabbar">
        <div class="page">
            <div class="send-form">
                <div>
                    <div class="bottomLine">
                        <label style="float:left;height:48px;line-height:48px;">设备条码:</label>
                        <mt-field label="" placeholder="" v-model="form.barcode"></mt-field>
                    </div>
                    <div class="bottomLine" style="position: relative">
                        <label class="" style="height: 48px;line-height: 48px;margin-right: 10px" >巡检人员</label>
                        <div class="page-picker-wrapper">
                            <mt-picker :slots="userOptions" @change="onUserChange" :visible-item-count="1" class="user"></mt-picker>
                        </div>
                        <img  class="icon" style="margin-top:5px;" width="15" height="15"
                             src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAABk0lEQVRoQ+2XTU7DMBCFPVlkCzeBG5CehCDFOVQcifQklBvATWCbRYwsNVLb/PhvxljVeNOFx8/93ptxVRB3suBOOASD5JYkJ8KJEDnArUVkbLAsJxJsHdFBToTI2GBZTiTYOqKDnAiRscGyi0Tath2EEK/BimkOHruuqy+vWm2tzGEWEAZoc0YyhVmF2AUxm5nBbEJYQTKC2YVwAjFFUsoTALykmePrW7TWn0qpyna30+9IXdePZVmehBBPNkHk/e9xHKthGH5suk4gRuQfYJwhnFtrdiMhjBeEN0iiZLwhgkCIYYIggkHOL9kzAJgH4ME2iI77v1rrSin15Vh/VeY87GviUkosmCiIqERmMASYaAgUkMg2Q4FAAwmEQYNABTFiTdNURVF8uAzrNE2Hvu/NY4GyooZ94wGoAeB979tprd+UUuYPHNpCBzm32SYMBQR6a13aK6VcwFBBkILcJkMJQQ4yw5hP7Jm4HS6SGUGbYA8hBvEwK0kpJ5LEZo9LOBEPs5KUciJJbPa4hBPxMCtJ6R98K6czxHExtQAAAABJRU5ErkJggg==">
                    </div>
                    <div>
                        <label style="padding:10px 0;">巡检意见</label>
                        <mt-field label="" style="border: 1px solid #51A6FF;" placeholder="" type="textarea" rows="4" v-model="form.content"></mt-field>
                    </div>
                </div>
                <!--<div class="upload-img">
                    <span>上传图片</span>
                    <span class="video-img" @click="sheetVisible=true"><img class="icon" width="28" height="28" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAADDUlEQVRoQ+1Z0VHbQBB9e0oBMBHfQAXBIxfgDjAVABVACogsiQJiKsBUgNOBC7BGUAH2N5ohBSBt5mwEsrAj3Z0w1ozv17t3+97bvduVCQ1f1PD4sQXw1QoaKxCEMZuAcB3bKAYjZxn4xgAoC2QVU2V+ZerUpsDqQPgBEAPX+d5fFsyGApgHnQox9Fq7kyxwL3o+EunLKYO6BByUsbuO399qIAif7psSdJ6YpUW8iUyvUvMNgB/Fx5RyZ5PSo0oKUhDGNwzInN6p4lBiM2VgKBijxLImXmv3XtpLRa0kOUgJHQK6APZrOGu2hQRg9BC9BjKVcbqOPagSWBDGZ9K+DiDGAJjxhy3rzGvt/q0SfO5G26EkGRDhWMWvaGsEgBm3vbYt2dRe/jiWIE51N9AGIJnvtW2ZzwvLi54PRPpywYwOER3JH5n5ngijVHy7zr8rmaM/joe6SugCmKbCOiqmTRA+/Qbo8v9sct919n7mbbzoeUekiSx45eLWBXBeLFh//BRljJelg1Sk195r5e1eC/umzLeOGpi6jr3QRvhh3CfgQuVwBq57jr2gVhDGsm1RUkFZgeLB85xPHlWCz2xTYR3ma0KHCGUAxDj51baHbwWowX7mWyTjahx3mXCnQoYygFRYreyFlQep5H4xsGItzHuwJPpUAMUBxPQlN91PWQHTA4vsmu6nDKCYQvM5gn6oyP5uyw+uszd77ORaSwo1vogbf40yMOk59mE+ZXTu72UPmR/Gj6qztnINvAb+oZVQq4XF3Jd7rrOVgFSB5+/BwgxQRYllzMtmjtIkUmVfAtdVAGAM3bZ9Urx9ZGtBaXJJ4M777cQPDBqxsPrL2ulgHN+BZqOm8tIHMD9q4Dr2ufKpOQc5kwPQHopMAcyUSC3rXGekFElyo8t8xoE5ADlxARMwvF7bvq2ihj+OT0HwdHK+uH8tAHLd5YTAQxY0YljT/GcVQrL/Gd+dagVQhf26bbYA6mZUdb+tAqqM1W3ffAXqZmTd+xn/S7nugD88ZF8dgOn5WwVMGTT1b7wC/wBwqs30AYX8cQAAAABJRU5ErkJggg=="></span>
                    &lt;!&ndash;				<span class="video-img"><img class="icon" width="28" height="28" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAACnUlEQVRoQ+2ZUXLaMBCGd2XeGybxe25QGPNe5wbhCDlBuQBgwgHa3iA3CDeo+x7G5gZ5J5nQd6ztCKGEBtvIwiaKxzwxg1a73/67K2Ej1OSDNeGABsQ2JeujyO38iWzLrkk8WDuQkXfxKctMCfGqSANiUtAl2jSKlJjMUrZqFCkljRmbTOfPYyLyAcEHghARw6F3PsnzaZ0ik4dlhIid90ETUTzuud0sGKtAJvNlgIBjIPiLDl0Pu244jZY+JTgDhC8ENBl7bpAGYxfIVg1kdCUgVMDTh6drQrgHoD8jz/WtB1FZTTuU834TYIUVCaKXMwC4DLrtuOyGv50vYwD8WrkiAgKT9W8BkNd4poCqRwhgxRj1VY9wjvcIcFZKjygINVHyNjUFkSUiVdnfgxYjz92bZmqdVmn9D0EL5Ygzp1tFiUllwAfAb6LBCSDMmlbaIO8hOGv5yNcDMSYPzfZjlClqm6tIGkTQba92S6CqEisNJA9COAmilw7jSSS+I0GfO0CMY0dcLQihA0SP5LSuFHjRwIquT1XkEIRy8noSZ3gVpXcqmD0Qzpy2GLFyOtFC9EReVjdThvASkGLRlIwwThznkfH1nRgKp4LZAxGOdSHy5BeqMr4OTwWzByKDO6yETg3vwmSt3yp2c+wYTwEpB0IFrgOzSR3hYNw7/6WTIK1Lo+iRU02azVDhiTj8vstCgJA7Tt/Ev9bJbpolXbvNNR3gTv7ngBUjuBn2Lma69vJck09KP/y51rYEZ/JaspHnJ2etia461oC83ZmeBwD0o4gau2s/XJHdYOStQZ5DRYGsAikavFU9YhL8ro11PWIK1ICYZq4qu0aRqjJrum99FTHNiC129Xmra0tGj43jU76SToNuQI4thbLta6PIP/mGVWFda0j0AAAAAElFTkSuQmCC"></span> &ndash;&gt;
                </div>-->
                <div class="send-btn" style="margin: 20px 30px;">
                    <mt-button type="primary" size="large" @click="handleSend">提 交</mt-button>
                </div>
            </div>
            <mt-actionsheet :actions="actions" v-model="sheetVisible"></mt-actionsheet>
        </div>
    </div>
</template>

<script>
    import { Toast } from 'mint-ui';
    import * as AjaxApi from '../../../../lib/AjaxApi';
    import {getTaskUserInfoAll,editDeviceInfo} from '../../../../lib/api';
    export default {
        data: function() {
            return {
                loading:false,
                sheetVisible: false,
                actions: [],
                form:{
                    barcode:'',
                    content:'',
                },
                perOption:[],
                userOptions:[{values:[]}],
                userName:'',
                userId:''

            }
        },
        mounted: function(){
            this.$bus.emit('set-title','巡检');
           /* this.actions = [{
                name: '拍照',
                method: this.takePhoto
            }, {
                name: '从相册中选择',
                method: this.openAlbum
            }];*/
            this.searchUserInfoAll();
        },
        methods: {
           /* takePhoto() {
                //拍照：要调用app方法来换起视频
                console.log('taking photo');
                console.log(this.cordova);
            },
            openAlbum() {
                //从相册中选择：要调用app方法选择图片
                console.log('opening album');
            },*/
            handleSend(){
                if(this.form.barcode === ''){
                    /*Toast({
                        message: '设备条码不能为空',
                        iconClass: 'mintui mintui-success'
                    });*/
                    Toast({
                        message: '设备条码不能为空',
                        iconClass: 'icon icon-success'
                    });

                }else if(this.form.content === ''){
                    Toast({
                        message: '巡检意见不能为空！',
                        iconClass: 'icon icon-success'
                    });
                }else {
                    //取得人员id
                    let data = this.perOption;
                    for(let i=0;i<data.length;i++){
                        if(data[i].name === this.userName ){
                            this.userId = data[i].id;
                            break;
                        }
                    }

                    let para = {};
                    para.data = JSON.stringify({
                        'deviceInfo':{'barcode':this.form.barcode},
                        'checkuser':{'id':this.userId},
                        'option':this.form.content,
                    });

                    AjaxApi.ajaxPost(editDeviceInfo,para,(response) => {
                        if(response.status===200){
                            Toast({
                                message: response.body.msg,
                                iconClass: 'mintui mintui-success'
                            });
                        }else {
                            Toast({
                                message: '提交失败！',
                                iconClass: 'icon icon-success'
                            });

                        }
                    });



                }
            },
            //人员
            searchUserInfoAll(){
                let para = {};
                AjaxApi.ajaxGet(getTaskUserInfoAll,para,(response) => {
                    this.loading = false;
                    //NProgress.done();
                    /* this.userOptions = response.body;*/
                    this.perOption = response.body;
                    let xthis = this;
                    response.body.forEach(function (item,index) {
                        xthis.userOptions[0].values.push(item.name);
                    });
                });
            },
            onUserChange(picker, values){
                this.userName =  values[0];
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
    }
    .upload-img{
        padding:10px 0;
    }
    .video-img{
        float: right;
        padding-left:10px;
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