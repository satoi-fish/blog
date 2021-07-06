import {request} from './request';

export function delComment(id,createtime){
  return request({
    url:`/blog/comment-del?id=${id}&createtime=${createtime}`,
  })
}