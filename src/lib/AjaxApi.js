import Vue from 'vue';
import VueResource from 'vue-resource';
Vue.use(VueResource);
Vue.http.options.emulateJSON = true;
Vue.http.headers.common['X-CSRF-TOKEN'] = "YXBpOnBhc3N3b3Jk";//$('meta[name="csrf-token"]').attr('content');
/**
 * 通过VueResource异步get数据
 * @param url           请求地址
 * @param params        请求参数
 * @param callback      回调函数
 * @returns void
 */
export function ajaxGet(url,params,callback){
	params = {params: params,timeout: 8000};
	_ajaxApi('get',url,params,callback);
}
/**
 * 通过VueResource异步post数据
 * @param url           请求地址
 * @param params        请求参数
 * @param callback      回调函数
 * @returns void
 */
export function ajaxPost(url,params,callback){
	_ajaxApi('post',url,params,callback);
}
/**
 * 通过axios异步
 * @param method        请求类型: get、post
 * @param url           请求地址
 * @param params        请求参数
 * @param callback      回调函数
 * @returns void
 */
function _ajaxApi(method,url,params,callback){
	var options = {timeout:8000};
	var url = sessionStorage.getItem("url")+url;
	console.log(url);
	Vue.http[method](url, params,options).then(function (response) {
		if(typeof callback == 'function')callback(response);
	}, function (response) {
		// handle error
		response.body = {
			retcode:-200,//状态-200表示查询超时或接口异常
			data:'',
			msg:'查询超时或接口异常'
		};
		if(typeof callback == 'function')callback(response);
		console.log("error: ",response);
	});
}