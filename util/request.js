import util from './util.js'
import {refushToken} from '../api/login.js'
let URL = "https://mituo.xypvip.cn/addons/"//线上
// let URL = "/addons/"//线上
// let URL = "http://192.168.10.62:108/addons/cms/wxapp."//本地
/**
 * 发送请求
 */
export default function request(api, method, data){
	let HEADER={'content-type': 'application/json'}//请求头
	data={...data,token:uni.getStorageSync('user').token||''}//请求体添加token
	method=method.toUpperCase()//小写转大写
	return new Promise((reslove, reject) => {
		// uni.showLoading({
		// 	title:"请求中..."
		// })
		// 获取当前时间戳
		uni.request({
			url: URL + api,
			method: method || 'GET',
			dataType: 'json',
			header: HEADER,
			data: data || {},
			success: (res) => {
				var newDate=Date.parse(new Date())
				var expiretime=uni.getStorageSync('user').expiretime*1000||newDate
				if(expiretime>=newDate){
					if(res.data.code==1){
						reslove(res.data, res);
					}else{
						if(res.data.msg!="与服务器同步"){
							util.tips({title:res.data.msg})
						}
					}
				}else{
					refushToken({user_id:uni.getStorageSync('user').id}).then(res=>{
						uni.setStorageSync('user',res.data)//存储用户信息
						this.$store.dispatch('changeAvatar',uni.getStorageSync("user").avatar)
						request(api, method, data)
					})
				}
			},
			fail: (msg) => {
				util.tips({title:"请求失败"})
			},
			complete(err) {
				uni.stopPullDownRefresh();
				// uni.hideLoading();
			}
		})
	});
}
['options', 'get', 'post', 'put', 'head', 'delete', 'trace', 'connect'].forEach((method) => {
	request[method] = (api, data) => request(api, method, data)
});