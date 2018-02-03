// 组件types
import {
    FETCH_HEADLINE,
    FETCH_HEADLINE_LIST,
    FETCH_COMMENT,
    ADD_HEADLINE_COMMENT,
    START_LOADING,
    FINISH_LOADING
} from './mutation-types';

const mutations = {
    // 获取头条信息
    [FETCH_HEADLINE] (state, data) {
        state.headlineData = data.headlineData,
        state.commentData = data.commentData,
        state.pushData = data.pushData
    },
    // 获取头条列表信息
    [FETCH_HEADLINE_LIST] (state, data) {
        state.headlineListData = data
    },
    // 获取评论
    [FETCH_COMMENT] (state, data) {
         state.commentData = data.commentData
    },
    //添加评论
    [ADD_HEADLINE_COMMENT] (state, data) {
        state.commentData = data.commentData
    }
}
export default mutations;