import Vue from 'vue'
import App from './App'
import store from './store'// 引入vuex
import uView from "uview-ui";// 引入uview
import UniRouteGuards from 'uniapp-route-guards';//路由守卫注册
import util from './util/util.js'//引入全局自定义

import fiveIndex from 'common/five_index.vue'//直播，回放，视频，文件，音频组件
import noData from 'common/no_data.vue'//暂无数据

// 把vuex定义成全局组件
Vue.prototype.$store = store
Vue.prototype.$util=util


Vue.config.productionTip = false
Vue.use(uView);
Vue.use(UniRouteGuards);

Vue.component('fiveIndex',fiveIndex);
Vue.component('noData',noData);

App.mpType = 'app'

const app = new Vue({
    ...App,
	store
})
app.$mount()

//路由守卫
const guard = new UniRouteGuards();

// 自定义路由拦截白名单
const WHILE_LIST = ['/src/pages/home'];

// 跳过路由白名单拦截
guard.beforeEach((to, from, next) => {
    if (WHILE_LIST.includes(from.url)) {
        return next(to.url);
    }
    next();
});

// 拦截 调用 uni.switchTab 页面C并跳转到 页面D
guard.beforeEach((to, from, next) => {
    // console.log('to: ', to);
    // console.log('from: ', from);
    // if (to.action === 'navigateTo' && to.url === '/pages/login/loan_status/loan_status') {
    //     return next({
    //         url: '/pages/login/login/login',
    //         action: 'navigateTo'
    //     });
    // }
    next();
});
//全局后置守卫
guard.afterEach((to, from) => {
    // console.log('to: ', to);
    // console.log('from: ', from);
});

// 注册 路由守卫出现异常回调的钩子
guard.onError((errMsg) => {
    console.error('route-guards error: ' + errMsg);
});

//调用某个路由方法时并取消路由拦截
// uni.navigateTo(
//     {
//         url: '/pages/a',
//         success() {
//             console.log('is success');
//         },
//         fail() {
//             console.error('is fail');
//         }
//     },
//     false
// );

// 或
// uni.navigateBack(null, false);