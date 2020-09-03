import {mapState} from 'vuex'
import {collectList,myQuestion,viewsHistory,collectListDel,viewsHistoryDel} from '../../../api/my.js'
export default {
	data() {
		return {
			type:0,//0我的收藏，1我的提问，2浏览记录
			title:"我的收藏",
			titleRight:false,//管理
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
			disabled: false,//是否可以滑动
			// 滑动删除的按钮
			options: [
				{
					text: '删除',
					style: {
						backgroundColor: '#dd524d',
						fontSize:"30rpx",
						color:"#FFFFFF",
						textAlign:"center",
					}
				}
			],
			allCheck:false,//全选或删除
			ids:[],//选择的所有数据
		}
	},
	computed: {
		...mapState(['statusBarHeight']),
		newList(){
			return this.list
		}
	},
	methods: {
		// 点击单个删除
		click(index,key) {
			if(this.type==0){
				collectListDel({ids:this.list[key][index].aid}).then(res=>{
					this.list[key].splice(index, 1);
				})
			}else{
				viewsHistoryDel({ids:this.list[key][index].aid}).then(res=>{
					this.list[key].splice(index, 1);
				})
			}
		},
		// 删除多个数据
		delMore(){
			this.page=1//重置页数
			this.lock="true"//重置请求
			this.list={}//重置数据列表
			this.status="loadmore"//重置加载更多
			if(this.type==0){
				collectListDel({ids:this.ids.join(",")}).then(res=>{this.getList();this.changeRight()})
			}else{
				viewsHistoryDel({ids:this.ids.join(",")}).then(res=>{this.getList();this.changeRight()})
			}
		},
		// 如果打开一个的时候，不需要关闭其他，则无需实现本方法
		open(index,key) {
			// 先将正在被操作的swipeAction标记为打开状态，否则由于props的特性限制，
			// 原本为'false'，再次设置为'false'会无效
			this.list[key][index].show = true;
		},
		// 选中某个时触发
		checkboxChange(e){
			if(e.name=="全选"){
				// 修改所有选项
				for(let key in this.list){
					this.list[key].forEach(item=>{
						item.checked=e.value
					})
				}
				if(e.value){//全选
					this.ids=[]
					for(let key in this.list){
						this.list[key].forEach(item=>{
							this.ids.push(item.aid)
						})
					}
				}else{//取消全选
					this.ids=[]
				}
			}else{
				if(e.value){
					this.ids.push(e.name)//添加数据到数组中
					var lengthList=0
					for(let key in this.list){//获取所有数据长度
						lengthList=lengthList+this.list[key].length
					}
					if(this.ids.length==lengthList){//如果都添加进去则全选
						this.allCheck=true
					}
				}else{
					if(this.ids.indexOf(e.name)!=-1){
						this.ids.splice(this.ids.indexOf(e.name),1)//删除数组中某个数据
					}
					this.allCheck=false//不可能全选
				}
			}
		},
		// 管理或取消
		changeRight(){
			for(var item in this.list){
				this.list[item].forEach(item=>{
					item.show=false
				}) 
			} 
			this.titleRight=!this.titleRight
			// 是否可滑动删除
			this.disabled=this.titleRight
		},
		// 获取数据
		getList(){
			if(this.lock=="true"){
				if(this.type==0){
					// 获取用户收藏列表
					collectList({page:this.page}).then(res=>{
						this.changeList(res.data)
					})
				}else{
					// 获取用户浏览记录
					viewsHistory({page:this.page}).then(res=>{
						this.changeList(res.data)
					})
				}
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
					item.create_time=this.$util.format(item.create_time,3,"/")
					item.show=false
					item.checked=false
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
				url:"/pages/problem/article_details/article_details?id="+item[index].aid
			})
		}
	},
	onLoad(options){
		// 获取类型修改标题
		this.type=options.type
		if(options.type==0){
			this.title="我的收藏"
		}else{
			this.title="浏览记录"
		}
		// 获取用户收藏列表
		this.getList()
	},
	onShow(){

	}
}