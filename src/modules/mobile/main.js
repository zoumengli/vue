import Vue from 'vue';
import Swipe from '../../directives/swipe';
import BackLink from '../../directives/back-link';
import Transitionend from '../../directives/transitionend';
import VueResource from 'vue-resource';
import VueBus from 'vue-bus';
import router from './router';
import * as filters from '../../lib/Filters';
//import store from './store';
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css';
//import 'element-ui/lib/theme-default/index.css';
import App from './App';
//var FastClick = require('fastclick');
//FastClick.attach(document.body, {});

Vue.use(VueBus);
Vue.use(VueResource);
Vue.use(Mint);


Vue.config.devtools = true;

// register global utility filters.
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})

//自定义自动获取焦点指令
Vue.directive('focus', {
    // 当绑定元素插入到 DOM 中。
    inserted: function (el) {
        // 聚焦元素
        el.focus();
        //定位光标到内容最后
        const len = el.value.length;
        if (document.selection) {
            const sel = el.createTextRange();
            sel.moveStart('character', len);
            sel.collapse();
            sel.select();
        } else if (typeof el.selectionStart == 'number' && typeof el.selectionEnd == 'number') {
            el.selectionStart = el.selectionEnd = len;
        }
    }
});

Vue.directive('back-link', BackLink);
Vue.directive('swipe', Swipe);
Vue.directive('transitionend', Transitionend);

/*router.afterEach(route => {
	if(!window._user || !window._user.name){
		if(route.name !== 'login'){
			router.push('/login');
		}
	}
});*/

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
