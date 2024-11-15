

export default {
    namespaced: true, // 开启命名空间，这样可以避免不同模块的命名冲突
    state: {
        // 定义模块的状态
        userinfo: {} // 存放用户信息的对象，初始状态为空
    },
    mutations: {
        // 定义同步修改状态的方法
        setUserInfo(state, userinfo) {
            // 设置用户信息并将其保存到本地存储
            state.userinfo = userinfo; // 更新 state 中的 userinfo
            localStorage.setItem('userinfo', JSON.stringify(userinfo)); // 将用户信息保存到 localStorage 中，以便持久化
        }
    },
    actions: {
        // 定义异步操作的方法
    },
    getters: {
        // 定义获取 state 数据的计算属性
        userinfo: state => state.userinfo // 返回 state 中的 userinfo 对象
    }
};
