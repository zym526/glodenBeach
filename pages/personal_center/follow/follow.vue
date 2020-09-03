<template>
	<view class="follow">
		<u-navbar title="我的关注"></u-navbar>
		<!-- tab -->
		<view class="tabs">
			<u-tabs-swiper ref="uTabs" :list="tabs" :current="current" @change="tabsChange" :is-scroll="false" height="89" active-color="#003399" bar-width="100" bar-height="5"></u-tabs-swiper>
		</view>
		<swiper :current="swiperCurrent" @animationfinish="animationfinish" :style="'height: calc(100vh - 44px - 96rpx - '+statusBarHeight+'px);'">
			<swiper-item class="swiper-item" v-for="(item, index) in tabs" :key="index">
				<scroll-view scroll-y style="width: 100%;height:100%" @scrolltolower="onreachBottom">
					<view class="outer_all">
						<view class="one_follor" v-for="(info,inIndex) in index==0?specialColumn:index==1?qAndA:adviser" @click="toDetail(inIndex)">
							<view class="left_follor">
								<u-image width="100rpx" height="100rpx" :src="info.image" v-if="index==0" style="margin-right: 10rpx;"></u-image>
								<u-avatar :src="info.work_image" size="100" v-if="index==2" style="margin-right:10rpx"></u-avatar>
								<view class="left_follor_text">
									<view :class="index==1?'left_follor_title_two':'left_follor_title'">{{index==0?info.name:index==1?info.title:info.work_nickname}}</view>
									<view class="left_follor_num" v-if="index==0">{{info.count}}关注</view>
									<view class="left_follor_num_two" v-if="index==1">{{info.views}}关注•{{info.answers}}回答</view>
									<view class="left_follor_num" v-if="index==2">{{info.work_name}} | {{info.appointment}}</view>
								</view>
							</view>
							<view class="right_follor" @click.stop="lookModal(inIndex)">已关注</view>
						</view>
					</view>
					<noData v-if="isNoData"></noData>
				</scroll-view>
			</swiper-item>
		</swiper>
		<!-- 取消关注弹窗 -->
		<u-modal v-model="show" :show-title="false" :show-cancel-button="true" confirm-text="取消关注" cancel-text="放弃" confirm-color="#003399" @confirm="confirm">
			<view class="slot-content">您确定取消关注吗？</view>
		</u-modal>
	</view>
</template>

<script>
	import follow from "./follow.js";
	export default follow;
</script>

<style scoped lang="scss">
	@import './follow.scss';
</style>
