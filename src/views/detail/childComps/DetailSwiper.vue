<template>

    <swiper class="detail-swiper">
      <swiper-item  v-for="(item,index) in topImages" :key="index">
        <img class="swiper-img" :src="item" alt="">
      </swiper-item>
    </swiper>

</template>

<script>
   import {Swiper,SwiperItem} from 'components/common/swiper/index.js'
  export default{
    name:'DetailSwiper',
    components:{
      Swiper,
      SwiperItem
    },
    props:{
      topImages:{
        type:Array,
        default(){
          return []
        }
      }
    }
  }
</script>

<style scoped>
 .detail-swiper{
    height: 300px;
    overflow: hidden;
  }
  .swiper-img{
    width: 100%;
    height: 70%;
  }
</style>
