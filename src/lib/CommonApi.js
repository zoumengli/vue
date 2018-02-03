import * as AjaxApi from './AjaxApi';

/**
 * 获取所有员工信息
 */
export function fetchStaff(callback){
	if(window._staffs && window._staffs.length >0){
		 if(typeof callback == 'function')callback(window._staffs);
	}else{
		AjaxApi.ajaxGet(window.base_url+"admin/common/getStaffs/", {},(response)=>{
	        window._staffs = response.body;
	        if(typeof callback == 'function')callback(window._staffs);
	    });
	}
}

/**
 * 获取token用于csrf校验
 * @param callback 
 */
export function fetchToken(callback){
	AjaxApi.ajaxGet(window.base_url+'admin/common/getCsrfToken/', {},(response)=>{
		if(response.body.retcode == 0){
			if(typeof callback == 'function')callback(response.body.data);
		}
	});
}

/**
 * 添加访问日志
 * @param params
 * @constructor
 */
export function addPageLog(params){
	let curr_url = window.location.href;
	let url_params = url_parser_json(curr_url,['sessionKey','ticket','loginParam','length','lengh']);
	curr_url = json_parser_url(url_params,curr_url);
	let url_hash = location.hash;
	if(url_hash.indexOf('?')!=-1){
		url_hash = url_hash.substring(0,url_hash.indexOf('?'));
	}
	params = params || {};
	params.http_url = curr_url;
	params.path_url = url_hash;
	params.network_type = (navigator.connection ? navigator.connection.type : '');
	params.user_agent = navigator.userAgent;
	let url = (window.base_url || '') + "mobile/api/addPageLog/";
	AjaxApi.ajaxPost(url,params);
}

/**
 * 添加访问日志
 * @param params
 * @constructor
 */
export function addPcPageLog(params){
	let curr_url = window.location.href;
	let url_params = url_parser_json(curr_url,['sessionKey','ticket','loginParam','length','lengh']);
	curr_url = json_parser_url(url_params,curr_url);
	let url_hash = location.hash;
	if(url_hash.indexOf('?')!=-1){
		url_hash = url_hash.substring(0,url_hash.indexOf('?'));
	}
	params = params || {};
	params.http_url = curr_url;
	params.path_url = url_hash;
	params.network_type = (navigator.connection ? navigator.connection.type : '');
	params.user_agent = navigator.userAgent;
	let url = (window.base_url || '') + "admin/pageview/store/";
	AjaxApi.ajaxPost(url,params);
}

/**
 * 添加微信转发日志
 * @param fk_id
 *
 */
export function addForwardingLog(fk_id){
	let url = (window.base_url || '') + "mobile/api/addForwardingLog/";
	AjaxApi.ajaxPost(url,{fk_id:fk_id});
}


/**
 * 解析url参数为json数组
 * @param string url url地址
 * @param array del_keys 要删除的参数key
 * @return json
 */
function url_parser_json(url,del_keys){
	let params = '';
	if(url.indexOf('?')!=-1){
		params = url.substring(url.indexOf('?')+1);
	}
	if(!params)return [];
	params = decodeURIComponent(params);
	let paramsArr = params.split('&');
	let args = {},param,name,value;
	for(let i=0;i<paramsArr.length;i++){
		param = paramsArr[i].split('=');
		name = param[0];
		value = param[1];
		if(name == ""){
			name = "unkown";
		}
		if(name.indexOf("[]") != -1){
			name = name.replace("[]",'');//去掉参数变量的中括号
		}
		if(typeof args[name] == "undefined"){
			//参数尚不存在
			args[name] = value;
		}else if(typeof args[name] == "string"){
			//参数已经存在则保存为数组
			args[name] = [args[name]];
			args[name] . push(value);
		}else{
			//已经是数组的
			args[name].push(value);
		}
	}
	//删除指定参数
	for(let index in del_keys){
		if(args[del_keys[index]]){
			delete args[del_keys[index]];
		}
	}
	return args; //以json格式返回获取的所有参数
}
/**
 * json数组解析为url参数
 * @param json paramJson json数组
 * @param string url     url地址，不为空时，重新根据paramJson信息组织get参数
 * @return string
 */
function json_parser_url(paramJson,url) {
	if (url && url.indexOf('?') != -1) {
		url = url.substring(0, url.indexOf('?'));
	}
	var paramStr = "";
	for (let index in paramJson) {
		if (paramStr) {
			paramStr += "&";
		}
		paramStr += index + "=" + paramJson[index];
	}
	if (url) {
		return url + (paramStr ? "?" + paramStr:'')+location.hash;
	}
	return paramStr;
}

/**
 * 获取data
 */

export function fetchData(url,param) {
    AjaxApi.ajaxGet(url,param,(response) => {
        window._data = response.body;
    });
    return window._data;
}
export function fetchDatas(url,param) {
    AjaxApi.ajaxGet(url,param,(response) => {
        window._data = response.body.data;
    });
    return window._data;
}

/**
 * list数据
 */
export function fetchTableList(url,param) {
    AjaxApi.ajaxGet(url,param,(response) => {
        window._data = response.body.data.rows;
    });
    return window._data;
}

