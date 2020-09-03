import {mapState} from 'vuex'
import {userInfo,editUserinfo,incomeList,housePrice,houseConfig,houseCategory,carPrice,carConfig,carCategory,houseCategoryList,shebaoList} from '../../../api/personal_center.js'
export default {
	data() {
		return {
			headStyle:{//样式
				fontSize:'30rpx',
				color:"#333333",
				fontWeight:"bold",
				borderBottom:"1rpx solid #E1E1E1",
				padding:"30rpx 0rpx",
			},
			carShow:false,//车辆信息展示
			homeShow:false,//房屋信息展示
			slotRight:false,//编辑或保存
			newCarInfo:[],//添加的车辆信息
			newHomeInfo:[],//添加的房屋信息
			newUserInfo:{},//新的用户信息
			onlyCar:{},//单个车辆信息
			onlyHome:{},//单个房屋信息
			timeAddressShow:false,//时间或地址选择器显示
			timeOrAddress:"time",//时间或地址选择器
			selectorShow:false,//单列选择器
			oneListIndex:0,//单列选择器
			selector:[],//单列选择器数据
			nowPage:0,//当前页判断是信息/车辆/房屋
			carHomeTitle:"",//添加标题
			subscript:-1,//修改车辆或房屋信息
		}
	},
	computed: {
		...mapState(['statusBarHeight'])
	},
	methods: {
		// 修改头像
		changeImage(){
			if(this.slotRight){
				var that=this
				uni.chooseImage({
					count:1,
					sizeType: ['compressed'],//压缩图
					sourceType: ['album','camera'], //相机或相册
				    success: function (res) {
						const tempFilePaths = res.tempFilePaths;
						uni.uploadFile({
							url: 'https://mituo.xypvip.cn/addons/cms/wxapp.index/image', //单图上传
							filePath: tempFilePaths[0],
							name: 'file',
							fileType:"image",
							success: (res) => {
								that.newUserInfo.avatar=JSON.parse(res.data).data
							},
						});
				    }
				});
			}
		},
		// 车辆或房屋信息展示
		changeCarHome(index,carHome){
			console.log(index,carHome,this.newCarInfo,this.newHomeInfo)
			if(index==0){
				this.carShow=!this.carShow
			}else{
				this.homeShow=!this.homeShow
			}
		},
		// 切换保存或编辑状态
		editPreservation(){
			this.slotRight=!this.slotRight
			if(!this.slotRight){//当为编辑的时候将原有数据重新赋值
				var data={
					avatar:this.newUserInfo.avatar,//头像
					username:this.newUserInfo.username,//昵称
					gender:this.newUserInfo.gender==0?'女':'男',//性别
					birthday:this.newUserInfo.birthday,//生日
					mobile:this.newUserInfo.mobile,//手机号
					city:this.newUserInfo.city,//居住地
					income:this.newUserInfo.income,//月收入
					ishas_shebao:this.newUserInfo.ishas_shebao,//是否缴纳社保
					shebao:this.newUserInfo.shebao,//社保基数
					carInfo:this.newCarInfo,//车辆列表
					homeInfo:this.newHomeInfo,//房屋列表
				}
				editUserinfo(data).then(res=>{
					var user=uni.getStorageSync("user")
					user.avatar=this.newUserInfo.avatar
					uni.setStorageSync("user",user)
					this.$store.dispatch('changeAvatar',uni.getStorageSync("user").avatar)
				})
			}
		},
		// 显示时间或地址选择器
		changeShow(text){
			if(this.slotRight){
				this.timeOrAddress=text,//时间或地址
				this.timeAddressShow=!this.timeAddressShow//显示弹窗
			}
		},
		// 单列选择器
		changeShow2(index){
			if(this.slotRight){
				this.selector=[]
				this.selectorShow=!this.selectorShow//显示弹窗
				this.oneListIndex=index//单列选择器
				if(index==0){
					this.selector=["男","女"]
				}else if(index==1){//个人收入
					incomeList().then(res=>{res.data.forEach(item=>{this.selector.push(item.text)})})
				}else if(index==2){
					this.selector=["是","否"]
				}else if(index==3){//社保基数
					shebaoList().then(res=>{res.data.forEach(item=>{this.selector.push(item.text)})})
				}else if(index==4){//车辆价格区间列表
					carPrice().then(res=>{res.data.forEach(item=>{this.selector.push(item.text)})})
				}else if(index==5){//车辆分期列表
					carConfig().then(res=>{res.data.forEach(item=>{this.selector.push(item.text)})})
				}else if(index==6){//房屋类型
					houseCategoryList().then(res=>{res.data.forEach(item=>{this.selector.push(item.text)})})
				}else if(index==7){//房屋市值
					housePrice().then(res=>{res.data.forEach(item=>{this.selector.push(item.text)})})
				}else if(index==8){//房屋分期列表
					houseConfig().then(res=>{res.data.forEach(item=>{this.selector.push(item.text)})})
				}else if(index==9){//房屋已还款期数
					houseCategory().then(res=>{res.data.forEach(item=>{this.selector.push(item.text)})})
				}else if(index==10){//车已还款期数
					carCategory().then(res=>{res.data.forEach(item=>{this.selector.push(item.text)})})
				}
			}
		},
		// 添加车辆或房屋信息
		toAdd(index){
			if(this.nowPage==1){
				if(!this.onlyCar.marketValue){this.$util.tips({title:"请选择车辆市值"});return}
				if(!this.onlyCar.periodNumber){
					this.$util.tips({title:"请选择还款期数"});
					return
				}else if(this.onlyCar.periodNumber!="全款"){
					if(!this.onlyCar.periodCategory){this.$util.tips({title:"请选择已还款期数"});return}
				}
				if(!this.onlyCar.licensePlate){this.$util.tips({title:"请输入车牌"});return}
				if(!this.onlyCar.kilometers){this.$util.tips({title:"请输入公里数"});return}
				if(this.subscript==-1){
					this.newCarInfo.push(this.onlyCar)
				}else{
					this.newCarInfo.splice(this.subscript,1,this.onlyCar)
					this.subscript=-1
				}
			}else if(this.nowPage==2){
				if(!this.onlyHome.type){this.$util.tips({title:"请选择房屋类型"});return}
				if(!this.onlyHome.marketValue){this.$util.tips({title:"请选择房屋市值"});return}
				if(!this.onlyHome.periodNumber){
					this.$util.tips({title:"请选择还款期数"});
					return
				}else if(this.onlyHome.periodNumber!="全款"){
					if(!this.onlyHome.periodCategory){this.$util.tips({title:"请选择已还款期数"});return}
				}
				if(this.subscript==-1){
					this.newHomeInfo.push(this.onlyHome)
				}else{
					this.newHomeInfo.splice(this.subscript,1,this.onlyHome)
					this.subscript=-1
				}
			}
			this.nowPage=index
			if(index==1){
				this.onlyCar={}
				this.carHomeTitle="添加车辆信息"
			}else if(index==2){
				this.onlyHome={}
				this.carHomeTitle="添加房屋信息"
			}
		},
		// 生日地址选择 
		addressTime(item){ 
			if(this.timeOrAddress=="time"){
				this.newUserInfo.birthday=item.year+"-"+item.month+"-"+item.day//生日修改
			}else{
				this.newUserInfo.city=item.province.label+item.city.label+item.area.label//地址修改
			}
		},
		// 单列选择器选择
		oneChange(value){ 
			var index=value[0]//相中选项的下标
			if(this.oneListIndex==0){//性别
				this.newUserInfo.gender=this.selector[index]=="男"?"1":"0"
			}else if(this.oneListIndex==1){//月收入
				this.newUserInfo.income=this.selector[index]
			}else if(this.oneListIndex==2){//是否缴纳社保
				this.newUserInfo.ishas_shebao=this.selector[index]
			}else if(this.oneListIndex==3){//社保基数
				this.newUserInfo.shebao=this.selector[index]
			}else if(this.oneListIndex==4){//车辆市值
				this.onlyCar.marketValue=this.selector[index]
			}else if(this.oneListIndex==5){//车辆还款期数
				this.onlyCar.periodNumber=this.selector[index]
			}else if(this.oneListIndex==6){//房屋类型
				this.onlyHome.type=this.selector[index]
			}else if(this.oneListIndex==7){//房屋市值
				this.onlyHome.marketValue=this.selector[index]
			}else if(this.oneListIndex==8){//房屋还款期数
				this.onlyHome.periodNumber=this.selector[index]
			}else if(this.oneListIndex==9){//房屋已还款期数
				this.onlyHome.periodCategory=this.selector[index]
			}else if(this.oneListIndex==10){//车已还款期数
				this.onlyCar.periodCategory=this.selector[index]
			}
		},
		// 跳到车辆编辑等
		toCarHome(index,subscript){
			this.nowPage=index//房屋信息
			this.subscript=subscript//下标
			if(index==1){
				this.carHomeTitle="添加车辆信息"
				this.onlyCar.marketValue=this.newCarInfo[subscript].marketValue
				this.onlyCar.periodNumber=this.newCarInfo[subscript].periodNumber
				this.onlyCar.periodCategory=this.newCarInfo[subscript].periodCategory
				this.onlyCar.licensePlate=this.newCarInfo[subscript].licensePlate
				this.onlyCar.kilometers=this.newCarInfo[subscript].kilometers
			}else if(index==2){
				this.carHomeTitle="添加房屋信息"
				this.onlyHome.type=this.newHomeInfo[subscript].type
				this.onlyHome.marketValue=this.newHomeInfo[subscript].marketValue
				this.onlyHome.periodNumber=this.newHomeInfo[subscript].periodNumber
				this.onlyHome.periodCategory=this.newHomeInfo[subscript].periodCategory
			}
		}
	},
	onLoad(){
		userInfo().then(res=>{
			this.newCarInfo=JSON.parse(JSON.stringify(res.data.car_info))//编辑车辆信息
			this.newHomeInfo=JSON.parse(JSON.stringify(res.data.house_info))//编辑房屋信息
			this.newUserInfo=JSON.parse(JSON.stringify(res.data.user_info))//编辑用户信息
		})
	},
	onShow(){
	}
}