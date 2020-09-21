import {
    ADD_COUNTER,
    ADD_TO_CART
} from "./mutations-types.js"
export default {
    addCart(context, payload) {

        return new Promise((resolve, reject) => {
            //1.新添加的商品 为了不添加重复值判断id
            // let oldProduct = null;
            // for (let item of context.state.cartList) {
            //     if (item.iid === payload.iid) {
            //         oldProduct = item;
            //     }
            // }
            let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
                //2.判断oldProduct 是否有值
            if (oldProduct) {
                // oldProduct.count += 1;
                context.commit(ADD_COUNTER, oldProduct)
                resolve('当前数量+1')
            } else {
                payload.count = 1
                    // context.state.cartList.push(payload)
                context.commit(ADD_TO_CART, payload)
                resolve('添加新的商品')
            }
            reject('出现错误')
        })


    }
}