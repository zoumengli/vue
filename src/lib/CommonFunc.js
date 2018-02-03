export function getSession(key){
	return JSON.parse(sessionStorage.getItem(key));
}
export function setSession(key,value){
	sessionStorage.setItem(key, JSON.stringify(value));
}
export function wxpicbox(wrapperImgEl,isCurrent,callback){
	if(!wrapperImgEl){
		return false;
	}
    let imgs = wrapperImgEl.getElementsByTagName('img');
    let picurls = [];//保存所有图片地址
    let curr_url = '';
    for (let i=0; i<imgs.length; i++) {
    	if(imgs[i].src){
    		picurls.push(imgs[i].src);
    		imgs[i].onclick = function(){  
    			curr_url = isCurrent?this.src:'';
    			if (typeof WeixinJSBridge == "object" && typeof WeixinJSBridge.invoke == "function") {
    	            //调用微信图片浏览接口，实现图片点击后浏览效果
    	            WeixinJSBridge.invoke("imagePreview",{
    	                "current": curr_url,
    	                "urls":picurls
    	            },function(res){
    	                alert(res.err_msg);
    	            });
    	        }
    			if(typeof callback == 'function'){
    		        callback(curr_url);
    		    }
            }  
        }
    }
}
export function changeHtmlTitle(title){
    document.title = title;
    let iframe = document.createElement("iframe");
    iframe.setAttribute("src", "/favicon.ico");
    iframe.style.display = 'none';
    //iframe.setAttribute("id", "iframe");
    iframe.addEventListener('load', function() {
    	setTimeout(function(){
    		iframe.removeEventListener('load',function(){},false);
            document.body.removeChild(iframe);
    	},0);
    },false);
    let body = document.getElementsByTagName('body')[0];
    document.body.appendChild(iframe);
}
//获取前进、后退日期，根据diffDay变量而定
export function getDay(diffDay,fmt,defautlTime){
	const date = defautlTime || new Date();
	if(diffDay){
		date.setDate(date.getDate()+diffDay);//获取diffDay天后的日期
	}
	if(fmt){
		return formatDate(date,fmt);
	}
	return date;
}
//日期格式化
export function formatDate(strTime,fmt){
	let date = new Date();
	if(strTime){
		date = new Date(strTime);
	}
	if(!fmt){
		fmt = "yyyy-MM-dd";
	}
	const o = {
	    "y+": date.getFullYear(),
	    "M+": date.getMonth() + 1,                 //月份
	    "d+": date.getDate(),                    //日
	    "h+": date.getHours(),                   //小时
	    "m+": date.getMinutes(),                 //分
	    "s+": date.getSeconds(),                 //秒
	    "q+": Math.floor((date.getMonth() + 3) / 3), //季度
	    "S+": date.getMilliseconds()             //毫秒
	};
	for (let k in o) {
	    if (new RegExp("(" + k + ")").test(fmt)){
	    	if(k == "y+"){
	        	fmt = fmt.replace(RegExp.$1, ("" + o[k]).substr(4 - RegExp.$1.length));
	      	}else if(k=="S+"){
	        	let lens = RegExp.$1.length;
	        	lens = lens==1?3:lens;
	        	fmt = fmt.replace(RegExp.$1, ("00" + o[k]).substr(("" + o[k]).length - 1,lens));
	        }else{
	        	fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	        }
	    }
	}
	return fmt;
}
/**
 * 大数组数据进行分页显示
 */
export function pagination(pageNo, pageSize, data){
    let offset = (pageNo - 1) * pageSize;  
    return (offset + pageSize >= data.length) ? data.slice(offset, data.length) : data.slice(offset, offset + pageSize);  
}