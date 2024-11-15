<template>
  <div class="page">
    <div class="background-box">
      <div class="sign-box">
        <el-form ref="form" :model="form" :rules="rules" label-width="80px">
          <h3 class="title">系统注册</h3>
          <el-form-item label="账号" prop="username">
            <el-input v-model="form.username" placeholder="请输入用户名" @focus="handleFocus" @blur="handleBlur"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="form.password" type="password" placeholder="请输入密码" @focus="handleFocus" @blur="handleBlur"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="cfpassword">
            <el-input v-model="form.cfpassword" type="password" placeholder="请确认密码" @focus="handleFocus" @blur="handleBlur"></el-input>
          </el-form-item>
          <el-form-item label="昵称" prop="nickname">
            <el-input v-model="form.nickname" placeholder="请输入昵称" @focus="handleFocus" @blur="handleBlur"></el-input>
          </el-form-item>
          <el-form-item label="头像" prop="avatar">
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="w100p register-btn" @click="register">注册</el-button>
          </el-form-item>
          <div class="txt-r">
            <router-link to="/login" class="link">已有账号？去登录</router-link>
          </div>
        </el-form>
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
}

.background-box {
  width: 100%;
  height: 100%;
  background: url('@/assets/background3.jpg') no-repeat center center;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: fadeIn 1s ease-in-out;
}

.sign-box {
  width: 400px;
  padding: 40px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  animation: slideIn 1s ease-in-out;
}

.title {
  text-align: center;
  font-size: 24px;
  margin-bottom: 20px;
}

.el-form-item {
  width: 100%;
  margin-bottom: 20px;
}

.el-input {
  transition: border-color 0.3s;
}

.el-input:focus {
  border-color: #409eff !important;
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

.avatar-uploader {
  width: 178px;
  height: 178px;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
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
</style>

<script>

import {register} from "@/api/SvtccUser";

export default {
  data() {
    return {
      form: {
        username: '',
        password: '',
        cfpassword: '',
        nickname: '',
        avatar: 'https://www.bing.com/ck/a?!&&p=625bffef3ec7938bJmltdHM9MTcxODY2ODgwMCZpZ3VpZD0zN2RjZjAxMy05MmE2LTY1MTEtMWI5OC1lNDk3OTNlMzY0MDImaW5zaWQ9NTU4NA&ptn=3&ver=2&hsh=3&fclid=37dcf013-92a6-6511-1b98-e49793e36402&u=a1L2ltYWdlcy9zZWFyY2g_cT0lRTUlQTQlQjQlRTUlODMlOEYmRk9STT1JUUZSQkEmaWQ9QkI1RTMxQjFFNDI4NkFBOTIwM0RFOUFCNjA3MjFEMDY3NzQ0MURENA&ntb=1'
      },
      rules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        cfpassword: [{ required: true, message: '请确认密码', trigger: 'blur' }],
        nickname: [{ required: true, message: '请输入昵称', trigger: 'blur' }],
      }
    };
  },
  methods: {
    register() {
      if (this.form.password !== this.form.cfpassword) {
        this.$message.error('密码和确认密码不一致');
        return;
      }
      const { username, password, nickname, avatar } = this.form;
      register({ username, password, nickname, avatar })
          .then(() => {
            this.$message.success('注册成功');
            this.$router.push('/login');
          })
          .catch(error => {
            this.$message.error('注册失败: ' + error.message);
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
