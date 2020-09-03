import {mapState} from 'vuex'
import images from '../../../util/images.js'
import {indexIndexs} from '../../../api/index.js'
export default {
	data() {
		return {
			allImages:images,//所有图片，背景金沙滩
			live:{},//直播的参数
			fiveList:[]// 0直播,1回放,2视频,3文件,4音频,5广告,列表数据
		}
	},
	computed: {
		...mapState(['statusBarHeight','avatar']),
	},
	methods: {
		// 跳转搜索页面
		toSearch(){
			uni.navigateTo({
				url:'/pages/problem/search/search'
			})
		},
		// 跳转直播页面 
		toLiveBroadcast(id){
			uni.navigateTo({
				url:"/pages/live_broadcast/live_broadcast/live_broadcast?id="+id
			})
		}
	},
	onShow(){
		// 获取首页数据
		indexIndexs().then(res=>{
			this.live=res.data.live//直播的参数
			this.fiveList=res.data.data//列表数据
		})
		console.log(this.avatar)
	},
	onPullDownRefresh() {
		// 获取首页数据
		indexIndexs().then(res=>{
			this.live=res.data.live//直播的参数
			this.fiveList=res.data.data//列表数据
		})
	}
}