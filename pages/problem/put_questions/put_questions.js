import {mapState} from 'vuex'
import jinEdit from '../../../common/jin-edit/jin-edit.vue';
import {getQuestionSearch,indexCategory,indexQuestionTag,postapi} from "../../../api/find.js"
export default {
	data() {
		return {
			areaValueTitle:"",//问题
			areaValue:"",//描述
			isNoData:false,//暂无数据
			showPopup:false,//专栏弹出层
			popupType:0,//弹窗类型
			popupList:[],//弹框数据
			questionType:{name:"请选择"},//问题分类
			special_column:[],//添加的专栏
			special_column_index:[],//添加专栏的id
			specialColumnText:"(至少添加一个)",//添加数量
			imageList:[],//图片列表
			count:8,//图片个数
		}
	},
	computed: {
		...mapState(['statusBarHeight']),
	},
	components: {
		jinEdit
	},
	methods: {
		// 描述信息
		changeValue(){
			console.log(this.areaValue)
		},
		// 标题检索
		changeValueTitle(){
			this.showPopup=true//显示
			this.popupType=0//类型
			// 问题检索请求
			getQuestionSearch({q:this.areaValueTitle}).then(res=>{
				if(res.data.length==0){//暂无数据
					this.isNoData=true
				}else{//有数据
					this.isNoData=false
					this.popupList=res.data
				}
			})
		},
		// 获取检索标题
		getValueTitle(item){
			this.showPopup=false
			this.areaValueTitle=item.title
		},
		// 添加图片
		addImage(){
			let that=this
			if(that.count==0){
				that.$util.tips({title:"最多选择六张"})
			}else{
				uni.chooseImage({
					count:that.count,
					sizeType: ['compressed'],//压缩图
					sourceType: ['album','camera'], //相机或相册
				    success: function (res) {
						const tempFilePaths = res.tempFilePaths;
						for(let k=0;k<tempFilePaths.length;k++){
							uni.uploadFile({
								url: 'https://mituo.xypvip.cn/addons/cms/wxapp.index/image', //单图上传
								filePath: tempFilePaths[k],
								name: 'file',
								fileType:"image",
								success: (res) => {
									console.log(JSON.parse(res.data));
									that.imageList=that.imageList.concat(JSON.parse(res.data).data)
									that.count=8-that.imageList.length//剩余可以选择张数
								},
							});
						}
				    }
				});
			}
		},
		// 删除某张图片
		deleImage(item){
			this.imageList.splice(this.imageList.indexOf(item),1)
			this.count=this.count+1
		},
		// 获取专栏数据
		addSpcialColumn(){
			this.showPopup=true//展示
			this.popupType=1//类型
			indexQuestionTag().then(res=>{this.popupList=res.data})
		},
		// 添加或删除专栏数
		changeSpcialColumn(item){
			console.log(this.special_column_index.indexOf(item.id))
			if(this.special_column_index.indexOf(item.id)==-1){
				if(this.special_column_index.length==3){
					this.$util.tips({title:"最多添加三个"})
				}else{
					this.special_column.push(item)
					this.special_column_index.push(item.id)
				}
				this.specialColumnText="("+this.special_column.length+"/3)"
			}else{
				this.special_column.splice(this.special_column_index.indexOf(item.id),1)
				this.special_column_index.splice(this.special_column_index.indexOf(item.id),1)
				if(this.special_column.length==0) this.specialColumnText="(至少添加一个)"
			}
		},
		// 单独删除某个专栏
		deleSpecialColumn(item){
			this.special_column.splice(this.special_column_index.indexOf(item.id),1)
			this.special_column_index.splice(this.special_column_index.indexOf(item.id),1)
			if(this.special_column.length==0) this.specialColumnText="(至少添加一个)"
			else this.specialColumnText=this.special_column.length+"/3"
		},
		// 获取问题分类
		changeType(){
			this.showPopup=true//显示
			this.popupType=2//类型
			indexCategory().then(res=>{this.popupList=res.data})
		},
		// 选择问题分类并修改
		getQuestionType(item){
			this.questionType=item
			this.showPopup=false
		},
		// 发布成功
		toSuccess(){
			if(this.areaValueTitle==""){
				this.$util.tips({title:"标题不能为空"})
				return
			}
			if(this.areaValue==""){
				this.$util.tips({title:"描述信息不能为空"})
				return
			}
			if(this.special_column_index.length==0){
				this.$util.tips({title:"至少添加一个专栏"})
				return
			}
			if(this.questionType.name=="请选择"){
				this.$util.tips({title:"请选择分类"})
				return
			}
			postapi({title:this.areaValueTitle,tags:this.special_column_index.join(),content:this.areaValue,images:this.imageList.join(),category_id:this.questionType.id}).then(ers=>{
				uni.navigateTo({
					url:"/pages/problem/put_success/put_success"
				})
			})
		}
	},
	onLoad(options){
	},
}