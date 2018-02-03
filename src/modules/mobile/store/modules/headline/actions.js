import Vue from 'vue';
import VueResource from 'vue-resource';
Vue.use(VueResource);
Vue.http.headers.common['X-CSRF-TOKEN'] = "YXBpOnBhc3N3b3Jk";//$('meta[name="csrf-token"]').attr('content');

/**
 * get请求
 * @param  {String} options.url   api地址
 * @param  {String} options.query query参数
 * @return {Promise}               Promise
 */
const _get = ({ url, query }, commit) => {
    if (commit){
        commit('START_LOADING');
    }
    return Vue.http.get(url,query).then((res) => {
        if (commit){
            commit('FINISH_LOADING');
        }
        if (res.status >= 200 && res.status < 300) {
            return res.data;
        }
        return Promise.reject(new Error(res.status));
    });
}

/**
 * post请求
 * @param  {String} options.url   api地址
 * @param  {String} options.query query参数
 * @return {Promise}               Promise
 */
const _post = ({ url, query }, commit) => {
    if (commit){
        commit('START_LOADING');
    }
    return vue.http.post(url,query).then((res) => {
            if (commit){
                commit('FINISH_LOADING');
            }
            if (res.status >= 200 && res.status < 300) {
        return res.data;
    }
    return Promise.reject(new Error(res.status));
});
}

let base_url = window.base_url;
const formatUrl = (type)=>{
    let url = base_url+"mobile/";
    type = type.toUpperCase();
    switch(type){
        case "FETCH_HEADLINE_LIST":
            url += "api/getHeadlineList/";
            break;
        case "FETCH_HEADLINE":
            url += "api/getHeadlineDetail/";
            break;
        case "FETCH_COMMENT":
            url += "api/getComments/";
            break;
        case "ADD_HEADLINE_COMMENT":
            url += "api/addComment/";
            break;
        default:
            url = '';
            break;
    }
    return url;
}

/**
 * 请求获取头条数据
 * @param  {Function} options.commit store对象解构出来的函数，无需手动提供
 * @param  {Number} id             头条ID key
 * @return {Promise}                  Promise
 */
export const fetchHeadline = ({ commit }, id) => {
    const query = {params:{id:id}};
    const url = formatUrl("FETCH_HEADLINE");
    return _get({url, query}, commit).then((json) => {
        json = JSON.parse(json);
        if (json.retcode === 0) {
            return commit('FETCH_HEADLINE', json.data);
        }
        return Promise.reject(new Error('fetchHeadline failure'));
    }).catch((error) => {
        // commit('FETCH_TOPIC_LISTS_FAILURE', topicTab, page)
        return Promise.reject(error);
    });
};

/**
 * 请求评论列表数据
 * @param  {Function} options.commit store对象解构出来的函数，无需手动提供
 * @param  {json} params             {case_id,addtype}
 * @return {Promise}                  Promise
 */
export const fetchComment = ({ commit }, params) => {
    const query = {params:params};
    const url = formatUrl("FETCH_COMMENT");
    return _get({url, query}, commit).then((json) => {
        json = JSON.parse(json);
    if (json.retcode === 0) {
        return commit('FETCH_COMMENT', json.data);
    }
    return Promise.reject(new Error('fetchComment failure'));
}).catch((error) => {
        // commit('FETCH_TOPIC_LISTS_FAILURE', topicTab, page)
        return Promise.reject(error);
});
};

/**
 * 请求获取头条列表数据
 * @param  {Function} options.commit store对象解构出来的函数，无需手动提供
 * @param  {Number} id             头条ID key
 * @return {Promise}                  Promise
 */
export const fetchHeadlineList = ({ commit }, params) => {
    let query = params ?{params:params}:{};
    const url = formatUrl("FETCH_HEADLINE_LIST");
    return _get({url, query}, commit).then((json) => {
        json = JSON.parse(json);
        if (json.retcode === 0) {
            return commit('FETCH_HEADLINE_LIST', json.data);
        }
        return Promise.reject(new Error('fetchHeadlineList failure'));
    }).catch((error) => {
        return Promise.reject(error);
    });
};


/**
 * 添加评论
 * @param  {Function} options.commit store对象解构出来的函数，无需手动提供
 * @param  {Object}   params          请求数据（json对象）
 * @return {Promise}                  Promise
 */
export const addComment = ({ commit }, params) => {
    const query = params;
    const url = formatUrl("ADD_HEADLINE_COMMENT");
    return _post({url, query}, commit).then((json) => {
        json = JSON.parse(json);
        if (json.retcode === 0) {
            return commit('ADD_HEADLINE_COMMENT', json.data);
        }
        return Promise.reject(new Error('addComment failure'));
    }).catch((error) => {
        return Promise.reject(error);
    });
};



