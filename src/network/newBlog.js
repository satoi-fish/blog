import {request} from './request';

export function newBlog(data){
  return request({
    url:`/blog/new`,
    method:'post',
    data
  })
}