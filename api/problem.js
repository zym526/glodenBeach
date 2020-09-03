import request from '../util/request.js'

// 专栏首页
export function channelInfo(data) {
  return request.post('cms/wxapp.index/channel_info',data);
}

// 用户关注专栏
/**
 * type: 0关注  1取消关注
 * channel_id: 专栏id
 * **/ 
export function userChannelCollert(data) {
  return request.post('cms/wxapp.user/channel_collert',data);
}

// 专栏标签切换
export function channelTab(data) {
  return request.post('cms/wxapp.index/channel_tab',data);
}

// 问题详情页
export function questionDetail(data) {
  return request.post('cms/wxapp.index/question_detail',data);
}

// 答案列表
export function answerList(data) {
  return request.post('cms/wxapp.index/answer_list',data);
}

// 答案有用或没用点赞
export function voteCreates(data) {
  return request.post('ask/vote/creates',data);
}

// 答案有用或没用取消点赞
export function voteDeletes(data) {
  return request.post('ask/vote/deletes',data);
}

// 答案收藏
export function controllerCollect(data) {
  return request.post('ask/collection/collect',data);
}

// 答案取消收藏
export function controllerNoCollect(data) {
  return request.post('ask/collection/not_collect',data);
}

// 问题/顾问 取消关注
export function attentionDeletes(data) {
  return request.post('ask/attention/deletes',data);
}

// 问题/顾问 关注
export function attentionCreates(data) {
  return request.post('ask/attention/creates',data);
}

// 顾问关注
/**
 * type: 0关注  1取消关注
 * work_id: 专栏id
 * **/ 
export function workCollect(data) {
  return request.post('cms/wxapp.user/work_collect',data);
}