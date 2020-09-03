<template>
	<view class="search">
		<!-- 顶部状态栏 -->
		<view class="status_bar" :style='"height:"+statusBarHeight+"px;"'></view>
		<!-- 搜索 -->
		<view class="top_search">
			<u-search placeholder="请输入搜索内容" :clearabled="true" :show-action="true" action-text="取消" :animation="true" height="70" v-model="searchValue" @change="getSearch()"></u-search>
		</view>
		<!-- 历史记录 -->
		<view class="history_list" v-if="isShow&&history.length!=0">
			<view class="one_history" v-for="(item,index) in history" @click="toDetail(item)">
				<view class="one_history_left">
					<view class="icon jinshatan iconshijian00"></view>
					<view class="one_history_title">{{item.title}}</view>
				</view>
				<view class="icon jinshatan iconguanbi" @click.stop="delInfo(item)"></view>
			</view>
			<view class="clean_history" @click="delInfo('',1)">清除搜索记录</view>
		</view>
		<view class="no_history" v-if="isShow&&history.length==0">暂无历史记录</view>
		<!-- 检索数据 -->
		<view class="search_list" v-if="!isShow">
			<!-- 专栏 -->
			<view class="special_column" v-for="(item,index) in channel" @click="toSpecialColumn(item)">
				<view class="special_column_left">
					<u-image width="100rpx" height="100rpx" :src="item.image" style="margin-right: 11rpx;"></u-image>
					<view class="special_column_title">{{item.name}}</view>
				</view>
				<view class="special_column_right">专栏</view>
			</view>
			<!-- 检索内容 -->
			<view class="retrieval" v-for="(item,index) in retrieval" @click="toDetail(item)">
				<view class="icon jinshatan iconsousuo"></view>
				<view class="retrieval_title">{{item.title}}</view>
			</view>
			<noData v-if="channel.length==0&&retrieval.length==0"></noData>
		</view>
		<view class="bottom_to_top" v-if="!isShow">
			<u-loadmore :status="status" :icon-type="iconType" :load-text="loadText" margin-top="30" margin-bottom="30"/>
		</view>
	</view>
</template>

<script>
	import search from "./search.js";
	export default search;
</script>

<style scoped lang="scss">
	@import './search.scss';
</style>
