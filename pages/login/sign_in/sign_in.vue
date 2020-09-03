<template>
	<view class="sign_in">
		<u-navbar :title="type==0?'注册':'登录'"></u-navbar>
		<image :src="allImage.logo" mode="widthFix" class="logo"></image>
		<form @submit="formSubmit" class="phone_password">
			<view class="one_input">
				<view class="icon jinshatan iconshuma-shouji"></view>
				<input class="phone" placeholder="请输入手机号" type="number" v-model="form.phone" name="mobile" />
			</view>
			<view class="one_input" v-if="type!=2">
				<view class="icon jinshatan iconmima"></view>
				<input class="password" :placeholder="passwordPla" type="password" v-model="form.password" name="password" />
			</view>
			<view class="one_input" v-if="type==3">
				<view class="icon jinshatan iconmima"></view>
				<input class="determine_password" placeholder="请确认登录密码" type="password" v-model="form.determine_password"/>
			</view>
			<view class="one_input one_code" v-if="type!=1">
				<view class="icon jinshatan iconyanzhengma"></view>
				<input class="code" placeholder="请输入验证码" type="text" v-model="form.code" name="code" />
				<view class="get_code" @click="getCode()">{{code}}</view>
			</view>
			<view :class="type==2||type==0?'bottom_two1 bottom_two':'bottom_two'">
				<view class="left_forget" v-if="type==1" @click="goForget(3)">忘记密码</view>
				<view class="right_quick" v-if="type==1||type==2" @click="goForget(2)">{{passwordAndCod}}</view>
				<view class="left_forget" v-if="type==0" @click="goForget(1)">去登录</view> 
			</view>
			<button form-type="submit">{{btn}}</button>
		</form>
		<view class="radio_outer" @click="changeRadio()" v-if="type!=3">
			<view class="icon jinshatan icontongyi" :style="isRadio?'color:#003399':''"></view>
			<view class="radio_text">已阅读和同意<text @click="toAgreement(0)">《个人信息保护政策》</text>和<text @click="toAgreement(1)">《金沙滩服务协议》</text></view>
		</view>
		<!-- <view class="third_party" v-if="type==1||type==2">
			<view class="third_party_sign_text">使用第三方账号登录</view>
			<view class="third_party_font">
				<view class="icon jinshatan">&#xe63e;</view>
				<view class="icon jinshatan">&#xe63b;</view>
			</view>
		</view> -->
	</view>
</template>

<script>
	import sign_in from "./sign_in.js";
	export default sign_in;
</script>

<style scoped lang="scss">
	@import './sign_in.scss';
</style>
