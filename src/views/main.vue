<template>
  <div class="animated-container" v-if="userInfo.code === 2030">
    <el-container>
      <div class="el-form--label-top">
        <sidebar-menu />
      </div>

      <div>

        <Head />
      </div>

      <div>
        <el-main class="animated-main">
          <!-- 根据路由动态渲染组件 -->
          <div>
            <!-- <el-tooltip>
              <Test />
            </el-tooltip> -->
            <router-view></router-view>
          </div>
        </el-main>
      </div>
    </el-container>
  </div>
  <el-dialog v-else :visible.sync="showDialog">
    <span slot="title">提示</span>
    <p>您需要登录后才能查看内容。</p>
    <div slot="footer">
      <el-button @click="showDialog = false">取消</el-button>
      <el-button type="primary" @click="redirectToLogin">去登录</el-button>
    </div>
  </el-dialog>
</template>

<script>
import SidebarMenu from "@/components/tourMenu/sidebar.vue";
// import Test from "@/views/Test.vue";
import { mapState } from "vuex";
import Head from "@/components/tourMenu/Head.vue";

export default {
  components: {
    Head,
    SidebarMenu,
    // Test,
  },
  computed: {
    ...mapState(["userInfo"]),
  },
  data() {
    return {
      showDialog: false,
    };
  },
  methods: {
    redirectToLogin() {
      this.$router.push("/login");
    },
  },
  watch: {
    userInfo: {
      handler(newValue) {
        if (!newValue || newValue.code !== 0) {
          this.showDialog = true;
        }
      },
      immediate: true, // Trigger the handler immediately on component mount
    },
  },
};
</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

.animated-container {
  animation: fadeIn 1s ease-in-out;
}

.animated-header {
  animation: fadeIn 1.5s ease-in-out;
}

.animated-main {
  animation: fadeIn 2s ease-in-out;
}
</style>