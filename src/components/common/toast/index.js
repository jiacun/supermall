import Toast from './Toast.vue'


const obj = {}

obj.install = function(Vue) {
    // vue.extend(Toast)
    // document.body.appendChild(Toast, $el)
    // Vue.prototype.$toast = Toast
    //1.创建组件构造器
    const toastContrusetor = Vue.extend(Toast);
    //2.new 的方式 根据组件构造器 创建一个组件对象
    const toast = new toastContrusetor()

    //3.将组件对象手动挂在到div上
    toast.$mount(document.createElement('div'))

    //4. toast.$el 对应的就是div了
    document.body.appendChild(toast.$el)

    Vue.prototype.$toast = toast
}
export default obj