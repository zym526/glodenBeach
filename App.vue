<script>
	import {checkVersion} from 'api/login.js'
	import {mapState} from 'vuex'
	export default {
		onLaunch: function() {
			// 获取状态栏高度
			this.$store.dispatch('statusBarHeight',uni.getSystemInfoSync().statusBarHeight)
			// 如果有缓存用户信息则直接跳转首页
			if(uni.getStorageSync('user')){
				uni.switchTab({
					url:"pages/index/index/index"
				})
				this.$store.dispatch('changeAvatar',uni.getStorageSync("user").avatar)
				this.isandroid();
			}
		},
		computed: {
			...mapState(['edition']),//版本号
		},
		methods: { 
			// 检查是否安卓
			isandroid(){
				var that = this;
				uni.getSystemInfo({
					success:(res) => {
						if(res.platform=="android"){  
							console.log("anzhuo")
							that.AndroidCheckUpdate();  
						}  
					}  
				}) 
			},
			// 自动更新
			AndroidCheckUpdate(){  
				var that=this;  
				checkVersion({version:this.edition}).then(outer=>{
					if(outer.code==1){
						uni.showModal({
						    title: '版本更新',
						    content: '是否更新应用？',
						    success: function (res) {
						        if (res.confirm) {
						            plus.downloader.createDownload(outer.data.ver_url, {}, function ( d, status ) {
						            	// 下载完成  
						            	if ( status == 200 ) {
						            		plus.runtime.install(plus.io.convertLocalFileSystemURL(d.filename),{},{},function(error){  
						            			uni.showToast({  
						            				title: '安装失败',  
						            				mask: false,  
						            				duration: 1500  
						            			});  
						            		})  
						            	} else {  
						            		 uni.showToast({  
						            			title: '更新失败',  
						            			mask: false,  
						            			duration: 1500  
						            		 }); 
						            	}    
						            }).start();
						        } else if (res.cancel) {
						            console.log('用户点击取消');
						        }
						    }
						});
					}
				}) 
			},
		},
		onHide: function() {
			
		}
	}
</script>

<style lang="scss">
	@import "uview-ui/index.scss";
	@import "/static/font/iconfont.scss";
</style>
