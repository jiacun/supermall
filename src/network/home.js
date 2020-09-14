import {request} from './request.js'
//轮播图请求 /home/multdata
export function getHomeMultidata(){
  return request({
    url:'/home/multidata'
  })
}
//内容
export function getHomeGoods(type,page){
  return request({
    url:'/home/data',
    params:{
      type,
      page
    }
  })
}
