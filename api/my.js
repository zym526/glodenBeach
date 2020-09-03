import request from '../util/request.js'

// 获取用户收藏列表
export function collectList(data) {
  return request.post('cms/wxapp.my/collect_list',data);
}

// 获取用户提问列表
export function myQuestion(data) {
  return request.post('cms/wxapp.my/my_question',data);
}

// 获取用户浏览记录
export function viewsHistory(data) {
  return request.post('cms/wxapp.my/views_history',data);
}

// 用户删除收藏记录
export function collectListDel(data) {
  return request.post('cms/wxapp.my/collect_list_del',data);
}

// 用户删除浏览记录
export function viewsHistoryDel(data) {
  return request.post('cms/wxapp.my/views_history_del',data);
}