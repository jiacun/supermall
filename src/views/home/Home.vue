<template>
<div id="home" class="wrapper">
  <!-- 导航 -->
  <nav-bar class="home-nva">
    <div slot="center">购物街</div>
  </nav-bar>
  <tab-control :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl1" class="tab-control" v-show="isTabFixed" />
  <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll" :pull-up-load="true" @pullingUp="loadMore">
    <!-- 录播图 -->
    <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
    <!-- 推荐列表 -->
    <recommend-view :recommends="recommends" />
    <!-- 本周流行 -->
    <feature-view />
    <!-- tabbar小的导航 熄灯效果-->
    <tab-control :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl2" />
    <good-list :goods="showGoods"></good-list>
  </scroll>
  <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>

</div>
</template>

<script>
import HomeSwiper from './childComps/HomeSwiper.vue'
import RecommendView from './childComps/RecommendView.vue'
import FeatureView from './childComps/FeatureView.vue'

import NavBar from 'components/common/navbar/NavBar.vue'
import TabControl from 'components/content/tabControl/TabControl.vue'
import GoodList from 'components/content/goods/GoodList.vue'
import Scroll from 'components/common/scroll/Scroll.vue'

import {
  getHomeMultidata,
  getHomeGoods
} from 'network/home.js'

import {
  itemListenerMixin,
  backTopMixin
} from "common/mixin.js"

export default {
  name: 'Home',
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodList,
    Scroll,
  },
  mixins: [itemListenerMixin, backTopMixin],
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        'pop': {
          page: 0,
          list: []
        },
        'new': {
          page: 0,
          list: []
        },
        'sell': {
          page: 0,
          list: []
        },
      },
      currentType: 'pop',
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0
    }
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  destroyed() {
    console.log('------')
  },
  activated() {
    //进来活跃时候调用
    this.$refs.scroll.scrollTo(0, this.saveY, 0)
    this.$refs.scroll.refresh() //刷新一下better-scroll框架
  },
  deactivated() {
    //离开的时候调用  --保存y值
    this.saveY = this.$refs.scroll.getScrollY()
    //取消全局事件的监听
    this.$bus.$off('itemImageLoad', this.itemListener)
  },
  created() {
    //1.请求多个数据组件访问完成之后触发
    this.getHomeMultidata(),
      //2请求商品数据
      this.getHomeGoods('pop'),
      this.getHomeGoods('new'),
      this.getHomeGoods('sell')

  },
  mounted() {

  },
  methods: {
    /**
     * 事件监听方法
     */
    debounce(func, delay) {
      //防抖函数封装
      let timer = null

      return function (...args) {
        if (timer) clearTimeout(timer)

        timer = setTimeout(() => {
          func.apply(this, args)
        }, delay)
      }
    },
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
      //解决两个tabControl点击显示一致
      this.$refs.tabControl1.cuurentIndex = index
      this.$refs.tabControl2.cuurentIndex = index
    },
    contentScroll(position) {
      //返回顶部组件显示和隐藏
      this.isShowBackTop = (-position.y) > 1000
      //决定tabcontrol是否吸顶(postion:fixed)
      this.isTabFixed = (-position.y) > this.tabOffsetTop
    },
    loadMore() {
      //上拉加载更多
      this.getHomeGoods(this.currentType)

    },

    swiperImageLoad() {
      //获取tabcontroll的offsetTop
      //所以的组件都有一个特性$el用于获取组件中的元素
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
    },
    /**
     * 网络请求相关方法
     */
    getHomeMultidata() {
      //请求轮播图
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list,
          this.recommends = res.data.recommend.list
      })
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1
        //完成上拉加载更多
        this.$refs.scroll.finishPullUp()
      })
    }

  }
}
</script>

<style scoped>
#home {
  /* padding-top: 44px; */
  height: 100vh;
  position: relative;
}

.home-nva {
  background-color: var(--color-tint);
  color: #fff;

  /*    position: fixed;
    left:0;
    right: 0;
    top: 0;
    z-index: 9; */
}

/*  .tab-control{
    position: sticky;
    top: 44px;
    z-index: 9;
  } */
/* 2.两种调试内容滑动效果实现 */
.content {
  overflow: hidden;

  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}

/* 1.两种调试内容滑动效果实现 动态计算方法*/
/* .content{
    height: calc(100% - 93px);
    overflow: hidden;
    margin-top: 44px;
  } */
.tab-control {
  position: relative;
  z-index: 9;
}
</style>
