import Vue from 'vue'
import App from './App'
import uView from 'uview-ui'
// 引入vuex
import store from './store'
// 引入Router
// import Router from 'uni-simple-router';
import {
	RouterMount
} from 'uni-simple-router';
// import router from './router'
import './assets/css/global.css'

Vue.use(uView)
// Vue.use(Router)
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App,
	store
})

app.$mount()
// #ifdef H5
//RouterMount(app, '#app');
// #endif

// #ifndef H5
//app.$mount(); //为了兼容小程序及app端必须这样写才有效果
// #endif
