import axios from "axios";


export function request(config){
  axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';

    const instance = axios.create({
      baseURL:'http://localhost:80/api',
      timeout:5000
    })

    //axios的拦截器
    instance.interceptors.request.use(config=>{
      // console.log(config)
      
      return config
    },err=>{
      console.log(err)
    })
    //响应拦截
    instance.interceptors.response.use(res=>{
      // console.log(res);
      return res.data
    },err=>{
      console.log(err)
    })

  return instance(config)
}
