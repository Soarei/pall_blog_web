import request from '@/utils/request'
export function getArticleList(data) {
  return request({
    url: '/dashboard/article/page',
    method: 'get',
    params: data
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
export function getCategorylist() {
  return request({
    url: '/dashboard/category/list',
    method: 'post',
  })
}