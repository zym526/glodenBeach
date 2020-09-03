<template>
	<view class="question_and_answer">
		<u-navbar title=" " :border-bottom="false" back-icon-color="#fff" back-icon-size="38" :background="background">
			<view class="slot-wrap" slot="right">
				<view class="icon jinshatan">&#xe60e;</view> 
			</view>
		</u-navbar>
		<view class="special_column">
			<view class="icon jinshatan">&#xe63a;</view>
			<view class="special_column_text">金沙滩专栏</view>
		</view>
		<view class="special_column_title">
			<view class="special_column_left">
				<!-- <view class="icon jinshatan">&#xe621;</view> -->
				<view class="special_column_left_text">{{channel_info.name}}</view>
			</view>
			<view class="special_column_right">
				<view class="special_column_right_follow" @click="collectChannel()" :style="collect_channel?'color:#666':''">
					<view class="icon jinshatan" v-if="!collect_channel">&#xe62c;</view>
					<view class="special_column_right_follow_text">{{collect_channel?'已关注':'关注'}}</view>
				</view>
				<view class="special_column_right_look" @click="goBack()">
					<view class="special_column_right_look_text">看专栏>></view>
				</view>
			</view>
		</view>
		<!-- 问答 -->
		<view class="top_ask">
			<view class="ask">
				<view class="ask_wen">问</view>
				<view class="ask_info">
					<view class="ask_info_top">
						<view class="ask_info_title">{{question.title}}</view>
						<view class="ask_info_look" @click="collectQuestion()" :style="collect_question?'border:2rpx solid #999;color:#999':''">
							<view class="icon jinshatan" v-if="!collect_question">&#xe62c;</view>
							<view class="ask_info_look_text">{{collect_question?'已关注':'关注'}}</view>
						</view>
					</view>
					<view class="label">
						<view class="one_label" v-for="(item,index) in question_tag">
							<view class="one_label_text">{{item.name}}</view>
							<view class="one_label_num">{{item.questions}}</view>
						</view>
					</view>
					<view :class="openCollect?'ask_info_inside_all':'ask_info_inside'">{{question.content}}</view>
					<view class="ask_info_open_outer">
						<view class="ask_info_open" @click="openCollect=!openCollect">
							<view class="ask_info_open_text">{{openCollect?'收起描述':'展开描述'}}</view>
							<view class="icon jinshatan">{{openCollect?'&#xe632;':'&#xe633;'}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="ask_only" v-for="(item,index) in allComments">
			<view class="ask_only_top">
				<u-avatar :src="item.avatar" mode="circle" size="70"></u-avatar>
				<view class="ask_only_top_left_right">
					<view class="ask_only_top_name">{{item.nickname}}</view>
					<view class="ask_only_top_qita">
						<view class="ask_only_top_qita_one">
							<view class="icon jinshatan">&#xe641;</view>
							<view class="ask_only_top_qita_one_text">{{item.city}}</view>
						</view>
						<!-- <view class="ask_only_top_qita_two">{{item.adviser}}</view>
						<view class="ask_only_top_qita_three">{{item.bank}}</view> -->
					</view>
				</view>
			</view>
			<view class="ask_only_info">{{item.content}}</view>
			<view class="ask_only_number_comments">
				<view class="ask_only_number_comments_left">{{answer_up}}人认为有用</view>
				<view class="ask_only_number_comments_right">{{item.updatetime}}更新</view>
			</view>
			<view class="ask_only_comment">
				<view class="ask_only_comment_one">
					<u-rate :disabled="true" gutter="5" v-model="item.lav" active-color="#FFAA00"></u-rate>
					<!-- <uni-rate :readonly="true" :value="item.value" :size="13" :margin="2" active-color="#FFAA00"/> -->
					<view class="ask_only_comment_text">{{item.lav=="1"?'非常差':item.lav=="2"?'差':item.lav=="3"?'一般':item.lav=="4"?'好':'非常好'}}</view>
				</view>
				<view class="ask_only_line" style="width: 2rpx;background-color: #DBDBDB;"></view>
				<view class="ask_only_comment_one" @click="changeIs(item,index,1)">
					<image :src="item.isuse=='0'?'https://imgxypvipcn.oss-cn-hangzhou.aliyuncs.com/yes_top.png':'https://imgxypvipcn.oss-cn-hangzhou.aliyuncs.com/no_top.png'" mode="widthFix"></image>
					<view class="ask_only_comment_text">有用</view>
				</view>
				<view class="ask_only_comment_one" @click="changeIs(item,index,2)">
					<image :src="item.isuse=='1'?'https://imgxypvipcn.oss-cn-hangzhou.aliyuncs.com/yes_bottom.png':'https://imgxypvipcn.oss-cn-hangzhou.aliyuncs.com/no_bottom.png'" mode="widthFix"></image>
					<view class="ask_only_comment_text">没用</view>
				</view>
				<!-- <view class="ask_only_comment_one" @click="changeIs(item,index,3)">
					<image :src="item.ganxie?'https://imgxypvipcn.oss-cn-hangzhou.aliyuncs.com/yes_like.png':'https://imgxypvipcn.oss-cn-hangzhou.aliyuncs.com/no_like.png'" mode="widthFix"></image>
					<view class="ask_only_comment_text">感谢</view>
				</view> -->
				<view class="ask_only_comment_one" @click="changeIs(item,index,4)">
					<image :src="item.answer_isuse=='true'?'https://imgxypvipcn.oss-cn-hangzhou.aliyuncs.com/yes_get.png':'https://imgxypvipcn.oss-cn-hangzhou.aliyuncs.com/no_get.png'" mode="widthFix"></image>
					<view class="ask_only_comment_text">收藏</view>
				</view>
			</view>
		</view>
		<view class="bottom_to_top">
			<u-loadmore :status="status" :icon-type="iconType" :load-text="loadText"/>
		</view>
	</view>
</template>

<script>
	import question_and_answer from "./question_and_answer.js";
	export default question_and_answer;
</script>
<style>
	page{background-color: #F4F4F4;}
</style>
<style scoped lang="scss">
	@import './question_and_answer.scss';
</style>

