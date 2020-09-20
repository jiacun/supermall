import {
    ADD_COUNTER,
    ADD_TO_CART
} from "./mutations-types.js"
export default {
    // mutations唯一的目的就是修改state中的状态
    // mutations 中的每个方法都比较单一 必要做复杂事情
    [ADD_COUNTER](state, payload) {
        payload.count++
    },
    [ADD_TO_CART](state, payload) {
        payload.checked = true
        state.cartList.push(payload)
    }
}