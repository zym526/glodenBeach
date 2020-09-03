<template>
	<view class="adviser_home" :style="'background: url('+allImages.adviserHomeBg+');background-repeat: no-repeat;background-size: 100% auto;'">
		<u-navbar title=" " :background="background" :border-bottom="false" back-icon-color="#FFFFFF"></u-navbar>
		<!-- 顾问信息 -->
		<view class="adviser_info">
			<u-avatar :src="adviserInfo.work_image" size="140" class="adviser_info_image"></u-avatar>
			<view class="adviser_follow">
				<view :class="collect?'adviser_follow_outer adviser_follow_outer_look':'adviser_follow_outer'" @click="changeFollow()">
					<view class="icon jinshatan icon21" v-if="!collect"></view>
					<view class="adviser_follow_text">{{collect?'已关注':'关注'}}</view>
				</view>
			</view>
			<view class="adviser_info_name">{{adviserInfo.work_nickname}}</view>
			<view class="adviser_info_position">
				<text>{{adviserInfo.work_name}}</text><text>{{adviserInfo.appointment}}</text>
			</view>
			<view class="adviser_info_brief_introduction">{{adviserInfo.work_desc}}</view>
			<view class="adviser_info_tags"> 
				<view class="adviser_info_one_tag" v-for="(item,index) in adviserInfo.work_tag">{{item}}</view>
			</view>
			<view class="adviser_info_other">{{adviserInfo.address}}•帮助了{{adviserInfo.fans_number}}人•评分{{adviserInfo.score}}</view>
		</view>
		<!-- 推荐 动态 评价 -->
		<view class="tabs_outer">
			<view :class="nowTabsIndex==index?'one_tab active_one_tab':'one_tab'" :style="'width:calc(100% / '+tabs.length+')'" v-for="(item,index) in tabs" @click="changeTab(index)">{{item}}</view>
		</view>
		<!-- 推荐 -->
		<view class="recommend" v-if="nowTabsIndex==0">
			<fiveIndex :fiveList="fiveList"></fiveIndex>
			<noData v-if="fiveList.length==0"></noData>
		</view>
		<!-- 动态 -->
		<view class="dynamic" v-if="nowTabsIndex==1">
			<view class="one_dynamic" v-for="(item,index) in allDynamic" @click="toDetail(item)">
				<view class="dynamic_top">
					<view class="dynamic_top_left">
						<u-avatar :src="item.userimage" size="60" class="dynamic_top_image"></u-avatar>
						<view class="dynamic_top_text">
							<view class="dynamic_top_name">{{item.user_name}}</view>
							<view class="dynamic_top_type">{{item.type==2?'发布了视频':item.type==3?'发布了文章':item.type==4?'发布了音频':'回答了问题'}}</view>
						</view>
					</view>
					<view class="dynamic_top_right">{{item.updatetime}}</view>
				</view>
				<view class="dynamic_inside">
					<!-- 回答的问题 -->
					<view class="dynamic_inside_problem"  v-if="item.type==6">
						<u-image width="110rpx" height="110rpx" :src="item.image" style="margin-right: 11rpx;"></u-image>
						<view class="dynamic_inside_problem_text">{{item.title}}</view>
					</view>
					<!-- 发布的动态 -->
					<view class="dynamic_inside_problem1" v-if="item.type!=6">
						<view class="dynamic_release_top">
							<u-image width="100%" height="441rpx" :src="item.image" border-radius="20"></u-image>
							<!-- 视频播放 -->
							<view class="icon jinshatan iconbofang2 center_image" v-if="item.type==2"></view>
							<!-- 音频播放 -->
							<view class="icon jinshatan iconLOGO-fz-0 center_image" v-if="item.type==4"></view>
							<!-- 摘要 -->
							<view class="article_text" v-if="item.type==3">{{item.content}}</view>
							<!-- 音频长度 -->
							<!-- <view class="audio_length" v-if="item.type==4">{{item.length}}</view> -->
						</view>
						<view class="dynamic_release_title">{{item.title}}</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 评论 -->
		<!-- <view class="comment" v-if="nowTabsIndex==2">
			<view class="one_comment" v-for="(item,index) in commentAll">
				<view class="top_comment">
					<view class="left_top_comment">
						<u-avatar :src="item.userImage" size="60" class="left_top_comment_image"></u-avatar>
						<view class="left_top_comment_text">{{item.name}}</view>
					</view>
					<view class="right_top_comment">{{item.time}}</view>
				</view>
				<view class="comment_inside">{{item.commentText}}</view>
			</view>
		</view> -->
		<view class="bottom_to_top">
			<u-loadmore :status="status" :icon-type="iconType" :load-text="loadText" bg-color="#F4F4F4"/>
		</view>
		<!-- 直播页 -->
		<movable-area v-if="isPlay" class="area_outer">
			<movable-view :x="x" :y="y" direction="all" @change="onChange">
				<video :src="adviserInfo.videourl" :controls="false" autoplay="true" loop="true">
					<cover-view @click="toBack()" class="outer_back"></cover-view>
					<cover-image src="../../../static/images/close.png" class="close" @click="closePlay()"></cover-image>
				</video>
			</movable-view>
		</movable-area>
	</view>
</template>

<script>
	import adviser_home from "./adviser_home.js";
	export default adviser_home;
</script>

<style>
	page{background-color: #F4F4F4;}
</style>

<style scoped lang="scss">
	@import './adviser_home.scss';
</style>
