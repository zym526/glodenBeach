import {mapState} from 'vuex'
import jinEdit from '../../../common/jin-edit/jin-edit.vue';
import {archivesDetail,myCollect,userChannelCollert} from '../../../api/index.js'
import {detailRem} from '../../../api/live_broadcast.js'
export default {
	data() {
		return {
			// 顶部导航栏颜色
			background: {backgroundColor: 'rgba(0,0,0,0)',},
			background1: {backgroundColor: '#FFFFFF',},
			id:"",//文章id
			article:"",//文章数据
			mpUrl:"",//音频地址
			nowAudio:"",//音频实例
			nowDuration:0,//当前音频长度
			nowIsPlay:false,//是否播放音频
			title:"",//文章标题
			tags:[],//标签
			name:"",//一级分类
			updatetime:"",//上传时间 
			views:0,//浏览量
			dislikes:0,//收藏量
			collect:0,//是否被收藏0收藏，1未收藏
			channel_info:"",//专栏数据
			channel_collect:"1",//是否关注专栏0关注，1未关注
			fiveList:[],
		}
	},
	computed: {
		...mapState(['statusBarHeight']),
		overTimer() {
			return this.$util.calcTimer(this.nowDuration)
		},
	},
	components: {
		jinEdit
	},
	methods: {
		// 获取文章信息
		getDetail(res){
			// 文章内容
			this.updatetime=this.$util.format(res.data.archivesInfo.updatetime,1,"/",":")//上传时间
			this.title=res.data.archivesInfo.title//标题
			this.dislikes=res.data.archivesInfo.collect//收藏量
			this.views=res.data.archivesInfo.views//浏览量
			if(res.data.archivesInfo.tags&&res.data.archivesInfo.tags.length!==0){
				res.data.archivesInfo.tags=res.data.archivesInfo.tags.split(",")//文章标签截取
			}else{
				res.data.archivesInfo.tags=[]
			}
			this.collect=res.data.collect//是否收藏
			this.tags=res.data.archivesInfo.tags//文章标签
			this.name=res.data.channelInfo.name//一级分类
			this.article=res.data.archivesInfo.content//文章内容 
			this.mpUrl=res.data.archivesInfo.mp_url//音频
			// 音频播放器，初始化
			this.nowAudio = uni.createInnerAudioContext();
			this.nowAudio.src = this.mpUrl;
			this.channel_collect=res.data.channel_collect//是否关注专栏
			this.channel_info=res.data.channel_info//专栏信息
			// 获得音频长度
			this.nowAudio.onCanplay(res=> {
				this.nowDuration=this.nowAudio.duration
				setTimeout(() => {
					this.nowDuration=this.nowAudio.duration;
				}, 1000)
				console.log(this.nowDuration)
			})
		},
		// 播放音频
		audioPlay(){
			if(!this.nowIsPlay){
				this.nowIsPlay=true
				this.nowAudio.onTimeUpdate(res=>{//倒计时
					this.nowDuration=this.nowAudio.duration-this.nowAudio.currentTime
				})
				this.nowAudio.play()//开始播放
				this.nowAudio.onEnded(res=>{
					this.nowIsPlay=false
				})
			}else{
				this.nowAudio.pause()
				this.nowIsPlay=false
			}
		},
		// 关注或取消关注专栏0关注，1取消关注
		changeFollow(){
			userChannelCollert({channel_id:this.channel_info.id,type:this.channel_collect=='1'?'0':'1'}).then(res=>{
				this.channel_collect=this.channel_collect=='1'?'0':'1',
				console.log(this.channel_collect)
			})
		},
		// 收藏或取消收藏文章
		getCollect(){
			//collect为0则为收藏点击收藏，1为已收藏点击取消收藏
			myCollect({aid:this.id,type:this.collect==0?1:0}).then(res=>{
				archivesDetail({id:this.id}).then(res=>{
					this.getDetail(res)
				})
			})
		},
		// 跳转专栏
		toSpecialColumn(){
			uni.navigateTo({
				url:"/pages/problem/special_column/special_column?id="+this.channel_info.id
			})
		}
	},
	onLoad(options){
		// 获取文章详情
		this.id=options.id
		archivesDetail({id:options.id}).then(res=>{
			this.getDetail(res)
		})
		// 获取相关推荐
		detailRem({id:this.id}).then(res=>{
			this.fiveList=res.data
		})
	},
	onHide(){
		this.nowAudio.destroy()//销毁
	},
	onUnload(){
		this.nowAudio.destroy()//销毁
	}
}