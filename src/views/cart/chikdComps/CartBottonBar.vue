<template>
<div class="bottom-bar">
  <div class="check-content">
    <check-button :is-checked="isSelectAll" class="check-button" @click.native="checkClick" />
    <span>全选</span>
  </div>

  <div class="price">
    合计：{{totalPrice}}
  </div>

  <div class="calculate" @click="calcClick">
    去计算:({{checkLength}})
  </div>
</div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton"

import {
  mapGetters
} from "vuex"

export default {
  name: "CartBottonBar",
  components: {
    CheckButton
  },
  computed: {
    ...mapGetters(['cartList']),
    totalPrice() {
      return "￥" + this.cartList.filter(item => {
        return item.checked
      }).reduce((preValue, item) => {
        return preValue + item.price * item.count
      }, 0).toFixed(2)
    },
    checkLength() {
      return this.cartList.filter(item => item.checked).length
    },
    isSelectAll() {
      //1.查找数组中是否有选中的并且取反filter的用法
      // return !(this.cartList.filter(item => !item.checked).length)
      //2.中判断结果 使用find用法
      if (this.cartList.length === 0) return false
      return !this.cartList.find(item => !item.checked)
      //3.使用遍历用法
      // for (let item of this.cartList) {
      //   if (!item.checked) {
      //     return false
      //   }
      // }
      // return true
    }
  },
  methods: {
    checkClick() {
      if (this.isSelectAll) { //全部选中
        this.cartList.forEach(item => item.checked = false)
      } else { //部分没有选中
        this.cartList.forEach(item => item.checked = true)
      }
    },
    calcClick() {
      if (!this.isSelectAll) {
        this.$toast.show('请选择购买的商品', 2000)
      }
    }
  },
}
</script>

<style scoped>
.bottom-bar {
  height: 44px;
  background-color: #eee;
  position: relative;
  bottom: 139px;
  line-height: 40px;
  display: flex;
  font-size: 15px;
}

.check-content {
  display: flex;
  align-items: center;
  margin-left: 10px;
  width: 60px;
}

.check-button {
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin-right: 5px;
}

.calculate {
  width: 90px;
  background-color: #ff8198;
  color: #fff;
  text-align: center;
}

.price {
  margin-left: 30px;
  flex: 1;

}
</style>
