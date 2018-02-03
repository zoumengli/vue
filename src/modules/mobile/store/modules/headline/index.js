import * as actions from './actions';
import * as getters from './getters';
import mutations from './mutations';

/**
 * 设置state
 * @type {{headlineData: Array, commentData: Array}}
 */
const state = {
    headlineData:[],
    headlineListData:[],
    pushData:[],
    commentData:[]
};

export default{
    state,
    actions,
    getters,
    mutations
};