import request from '../util/request.js'

// 点击用户注册之后调用该接口
export function registerIndex() {
  return request.post('cms/wxapp.register/index');
}

// 注册步骤
export function registerRegister(data) {
  return request.post('cms/wxapp.register/register',data);
}

// 会员注册
export function userRegister(data) {
  return request.post('cms/wxapp.user/register',data);
}

// 获取验证码
export function getcode(data) {
  return request.post('cms/wxapp.user/getcode',data);
}

// 手机号登录
export function smsLogin(data) {
  return request.post('cms/wxapp.user/sms_login',data);
}

// 修改登录密码
export function changepassword(data) {
  return request.post('cms/wxapp.user/changepassword',data);
}

// 账号密码登录
export function loginh5(data) {
  return request.post('cms/wxapp.user/loginh5',data);
}

// 获取用户注册协议
export function userAgreement() {
  return request.post('cms/wxapp.register/user_agreement');
}

// 获取隐私政策
export function userPrivacy() {
  return request.post('cms/wxapp.register/user_privacy');
}

// 刷新token
export function refushToken(data) {
  return request.post('cms/wxapp.user/refush_token',data);
}

// 检测版本号
export function checkVersion(data) {
  return request.post('cms/wxapp.my/check_version',data);
}