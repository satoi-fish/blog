import {request} from './request';

export function logout(){
  return request({
    url:'/user/logout',
  })
}