import {mapState} from 'vuex'
export default {
	data() {
		return {
		}
	},
	computed: {
		...mapState(['statusBarHeight']),
	},
	components: {

	},
	methods: {
		// 发布成功，跳转发现页面
		toFind(){
			uni.switchTab({
				url:"/pages/index/find/find"
			})
		}
	},
	onLoad(options){
	},
}