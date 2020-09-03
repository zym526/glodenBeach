import {mapState} from 'vuex'
import images from '../../../util/images.js'
export default {
	data() {
		return {
			allImages:images,//所有图片
			fourTab:[{
				image:"iconguanzhu1",
				text:"我的关注",
				backgroundColor:"#FFCC66"
			},{
				image:"iconshoucang3",
				text:"我的收藏",
				backgroundColor:"#E87274"
			},{
				image:"icontiwen1",
				text:"我的提问",
				backgroundColor:"#49A8F9"
			},{
				image:"iconkongjian-shijian",
				text:"浏览记录",
				backgroundColor:"#8A92EB"
			}],
			list:[
				{id:0,text:"推荐【金沙滩】给好友"},
				{id:1,text:"我的积分"},
				{id:2,text:"帮助中心"}
			]
		}
	},
	computed: {
		...mapState(['statusBarHeight','avatar']),
	},
	methods: {
		// 跳转到个人中心编辑页面
		toUserInformation(){
			uni.navigateTo({
				url:"/pages/personal_center/user_information/user_information"
			})
		},
		// 跳转页面
		toNewPage(text){
			if(text=="我的关注"){
				uni.navigateTo({
					url:"/pages/personal_center/follow/follow"
				})
			}else{
				var type
				if(text=="我的收藏"){
					type=0
					uni.navigateTo({
						url:"/pages/personal_center/collection_browse/collection_browse?type="+type
					})
				}else if(text=="我的提问"){
					uni.navigateTo({
						url:"/pages/personal_center/my_question/my_question"
					})
				}else{
					type=2
					uni.navigateTo({
						url:"/pages/personal_center/collection_browse/collection_browse?type="+type
					})
				}
			}
		}
	},
	onLoad(){

	},
}