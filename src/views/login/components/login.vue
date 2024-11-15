<template>
  <div class="page" :class="{ fadeOut: isAnimating }">
    <div class="background-box">
      <div class="container" :class="{ slideOut: isAnimating }">
        <!-- 左侧图片部分 -->
        <div class="image-box">
          <img src="@/assets/advertise.png" alt="登录图片" class="login-image" />
        </div>
        <!-- 右侧登录部分 -->
        <div class="sign-box" :class="{ slideOut: isAnimating }">
          <!-- 头像区 -->
          <div class="avatar-container" :class="{ fadeOut: isAnimating }">
            <img src="@/assets/logo.png" alt="头像" class="avatar" />
          </div>
          <el-form ref="form" :model="form" :rules="rules" label-width="80px" :class="{ fadeOut: isAnimating }">
            <h3 class="title" :class="{ fadeOut: isAnimating }">图书管理</h3>
            <el-form-item label="账号" prop="account">
              <el-input v-model="form.username" placeholder="请输入用户名" @focus="handleFocus" @blur="handleBlur"
                :class="{ fadeOut: isAnimating }"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="form.password" type="password" placeholder="请输入密码" @focus="handleFocus"
                @blur="handleBlur" :class="{ fadeOut: isAnimating }"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" class="w100p register-btn" @click="login"
                :class="{ fadeOut: isAnimating }">登录</el-button>
            </el-form-item>
            <div class="txt-r" :class="{ fadeOut: isAnimating }">
              <router-link to="/register" class="link">没有账号？去注册</router-link>
            </div>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: #f5f5f5;
  overflow: hidden;
  transition: opacity 1s;
}

.background-box {
  width: 100%;
  height: 100%;
  background: url('@/assets/advertise.png') no-repeat center center;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: fadeIn 1s ease-in-out;
}

.container {
  display: flex;
  width: 70%;
  height: 70%;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  animation: slideIn 1s ease-in-out;
}

.image-box {
  flex: 6.8;
}

.login-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.sign-box {
  flex: 3.2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px;
  animation: fadeIn 2s ease-in-out;
}

.avatar-container {
  margin-bottom: 20px;
}

.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  transition: transform 0.3s;
}

.avatar:hover {
  transform: scale(1.1);
}

.title {
  text-align: center;
  font-size: 24px;
  margin-bottom: 20px;
}

.el-form-item {
  width: 100%;
}

.el-input {
  transition: transform 0.3s;
}

.el-input:focus {
  transform: scale(1.05);
}

.w100p {
  width: 100%;
}

.register-btn {
  transition: background-color 0.3s, transform 0.3s;
}

.register-btn:hover {
  background-color: #66b1ff;
}

.register-btn:active {
  transform: scale(0.98);
}

.link {
  color: #409eff;
  transition: color 0.3s;
}

.link:hover {
  color: #66b1ff;
}

.txt-r {
  text-align: right;
  margin-top: 20px;
  width: 100%;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes slideIn {
  from {
    transform: translateY(100px);
    opacity: 0;
  }

  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes slideOut {
  from {
    transform: translateY(0);
    opacity: 1;
  }

  to {
    transform: translateY(50px);
    opacity: 0;
  }
}

.fadeOut {
  animation: fadeOut 1s forwards;
}

.slideOut {
  animation: slideOut 1s forwards;
}

@keyframes fadeOut {
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
}
</style>

<script>
import router from "@/router";
import { getUserInfo } from "@/api/SvtccUser";

import store from "@/store";

export default {
  data() {
    return {
      form: {
        username: 'user1',
        password: 'root'
      },
      rules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      },
      isAnimating: false,
      isLoggingIn: false // 添加登录状态标志
    };
  },
  methods: {
    login() {
      if (this.isLoggingIn) return; // 如果正在登录中，则不执行登录操作
      this.isLoggingIn = true; // 设置登录状态为 true

      getUserInfo(this.form)
        .then(response => {
          this.isLoggingIn = false; // 无论登录成功或失败，都重置登录状态为 false
          if (store.state.userInfo.code === 2030) {
            this.isAnimating = true
            // 登录成功，处理登录逻辑
            store.commit('setLoginStatus', true); // 设置登录状态为 true，假设使用 Vuex 管理登录状态
            setTimeout(() => {
              router.push('/index');
            }, 1000); // 动画持续时间与CSS动画时长保持一致
          } else {
            // 登录失败，显示错误信息
            alert("用户名或密码错误！");
          }
        });
    },
    handleFocus(event) {
      event.target.classList.add('input-focus');
    },
    handleBlur(event) {
      event.target.classList.remove('input-focus');
    }
  }
};
</script>
