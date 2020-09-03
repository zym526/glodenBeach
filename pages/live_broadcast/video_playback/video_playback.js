import {mapState} from 'vuex'
import images from '../../../util/images.js'
import {videoDetail,detailRem,workCollect} from '../../../api/live_broadcast.js'
export default {
	data() {
		return {
			videoId:0,//当前视频id
			userInfo:{},
			allImages:images,//顶部背景图
			collect_work:false,//是否关注
			fiveList:[],
		}
	},
	computed: {
		...mapState(['statusBarHeight']),
	},
	methods: {
		// 关注/取消关注
		changeFollow(){
			workCollect({type:this.collect_work?'1':'0',work_id:this.userInfo.id}).then(res=>{
				this.collect_work=!this.collect_work
			})
		},
		// 返回上一步
		goBack(){
			uni.navigateBack({
			    delta: 1
			});
		},
		// 前往顾问主页
		toAdviserHome(){
			uni.navigateTo({
				url:"/pages/live_broadcast/adviser_home/adviser_home?id="+this.userInfo.id
			})
		},
	},
	onLoad(options){
		this.videoId=options.id
		videoDetail({id:this.videoId}).then(res=>{
			res.data.creat_time=this.$util.format(res.data.creat_time,2,"/")
			res.data.work_tag=res.data.work_tag.split(",")//tag
			this.collect_work=res.data.collect_work=="true"?true:false//是否关注
			console.log(res.data)
			this.userInfo=res.data
		})
		// 获取相关推荐
		detailRem({id:this.videoId}).then(res=>{
			this.fiveList=res.data
		})
	},
}