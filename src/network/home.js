import {request} from './request';

export function getBlogList(){
  return request({
    url:'/blog/list'
  })
}
