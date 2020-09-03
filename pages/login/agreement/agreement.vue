<template>
	<view class="agreement">
		<u-navbar title="协议"></u-navbar>
		<view class="outer">
			<u-parse :html="content"></u-parse>
		</view>
	</view>
</template>

<script>
	import {userAgreement,userPrivacy} from '../../../api/login.js'
	export default {
		data() {
			return {
				content:"",//内容
			}
		},
		methods: {
		},
		onLoad(options){
			console.log(options.type)
			if(options.type==0){
				userPrivacy().then(res=>{
					this.content=res.data.content
				})
			}else{
				userAgreement().then(res=>{
					this.content=res.data.content
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.outer{
		padding: 26rpx;
	}
</style>
