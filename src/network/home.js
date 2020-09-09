import {request} from './request.js'
//轮播图请求 /home/multdata
export function getHomeMultidata(){
  return request({
    url:'/home/multidata'
  })
}
