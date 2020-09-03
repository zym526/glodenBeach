import {mapState} from 'vuex'
import {indexSearch,searchHistoryList,searchHistory,searchListDel} from "../../../api/find.js"
export default {
	data() {
		return {
			searchValue:"",// 搜索内容
			page:1,//搜索页数
			channel:[],//检索出来的专栏
			retrieval:[],//检索出来的内容
			history:[],//历史记录
			isShow:true,//是否显示历史记录
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
		// 跳转专栏页面
		toSpecialColumn(item){
			uni.navigateTo({
				url:"/pages/problem/special_column/special_column?id="+item.id
			})
		},
		// 搜索数据indexSearc
		getSearch(){
			if(this.searchValue==""){
				this.isShow=true
			}else{
				this.isShow=false//不显示历史记录
				this.page=1//页码重置
				this.channel=[]//专栏重置
				this.retrieval=[]//内容重置
				this.status='loadmore'//获取重置
				indexSearch({search:this.searchValue,page:this.page}).then(res=>{
					this.channel=this.channel.concat(res.data.channel)//专栏
					this.retrieval=this.retrieval.concat(res.data.data)//数据
					this.status=res.data.haspage=='false'?'nomore':'loadmore'//判断后面是否还有数据
				})
			}
		},
		// 点击跳转详情页
		toDetail(item){
			// 跳转到内页，根据type判断，0直播，1回放，2视频，3文件，4音频，5广告
			if(item.type==1||item.type==2){
				uni.navigateTo({
					url:"/pages/live_broadcast/video_playback/video_playback"
				})
				// 添加到历史记录
				searchHistory({type:2,id:item.id}).then(res=>{console.log(res)})
			}else if(item.type==3||item.type==4){
				uni.navigateTo({
					url:"/pages/problem/article_details/article_details?id="+item.id
				})
				// 添加到历史记录
				searchHistory({type:1,id:item.id}).then(res=>{console.log(res)})
			}
		},
		// 下拉获取更多
		onReachBottom() {
			if(this.status=='loadmore'){
				this.page=this.page+1
				indexSearch({search:this.searchValue,page:this.page}).then(res=>{
					this.channel=this.channel.concat(res.data.channel)//专栏
					this.retrieval=this.retrieval.concat(res.data.data)//数据
					this.status=res.data.haspage=='false'?'nomore':'loadmore'//判断后面是否还有数据
				})
			}else{
				this.$util.tips({title:"没有了~"})
			}
		},
		// 获取历史记录
		getHistoryList(){
			searchHistoryList().then(res=>{
				if(res.data!=null){
					this.history=res.data
				}else{
					this.history=[]
				}
			})
		},
		// 删除历史记录
		delInfo(item,type){
			searchListDel({ids:item.id,type:type}).then(res=>{
				this.getHistoryList()
			})
		}
	},
	onLoad(options){
		// 搜索历史列表
		this.getHistoryList()
	},
}