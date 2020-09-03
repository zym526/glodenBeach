import {mapState} from 'vuex'
import images from '../../../util/images.js'
import {userRegister,getcode,smsLogin,changepassword,loginh5} from '../../../api/login.js'
export default {
	data() {
		return {
			allImage:images,
			// form表单
			form:{
				phone:"",
				password:"",
				determine_password:"",
				code:""
			},
			isRadio:true,//是否同意
			passwordPla:"",//输入框的默认文字
			type:0,
			btn:"",//按钮文字
			code:"获取验证码",//验证码
			passwordAndCod:"手机号快捷登录",
			isLockCode:true,//是否可以获取验证码
			countdown:60,//验证码倒计时
			nowPage:-1,//当前为注册？忘记密码？验证码登录页面
		}
	},
	computed: {
		...mapState(['statusBarHeight']),
	},
	methods: {
		// 提交
		formSubmit: function(e) {
			if(!this.$util.regular('phone',this.form.phone)){this.$util.tips({title:'请输入正确的手机号'});return}//判断手机号
			if(this.type!=2){if(this.form.password==""){this.$util.tips({title:"请输入密码"});return}}//判断是否输入密码
			if(this.type==3){if(this.form.determine_password!=this.form.password){this.$util.tips({title:'密码不一致'});return}}//验证是否密码两次输入相同
			if(this.type!=1){if(this.form.code==""){this.$util.tips({title:"请输入验证码"});return}}//判断是否输入密码
			if(!this.isRadio){this.$util.tips({title:"请先同意协议"});return}
			var nowData=e.detail.value//form表单数据
			if(this.type==0){//注册页面
				userRegister(Object.assign(nowData,uni.getStorageSync('register'))).then(res=>{
					uni.setStorageSync('user',res.data)//存储用户信息
					this.$store.dispatch('changeAvatar',uni.getStorageSync("user").avatar)
					this.$util.tips({title:res.msg},{tab:1,url:'/pages/index/index/index'})
				})
			}else if(this.type==2){//手机验证码登录
				smsLogin(nowData).then(res=>{
					uni.setStorageSync('user',res.data)//存储用户信息
					this.$store.dispatch('changeAvatar',uni.getStorageSync("user").avatar)
					this.$util.tips({title:res.msg},{tab:1,url:'/pages/index/index/index'})
				})
			}else if(this.type==3){//修改密码 
				changepassword(nowData).then(res=>{
					uni.setStorageSync('user',res.data)//存储用户信息
					this.$store.dispatch('changeAvatar',uni.getStorageSync("user").avatar)
					this.$util.tips({title:res.msg},{tab:1,url:'/pages/index/index/index'})
				})
			}else if(this.type==1){
				loginh5(nowData).then(res=>{
					uni.setStorageSync('user',res.data)//存储用户信息
					this.$store.dispatch('changeAvatar',uni.getStorageSync("user").avatar)
					this.$util.tips({title:res.msg},{tab:1,url:'/pages/index/index/index'})
				})
			}
		},
		// 获取验证码
		getCode(){
			if(this.isLockCode){
				this.isLockCode=false//不能请求了
				if(!this.$util.regular('phone',this.form.phone)){
					this.$util.tips({title:'请输入正确的手机号'})
					this.isLockCode=true
					return
				}
				getcode({mobile:this.form.phone,type:this.nowPage}).then(res=>{
					console.log(res)
				})
				this.settime()
			}else{
				this.$util.tips({title:"请稍后~"})
			}
		},
		// 验证码倒计时
		settime() {
			var this_=this
			var time=setInterval(function(){
				this_.countdown=this_.countdown-1
				this_.code=this_.countdown+'s'
				if(this_.countdown==0){
					this_.isLockCode=true
					this_.code="获取验证码"
					this_.countdown=60
					clearInterval(time)
				}
			},1000)
		},
		// 阅读同意书
		changeRadio(){
			this.isRadio=!this.isRadio
		},
		// 跳转页面
		goForget(index){
			if(this.type==2){//手机号快捷登录跳转密码登录
				uni.navigateTo({
					url:"/pages/login/sign_in/sign_in?type=1"
				})
			}else{//跳转忘记密码或手机号快捷登录
				uni.navigateTo({
					url:"/pages/login/sign_in/sign_in?type="+index
				})
			}
		},
		// 跳转到协议页面
		toAgreement(type){
			uni.navigateTo({
				url:"/pages/login/agreement/agreement?type="+type
			})
		}
	},
	onLoad(options){
		this.type=options.type
		//0注册页面，1登录页面
		if(options.type==0){//显示注册页面
			this.passwordPla="请设置登录密码"
			this.btn="完成"
			this.nowPage=1
		}else if(options.type==1){//登录
			this.passwordPla="请输入登录密码"
			this.btn="登录"
		}else if(options.type==2){//手机号快捷登录
			this.passwordPla=""
			this.btn="登录"
			this.passwordAndCod="使用密码登录"
			this.nowPage=0
		}else{//忘记密码
			this.passwordPla="请输入新的密码"
			this.btn="确定"
			this.nowPage=2
		}
	},
}