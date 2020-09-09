import axios from 'axios'

//最终的封装
export function request(config){
  //1.创建axios的实例
  const instance = axios.create({
    baseURL:'http://152.136.185.210:8000/api/z8',
    timeout:5000
  })
  //2.1.axios的拦截器
  instance.interceptors.request.use(config=>{
    return config
  },err=>{
    //请求失败
    // console.log(err)
  })
  //2.2响应拦截
  instance.interceptors.response.use(res=>{
    // console.log(res)
    return res.data
  },err=>{
    console.log(err)
  })


  //3.发送真正的网络请求instance 它本身就返回值就是Promise
  return instance(config)

}
