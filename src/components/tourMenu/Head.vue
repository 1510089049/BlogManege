<template>
  <div> <!-- 添加类名用于设置整个组件的样式 -->
    <el-header class="animated-header" style="text-align: left; font-size: 12px" background-color="#545c64">
      <el-dropdown @command="handleCommand">
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="logout">退出</el-dropdown-item> <!-- 添加退出选项 -->
        </el-dropdown-menu>
      </el-dropdown>
    </el-header>
  </div>
</template>

<script>

import store from "@/store";

export default {
  data() {
    return {
      userName: '', // 用户名数据
    };
  },
  mounted() {
    console.log(store.state.userStatus.data.nickname)
    // 从 store 中获取用户名数据
  },
  methods: {
    handleCommand(command) {
      if (command === 'logout') {
        // 用户选择退出，删除 store 中对应的内容
        this.$store.commit('logout');
        // 跳转到登录页面或其他需要跳转的页面
        this.$router.push('/login');
      }
    },
  },
};
</script>

<style scoped>
.animated-header {
  animation: expandHeight 0.5s ease-in-out;
  /* 添加高度变化的动画效果 */
}
</style>
