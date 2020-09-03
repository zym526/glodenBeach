<template>
	<view class="five_index">
		<view :class="item.type==5?'advertisement':'one_video_article'" v-for="(item,index) in fiveList" @click="toInsidePage(item)">
			<!-- 广告 -->
			<image :src="item.image" mode="widthFix" class="advertisement_image" v-if="item.type==5"></image>
			<!-- 图片上悬浮内容 -->
			<view class="top_broadcast_image" v-if="item.type!=5">
				<!-- 背景图片 -->
				<u-image width="100%" height="228rpx" :src="item.image" border-radius="20"></u-image>
				<view class="bg_moban"></view>
				<!--直播右上角-->
				<view class="broadcast_right_bg" v-if="item.type==0">
					<view class="icon jinshatan iconLOGO-fz-0"></view>
					<view class="broadcast_right">直播中</view>
				</view>
				<!-- 视频播放 -->
				<view class="icon jinshatan iconbofang2 center_image" v-if="item.type==1||item.type==2"></view>
				<!-- 视频长度 -->
				<view :class="item.type==1?'video_length':'video_length video_length2'" v-if="item.type==1||item.type==2">
					<view class="video_playback" v-if="item.type==1">直播回放</view>
					<view class="video_length_num">{{item.length}}</view>
				</view>
				<!-- 文章摘要 -->
				<view class="article_text" v-if="item.type==3">{{item.description}}</view>
				<!-- 音频播放 -->
				<view class="icon jinshatan iconLOGO-fz-0 center_image" v-if="item.type==4"></view>
			</view>
			<view class="bottom_title_article" v-if="item.type!=5">
				<!-- biaoti  -->
				<view class="bottom_title">{{item.title}}</view>
				<view class="bottom_user_number">
					<view class="bottom_user_left">
						<u-avatar :src="item.userimage" size="40" class="user_image_bottom" v-if="item.type!=3&&item.type!=4"></u-avatar>
						<view class="bottom_user_name" v-if="item.type!=3&&item.type!=4">{{item.user_name}}</view>
						<view class="bottom_left_classify" v-if="item.type==3||item.type==4">{{item.name}}</view>
					</view>
					<view class="bottom_right_number">{{item.type==0?'观看':item.type==1?'回放':item.type==2?'播放':'浏览'}}{{item.views}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
		name:"five_index",
		props:{
			fiveList:{
				type:Array,
			}
		},
		data(){
			return {
			}
		},
		methods:{
			// 跳转到内页，根据type判断，0直播，1回放，2视频，3文件，4音频，5广告
			toInsidePage(item){
				if(item.type==0){//跳转直播页面
					uni.navigateTo({
						url:"/pages/live_broadcast/live_broadcast/live_broadcast?id="+item.id
					})
				}else if(item.type==1||item.type==2){
					uni.navigateTo({
						url:"/pages/live_broadcast/video_playback/video_playback?id="+item.id
					})
				}else if(item.type==3||item.type==4){
					uni.navigateTo({
						url:"/pages/problem/article_details/article_details?id="+item.id
					})
				}else{
					uni.navigateTo({
						url:"/pages/external/external?src="+item.url
					})
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.five_index{
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		.one_video_article{
			width: calc(50% - 10rpx);
			background-color: #FFFFFF;
			border-radius: 20rpx;
			margin-bottom: 20rpx;
			box-sizing: border-box;
			.bg_moban{
				position: absolute;
				width: 100%;
				height: 100%;
				left: 0rpx;
				top: 0rpx;
				border-radius: 20rpx;
				background-image: -webkit-gradient(linear,left top, left bottom,from(rgba(0,0,0,0.1)),color-stop(90%, rgba(0,0,0,0.5)));
				background-image: linear-gradient(-180deg,rgba(0,0,0,0.1) 0%,rgba(0,0,0,0.5) 90%);
			}
			.top_broadcast_image{
				width: 100%;
				height: 228rpx;
				border-radius: 20rpx;
				position: relative;
				.broadcast_right_bg{
					position: absolute;
					top: 0rpx;
					right: 0rpx;
					display: flex;
					align-items: center;
					border-radius: 0rpx 20rpx 0rpx 20rpx;
					font-size: 22rpx;
					color: #003399;
					background-color: #FFCC66;
					padding: 7rpx 16rpx;
					box-sizing: border-box;
					.icon{
						font-size: 44rpx;
						color: #003399;
						margin-right: 9rpx;
					}
				}
				.center_image{
					position: absolute;
					left: 50%;
					top: 50%;
					transform: translateX(-50%) translateY(-50%);
					font-size: 65rpx;
					color: #FFFFFF;
				}
				.video_length{
					position: absolute;
					bottom: 0rpx;
					left: 0rpx;
					right: 0rpx;
					display: flex;
					justify-content: space-between;
					color: #FFFFFF;
					font-size: 26rpx;
					padding: 17rpx 21rpx;
					box-sizing: border-box;
					.video_playback{
						opacity: 0.5;
					}
				}
				.video_length2{
					justify-content: flex-end;
				}
				.article_text{
					position: absolute;
					bottom: 16rpx;
					left: 15rpx;
					right: 15rpx;
					font-size: 24rpx;
					color: #FFFFFF;
					text-overflow: -o-ellipsis-lastline;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					line-clamp: 2;
					-webkit-box-orient: vertical;
				}
			}
			.bottom_title_article{
				margin: 16rpx;
				.bottom_title{
					font-size: 28rpx;
					color: #232323;
					overflow: hidden;
					text-overflow:ellipsis;
					white-space: nowrap;
					margin-bottom: 10rpx;
				}
				.bottom_user_number{
					display: flex;
					justify-content: space-between;
					font-size: 22rpx;
					color: #232323;
					.bottom_user_left{
						display: flex;
						align-items: center;
						.bottom_user_name{
							margin-left: 6rpx;
							width: 120rpx;
							overflow: hidden;
							text-overflow:ellipsis;
							white-space: nowrap;
						}
					}
				}
			}
		}
		.advertisement{
			width: 100%;
			margin-bottom: 20rpx;
			.advertisement_image{
				width: 100%;
				height: auto;
				font-size: 0rpx;
				border-radius: 20rpx;
			}
		}
	}
</style>
