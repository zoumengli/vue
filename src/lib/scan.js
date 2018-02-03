
var ws = null, wo = null;
var scan = null, domready = false;
// H5 plus事件处理
function plusReady() {
    if (ws || !window.plus || !domready) {
        return;
    }
    // 获取窗口对象
    ws = plus.webview.currentWebview();
    wo = ws.opener();
    // 开始扫描
    ws.addEventListener('show', function () {
        scan = new plus.barcode.Barcode('bcid');
        scan.onmarked = onmarked;
        scan.start({conserve: true, filename: '_doc/barcode/'});
    }, false);
    // 显示页面并关闭等待框
    ws.show('pop-in');
}
if (window.plus) {
    plusReady();
} else {
    document.addEventListener('plusready', plusReady, false);
}
// 监听DOMContentLoaded事件
document.addEventListener('DOMContentLoaded', function () {
    domready = true;
    plusReady();
}, false);
// 二维码扫描成功
function onmarked(type, result, file) {
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
