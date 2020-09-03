import {mapState} from 'vuex'
import images from '../../../util/images.js'
import {registerIndex} from '../../../api/login.js'
export default {
	data() {
		return {
			allImage:images,//logo图片路径
		}
	},
	computed: {
		...mapState(['statusBarHeight','status']),
	},
	methods: {
		// 跳转注册页面,贷款状况界面
		toSignIn(e){
			// 获取数据
			registerIndex().then(res=>{
				// 跳转数据数据列表
				uni.navigateTo({
					url:"/pages/login/all_status/all_status?teps=0&status="+JSON.stringify(res.data)
				})
			})
		},
		// 跳转登录页面
		toRingUp(e){
			uni.navigateTo({
				url:"/pages/login/sign_in/sign_in?type=1"
			})
		}
	},
	onLoad(){
		if(!uni.getStorageSync('register')){uni.setStorageSync('register',{})}
	},
}