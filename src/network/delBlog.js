import {request} from './request';

export function delBlog(id){
  return request({
    url:`/blog/delete?id=${id}`,
  })
}