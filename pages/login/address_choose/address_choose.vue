<template>
	<view class="address_choose">
		<u-navbar :title="status.title"><view class="slot-wrap" slot="right">{{status.teps}}/{{status.total}}</view></u-navbar>
		<picker-view indicator-style="height:88rpx;" style="height:440rpx" :value="value" @change="bindChange" class="citybody">
		    <picker-view-column style="line-height: 88rpx;font-size: 28rpx;text-align: center;">
		      <view v-for="(item,index) in provinces">{{item}}</view>
		    </picker-view-column>
		    <picker-view-column style="line-height: 88rpx;font-size: 28rpx;text-align: center;">
		      <view v-for="(item,index) in citys">{{item}}</view>
		    </picker-view-column>
		    <picker-view-column style="line-height: 88rpx;font-size: 28rpx;text-align: center;">
		      <view v-for="(item,index) in areas">{{item}}</view>
		    </picker-view-column>
		  </picker-view>
		  <button type="default" @click="toWork()">下一步</button>
	</view>
</template>

<script>
	import address_choose from "./address_choose.js";
	export default address_choose;
</script>

<style scoped lang="scss">
	@import './address_choose.scss';
</style>
