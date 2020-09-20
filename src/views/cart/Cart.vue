<template>
<div class="cart">
  <!--导航 -->
  <nav-bar class="nav-bar">
    <div slot="center">购物车({{length}})</div>
  </nav-bar>
  <!--列表 -->
  <cart-list />
</div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'

import CartList from "./chikdComps/CartList.vue"
import {
  mapGetters
} from "vuex"
export default {
  name: 'Cart',
  components: {
    NavBar,
    CartList
  },
  computed: {

    //vuex中的getters直接转成计算属性
    // ...mapGetters([
    //   'cartLength',
    //   'cartList'
    // ])
    //起别名用法
    ...mapGetters({
      length: 'cartLength',
      list: 'cartList'
    })
  },
}
</script>

<style scoped>
.nav-bar {
  background-color: var(--color-tint);
  color: #ffff;
  font-weight: 700;
}
</style>
