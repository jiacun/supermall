<template>
<div id="detail">
  <!-- 导航栏 -->

  <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav" />

  <scroll class="contents" ref="scroll" :probe-type="3" @scroll="contentScroll">

    <detail-swiper :top-images="topImages"></detail-swiper>
    <detail-base-info :goods="goods" />
    <detail-shop-info :shop="shop" />
    <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad" />
    <detail-param-info :param-info="paramInfo" ref="params" />
    <detail-comment-info :comment-info="commentInfo" ref="comment" />
    <good-list :goods="recommends" ref="recommend" />
  </scroll>
  <detail-bottom-bar @addCart="addToCart" />
  <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  <!-- <toast :message="message" :show="show" />-->
</div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar.vue"
import DetailSwiper from "./childComps/DetailSwiper.vue"
import DetailBaseInfo from "./childComps/DetailBaseInfo.vue"
import DetailShopInfo from "./childComps/DetailShopInfo.vue"

// import Toast from 'components/common/toast/Toast.vue'
import Scroll from 'components/common/scroll/Scroll.vue'

import DetailGoodsInfo from "./childComps/DetailGoodsInfo.vue"
import DetailParamInfo from "./childComps/DetailParamInfo.vue"
import DetailCommentInfo from "./childComps/DetailCommentInfo.vue"
import DetailBottomBar from "./childComps/DetailBottomBar"

import GoodList from "components/content/goods/GoodList.vue"

import {
  mapActions
} from "vuex"
import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend
} from "network/detail.js"
import {
  debounce
} from "common/utils.js"
import {
  itemListenerMixin,
  backTopMixin
} from "common/mixin.js"

export default {
  name: 'Detail',
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodList,
    DetailBottomBar,
    // Toast
  },
  mixins: [itemListenerMixin, backTopMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex: 0,
      // message: '',
      // show: false
    }
  },
  created() {
    //1.保存传入的iid
    // const iid = this.$route.query.iid
    this.iid = this.$route.params.iid

    // console.log(this.iid)
    //2.根据iid请求数据
    getDetail(this.iid).then(res => {
      //1.获取轮播数据
      // console.log(res)
      const data = res.result;
      this.topImages = res.result.itemInfo.topImages; //拿到轮播图
      //2.获取商品基本信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);
      //3创建店铺信息的对象
      this.shop = new Shop(data.shopInfo)
      //4.获取详情图片数据
      this.detailInfo = data.detailInfo
      //5.获取商品参数数据
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
      //6.获取商品评论数据
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0]
      }

    })
    //3.请求推荐数据
    getRecommend().then(res => {
      this.recommends = res.data.list
    })
    //4.给getThemeTopY赋值(对给 this.getThemeTopY防抖操作)
    this.getThemeTopY = debounce(() => {
      this.themeTopYs = []
      this.themeTopYs.push(0);
      this.themeTopYs.push(-this.$refs.params.$el.offsetTop + 44);
      this.themeTopYs.push(-this.$refs.comment.$el.offsetTop + 44);
      this.themeTopYs.push(-this.$refs.recommend.$el.offsetTop + 44);
      this.themeTopYs.push(-Number.MAX_VALUE); //最大值
      // console.log(this.themeTopYs);
    }, 100)

  },
  mounted() {

  },

  destroyed() {
    //取消全局事件的监听
    this.$bus.$off('itemImageLoad', this.itemListener)
  },
  methods: {
    ...mapActions(['addCart']),
    imageLoad() {
      //刷新滚动组件大小
      this.newRefresh()
      // this.$refs.scroll.refresh()
      // this.$nextTick(() => {
      //获取每个元素的offsetTop因为是组件家$el
      this.getThemeTopY()
      // })
    },
    titleClick(index) {
      console.log(index)
      this.$refs.scroll.scrollTo(0, this.themeTopYs[index], 100)
    },
    contentScroll(position) {
      //1.获取y值
      const positioninY = -position.y
      // console.log(positioninY)
      //2.positioninY 和主题中值进行对比
      let length = this.themeTopYs.length;
      for (let i = 0; i < length - 1; i++) {
        //1.滚动到指定位置，显示对应标题，第一个条件是赋值过去频繁，条件二 判断y的位置到区间
        // if (this.currentIndex !== i && ((i < length - 1 && positioninY >= -this.themeTopYs[i] && positioninY < -this.themeTopYs[i + 1]) || (i === length - 1 && positioninY >= -this.themeTopYs[i]))) {
        //   this.currentIndex = i;
        //   // console.log(this.currentIndex);
        //   this.$refs.nav.currentIndex = this.currentIndex
        // }

        //简化判断
        //最大值Number.MAX_VALUE
        if (this.currentIndex !== i && (positioninY >= -this.themeTopYs[i] && positioninY < -this.themeTopYs[i + 1])) {
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex
        }
      }

      //是否显示回到顶部
      this.isShowBackTop = (-position.y) > 1000

    },
    addToCart() {
      //1.添加购物车 获取购物车需要展示的信息
      const product = {}
      product.imgag = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.realPrice
      product.iid = this.iid;
      // console.log(this.goods.realPrice)
      // console.log(product)
      //2.将商品添加到购物车 调用vuex的方法传入参数
      // this.$store.commit('addCart', product)
      //3.映射vuex中的actions的方法
      this.addCart(product).then(res => {
        //弹出消息
        // this.show = true;
        // this.message = res
        // setTimeout(() => {
        //   this.show = false;
        //   this.message = ''
        // }, 1500)
        // console.log(this.$toast)
        this.$toast.show(res, 2000)
      })
      // this.$store.dispatch('addCart', product).then(res => {
      //   console.log(res);
      // })
    }

  }
}
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}

.contents {
  height: calc(100% - 93px);
  overflow: hidden;
}

.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
</style>
