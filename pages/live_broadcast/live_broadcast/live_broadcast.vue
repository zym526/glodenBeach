<template>
	<view class="live_broadcast">
		<!-- 顶部状态栏 -->
		<view class="status_bar" :style='"height:"+statusBarHeight+"px;"'></view>
		<!-- 直播 -->
		<view class="is_live_broadcast">
			<video :src="live_user.videourl" :controls="false" autoplay="true" object-fit="contain" loop="true">
				<cover-image src="../../../static/images/left_image.png" class="left_back" @click="goBack()"></cover-image>
				<cover-image :src="live_user.work_image" class="image_left" @click="toAdviserHome()"></cover-image>
				<cover-view class="user_name" @click="toAdviserHome()">{{live_user.work_nickname}}</cover-view>
				<cover-view class="look_num" @click="toAdviserHome()">{{live_user.live_number}}人观看</cover-view>
				<cover-view class="like_people" @click="changeFollow()">{{collect?'已关注':'+关注'}}</cover-view>
				<cover-view class="home_num">房间号:{{live_user.room_number}}</cover-view>
				<cover-image src="../../../static/images/share.png" class="image_right"></cover-image>
			</video>
		</view>
		<!-- 互动简介 -->
		<view class="tab_two">
			<view v-for="(item,index) in tabs" :class="nowTabIndex==index?'active_tab':''" @click="changeTab(index)">{{item}}</view>
		</view>
		<view class="interaction" v-if="nowTabIndex==0" :style="'height:calc(100vh - 530rpx - '+ statusBarHeight+'px);'">
			<scroll-view  :scroll-top="nowScrollTop" scroll-y="true" class="interaction_inside">
				<view class="one_user_interaction" v-for="(item,index) in allSpeech">
					<text class="one_user_name">{{item.username}}：</text>{{item.content}}
				</view>
			</scroll-view>
			<view class="interaction_bottom">
				<input type="text" v-model="you_speech" placeholder="输入评论内容" class="you_speech"/>
				<view class="interaction_bottom_send_out" @click="sendText()">发送</view>
			</view>
		</view>
		<view class="brief_introduction" v-if="nowTabIndex==1">
			<view class="introduce">{{live_user.work_desc}}</view>
			<view class="related_recommendations">相关推荐</view>
			<view class="list_video">
				<!-- 直播 -->
				<fiveIndex :fiveList="fiveList"></fiveIndex>
			</view>
		</view>
	</view>
</template>

<script>
	import live_broadcast from "./live_broadcast.js";
	export default live_broadcast;
</script>
<style>
	page{background-color: #F4F4F4;}
</style>
<style scoped lang="scss">
	@import './live_broadcast.scss';
</style>
