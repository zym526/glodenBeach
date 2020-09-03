<template>
	<view class="put_questions">
		<u-navbar title="编辑提问"><view class="slot-wrap" slot="right" @click="toSuccess()">发布提问</view></u-navbar>
		<!-- 问题 -->
		<textarea v-model="areaValueTitle" @input="changeValueTitle()" placeholder-style="color:#999999;font-size: 36rpx;font-weight: bolder;" placeholder="请输入问题" class="top_question"/>
		<view class="desc">
			<textarea v-model="areaValue" placeholder="添加问题描述（选填），问题提交后可能会被管理员重新编辑 (0/500)" placeholder-style="color:#999999;font-size: 30rpx;" maxlength="500" auto-height="true" @input="changeValue()"/>
		</view>
		<!-- 添加专栏 -->
		<view class="add_special_column">
			<view class="top_text_add" @click="addSpcialColumn()">
				<view class="icon jinshatan icon21"></view>
				<view class="top_text_add_one">添加专栏</view>
				<view class="top_text_add_two">{{specialColumnText}}</view>
			</view>
			<view class="special_column_all" v-if="special_column.length!=0">
				<view class="one_special_column" v-for="(item,index) in special_column">
					<view class="one_special_column_text">{{item.name}}</view>
					<view class="icon jinshatan iconguanbi" @click="deleSpecialColumn(item)"></view>
				</view>
			</view>
		</view>
		<!-- 添加图片 -->
		<view class="add_image">
			<view class="add_image_text_all" @click="addImage()">
				<view class="icon jinshatan icon21"></view>
				<view class="add_image_text_one">添加图片</view>
				<view class="add_image_text_two">{{count==8?'(最多添加八张)':8-count+'/8'}}</view>
			</view>
			<view class="image_list">
				<view class="one_image" v-for="(item,index) in imageList">
					<u-image width="100%" height="150rpx" border-radius="20" :src="item"></u-image>
					<view class="icon jinshatan iconguanbi" @click="deleImage(item)"></view>
				</view>
			</view>
		</view>
		<!-- 问题类型 -->
		<view class="question_type">
			<view class="question_type_top" @click="changeType()">
				<view class="question_type_top_left">问题类型</view>
				<view class="question_and_answer_right">
					<view class="question_and_answer_right_text">{{questionType.name}}</view>
					<view class="icon jinshatan iconjiantou9-copy-copy"></view>
				</view>
			</view>
			<view class="question_desc">
				<view class="question_desc_text"><view class="icon jinshatan iconjinggao--"></view>问题提交后可能会被管理员重新编辑，请在消息中查看回复内容，平均回复时长为60分钟，若提问被驳回将会到驳回消息通知。</view>
			</view>
		</view>
		<!-- 弹出层 -->
		<u-popup v-model="showPopup" mode="bottom" border-radius="20"  height="60%" :mask="false">
			<view class="special_column_popup">
				<view class="icon jinshatan iconjiantou9" @click="showPopup=false"></view>
				<!-- 问题 -->
				<view class="question_outer" v-if="popupType==0">
					<view class="one_question_inside" v-for="(item,index) in popupList" @click="getValueTitle(item)">
						<view class="title_one_question">{{item.title}}</view>
						<view class="bottom_question_insidex">{{item.views}}关注 • {{item.answers}}回答</view>
					</view>
				</view>
				<!-- 信用卡 -->
				<view class="special_column_popup_outer" v-if="popupType==1">
					<view class="one_special_column_popup" v-for="(item,index) in popupList">
						<view class="left_one_special_column">
							<u-image width="100rpx" height="100rpx" :src="item.images" style="margin-right: 11rpx;"></u-image>
							<view class="left_one_special_column_text">{{item.name}}</view>
						</view>
						<view :class="special_column_index.indexOf(item.id)!=-1?'add_text_special_column gry_text':'add_text_special_column'" @click="changeSpcialColumn(item)">添加</view>
					</view>
				</view>
				<!-- 问题类型 -->
				<view class="question_type_outer" v-if="popupType==2">
					<view class="one_question_type" v-for="(item,index) in popupList" @click="getQuestionType(item)">{{item.name}}</view>
				</view>
				<noData v-if="isNoData"></noData>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import put_questions from "./put_questions.js";
	export default put_questions;
</script>

<style>
	page{background-color: #F4F4F4;}
</style>

<style scoped lang="scss">
	@import './put_questions.scss';
</style>
