export function host (url) {
    const host = url.replace(/^https?:\/\//, '').replace(/\/.*$/, '')
    const parts = host.split('.').slice(-3)
    if (parts[0] === 'www') parts.shift()
    return parts.join('.')
}

export function getDateTime (dataTime){
    let time = dataTime;
    let str = time.substring(0, 10);
    return str;
}

// 判断发帖时间与现在时间的间隔
export function getLastTime (creatTime) {
    // let oldtime = creatTime.substring(0, 10);
    // let newtime = new Date();
    let oldtime = new Date(creatTime);
    let newtime = (new Date() - oldtime)/1000;
    let month = Math.floor(newtime/3600/24/30);
    let day = Math.floor(newtime/3600/24);
    let hours = Math.floor(newtime/3600);
    let mins = Math.floor(newtime/60);
    let str = '';
    if(hours === 0){
        str = mins + '分钟前';
    }else if(day === 0){
        str = hours + '小时前';
    }else if(month === 0){
        str = day + '天前';
    }else {
        str = month + '月前';
    }
    return str;
}
// json、数组转url参数字符串
export function jsonToUrlParams (data) {
    let tmps = [];
    for (var key in data) {
        tmps.push(key + '=' + data[key]);
    }
    return tmps.join('&');
}