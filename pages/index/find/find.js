import {mapState} from 'vuex'
import {cmsIndexIndex,indexSearch} from '../../../api/find.js'
export default {
	data() {
		return {
			searchValue:"",//搜索内容
			tabs:[],//tabs选项
			nowTabIndex:0,//当前选中的tab
			fiveList:[],
			isShow:false,//显示选项卡还是列表
			page:1,//页数
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
		// 切换分类
		changeTab(index){
			this.nowTabIndex=index
			this.page=1
			this.fiveList=[]
			this.status='loadmore'
			cmsIndexIndex({page:this.page,channel_id:this.nowTabIndex}).then(res=>{
				this.fiveList=this.fiveList.concat(res.data.data)//数据显示
				this.status=res.data.haspage=='false'?'nomore':'loadmore'//判断后面是否还有数据
			})
		},
		// 跳转提问页面
		toPutQuestions(){
			uni.navigateTo({
				url:"/pages/problem/put_questions/put_questions"
			})
		},
		// 发起搜索
		getSearch(){
			if(this.searchValue==""){
				this.isShow=false
				this.getIndexInfo()
			}else{
				this.page=1
				this.fiveList=[]
				this.status='loadmore'
				indexSearch({search:this.searchValue,page:this.page}).then(res=>{
					this.isShow=true
					this.fiveList=this.fiveList.concat(res.data.data)
					this.status=res.data.haspage=='false'?'nomore':'loadmore'//判断后面是否还有数据
				})
			}
		},
		// 上拉加载更多
		onReachBottom() {
			if(this.status=='loadmore'){
				this.page=this.page+1
				if(this.isShow){
					indexSearch({search:this.searchValue,page:this.page}).then(res=>{
						this.isShow=true
						this.fiveList=this.fiveList.concat(res.data.data)
						this.status=res.data.haspage=='false'?'nomore':'loadmore'//判断后面是否还有数据
					})
				}else{
					cmsIndexIndex({page:this.page,channel_id:this.nowTabIndex}).then(res=>{
						this.fiveList=this.fiveList.concat(res.data.data)//数据显示
						this.status=res.data.haspage=='false'?'nomore':'loadmore'//判断后面是否还有数据
					})
				}
			}else{
				this.$util.tips({title:"没有了~"})
			}
		},
		// 刚进来获取数据
		getIndexInfo(){
			this.page=1
			this.fiveList=[]
			this.status='loadmore'
			cmsIndexIndex({page:this.page,channel_id:""}).then(res=>{
				this.tabs=res.data.tabList//tab选项
				this.nowTabIndex=res.data.tabList[0].id//第一个选项的id
				this.fiveList=res.data.data//数据显示
				this.status=res.data.haspage=='false'?'nomore':'loadmore'//判断后面是否还有数据
			})
		}
	},
	onShow(){
		this.searchValue=""//清空搜索内容
		// 获取首页数据
		this.getIndexInfo()
	},
	onLoad(){

	},
}