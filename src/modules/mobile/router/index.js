import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);


const ErrorTip = require('../views/ErrorTip');
const login = require('../views/login/Index');
const guide = require('../views/login/Guide');
const setUrl = require('../views/setUrl');

/*const ErrorTip = function  (resolve) {require(['../views/ErrorTip'],resolve)};
const login = function  (resolve) {require(['../views/login/Index'],resolve)};
const guide = function  (resolve) {require(['../views/login/Guide'],resolve)};
const setUrl = function  (resolve) {require(['../views/setUrl'],resolve)};*/

//引入分块路由
import base_routes_cfg from './basic_routes_cfg';

let routes = [];
//合并分块路由
routes = base_routes_cfg;

//默认路由
const default_routes_cfg = [
        { path: '/', redirect: { name: 'login' }},//这里定义默认进来的页面
        { path:'/setUrl',name:'setUrl',component: setUrl},
        { path: '/login',name:'login',component: login},
        { path: '/guide',name:'guide',component: guide},
        { path: '*',name:'errorPage',component: ErrorTip, meta: { scrollToTop: true }},

];
//合并默认路由
routes = routes.concat(default_routes_cfg);

export default new Router({
    //mode: 'history',
    base: __dirname,
    scrollBehavior (to, from, savedPosition) {
        //这里只有在mode=history模式下才有用，多好的功能，我们用不上
        if (savedPosition) {
            return savedPosition
        } else {
            return { x: 0, y: 0 }
        }
    },
    routes: routes
});