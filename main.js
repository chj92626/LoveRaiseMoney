import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false



// 引入uview
import uView from 'uview-ui';
Vue.use(uView);



// import {router,RouterMount} from './router.js'  //路径换成自己的
// Vue.use(router)

// //v1.3.5起 H5端 你应该去除原有的app.$mount();使用路由自带的渲染方式
// // #ifdef H5
// 	RouterMount(app,router,'#app')
// // #endif

// // #ifndef H5
// 	app.$mount(); //为了兼容小程序及app端必须这样写才有效果
// // #endif





// http拦截器，将此部分放在new Vue()和app.$mount()之间，才能App.vue中正常使用
import httpInterceptor from '@/common/js/http.interceptor.js'
Vue.use(httpInterceptor, app)

// http接口API集中管理引入部分
import httpApi from '@/common/js/http.api.js'
Vue.use(httpApi, app)


App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
