<template>
	<view class="login">
		<!-- 顶部状态栏 -->
		<view class="status_bar" :style='"height:"+statusBarHeight+"px;"'></view>
		<!-- logo -->
		<image :src="allImage.logo" mode="widthFix" class="logo"></image>
		<button class="customStyle" type="default" @click="toSignIn()">注册</button>
		<button class="customStyle2" type="default" @click="toRingUp()">登录</button>
	</view>
</template>

<script>
	import login from "./login.js";
	export default login;
</script>
<style scoped lang="scss">
	@import './login.scss';
</style>
