<template>
	<view class="no_data">
		<view class="icon jinshatan iconwushuju"></view>
		<view class="no_data_text">暂无数据</view>
	</view>
</template>

<script>
export default {
		name:"no_data",
		props:{

		},
		data(){
			return {
			}
		},
		methods:{
			
		}
	}
</script>

<style scoped lang="scss">
	.no_data{
		width: 100%;
		text-align: center;
		font-size: 32rpx;
		color: #E2E2E2;
		margin-top: 100rpx;
		.icon{
			font-size: 200rpx;
			margin-bottom: 20rpx;
		}
	}
</style>
