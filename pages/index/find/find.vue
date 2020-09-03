<template>
	<view class="find">
		<!-- 顶部状态栏 -->
		<view class="status_bar" :style='"height:"+statusBarHeight+"px;"'></view>
		<!-- 搜索 -->
		<view class="search">
			<view class="search_outer">
				<u-search placeholder="请输入搜索内容" v-model="searchValue" :clearabled="true" :show-action="false" height="70" @change="getSearch()"></u-search>
			</view>
			<view class="search_questions" @click="toPutQuestions()"><view class="icon jinshatan icontiwen"></view></view>
		</view>
		<!-- tabs -->
		<view class="tabs_outer" v-if="!isShow">
			<view :class="nowTabIndex==item.id?'one_tab active_one_tab':'one_tab'" v-for="(item,index) in tabs" :style="'width: calc(100% / '+tabs.length+')'" @click="changeTab(item.id)">{{item.title}}</view>
		</view>
		<!-- 数据 -->
		<view class="recommend">
			<fiveIndex :fiveList="fiveList"></fiveIndex>
		</view>
		<view class="bottom_to_top">
			<u-loadmore :status="status" :icon-type="iconType" :load-text="loadText" margin-top="0" margin-bottom="30"/>
		</view>
	</view>
</template>

<script>
	import find from "./find.js";
	export default find;
</script>

<style scoped lang="scss">
	@import './find.scss';
</style>

