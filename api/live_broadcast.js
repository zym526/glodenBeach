import request from '../util/request.js'

// 直播页详情
export function liveDetail(data) {
  return request.post('cms/wxapp.index/live_detail',data);
}

// 直播间互动
export function liveContent(data) {
  return request.post('cms/wxapp.index/live_content',data);
}

// 直播间弹幕列表
export function liveChat(data) {
  return request.post('cms/wxapp.index/live_chat',data);
}

// 详情页推荐
export function detailRem(data) {
  return request.post('cms/wxapp.index/detail_rem',data);
}

// 顾问关注
/**
 * type: 0关注  1取消关注
 * work_id: 专栏id
 * **/ 
export function workCollect(data) {
  return request.post('cms/wxapp.user/work_collect',data);
}

// 顾问信息
/**
 * work_id: 顾问id
 * **/ 
export function indexInfo(data) {
  return request.post('cms/wxapp.index/info',data);
}

// 顾问推荐
/**
 * work_id: 顾问id
 * page: 分页
 * **/ 
export function videoRecom(data) {
  return request.post('cms/wxapp.index/video_recom',data);
}

// 顾问动态
/**
 * work_id: 顾问id
 * page: 分页
 * **/ 
export function workDynamic(data) {
  return request.post('cms/wxapp.index/work_dynamic',data);
}

// 视频页详情
export function videoDetail(data) {
  return request.post('cms/wxapp.index/video_detail',data);
}