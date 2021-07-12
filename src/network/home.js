import {request} from './request';

export function getBlogList(keyword){
  keyword = keyword || ""
  return request({
    url:`/blog/list?keyword=${keyword}`
  })
}

export function getIsLogin(){
  return request({
    url:'/user/login-check'
  })
}