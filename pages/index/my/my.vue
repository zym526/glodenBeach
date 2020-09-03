<template>
	<view class="my">
		<!-- 顶部状态栏 -->
		<view class="status_bar" :style='"height:"+statusBarHeight+"px;"'></view>
		<view class="user_info">
			<view class="setting">
				<view class="icon jinshatan iconshezhi"></view>
			</view>
			<view class="user_info_outer" @click="toUserInformation()">
				<view class="user_left">
					<u-avatar :src="avatar" size="110" class="user_info_iamge"></u-avatar>
					<view class="user_name">用户名称</view>
					<view class="icon jinshatan iconVIP1"></view>
				</view>
				<view class="icon jinshatan iconjiantou9-copy-copy"></view>
			</view>
			<view class="four_vip">
				<view class="four_outer">
					<view class="one_classify" v-for="(item,index) in fourTab" @click="toNewPage(item.text)">
						<view class="image_one_classify" :style="'background-color: '+item.backgroundColor">
							<view :class="'icon jinshatan '+item.image"></view>
						</view>
						<view class="one_classify_text">{{item.text}}</view>
					</view>
				</view>
				<view class="vip">
					<image :src="allImages.myVip" mode="widthFix"></image>
				</view>
			</view>
		</view>
		<!-- list -->
		<view class="list_outer">
			<view class="one_inside" v-for="(item,index) in list">
				<view class="left_text">{{item.text}}</view>
				<view class="icon jinshatan iconjiantou9-copy-copy"></view>
			</view>
		</view>
	</view>
</template>

<script>
	import my from "./my.js";
	export default my;
</script>
<style>
	page{background-color: #F4F4F4;}
</style>

<style scoped lang="scss">
	@import './my.scss';
</style>
