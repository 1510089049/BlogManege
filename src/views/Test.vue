<template>
  <div>
    <h1>axios运行成功
    </h1>
    <el-button @click="getUser">获取用户</el-button>
    <el-button @click="getPing">返回用户</el-button>
    <h3>{{ message }}</h3>
  </div>
</template>

<script>
import { getUserByID } from "@/api/user";
import { login } from "@/api/login";
import store from "@/store";
import { GetLrc, GetMusic, GetMusicList } from "@/api/SvtccMusic";
import { DeleteUser } from "@/api/SvtccUser"
// import axios from "axios";
export default {
  name: "Test",
  data() {
    return {
      message: '',
    }
  },
  methods: {
    getUser() {
      login().then(res => {
        // console.log(res.data.data)
      })
      getUserByID(1).then(res => {
        console.log(this.$store.state.moudls)
      })
      getUserByID(1).then(res => {
        console.log(res.data.data)
        this.message = res.data.data
        console.log('before', this.$store.state.moudls.userinfo)
        store.state.moudls.userinfo = res.data
        console.log('after', this.$store.state.moudls.userinfo)
      })
      // const res = axios.get("http://localhost:8088/SSM/user/1")
      // alert(res)
    },
    getPing() {
      DeleteUser(14);
    }
  }

};
</script>