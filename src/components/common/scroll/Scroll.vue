<template>
  <div class="wrapper" ref="wrapper">
    <div class="coutent">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import Bscroll from 'better-scroll'

  export default{
    name:'Scroll',
    data(){
      return{
        scroll:null
      }
    },
    props:{
      probeType:{
        type:Number,
        default:0
      },
      pullUpLoad:{
        type:Boolean,
        default:false
      }
    },
    mounted(){
      // 1.创建Bscroll对象
      this.scroll = new Bscroll(this.$refs.wrapper,{
        click:true,
        probeType:this.probeType,
        pullUpLoad:this.pullUpLoad
      })
     //2.监听滚动的位置
     if(this.probeType ===2 || this.probeType === 3){
        this.scroll.on('scroll',(position) =>{
         this.$emit('scroll',position)
       })
     }


     //3.监听上拉事件
     if(this.pullUpLoad){
       this.scroll.on('pullingUp',()=>{
         this.$emit('pullingUp')
       })
     }


    },
    methods:{
      //返回顶部
      scrollTo(x,y,time=300){
        this.scroll && this.scroll.scrollTo(x,y,time)
      },
      finishPullUp(){
        //上拉加载更多
        this.scroll.finishPullUp()
      },
      refresh(){
        //图片加载触发重新计算滚动大小
        // console.log('-----')
        this.scroll && this.scroll.refresh()
      },
      getScrollY(){
        return this.scroll ? this.scroll.y : 0
      }
    }
  }
</script>

<style scoped>
</style>
