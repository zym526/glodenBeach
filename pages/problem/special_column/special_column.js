import {mapState} from 'vuex'
import images from '../../../util/images.js'
import {channelInfo,userChannelCollert,channelTab} from '../../../api/problem.js'
export default {
	data() {
		return {
			background: {backgroundColor: 'rgba(0,0,0,0)',},
			channel_info:{},//首页数据
			channel_count:0,//关注数
			channel_number:0,//浏览数
			tabs:[],//导航
			nowTabIndex:0,//当前tab
			list:[],//列表数据
			page:1,
			channel_collect:true,//是否关注专栏
			status: 'loadmore',//上拉加载更多
			iconType: 'flower',
			loadText: {
				loadmore: '轻轻上拉',
				loading: '努力加载中',
				nomore: '实在没有了'
			}
		}
	},
	computed: {
		...mapState(['statusBarHeight']),
	},
	methods: {
		// 切换tab
		changeTab(index){
			this.nowTabIndex=index//切换tabs
			this.list=[]
			this.page=1
			this.getData()
		}, 
		// 跳转问答
		toQAndA(item){
			if(this.nowTabIndex==1){//问答类直接跳转问答页面
				uni.navigateTo({
					url:"/pages/problem/question_and_answer/question_and_answer?id="+item.id+"&channel_id="+this.channel_info.id
				})
			}else if(this.nowTabIndex==3){//咨询类全部文章或音频
				uni.navigateTo({
					url:"/pages/problem/article_details/article_details?id="+item.id
				})
			}else if(this.nowTabIndex==2){//视频类
				uni.navigateTo({
					url:"/pages/live_broadcast/video_playback/video_playback?id="+item.id
				})
			}else{
				if(item.type==1||item.type==2){
					uni.navigateTo({
						url:"/pages/live_broadcast/video_playback/video_playback?id="+item.id
					})
				}else if(item.type==3||item.type==4){
					uni.navigateTo({
						url:"/pages/problem/article_details/article_details?id="+item.id
					})
				}
			}
		},
		// 关注或取消关注专栏
		ChannelCollect(){
			//channel_collect为true的时候是关注需要传1取消关注否则0关注
			userChannelCollert({type:this.channel_collect?1:0,channel_id:this.channel_info.id}).then(res=>{
				console.log(res)
				this.channel_collect=!this.channel_collect
			})
		},
		// 获取数据
		getData(){
			channelTab({type:this.tabs[this.nowTabIndex],page:this.page,id:this.channel_info.id}).then(res=>{
				res.data.data.forEach(item=>{//数据的时间转换
					item.updatetime=this.$util.format(item.updatetime,3,"/")
				})
				this.list=this.list.concat(res.data.data)
				this.status=res.data.haspage=='false'?'nomore':'loadmore'
			})
		},
		// 上拉加载更多
		onReachBottom(){
			if(this.status=='loadmore'){
				this.page=this.page+1
				this.getData()
			}else{
				this.$util.tips({title:"没有了~"})
			}
		}
	},
	onLoad(options){
		channelInfo({id:options.id}).then(res=>{
			this.channel_info=res.data.channel_info//专栏信息
			this.tabs=res.data.channel_table//导航
			this.channel_count=res.data.channel_count//关注数
			this.channel_number=res.data.channel_number//浏览数
			res.data.channel_archives.forEach(item=>{//数据的时间转换
				item.updatetime=this.$util.format(item.updatetime,3,"/")
			})
			this.list=res.data.channel_archives//列表数据
			this.channel_collect=res.data.channel_collect=="0"?true:false//0关注，1未关注
		})
	},
}