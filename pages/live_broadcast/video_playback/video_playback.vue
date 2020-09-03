<template>
	<view class="video_playback">
		<!-- 顶部状态栏 -->
		<view class="status_bar" :style='"height:"+statusBarHeight+"px;"'></view>
		<!-- 视频 -->
		<view class="video_playback_outer">
			<video :src="userInfo.videourl" controls autoplay="true" object-fit="contain"></video>
			<view class="video_playback_top">
				<view class="icon jinshatan iconjiantou9-copy" @click="goBack()"></view>
				<view class="icon jinshatan iconweb-icon-"></view>
			</view>
		</view>
		<!-- 介绍 -->
		<view class="brief_introduction">
			<view class="brief_introduction_top">
				<view class="left_brief_introduction" @click="toAdviserHome()">
					<u-avatar :src="userInfo.work_image" size="64" class="brief_introduction_image"></u-avatar>
					<view class="left_brief_introduction_name">{{userInfo.work_nickname}}</view>
				</view>
				<view :class="collect_work?'brief_introduction_look active_brief_introduction_look':'brief_introduction_look'" @click="changeFollow()">
					<view class="icon jinshatan icon21" v-if="!collect_work"></view>
					<view class="navbar_follow_text">{{collect_work?'已关注':'关注'}}</view>
				</view>
			</view>
			<view class="brief_introduction_text">{{userInfo.work_desc}}</view>
			<view class="brief_introduction_bottom">
				<view class="tags_brief_introduction">
					<view class="one_tag_brief_introduction" v-for="(item,index) in userInfo.work_tag">{{item}}</view>
				</view>
				<view class="brief_introduction_bottom_right">观看{{userInfo.live_number}}•{{userInfo.creat_time}}</view>
			</view>
		</view>
		<!-- 会员 -->
		<view class="vip_center" v-if="false">
			<image :src="allImages.vipPng" mode="widthFix"></image>
		</view>
		<!-- 相关推荐 -->
		<view class="related_recommendations">相关推荐</view>
		<view class="recommend">
			<fiveIndex :fiveList="fiveList"></fiveIndex>
		</view>
	</view>
</template>

<script>
	import video_playback from "./video_playback.js";
	export default video_playback;
</script>

<style scoped lang="scss">
	@import './video_playback.scss';
</style>
