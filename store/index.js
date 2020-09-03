import Vue from 'vue'
import Vuex from 'vuex'
import {STATUS_BAR_HEIGHT,CHANGE_TYPE,CHANGE_AVATAR} from './mutation-types.js'

Vue.use(Vuex)

const store = new Vuex.Store({  
    state: {  
		statusBarHeight:0,//状态栏高度
		type:0,//选择贷款状态
		avatar:uni.getStorageSync("user").avatar,
		edition:"1.0.1",//版本号
    },  
	getters:{
	},
    mutations: {  
		[STATUS_BAR_HEIGHT](state,data){
			state.statusBarHeight=data
		},
		[CHANGE_TYPE](state,data){
			state.type=data
		},
		[CHANGE_AVATAR](state,data){
			state.avatar=data
		}
    },
	actions:{
		statusBarHeight(context,data){
			context.commit('STATUS_BAR_HEIGHT',data)
		},
		changeType(context,data){
			context.commit('CHANGE_TYPE',data)
		},
		changeAvatar(context,data){
			context.commit('CHANGE_AVATAR',data)
		}
	}
})

export default store