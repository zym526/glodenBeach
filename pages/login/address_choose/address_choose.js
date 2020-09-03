import {mapState} from 'vuex'
import cityData from '../../../util/citys.js'//获取省份地址
import {registerRegister} from '../../../api/login.js'
export default {
	data() {
		return {
			show:true,
			provinces:[],//省
			citys:[],//市
			areas:[],//区
			province:"",
			city:"",
			area:"",
			value: [0, 0, 0],
			values: [0, 0, 0],
			teps:0,//当前步骤条
			status:{},//展示数据
		}
	},
	computed: {
		...mapState(['statusBarHeight','type']),
	},
	methods: {
		//滚动选择
		bindChange: function (e) {
			// const val = e.detail.value
			console.log(e)
			var val = e.detail.value//当前选中的下标
			var t = this.values;//旧选中下标
			    
			if(val[0] != t[0]){//如果选择的省份变了
				this.citys=[]//清空市区
				this.areas=[]
				cityData[val[0]].sub.forEach(item=>{
					this.citys.push(item.name)
				})
				cityData[val[0]].sub[0].sub.forEach(item=>{
					this.areas.push(item.name)
				})
				this.province=this.provinces[val[0]],
				this.city=cityData[val[0]].sub[0].name,
				this.area=cityData[val[0]].sub[0].sub[0].name,
				this.values=val,
				this.value=[val[0],0,0]
			    return;
			}
			if(val[1] != t[1]){//如果选择的市变了
			    this.areas = [];//清空区
				cityData[val[0]].sub[val[1]].sub.forEach(item=>{
					this.areas.push(item.name)
				})
				this.city=this.citys[val[1]]
				this.area=cityData[val[0]].sub[val[1]].sub[0].name
			    this.values=val,
				this.value=[val[0],val[1],0]
			    return;
			}
			if(val[2] != t[2]){
				this.area=this.areas[val[2]]
				this.values=val
			    return;
			}
		},
		// 跳转到工作选择
		toWork(){
			var nowRegister=uni.getStorageSync('register')//获取缓存数据
			nowRegister[this.status.name]=this.province+this.city+this.area//修改或添加城市
			uni.setStorageSync('register',nowRegister)//存储数据
			registerRegister({type:this.type,teps:Number(this.status.teps)+1}).then(res=>{
				uni.navigateTo({
					url:"/pages/login/all_status/all_status?teps="+(Number(this.status.teps)+1)+"&status="+JSON.stringify(res.data)
				})
			})
		}
	},
	onLoad(options){
		this.teps=options.teps//当前步骤数
		this.status=JSON.parse(options.status)//展示数据
		cityData.forEach(item=>{
			this.provinces.push(item.name)//第一列省份所有名称
		})
		cityData[0].sub.forEach(item=>{
			this.citys.push(item.name)//第一个省的市所有名称
		})
		cityData[0].sub[0].sub.forEach(item=>{
			this.areas.push(item.name)//第一个省份的第一个市的所有区
		})
		this.province=cityData[0].name//省
		this.city=cityData[0].sub[0].name//市
		this.area=cityData[0].sub[0].sub[0].name//区
	},
}