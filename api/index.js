import request from '../util/request.js'

// 首页数据
export function indexIndexs() {
  return request.post('cms/wxapp.index/indexs');
}

// 文章数据详情
export function archivesDetail(data) {
  return request.post('cms/wxapp.archives/detail',data);
}

// 文章数据详情
export function myCollect(data) {
  return request.post('cms/wxapp.my/collect',data);
}

// 文章数据详情
export function userChannelCollert(data) {
  return request.post('cms/wxapp.user/channel_collert',data);
}