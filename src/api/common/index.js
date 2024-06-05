import request from '@/utils/request'

export function uploadImage(data) {
  return request({
    url: '/common/upload/image',
    method: 'post',
    data
  })
}
// 获取文章分类
export function getCategory() {
  return request({
    url: '/admin/category/alllist',
    method: 'post',
  })
}
//获取标签
export function getAllLabels() {
  return request({
    url: '/admin/label/alllist',
    method: 'post',
  })
}
// 添加文章接口
export function addArticle(data) {
  return request({
    url: '/admin/article/add',
    method: 'post',
    data
  })
}