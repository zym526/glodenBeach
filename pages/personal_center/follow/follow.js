import {mapState} from 'vuex'
import {userCollect} from '../../../api/personal_center.js'
import {userChannelCollert,attentionDeletes,workCollect} from '../../../api/problem.js'
export default {
	data() {
		return {
			tabs: [{name:'专栏'},{name:'问题'},{name:'顾问'}],
			current: 0, // tabs组件的current值，表示当前活动的tab选项
			swiperCurrent: 0, // swiper组件的current值，表示当前那个swiper-item是活动的
			page:1,//分页
			specialColumn:[],//专栏
			qAndA:[],//问题
			adviser:[],//顾问
			show:false,//模态框
			haspage:true,//是否还有下一页请求
			indexChange:0,//当前选中的下标
			isNoData:false,//是否有数据
		}
	},
	computed: {
		...mapState(['statusBarHeight']),
	},
	methods: {
		// tabs通知swiper切换
		tabsChange(index) {
			this.swiperCurrent = index;
		},
		// swiper-item左右移动，通知tabs的滑块跟随移动
		// transition(e) {
		// 	let dx = e.detail.dx;
		// 	this.$refs.uTabs.setDx(dx);
		// 	console.log("swiper启动")
		// },
		// 由于swiper的内部机制问题，快速切换swiper不会触发dx的连续变化，需要在结束时重置状态
		// swiper滑动结束，分别设置tabs和swiper的状态
		animationfinish(e) {
			let current = e.detail.current;
			this.$refs.uTabs.setFinishCurrent(current);
			this.swiperCurrent = current;
			this.current = current;
			// 切换请求的时候数据清空
			this.page=1
			this.specialColumn=[]
			this.qAndA=[]
			this.adviser=[]
			this.getData()
		},
		// scroll-view到底部加载更多
		onreachBottom() {
			if(this.haspage){
				this.page=this.page+1
				this.getData()
			}else{
				this.$util.tips({title:"没有了~"})
			}
		},
		// 取消关注
		lookModal(index){
			this.indexChange=index
			this.show=!this.show
		},
		confirm(){
			if(this.current==0){
				userChannelCollert({type:1,channel_id:this.specialColumn[this.indexChange].id}).then(res=>{
					this.$util.tips({title:"取消成功"})
					this.specialColumn.splice(this.indexChange,1)
				})
			}else if(this.current==1){
				attentionDeletes({type:"question",id:this.qAndA[this.indexChange].id}).then(res=>{
					this.$util.tips({title:"取消成功"})
					this.qAndA.splice(this.indexChange,1)
				})
			}else{
				workCollect({type:1,work_id:this.adviser[this.indexChange].id}).then(res=>{
					this.$util.tips({title:"取消成功"})
					this.adviser.splice(this.indexChange,1)
				})
			}
		},
		// 获取关注列表
		getData(){
			userCollect({type:this.current,page:this.page}).then(res=>{
				if(this.current==0){
					this.specialColumn=this.specialColumn.concat(res.data.data)
				}else if(this.current==1){
					this.qAndA=this.qAndA.concat(res.data.data)
				}else{
					this.adviser=this.adviser.concat(res.data.data)
				}
				this.haspage=res.data.haspage=="true"?true:false//是否还有下一页请求
				if(this.page==1&&res.data.data.length==0){this.isNoData=true}else{this.isNoData=false}
			})
		},
		// 去详情页
		toDetail(inIndex){
			if(this.current==0){
				uni.navigateTo({
					url:"/pages/problem/special_column/special_column?id="+this.specialColumn[this.indexChange].id
				})
			}else if(this.current==1){
				uni.navigateTo({
					url:"/pages/problem/question_and_answer/question_and_answer?id="+this.qAndA[this.indexChange].id+"&channel_id="+this.qAndA[this.indexChange].category_id
				})
			}else{
				uni.navigateTo({
					url:"/pages/live_broadcast/adviser_home/adviser_home?id="+this.adviser[this.indexChange].id
				})
			}
		}
	},
	onLoad(){
		this.getData()
	},
	onShow(){

	}
}