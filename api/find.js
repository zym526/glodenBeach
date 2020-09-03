import request from '../util/request.js'

// 发现页数据
export function cmsIndexIndex(data) {
  return request.post('cms/wxapp.index/index',data);
}

// 发现页数据
export function indexSearch(data) {
  return request.post('cms/wxapp.index/search',data);
}

// 搜索历史列表
export function searchHistoryList() {
  return request.post('cms/wxapp.index/search_history_list');
}

// 搜索历史创建
export function searchHistory(data) {
  return request.post('cms/wxapp.index/search_history',data);
}

// 删除历史记录
export function searchListDel(data) {
  return request.post('cms/wxapp.my/search_list_del',data);
}

// 问题检索（发布问题中标题检索）
export function getQuestionSearch(data) {
  return request.post('ask/ajax/question_search',data);
}

// 问答分类数据展示（发布问题中问题类型）
export function indexCategory() {
  return request.post('cms/wxapp.index/category');
}

// 问题专栏列表（发布问题中问题专栏列表）
export function indexQuestionTag() {
  return request.post('cms/wxapp.index/question_tag');
}

// 提问接口
export function postapi(data) {
  return request.post('ask/vote/postapi',data);
}