//vuex的核心代码
//插件安装
//创建仓库

import Vue from 'vue';
import Vuex from 'vuex';

import moudls from "@/store/moudle/moudls";

Vue.use(Vuex)

//创建默认仓库用于存放全局数据
//使用state状态（数据）共享到所有组件
//使用mutations方法修改状态，应为state中的数据不能直接修改，mutation是一个对象，用于存放修改方法，
//actions用于处理异步操作，在另一个地方做操作之后隔另一段时间后在另一个地方执行对应操作，和mutations的区别是mutation是同步的，actions也不能直接
//修改state，actions也要调用mutations调用，
//getter类似于计算属性，基于data派生出一些新的属性，区别在于getter基于state属性

const store = new Vuex.Store({
    name: 'store',
    state:{
        userInfo: {},
        isLogin: false,
        userStatus:{}
    },
    modules:{
        moudls,
    },

    mutations: {
        setUserInfo(state, userInfo) {
            console.log('setUserInfo', userInfo)
            state.userInfo = userInfo; // 将获取的用户信息存储到状态中
        },
        setLoginStatus(state){
            state.isLogin = true
        },
        setUserStatus(state,userStatus){
            state.userStatus = userStatus
        },
        logout(state){
          state.userInfo = {}
        }
    }
})

export default store;