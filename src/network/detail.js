import {request} from './request';

export function getBlogDetail(id){
  return request({
    url:`/blog/detail?id=${id}`
  })
}
export function getBlogComment(id){
  return request({
    url:`/blog/comment-receive?id=${id}`
  })
}

export function postBlogComment(id,commentData){
  return request({
    url:`/blog/comment-post?id=${id}`,
    method:'post',
    data:commentData,
  })
}