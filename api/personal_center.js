import request from '../util/request.js'

// 获取用户注册信息
export function userInfo() {
  return request.post('cms/wxapp.my/user_info');
}

// 编辑用户信息
export function editUserinfo(data) {
  return request.post('cms/wxapp.my/edit_userinfo',data);
}

// 个人收入列表
export function incomeList() {
  return request.post('cms/wxapp.my/income_list');
}

// 房屋价格区间列表
export function housePrice() {
  return request.post('cms/wxapp.my/house_price');
}

// 房屋分期列表
export function houseConfig() {
  return request.post('cms/wxapp.my/house_config');
}

// 房屋已还期数列表
export function houseCategory() {
  return request.post('cms/wxapp.my/house_category');
}

// 汽车价格区间列表
export function carPrice() {
  return request.post('cms/wxapp.my/car_price');
}

// 车辆分期列表
export function carConfig() {
  return request.post('cms/wxapp.my/car_config');
}

// 车已还期数列表
export function carCategory() {
  return request.post('cms/wxapp.my/car_category');
}

// 房屋类型列表
export function houseCategoryList() {
  return request.post('cms/wxapp.my/house_category_list');
}

// 社保基数列表
export function shebaoList() {
  return request.post('cms/wxapp.my/shebao_list');
}

// 关注中心列表
export function userCollect(data) {
  return request.post('cms/wxapp.my/user_collect',data);
}