<template>
	<view class="all_status">
		<u-navbar :title="status.title"><view class="slot-wrap" slot="right" v-if="status.total">{{status.teps}}/{{status.total}}</view></u-navbar>
		<view class="choose_status">
			<button :class="nowStatus==index?'customStyle':'customStyle2'" type="default" v-for="(item,index) in status.data" @click="changeStatus(index)">{{item.text}}</button>
		</view>
	</view>
</template>

<script>
	import all_status from "./all_status.js";
	export default all_status;
</script>

<style scoped lang="scss">
	@import './all_status.scss';
</style>
