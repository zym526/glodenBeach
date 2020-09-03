<template>
	<view class="collection_browse">
		<u-navbar :title="title"><view class="slot-wrap" slot="right" @click="changeRight()">{{titleRight?'取消':'管理'}}</view></u-navbar>
		<noData v-if="JSON.stringify(list) == '{}'"></noData>
		<view class="outer_all" v-for="(obj,key) in newList">
			<!-- 时间 -->
			<view class="time_outer" v-if="type!=0&&newList[key].length!=0">
				<view class="icon jinshatan iconshijian00"></view>
				<view class="time_text">{{key=="today"?"今天":"以前"}}</view>
			</view>
			
			<u-swipe-action :show="item.show" :index="index" v-for="(item, index) in obj" :key="item.aid" @click="click(index,key)" @open="open(index,key)" :options="options" bg-color="rgba(0,0,0,0)" style="padding-top: 20rpx;" btn-width="88" :disabled="disabled">
				<view class="item u-border-bottom" @click="toDetail(obj,index)">
					<!-- 选框 -->
					<u-checkbox @change="checkboxChange" shape="circle" v-model="item.checked" :name="item.aid" size="42" active-color="#003399" class="one_checkbox" v-if="titleRight"></u-checkbox>
					<!-- 此层wrap在此为必写的，否则可能会出现标题定位错误 -->
					<view class="title-wrap left_info">
						<view class="one_title">{{item.title}}</view> 
						<view class="one_desc">{{item.description}}</view>
						<view class="one_bottom">
							<view class="one_bottom_left">{{item.name}} | {{item.create_time}}</view>
							<view class="one_bottom_right"><text>{{item.views}}</text>浏览•<text>{{item.collect}}</text>收藏</view>
						</view>
					</view>
					<u-image width="168rpx" height="168rpx" border-radius="10" :src="item.image" class="right_iamge"></u-image>
				</view>
			</u-swipe-action>
		</view>
		<view class="bottom_to_top" v-if="JSON.stringify(list) != '{}'">
			<u-loadmore :status="status" :icon-type="iconType" :load-text="loadText"/>
		</view>
		<view class="bottom_line" v-if="titleRight"></view>
		
		<!-- 全选 -->
		<view class="check_all" v-if="titleRight">
			<u-checkbox shape="circle" @change="checkboxChange" name="全选" v-model="allCheck" size="42" active-color="#003399" label-size="30" class="check_left">全选</u-checkbox>
			<view class="dele_all" @click="delMore()">删除</view>
		</view>
	</view>
</template>

<script>
	import collection_browse from "./collection_browse.js";
	export default collection_browse;
</script>
<style>
	page{background-color: #F4F4F4;}
</style>

<style scoped lang="scss">
	@import './collection_browse.scss';
</style>
