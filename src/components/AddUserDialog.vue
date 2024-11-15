<template>
  <el-dialog :visible.sync="dialogVisible" title="新增用户">
    <el-form :model="formData">
      <el-form-item label="用户名">
        <el-input v-model="formData.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="formData.password" type="password"></el-input>
      </el-form-item>
      <el-form-item label="昵称">
        <el-input v-model="formData.nickname"></el-input>
      </el-form-item>
      <el-form-item label="头像">
        <el-input v-model="formData.avatar"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取消</el-button>
      <el-button type="primary" @click="submitForm">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { register } from "@/api/SvtccUser";

export default {
  name: 'AddUserDialog',
  data() {
    return {
      dialogVisible: false,
      formData: {
        username: '',
        password: '',
        nickname: '',
        avatar: ''
      }
    };
  },
  methods: {
    submitForm() {
      register(this.formData).then(response => {
        this.$message.success("用户新增成功");
        this.dialogVisible = false;
        this.$emit('user-added'); // 通知父组件用户已新增
      }).catch(error => {
        this.$message.error("用户新增失败");
        console.error("新增用户请求出错:", error);
      });
    }
  }
}
</script>

<style scoped>
.dialog-footer {
  text-align: right;
}
</style>
