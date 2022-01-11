// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// 引入路由表，并挂载到vue实例，让vue实例管理router路由表
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)

import AmapVue from '@amap/amap-vue';
AmapVue.config.key = '8504055149efad1235b7e2508acc97c4'

Vue.use(AmapVue)


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})