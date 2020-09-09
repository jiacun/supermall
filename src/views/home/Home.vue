<template>
 <div id="home">
   <!-- 导航 -->
   <nav-bar class="home-nva"><div slot="center">购物街</div></nav-bar>
   <!-- 录播图 -->
    <home-swiper :banners="banners"></home-swiper>
    <!-- 推荐列表 -->
    <recommend-view :recommends="recommends" />
 </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar.vue'
  import HomeSwiper from './childComps/HomeSwiper.vue'
  import RecommendView from './childComps/RecommendView.vue'

  import {getHomeMultidata} from 'network/home.js'

  export default{
    name:'Home',
    components:{
      NavBar,
      HomeSwiper,
      RecommendView
    },
    data(){
      return{
        banners:[],
        recommends:[]
      }
    },
    created(){
      //1.请求多个数据
      getHomeMultidata().then(res => {
       this.banners = res.data.banner.list,
       this.recommends = res.data.recommend.list
      })
    }
  }
</script>

<style>
  .home-nva{
    background-color: var(--color-tint);
    color: #fff;
  }
</style>


