import {request} from './request';

export function postRegisterData(Data){
  return request({
    url:'/user/register',
    method:'post',
    data:Data
  })
}