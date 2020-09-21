import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import FastClick from "fastclick";
import VueLazyLoad from 'vue-lazyload'

import toast from 'components/common/toast'

Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()

//解决移动端300延迟
FastClick.attach(document.body)
    //使用懒加载插件 图片
Vue.use(VueLazyLoad, {
    loading: require('./assets/img/common/placeholder.png')
})

//安装toast插件
Vue.use(toast)
new Vue({
    render: h => h(App),
    router,
    store,

}).$mount('#app')

//图片懒加载
//图片需要在显示到 vue-lazyload --save