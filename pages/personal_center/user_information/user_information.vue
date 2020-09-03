<template>
	<view class="user_information">
		<u-navbar title="个人资料" v-if="nowPage==0"><view class="slot-wrap" slot="right" @click="editPreservation()">{{slotRight?'保存':'编辑'}}</view></u-navbar>
		<u-navbar :title="carHomeTitle" :is-back="false" v-if="nowPage!=0"><view class="slot-wrap" slot="right" @click="toAdd(0)">完成</view></u-navbar>
		<!-- 用户信息 -->
		<view class="user_info" v-if="nowPage==0">
			<view class="user">
				<!-- 头像 -->
				<view class="one_info">
					<view class="left_text">头像</view>
					<u-avatar :src="newUserInfo.avatar" size="80" @click="changeImage()"></u-avatar>
				</view>
				<!-- 昵称 -->
				<view class="one_info">
					<view class="left_text">昵称</view>
					<view class="right_text" v-if="!slotRight">{{newUserInfo.username}}</view>
					<input type="text" v-model="newUserInfo.username" placeholder="请输入昵称(必填)" class="right_input" v-else/>
				</view>
			</view>
			<u-collapse :accordion="false" class="user" :head-style="headStyle">
				<u-collapse-item title="基本情况">
					<!-- 性别 -->
					<view class="one_info" @click="changeShow2(0)">
						<view class="left_text">性别</view>
						<view class="right_text" v-if="!slotRight">{{newUserInfo.gender=='0'?'女':'男'}}</view>
						<view class="right_text2" v-else>{{newUserInfo.gender=='0'?'女':'男'}}<view class="icon jinshatan iconjiantou9-copy-copy"></view></view>
					</view>
					<!-- 生日 -->
					<view class="one_info" @click="changeShow('time')">
						<view class="left_text">生日</view>
						<view class="right_text" v-if="!slotRight">{{newUserInfo.birthday}}</view>
						<view class="right_text2" v-else>{{newUserInfo.birthday}}<view class="icon jinshatan iconjiantou9-copy-copy"></view></view>
					</view>
					<!-- 手机号 -->
					<view class="one_info">
						<view class="left_text">手机号</view>
						<view class="right_text" v-if="!slotRight">{{newUserInfo.mobile}}</view>
						<input type="text" v-model="newUserInfo.mobile" placeholder="请填写手机号" class="right_input" v-else/>
					</view>
					<!-- 居住地 -->
					<view class="one_info" @click="changeShow('region')">
						<view class="left_text">居住地</view>
						<view class="right_text" v-if="!slotRight">{{newUserInfo.city}}</view>
						<view class="right_text2" v-else>{{newUserInfo.city}}<view class="icon jinshatan iconjiantou9-copy-copy"></view></view>
					</view>
				</u-collapse-item>
			</u-collapse>
			<u-collapse :accordion="false" class="user" :head-style="headStyle">
				<u-collapse-item title="收入情况">
					<!-- 月收入 -->
					<view class="one_info" @click="changeShow2(1)">
						<view class="left_text">月收入</view>
						<view class="right_text" v-if="!slotRight">{{newUserInfo.income}}</view>
						<view class="right_text2" v-else>{{newUserInfo.income}}<view class="icon jinshatan iconjiantou9-copy-copy"></view></view>
					</view>
					<!-- 是否缴纳社保 -->
					<view class="one_info" @click="changeShow2(2)">
						<view class="left_text">是否缴纳社保</view>
						<view class="right_text" v-if="!slotRight">{{newUserInfo.ishas_shebao}}</view>
						<view class="right_text2" v-else>{{newUserInfo.ishas_shebao}}<view class="icon jinshatan iconjiantou9-copy-copy"></view></view>
					</view>
					<!-- 社保基数 -->
					<view class="one_info" @click="changeShow2(3)">
						<view class="left_text">社保基数</view>
						<view class="right_text" v-if="!slotRight">{{newUserInfo.shebao}}</view>
						<view class="right_text2" v-else>{{newUserInfo.shebao}}<view class="icon jinshatan iconjiantou9-copy-copy"></view></view>
					</view>
				</u-collapse-item>
			</u-collapse>
			<!-- 车辆信息 -->
			<u-collapse :accordion="false" class="user no_user_info" :head-style="headStyle">
				<u-collapse-item title="车辆信息" @change="changeCarHome(0)"></u-collapse-item>
			</u-collapse>
			<u-collapse :accordion="false" class="user" :head-style="headStyle" v-if="carShow">
				<u-collapse-item :title="'车辆'+(index+1)" v-for="(item,index) in newCarInfo">
					<view class="one_info" @click="toCarHome(1,index)">
						<view class="left_text">车辆市值</view>
						<view class="right_text" v-if="!slotRight">{{item.marketValue}}</view>
						<view class="right_text2" v-else>{{item.marketValue}}<view class="icon jinshatan iconjiantou9-copy-copy"></view></view>
					</view>
					<view class="one_info" @click="toCarHome(1,index)">
						<view class="left_text">按揭还款期数</view>
						<view class="right_text" v-if="!slotRight">{{item.periodNumber}}</view>
						<view class="right_text2" v-else>{{item.periodNumber}}<view class="icon jinshatan iconjiantou9-copy-copy"></view></view>
					</view>
					<view class="one_info" @click="toCarHome(1,index)">
						<view class="left_text">已还款期数</view>
						<view class="right_text" v-if="!slotRight">{{item.periodCategory}}</view>
						<view class="right_text2" v-else>{{item.periodCategory}}<view class="icon jinshatan iconjiantou9-copy-copy"></view></view>
					</view>
					<view class="one_info" @click="toCarHome(1,index)">
						<view class="left_text">车牌</view>
						<view class="right_text" v-if="!slotRight">{{item.licensePlate}}</view>
						<view class="right_text2" v-else>{{item.licensePlate}}<view class="icon jinshatan iconjiantou9-copy-copy"></view></view>
					</view>
					<view class="one_info" @click="toCarHome(1,index)">
						<view class="left_text">公里数</view>
						<view class="right_text" v-if="!slotRight">{{item.kilometers}}</view>
						<view class="right_text2" v-else>{{item.kilometers}}<view class="icon jinshatan iconjiantou9-copy-copy"></view></view>
					</view>
				</u-collapse-item>
			</u-collapse>
			<view class="add_car_home" v-if="slotRight" @click="toAdd(1)"><view class="icon jinshatan icon21"></view>添加车辆信息</view>
			<!-- 房屋信息 -->
			<u-collapse :accordion="false" class="user no_user_info" :head-style="headStyle">
				<u-collapse-item title="房屋信息" @change="changeCarHome(1)"></u-collapse-item>
			</u-collapse>
			<u-collapse :accordion="false" class="user" :head-style="headStyle" v-if="homeShow">
				<u-collapse-item :title="'房屋'+(index+1)" v-for="(item,index) in newHomeInfo">
					<view class="one_info" @click="toCarHome(2,index)">
						<view class="left_text">房屋类型</view>
						<view class="right_text" v-if="!slotRight">{{item.type}}</view>
						<view class="right_text2" v-else>{{item.type}}<view class="icon jinshatan iconjiantou9-copy-copy"></view></view>
					</view>
					<view class="one_info" @click="toCarHome(2,index)">
						<view class="left_text">房屋市值</view>
						<view class="right_text" v-if="!slotRight">{{item.marketValue}}</view> 
						<view class="right_text2" v-else>{{item.marketValue}}<view class="icon jinshatan iconjiantou9-copy-copy"></view></view>
					</view>
					<view class="one_info" @click="toCarHome(2,index)">
						<view class="left_text">按揭还款期数</view>
						<view class="right_text" v-if="!slotRight">{{item.periodNumber}}</view>
						<view class="right_text2" v-else >{{item.periodNumber}}<view class="icon jinshatan iconjiantou9-copy-copy"></view></view>
					</view>
					<view class="one_info" @click="toCarHome(2,index)">
						<view class="left_text">已还款期数</view>
						<view class="right_text" v-if="!slotRight">{{item.periodCategory}}</view>
						<view class="right_text2" v-else >{{item.periodCategory}}<view class="icon jinshatan iconjiantou9-copy-copy"></view></view>
					</view>
				</u-collapse-item>
			</u-collapse>
			<view class="add_car_home" v-if="slotRight" @click="toAdd(2)"><view class="icon jinshatan icon21"></view>添加房屋信息</view>
		</view>
		<view class="add_home_car" v-if="nowPage!=0">
			<!-- 用户信息 -->
			<view class="user_info" v-if="nowPage==1">
				<view class="user">
					<!-- 市值 -->
					<view class="one_info" @click="changeShow2(4)">
						<view class="left_text">车辆市值</view>
						<view class="right_text2">{{onlyCar.marketValue?onlyCar.marketValue:"请选择车辆市值"}}<view class="icon jinshatan iconjiantou9-copy-copy"></view></view>
					</view>
					<!-- 期数 -->
					<view class="one_info" @click="changeShow2(5)">
						<view class="left_text">按揭还款期数</view>
						<view class="right_text2">{{onlyCar.periodNumber?onlyCar.periodNumber:"请选择还款期数"}}<view class="icon jinshatan iconjiantou9-copy-copy"></view></view>
					</view>
					<!-- 已还款期数 -->
					<view class="one_info" @click="changeShow2(10)">
						<view class="left_text">已还款期数</view>
						<view class="right_text2">{{onlyCar.periodCategory?onlyCar.periodCategory:"请选择还款期数"}}<view class="icon jinshatan iconjiantou9-copy-copy"></view></view>
					</view>
					<!-- 车牌 -->
					<view class="one_info">
						<view class="left_text">车牌</view>
						<input type="text" v-model="onlyCar.licensePlate" placeholder="请输入车牌" class="right_input"/>
					</view>
					<!-- 期数 -->
					<view class="one_info">
						<view class="left_text">公里数</view>
						<input type="text" v-model="onlyCar.kilometers" placeholder="请输入公里数" class="right_input"/>
					</view>
				</view>
			</view>
			<!-- 房屋信息信息 -->
			<view class="user_info" v-if="nowPage==2">
				<view class="user">
					<!-- 类型 -->
					<view class="one_info" @click="changeShow2(6)">
						<view class="left_text">房屋类型</view>
						<view class="right_text2">{{onlyHome.type?onlyHome.type:"请选择房屋类型"}}<view class="icon jinshatan iconjiantou9-copy-copy"></view></view>
					</view>
					<!-- 市值 -->
					<view class="one_info" @click="changeShow2(7)">
						<view class="left_text">房屋市值</view>
						<view class="right_text2">{{onlyHome.marketValue?onlyHome.marketValue:"请选择房屋市值"}}<view class="icon jinshatan iconjiantou9-copy-copy"></view></view>
					</view>
					<!-- 还款期数 -->
					<view class="one_info" @click="changeShow2(8)">
						<view class="left_text">按揭还款期数</view>
						<view class="right_text2">{{onlyHome.periodNumber?onlyHome.periodNumber:"请选择还款期数"}}<view class="icon jinshatan iconjiantou9-copy-copy"></view></view>
					</view>
					<!-- 已还款期数 -->
					<view class="one_info" @click="changeShow2(9)">
						<view class="left_text">已还款期数</view>
						<view class="right_text2">{{onlyHome.periodCategory?onlyHome.periodCategory:"请选择还款期数"}}<view class="icon jinshatan iconjiantou9-copy-copy"></view></view>
					</view>
				</view>
			</view>
		</view>
		<!-- 弹出框 -->
		<u-picker v-model="timeAddressShow" :mode="timeOrAddress" @confirm="addressTime"></u-picker>
		<u-picker mode="selector" v-model="selectorShow"  :default-selector="[0]" :range="selector" @confirm="oneChange"></u-picker>
	</view>
</template>

<script>
	import user_information from "./user_information.js";
	export default user_information;
</script>
<style>
	page{background-color: #F4F4F4;}
</style>

<style scoped lang="scss">
	@import './user_information.scss';
</style>
