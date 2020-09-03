import {mapState} from 'vuex'
import {collectList,myQuestion,viewsHistory,collectListDel,viewsHistoryDel} from '../../../api/my.js'
export default {
	data() {
		return {
			page:1,//请求页数
			lock:"true",//是否可以请求
			list: {},//列表数据
			status: 'loadmore',//加载更多
			iconType: 'flower',
			loadText: {
				loadmore: '轻轻上拉',
				loading: '努力加载中',
				nomore: '实在没有了'
			},
		}
	},
	computed: {
		...mapState(['statusBarHeight']),
		newList(){
			return this.list
		}
	},
	methods: {
		// 获取数据
		getList(){
			if(this.lock=="true"){
				// 获取用户提问列表
				myQuestion({page:this.page}).then(res=>{
					this.changeList(res.data)
				})
			}else{ 
				this.$util.tips({title:"暂无更多数据"})
			}
		},
		// 处理数据并赋值
		changeList(data){
			this.lock=data.pagenext//后方是否还有数据
			this.status=this.lock=='false'?'nomore':'loadmore'//判断后面是否还有数据
			delete data.pagenext
			for(let key in data){
				data[key].forEach(item=>{
					if(item.image.indexOf(",")==-1){
						item.image=item.image
					}else{
						item.image=item.image.split(",")[0]
					}
					
					item.updatetime=this.$util.format(item.updatetime,3,"/")
				})
			}
			// this.list=data//收藏的数据列表
			for(let key in data){
				if(this.list.hasOwnProperty(key)==true){
					this.list[key]=this.list[key].concat(data[key])
				}else{
					this.list={...this.list,[key]:data[key]}
				}
			}
		},
		// 上拉加载更多
		onReachBottom() {
			this.page=this.page+1
			this.getList()
		},
		toDetail(item,index){
			uni.navigateTo({
				url:"/pages/problem/question_and_answer/question_and_answer?id="+item[index].id+"&channel_id="+item[index].category_id
			})
		}
	},
	onLoad(options){ 
		// 获取用户收藏列表
		this.getList()
	},
	onShow(){

	}
}