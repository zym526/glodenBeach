<template>
	<view class="index" :style="'background: url('+allImages.indexBg+');background-repeat: no-repeat;background-size: 100% auto;'">
		<!-- 顶部状态栏 -->
		<view class="status_bar" :style='"height:"+statusBarHeight+"px;"'></view>
		<view class="top_search">
			<u-avatar :src="avatar" size="58"></u-avatar>
			<view class="search" @click="toSearch()">
				<view class="icon jinshatan iconsousuo"></view>
				<view class="search_text">有问题，找金沙滩</view>
			</view>
			<view class="calendar_info">
				<view class="icon jinshatan iconqiandao1"></view>
				<view class="icon jinshatan iconicon-"></view>
			</view>
		</view>
		<!-- 直播 -->
		<view class="live_broadcast" @click="toLiveBroadcast(live.id)">
			<!-- <video :src="live.url" :controls="false" autoplay="true" muted="true" loop="true" object-fit="cover">
				<cover-image src="../../../static/images/play.png" class="image_right"></cover-image>
				<cover-view class="image_text">直播中</cover-view>
				<cover-view class="live_title">{{live.title}}</cover-view>
				<cover-view class="live_line"></cover-view>
				<cover-image :src="'https://mituo.xypvip.cn'+live.user_image" class="user_image"></cover-image>
				<cover-view class="user_name">{{live.nickname}}</cover-view>
				<cover-view class="user_authentication">博主认证</cover-view>
				<cover-image src="https://imgxypvipcn.oss-cn-hangzhou.aliyuncs.com/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20200819113056.png" class="look_people_image"></cover-image>
				<cover-view class="look_people_num">{{live.views}}</cover-view>
				<cover-view style="width: 100%;height: 100%;position: absolute;left:-3rpx;top: -3rpx;" @click="toLiveBroadcast(live.id)"></cover-view>
			</video> -->
			<image :src="live.video_image" mode="widthFix" class="background_image"></image>
			<view class="top_right">
				<image src="../../../static/images/play.png" mode="widthFix"></image>
				<view class="top_right_inside">直播中</view>
			</view>
			<view class="bottom_all">
				<view class="bottom_title">{{live.title}}</view>
				<view class="bottom_info">
					<view class="bottom_info_left">
						<u-avatar :src="live.user_image" size="58" class="avatar_image"></u-avatar>
						<view class="right_text">
							<view class="right_text_name">{{live.nickname}}</view>
							<view class="right_text_bottom">{{live.status}}</view>
						</view>
					</view>
					<view class="bottom_info_right">
						<view class="icon jinshatan iconrenshu"></view>
						<text>50</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 列表 -->
		<view class="list_video">
			<!-- 直播 -->
			<fiveIndex :fiveList="fiveList"></fiveIndex>
		</view>
	</view>
</template>

<script>
	import index from "./index.js";
	export default index;
</script>

<style>
	page{background-color: #F4F4F4;}
</style>
<style scoped lang="scss">
	@import './index.scss';
</style>
