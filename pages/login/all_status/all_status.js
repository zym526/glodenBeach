import {mapState} from 'vuex'
import {registerRegister} from '../../../api/login.js'
export default {
	data() {
		return {
			nowStatus:-1,
			teps:0,//当前步骤
			status:{},//展示数据
		}
	},
	computed: {
		...mapState(['statusBarHeight','type']),
	},
	methods: {
		// 切换选择
		changeStatus(index){
			this.nowStatus=index//选择样式修改
			if(this.teps==0){//贷款状态页
				if(this.status.type[this.nowStatus]=='贷前'){
					this.$store.dispatch('changeType',1)
				}else if(this.status.type[this.nowStatus]=='贷中'){
					this.$store.dispatch('changeType',2)
				}else if(this.status.type[this.nowStatus]=='贷后'){
					this.$store.dispatch('changeType',3)
				}
			}else{
				var nowRegister=uni.getStorageSync('register')//获取缓存数据
				nowRegister[this.status.name]=this.status.data[index].id//修改或添加城市
				uni.setStorageSync('register',nowRegister)//存储数据
			}
			// 根据情况修改传参数据（有车无车，有房无房等）
			var nowData={type:this.type,teps:Number(this.teps)+1}
			console.log(this.status.name,this.status)
			if(this.status.name=='ishas_car'){
				nowData.ishas_car=this.status.data[index].id
			}else if(this.status.name=='car_stages'){
				nowData.car_stages=this.status.data[index].id
			}else if(this.status.name=='ishas_house'){
				nowData.ishas_house=this.status.data[index].id
			}else if(this.status.name=='house_stages'){
				nowData.house_stages=this.status.data[index].id
			}
			console.log(nowData)
			registerRegister(nowData).then(res=>{
				if(res.data){
					if(res.data.type=='1'){
						uni.navigateTo({
							url:"/pages/login/address_choose/address_choose?teps="+(Number(res.data.teps)+1)+"&status="+JSON.stringify(res.data)
						})
					}else{
						uni.navigateTo({
							url:"/pages/login/all_status/all_status?teps="+(Number(res.data.teps))+"&status="+JSON.stringify(res.data)
						})
					}
				}else{
					uni.navigateTo({
						url:"/pages/login/sign_in/sign_in?type=0"
					})
				}
			})
		}
	},
	onLoad(options){
		this.teps=options.teps//当前步骤数
		this.status=JSON.parse(options.status)//展示数据
		if(this.teps==0){
			var data=[]
			this.status.type.forEach((item,index)=>{
				data.push({id:index,text:item})
			})
			this.status.data=data
		}
	},
}