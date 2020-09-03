import {mapState} from 'vuex'
import images from '../../../util/images.js'
import {indexInfo,videoRecom,workCollect,workDynamic} from '../../../api/live_broadcast.js'
export default {
	data() {
		return {
			videoId:0,//直播id
			allImages:images,//顶部背景图
			background: {backgroundColor: 'rgba(0,0,0,0)',},//顶部导航背景色
			adviserId:0,//顾问id
			isPlay:false,//是否直播
			adviserInfo:{},
			collect:false,//是否关注
			tabs:["推荐","动态"],//推荐动态评价
			nowTabsIndex:0,//当前选择tab 
			page:1,//分页
			fiveList:[],//推荐数据
			x:3000,
			y:3000,
			old:{
				x:0,
				y:0
			},
			status: 'loadmore',//上拉加载更多
			iconType: 'flower',
			loadText: {
				loadmore: '轻轻上拉',
				loading: '努力加载中',
				nomore: '实在没有了'
			},
			// 2视频，3文件，4音频，6回答
			allDynamic:[],
			// commentAll:[
			// 	{
			// 		userImage:"../../../static/images/other.jpg",
			// 		name:"某个人",
			// 		time:"08-20",
			// 		commentText:"最新的评论，这是一条评论，评论内容未知"
			// 	},{
			// 		userImage:"../../../static/images/other.jpg",
			// 		name:"仙仙",
			// 		time:"08-12",
			// 		commentText:"更早之前的一条评论"
			// 	},{
			// 		userImage:"../../../static/images/other.jpg",
			// 		name:"某个人",
			// 		time:"07-07",
			// 		commentText:"最早的一条评论最早的一条评论最早的一条评论最早的一条评论最早的一条评论最早的一条评论最早的一条评论"
			// 	},
			// ]
		}
	},
	computed: {
		...mapState(['statusBarHeight']),
	},
	methods: {
		// 关注/取消关注
		changeFollow(){
			workCollect({type:this.collect?'1':'0',work_id:this.adviserId}).then(res=>{
				this.collect=!this.collect
			})
		},
		// 切换tab
		changeTab(index){
			this.nowTabsIndex=index
			this.page=1
			this.fiveList=[]
			this.allDynamic=[]
			this.status="loadmore"
			if(index==0){
				this.getList()
			}else{
				this.getListTwo()
			}
		},
		// 直播拖动位置改变
		onChange: function(e) {
			this.moveLock=true
			this.old.x = e.detail.x
			this.old.y = e.detail.y
		},
		// 关闭直播
		closePlay(){
			this.isPlay=false
		},
		// 返回直播页面
		toBack(){
			uni.navigateTo({
				url:"/pages/live_broadcast/live_broadcast/live_broadcast?id="+this.videoId
			})
		},
		// 获取顾问推荐
		getList(){
			videoRecom({work_id:this.adviserId,page:this.page}).then(res=>{
				this.fiveList=this.fiveList.concat(res.data.data)
				this.status=res.data.haspage=="false"?'nomore':'loadmore'
			})
		},
		// 获取顾问动态
		getListTwo(){
			workDynamic({work_id:this.adviserId,page:this.page}).then(res=>{
				res.data.data.forEach(item=>{
					item.updatetime=this.$util.format(item.updatetime,3,"-")
				})
				this.allDynamic=this.allDynamic.concat(res.data.data)
				this.status=res.data.haspage=="false"?'nomore':'loadmore'
			})
		},
		// 上拉加载更多
		onReachBottom() {
			if(this.status=='loadmore'){
				this.page=this.page+1
				if(this.nowTabsIndex==0){
					this.getList()
				}else{
					this.getListTwo()
				}
			}else{
				this.$util.tips({title:"没有了~"})
			}
		},
		// 跳转页面
		toDetail(item){
			// 6问答跳转到问答页面
			if(item.type=="6"){
				return
				// uni.navigateTo({
				// 	url:"/pages/problem/question_and_answer/question_and_answer?id="+item.id+"&channel_id="+item.category_id
				// })
			// 3/4文件或音频跳转到文章详情页面
			}else if(item.type=="3"||item.type=="4"){
				uni.navigateTo({
					url:"/pages/problem/article_details/article_details?id="+item.id
				})
			//1/2视频或直播回放跳转到视频详情页
			}else if(item.type=="1"||item.type=="2"){
				uni.navigateTo({
					url:"/pages/live_broadcast/video_playback/video_playback?id="+item.id
				})
			}
		}
	},
	onLoad(options){
		//是否从直播过来，0是
		if(options.type==0){
			this.isPlay=true
			this.videoId=options.videoId
		}
		this.adviserId=options.id//获取顾问id
		// 获取顾问信息
		indexInfo({work_id:this.adviserId}).then(res=>{
			res.data.data.work_tag=res.data.data.work_tag.split(",")//标签切割
			this.collect=res.data.collect=="true"?true:false//是否关注
			this.adviserInfo=res.data.data
		})
		this.getList()//获取推荐信息
	},
	onShow(){
	}
}