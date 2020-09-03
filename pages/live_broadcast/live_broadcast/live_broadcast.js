import {mapState} from 'vuex'
import {liveDetail,liveContent,liveChat,detailRem,workCollect} from '../../../api/live_broadcast.js'
export default {
	data() {
		return {
			videoId:0,//当前直播id
			live_info:{},//房间号等信息
			live_user:{},//用户信息
			collect:false,//是否关注
			tabs:["互动","简介"],//tabs
			nowTabIndex:0,//当前选项
			you_speech:"",//输入框内容
			scrollTop:300,//评论位置
			allSpeech:[],//弹幕列表
			time:"",//轮询弹幕
			fiveList:[],//相关推荐
		}
	},
	computed: {
		...mapState(['statusBarHeight']),
		nowScrollTop(){
			return this.scrollTop
		}
	},
	methods: {
		// 关注/取消关注
		changeFollow(){
			workCollect({type:this.collect?'1':'0',work_id:this.live_user.id}).then(res=>{
				this.collect=!this.collect
			})
		},
		// 前往顾问主页
		toAdviserHome(){
			uni.navigateTo({
				url:"/pages/live_broadcast/adviser_home/adviser_home?type=0&id="+this.live_user.id+"&videoId="+this.videoId
			})
		},
		// 修改tab选项
		changeTab(index){
			this.nowTabIndex=index
		},
		// 发送评论
		sendText(){
			// 判断评论不能为空
			if(this.you_speech==""){this.$util.tips({title:"评论不能为空"});return}
			liveContent({live_id:this.videoId,content:this.you_speech}).then(res=>{
				this.you_speech=""
			})
		},
		// 返回上一页
		goBack(){
			uni.navigateBack({
			    delta: 1
			});
		},
		// 获取弹幕列表
		getLiveCat(){
			liveChat({live_id:this.videoId}).then(res=>{
				this.allSpeech=res.data
				// 底部位置
				this.$nextTick(function() {
					this.scrollTop = this.allSpeech.length*66
				});
			})
		}
	},
	onLoad(options){
		this.videoId=options.id
	},
	onShow(){
		// 获取房间信息
		liveDetail({id:this.videoId}).then(res=>{
			this.live_info=res.data.live_info//房间信息等
			this.live_user=res.data.live_user//用户信息等
			this.collect=res.data.collect=="false"?false:true//顾问是否被关注
		})
		this.getLiveCat()
		// 获取弹幕列表
		this.time=setInterval(()=>{
			this.getLiveCat()
		},5000)
		// 获取相关推荐
		detailRem({id:this.videoId}).then(res=>{
			this.fiveList=res.data
		})
	},
	onHide(){
		clearInterval(this.time)//清除轮询
	},
	onUnload(){
		clearInterval(this.time)//清除轮询
	}
}