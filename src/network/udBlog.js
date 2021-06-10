import {request} from './request';

export function updateBlog(id,data){
  return request({
    url:`/blog/update?id=${id}`,
    method:'post',
    data
  })
}