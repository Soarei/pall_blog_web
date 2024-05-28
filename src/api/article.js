import request from '@/utils/request'
export function getArticleList(data) {
  return request({
    url: '/dashboard/article/page',
    method: 'get',
    params: data
  })
}
//获取首页banner图片
export function getBanner() {
  return request({
    url: '/dashboard/article/platform/banner',
    method: 'get'
  })
}
//文章榜
export function gettopArticle() {
  return request({
    url: '/dashboard/article/top',
    method: 'get'
  })
}
// 获取文章详情
export function getArticleDetail(data) {
  return request({
    url: '/dashboard/article/page/detail',
    method: 'get',
    params: data
  })
}
// 获取文章用户信息
export function getUserInfoArticle(data) {
  return request({
    url: '/dashboard/article/page/detail/userinfo',
    method: 'get',
    params: data
  })
}
// 获取文章点赞 收藏数量
export function getCountStatic(data) {
  return request({
    url: '/dashboard/article/page/detail/count',
    method: 'get',
    params: data
  })
}
// 获取文章详情评论
export function getArticleComments(data) {
  return request({
    url: '/dashboard/article/page/detail/comments',
    method: 'get',
    params: data
  })
}
// 回复评论
export function addArticleComments(data) {
  return request({
    url: '/dashboard/article/page/detail/commentsadd',
    method: 'post',
    data
  })
}
export function getCategorylist() {
  return request({
    url: '/dashboard/category/list',
    method: 'post',
  })
}