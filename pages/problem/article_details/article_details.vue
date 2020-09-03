<template>
	<view class="article_details" :style="'background: url('+channel_info.image+') no-repeat center top;'">
		<u-navbar title=" " :border-bottom="false" :back-icon-color="channel_info=='1'?'#232323':'#fff'" back-icon-size="38" :background="channel_info=='1'?background1:background">
			<view :class="channel_info=='1'?'slot-wrap no_icon':'slot-wrap'" slot="right">
				<view class="icon jinshatan">&#xe60e;</view> 
			</view>
		</u-navbar>
		<view class="special_column" v-if="channel_info!='1'">
			<view class="icon jinshatan">&#xe63a;</view>
			<view class="special_column_text">金沙滩专栏</view>
		</view>
		<view class="special_column_title" v-if="channel_info!='1'">
			<view class="special_column_left">
				<!-- <view class="icon jinshatan">&#xe621;</view> -->
				<view class="special_column_left_text">{{channel_info.name}}</view>
			</view>
			<view class="special_column_right">
				<view class="special_column_right_follow" @click="changeFollow()" :style="channel_collect==0?'color:#666':''">
					<view class="icon jinshatan" v-if="channel_collect=='1'">&#xe62c;</view>
					<view class="special_column_right_follow_text">{{channel_collect==1?'关注':'已关注'}}</view>
				</view>
				<view class="special_column_right_look" @click="toSpecialColumn()">
					<view class="special_column_right_look_text">看专栏>></view>
				</view>
			</view>
		</view>
		<!-- 文章 -->
		<view class="article" :style="channel_info=='1'?'margin-top:0rpx':''">
			<view class="article_title">{{title}}</view>
			<view class="tag_all" v-if="tags.length!=0">
				<view class="tag" v-for="(item,index) in tags">{{item}}</view>
			</view>
			<view class="author">
				<view class="author_time">
					<text>{{name?name:"暂无"}}</text>
					<text>{{updatetime?updatetime:'暂无'}}</text>
				</view>
				<view class="author_name">作者因上传连接无法显示</view>
			</view>
			<view class="article_content">
				<!-- 音频 -->
				<view class="audio_outer" v-if="mpUrl">
					<view class="audio_play_left" :style="nowIsPlay?'color:#003399':''">
						<view class="audio_play_image" @click="audioPlay()">
							<image :src="nowIsPlay?'../../../static/images/videpGif.gif':'../../../static/images/play.png'" mode="widthFix"></image>
						</view>
						<view class="now_is_play">{{nowIsPlay?'正在朗读':'暂停朗读'}}</view>
					</view>
					<view class="audio_end" :style="nowIsPlay?'color:#003399':''">{{overTimer}}</view>
				</view>
				<!-- 文章内容 -->
				<view class="content_outer">
					<u-parse :html="article"></u-parse>
				</view>
				<!-- 浏览收藏等 -->
				<view class="look_like">
					<view class="left_look_like">{{views}}浏览/{{dislikes}}收藏</view>
					<view :class="collect==0?'right_like':'right_like no_icon'" @click="getCollect()">
						<view class="icon jinshatan iconhtmal5icon24"></view>
						<text>{{collect==0?'已收藏':'收藏'}}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="wonderful">
			<view class="wonderful_top">精彩推荐</view>
			<!-- 直播 -->
			<view class="recommend">
				<fiveIndex :fiveList="fiveList"></fiveIndex>
			</view>
		</view>
	</view>
</template>

<script>
	import article_details from "./article_details.js";
	export default article_details;
</script>
<style>
	page{background-color: #F4F4F4;}
</style>
<style scoped lang="scss">
	@import './article_details.scss';
</style>
