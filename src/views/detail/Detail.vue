<template>
  <div id="detail">
    <!-- 导航栏 -->
    <detail-nav-bar class="detail-nav"></detail-nav-bar>
    <scroll class="contents" ref="scroll">
      <detail-swiper :topImages="topImages"></detail-swiper>
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo"
      @imageLoad="imageLoad"/>
      <detail-param-info :paramInfo="paramInfo"/>
      <detail-comment-info :commentInfo="commentInfo" />
      <good-list :goods="recommends"/>
    </scroll>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar.vue"
import DetailSwiper from "./childComps/DetailSwiper.vue"
import DetailBaseInfo from "./childComps/DetailBaseInfo.vue"
import DetailShopInfo from "./childComps/DetailShopInfo.vue"
import Scroll from 'components/common/scroll/Scroll.vue'
import DetailGoodsInfo from "./childComps/DetailGoodsInfo.vue"
import DetailParamInfo from "./childComps/DetailParamInfo.vue"
import DetailCommentInfo from "./childComps/DetailCommentInfo.vue"

import GoodList from "components/content/goods/GoodList.vue"
import {getDetail,Goods,Shop,GoodsParam,getRecommend} from "network/detail.js"
import {debounce} from "common/utils.js"
  export default{
    name:'Detail',
    components:{
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      Scroll,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      GoodList
    },
    data(){
      return{
        iid:null,
        topImages:[],
        goods:{},
        shop:{},
        detailInfo:{},
        paramInfo:{},
        commentInfo:{},
        recommends:[],
        itemListener:null
      }
    },
    created(){
      //1.保存传入的iid
      this.iid = this.$route.params.iid
      //2.根据iid请求数据
      getDetail(this.iid).then(res=>{
        //1.获取轮播数据
        console.log(res)
        const data = res.result;
        this.topImages = res.result.itemInfo.topImages;//拿到轮播图
        //2.获取商品基本信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);
        //3创建店铺信息的对象
        this.shop = new Shop(data.shopInfo)
        //4.获取详情图片数据
        this.detailInfo = data.detailInfo
        //5.获取商品参数数据
        this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
        //6.获取商品评论数据
        if(data.rate.cRate !==0){
          this.commentInfo = data.rate.list[0]
        }
      })
      //3.请求推荐数据
      getRecommend().then(res=>{
        this.recommends = res.data.list
      })

    },
    mounted(){
        const refresh = debounce( this.$refs.scroll.refresh,50)
      this.itemListener = () =>{
        // this.$refs.scroll.refresh()
        refresh()
      }
      this.$bus.$on('itemImageLoad',this.itemListener)
    },
    destroyed(){
      //取消全局事件的监听
      this.$bus.$off('itemImageLoad',this.itemListener)
    },
    methods:{
      imageLoad(){
        //刷新滚动组件大小
        this.$refs.scroll.refresh()
      }
    }
  }
</script>

<style scoped>
  #detail{
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }
  .contents{
     height: calc(100% - 44px);
     overflow: hidden;
  }
  .detail-nav{
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
</style>
