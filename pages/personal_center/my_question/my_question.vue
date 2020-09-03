<template>
	<view class="collection_browse">
		<u-navbar title="我的提问"></u-navbar>
		<noData v-if="JSON.stringify(newList) == '{}'"></noData>
		<view class="outer_all" v-for="(obj,key) in newList">
			<!-- 时间 -->
			<view class="time_outer" v-if="newList[key].length!=0">
				<view class="icon jinshatan iconshijian00"></view>
				<view class="time_text">{{key=="today"?"今天":"以前"}}</view>
			</view>
			
			<view v-for="(item, index) in obj">
				<view class="item" @click="toDetail(obj,index)">
					<!-- 此层wrap在此为必写的，否则可能会出现标题定位错误 -->
					<view class="left_info">
						<view class="one_title">{{item.title}}</view> 
						<view class="one_desc">{{item.content}}</view>
						<view class="one_bottom">
							<view class="one_bottom_left">{{item.username}} | {{item.updatetime}}</view>
							<view class="one_bottom_right"><text>{{item.views}}</text>浏览•<text>{{item.collections}}</text>收藏</view>
						</view>
					</view>
					<u-image width="168rpx" height="168rpx" border-radius="10" :src="item.image" class="right_iamge"></u-image>
				</view>
			</view>
		</view>
		<view class="bottom_to_top" v-if="JSON.stringify(list) != '{}'">
			<u-loadmore :status="status" :icon-type="iconType" :load-text="loadText"/>
		</view>
	</view>
</template>

<script>
	import my_question from "./my_question.js";
	export default my_question;
</script>
<style>
	page{background-color: #F4F4F4;}
</style>

<style scoped lang="scss">
	@import './my_question.scss';
</style>
