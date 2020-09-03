<template>
	<view class="put_success">
		<u-navbar title="发布成功"></u-navbar>
		<view class="success_outer">
			<view class="icon jinshatan icontongyi"></view>
			<view class="success_text">您的问题已经发布成功！</view>
		</view>
		<button type="default" @click="toFind()">返回</button>
	</view>
</template>

<script>
	import put_success from "./put_success.js";
	export default put_success;
</script>

<style scoped lang="scss">
	@import './put_success.scss';
</style>

