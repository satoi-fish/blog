import {request} from './request';

export function getBlogList(){
  return request({
    url:'/blog/list'
  })
}

export function getIsLogin(){
  return request({
    url:'/user/login-check'
  })
}