<template>
  <!-- 所有的item都展示同一个图片和文字 -->
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive" ><slot name="item-icon"></slot> </div>
    <div v-else><slot  name="item-icon-active"></slot></div>
    <div :style="activeStyle"><slot  name="item-text"></slot></div>
  </div>

</template>

<script>
  export default{
    name:'TabBarItem',
    props:{
      //接收传过来的值
      path:String,
      activeColor:{
        type:String,
        default:'red'
      }
    },
    data(){
      return{
        // isActive:true
      }
    },
    computed:{
      isActive(){
        //判断活跃路由里面是否有我的path  函数indexOf 不等于-1就是不存在
        return this.$route.path.indexOf(this.path) !== -1
      },
      activeStyle(){
        return this.isActive ? {color:this.activeColor} : {}
      }
    },
    methods:{
      itemClick(){
        //replace是不允许返回 push可以
        this.$router.replace(this.path)
        console.log(this.path)
      }
    }
  }
</script>

<style>
  .tab-bar-item{
    /* 居中显示 tabbar按钮移动的都是49px*/
    flex:1;
    text-align: center;
    height: 49px;
    font-size: 14px;
  }
  .tab-bar-item img{
    width: 24px;
    height: 24px;
    margin-top: 3px;
    vertical-align: middle;
    margin-bottom: 2px;
  }
  .active{
    /* color: #FF5777; */
  }
</style>
