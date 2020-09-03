import {mapState} from 'vuex'
import {userChannelCollert,questionDetail,answerList,voteCreates,voteDeletes,controllerCollect,controllerNoCollect,attentionDeletes,attentionCreates} from '../../../api/problem.js'

export default {
	data() {
		return {
			// 顶部导航栏颜色
			background: {backgroundColor: 'rgba(0,0,0,0)',},
			id:0,//问题id
			channel_id:0,//专栏id
			channel_info:{},//专栏信息
			collect_channel:false,//专栏是否关注0关注1未关注
			question:{},//问题内容
			question_tag:[],//问题标签
			collect_question:false,//问题是否关注0关注1未关注
			openCollect:false,//展开或收起
			allComments:[],//答案列表
			answer_up:0,//认为有用人数
			status: 'loadmore',//上拉加载更多
			iconType: 'flower',
			page:1,//页码
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
	components: {

	},
	methods: {
		// 点击有用没用和收藏
		changeIs(item,index,num){
			// isuse中0有用，1无用，2什么都没点
			if(num==1){//点击有用
				if(item.isuse=="0"){
					// 取消点赞
					voteDeletes({id:item.id,type:"answer",value:"up"}).then(res=>{
						this.allComments[index].isuse="2"
					})
				}else{
					// 点赞
					voteCreates({id:item.id,type:"answer",value:"up"}).then(res=>{
						this.allComments[index].isuse="0"
					})
				}
			}else if(num==2){
				if(item.isuse=="1"){
					// 取消没用点赞
					voteDeletes({id:item.id,type:"answer",value:"down"}).then(res=>{
						this.allComments[index].isuse="2"
					})
				}else{
					// 点赞
					voteCreates({id:item.id,type:"answer",value:"down"}).then(res=>{
						this.allComments[index].isuse="1"
					})
				}
			}else if(num==3){
				// this.allComments[index].ganxie=!this.allComments[index].ganxie
			}else if(num==4){
				if(item.answer_isuse=="true"){
					controllerNoCollect({id:item.id,type:"answer"}).then(res=>{
						this.allComments[index].answer_isuse="false"
					})
				}else{
					controllerCollect({id:item.id,type:"answer"}).then(res=>{
						this.allComments[index].answer_isuse="true"
					})
				}
			}
		},
		// 获取数据
		getAnswerList(){
			answerList({id:this.id,page:this.page}).then(res=>{
				res.data.data.forEach(item=>{//上传时间的修改
					item.updatetime=this.$util.format(item.updatetime,1,"/")
					item.city=item.city.substring(item.city.lastIndexOf("市")+1,item.city.length)
				})
				this.answer_up=res.data.answer_up//认为有用人数
				this.allComments=this.allComments.concat(res.data.data)//数据添加
				this.status=res.data.haspage=="false"?'nomore':'loadmore'//判断是否还有数据
			})
		},
		// 上拉加载更多
		onReachBottom() {
			if(this.status=='loadmore'){
				this.page=this.page+1
				this.getAnswerList()
			}else{
				this.$util.tips({title:"没有了~"})
			}
		},
		// 点击问题关注和取消关注
		collectQuestion(){
			if(this.collect_question){
				attentionDeletes({id:this.id,type:"question"}).then(res=>{
					this.collect_question=false
				})
			}else{
				attentionCreates({id:this.id,type:"question"}).then(res=>{
					this.collect_question=true
				})
			}
		},
		// 专栏的关注和取消关注
		collectChannel(){
			if(this.collect_channel){
				userChannelCollert({type:1,channel_id:this.channel_id}).then(res=>{
					this.collect_channel=false
				})
			}else{
				userChannelCollert({type:0,channel_id:this.channel_id}).then(res=>{
					this.collect_channel=true
				})
			}
		},
		// 返回上一页
		goBack(){
			uni.navigateBack({
				delta:1
			})
		}
	},
	onLoad(options){
		this.channel_id=options.channel_id//专栏id
		this.id=options.id//问题id
		questionDetail({channel_id:this.channel_id,id:this.id}).then(res=>{
			this.channel_info=res.data.channel_info
			this.collect_channel=res.data.collect_channel=='0'?true:false//0关注1未关注
			this.question=res.data.question
			this.question_tag=res.data.question_tag
			this.collect_question=res.data.collect_question=='0'?true:false//0关注1未关注
		})
		// 答案列表
		this.getAnswerList()
	},
}