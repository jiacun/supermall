import { debounce } from "common/utils.js"

import BackTop from 'components/content/backTop/BackTop.vue'
export const itemListenerMixin = {
    data() {
        return {
            itemListener: null,
            newRefresh: null
        }
    },
    mounted() {
        //图片加载完的事件监听
        this.newRefresh = debounce(this.$refs.scroll.refresh, 50)
            //3.监听总线中的图片加载完成 防抖函数debounce/节流函数throttle
        this.itemListener = () => {
            // this.$refs.scroll.refresh()
            this.newRefresh()
        }
        this.$bus.$on('itemImageLoad', this.itemListener)

    },

}

export const backTopMixin = {
    components: {
        BackTop
    },
    data() {
        return {
            isShowBackTop: false
        }
    },
    methods: {
        backClick() {
            //点击返回顶部事件500毫秒回到到顶部 拿到Scroll组件的内容
            // this.$refs.scroll.scroll.scrollTo(0,0,500)
            this.$refs.scroll.scrollTo(0, 0, 500)
        }
    },
}