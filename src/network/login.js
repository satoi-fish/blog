import {request} from './request';

export function login(loginData){
  return request({
    url:'/user/login',
    method:'post',
    data:loginData
  })
}