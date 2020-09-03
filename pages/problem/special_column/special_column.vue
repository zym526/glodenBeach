<template>
	<view class="special_column" :style="'background: url('+channel_info.image+') no-repeat;background-position:center top'">
		<u-navbar :background="background" :border-bottom="false" back-icon-color="#FFFFFF">
			<view class="slot-wrap" slot="right"><view class="icon jinshatan icongengduo"></view></view>
		</u-navbar>
		<!-- 专栏头部 -->
		<view class="top_info">
			<view class="left_top_info">
				<u-avatar :src="channel_info.image_avatar" size="100" class="left_top_info_image" mode="square"></u-avatar>
				<view class="top_info_text">
					<view class="top_info_text_one">
						<text>专栏</text><text>{{channel_info.name}}</text>
					</view>
					<view class="top_info_text_two">
						{{channel_count}}人关注 • {{channel_number}}浏览
					</view>
				</view>
			</view>
			<view :class="channel_collect?'right_top no_channel_collect':'right_top'" @click="ChannelCollect()">
				<view class="icon jinshatan icon21" v-if="!channel_collect"></view>
				<view class="right_top_text">{{channel_collect?'已关注':'关注'}}</view>
			</view>
		</view>
		<!-- 专栏内容 -->
		<view class="inside">
			<view class="tabs">
				<view class="one_tab" v-for="(item,index) in tabs" @click="changeTab(index)" :style="'width:calc(100% / '+tabs.length">
					<view class="tab_text">{{item}}</view>
					<view class="icon jinshatan iconzu18" v-if="nowTabIndex==index"></view>
				</view>
			</view>
			<!-- 信息 -->
			<view class="one_list" v-for="(item,index) in list" @click="toQAndA(item)">
				<view class="left_list">
					<view class="title_list">{{item.title}}</view>
					<view class="desc_list">{{nowTabIndex==1?item.content:item.description}}</view>
					<view class="bottom_left">
						<view class="bottom_left_two">
							<view class="bottom_left_one">{{nowTabIndex==1?item.nickname:nowTabIndex==2?item.user_name:item.name}}</view>
							<view class="bottom_left_two_time">{{item.updatetime}}</view>
						</view>
						<view class="bottom_right_two">
							<text>{{item.views}}</text>浏览<text v-if="nowTabIndex!=2"> • {{nowTabIndex==1?item.collections:item.collect}}</text><text v-if="nowTabIndex!=2">收藏</text>
						</view>
					</view>
				</view>
				<u-image width="168rpx" height="168rpx" border-radius="10" :src="item.image"></u-image>
			</view>
			
			<view class="bottom_to_top">
				<u-loadmore :status="status" :icon-type="iconType" :load-text="loadText" margin-top="30" margin-bottom="30"/>
			</view>
		</view>
	</view>
</template>

<script>
	import special_column from "./special_column.js";
	export default special_column;
</script>
<style scoped lang="scss">
	@import './special_column.scss';
</style>
