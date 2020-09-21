<template>
<div id="app">
  <!-- 把详情页面排除在外，不保持存储exclude="Detail" -->
  <keep-alive exclude="Detail">
    <router-view></router-view>
  </keep-alive>

  <main-tab-bar></main-tab-bar>
</div>
</template>

<script>
import MainTabBar from 'components/content/mainTabbar/MainTabBar.vue'
export default {
  name: 'App',
  components: {
    MainTabBar
  }
}
</script>

<style>
@import "assets/css/base.css";
</style>
