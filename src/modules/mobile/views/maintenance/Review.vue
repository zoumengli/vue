<!-- 页面结构入口 -->
<template>
    <div>
        <div id="bcid">
            <div style="height:40%"></div>
            <p class="tip">...载入中...</p>
        </div>
        <div style="position: absolute;bottom: 0;font-size: 20px; text-align: center;width: 100%;background-color: #51a6ff;height: 40px;">取消</div>
    </div>


    <!--<footer>
        <div class="fbt" >取　 消</div>
        &lt;!&ndash;<div class="fbt" onclick="scanPicture()">从相册选择二维码</div>&ndash;&gt;
    </footer>-->
</template>
<script>
    export default {
        data: function () {
            return {
                ws:null,
                wo:null,
                scan:null,
                domready:false,
            }
        },
        created:function () {
            this.windowReady();
        },
        mounted: function(){
            this.$bus.emit('set-title', '');
        },
        methods:{
            windowReady(){
                alert("ready_1");
                if (window.plus){
                    alert("ready_2");
                    this.plusReady();
                } else {
                    alert("ready_3");
                    document.addEventListener('plusready', this.plusReady, false);
                }
                // 监听DOMContentLoaded事件
                document.addEventListener('DOMContentLoaded', function () {
                    alert("ready_4");
                    this.domready = true;
                    this.plusReady();
                }, false);
            },
            plusReady(){
                alert("ready_5");
                if (this.ws || !window.plus || !this.domready) {
                    alert("ready_6");
                    return;
                }
                // 获取窗口对象
                this.ws = plus.webview.currentWebview();
                this.wo = this.ws.opener();
                // 开始扫描
                this.ws.addEventListener('show', function () {
                    alert("ready_7");
                    this.scan = new plus.barcode.Barcode('bcid');
                    this.scan.onmarked = this.onmarked;
                    this.scan.start({conserve: true, filename: '_doc/barcode/'});
                }, false);
                // 显示页面并关闭等待框
                this.ws.show('pop-in');
            },
            // 二维码扫描成功
            onmarked(type, result, file){
                switch (type) {
                    case plus.barcode.QR:
                        type = 'QR';
                        break;
                    case plus.barcode.EAN13:
                        type = 'EAN13';
                        break;
                    case plus.barcode.EAN8:
                        type = 'EAN8';
                        break;
                    default:
                        type = '其它' + type;
                        break;
                }
                resultresult = result.replace(/\n/g, '');
                plus.nativeUI.alert(result);
                this.$router.push({name:'weiBaoHistory',params:{
                    qrcode:result
                }});
            }
        }
    }

</script>
<style scoped>
    body{
        background-color: #000000;
    }
    .review-pannel {
        text-align: center;
    }

    .qrcode-pannel {
        width: 160px;
        height: 160px;
        background-color: #FFFFFF;
        display: inline-block;
    }

    .qrcode-img {
        width: 60px;
        padding: 5px 0 10px 0;
    }

    .list-btn .img {
        margin-right: 5px;
        margin-top: -7px;
    }

    #bcid {
        width: 100%;
        position: absolute;
        top: 0px;
        bottom: 44px;
        text-align: center;
    }

    .tip {
        color: #FFFFFF;
        font-weight: bold;
        text-shadow: 0px -1px #103E5C;
    }

    .footer {
        width: 100%;
        height: 44px;
        position: absolute;
        bottom: 0px;
        line-height: 44px;
        text-align: center;
        color: #FFF;
    }

    .fbt {
        width: 50%;
        height: 100%;
        background-color: #007500;
        float: left;
    }

    .fbt:active {
        -webkit-box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.5);
        box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.5);
    }
</style>