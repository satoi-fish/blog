import {request} from './request';

export function uploadProfile(username,fileName){
  let data = {username,img:fileName}
  return request({
    url:`/user/uploadProfile`,
    method:'post',
    data
  })
}