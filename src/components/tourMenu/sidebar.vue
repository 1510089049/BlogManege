<script>
export default {
  //根据点击事件传递地index判断当前路由
  methods: {
    handleSelect(value) {
      let routeName = ''; // 根据value确定的路由名称
      switch (value) {
        case '1-1':
          routeName = 'user';
          break;
        case '1-2':
          routeName = 'start';
          break;
        case '2-1':
          routeName = 'musicList';
          break;
        case '2-2':
          routeName = 'artist';
          break;
        case '2-3':
          routeName = 'album';
          break;
        case '3-1':
          routeName = 'advertising';
          break;
        case '3-2':
          routeName = 'launchAdvertising';
          break;
        case '3-3':
          routeName = 'banner';
          break;
        case '3-4':
          routeName = 'banner';
          break;
        case '3-4-1':
          routeName = 'banner';
          break;
        default:
          routeName = 'Home';
      }

      // 检查即将导航的路由是否与当前路由不同
      if (this.$route.name !== routeName) {
        this.$router.push({ name: routeName });
      }
    }
  },
};
</script>

<template>
  <div>
    <el-container>
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu :default-openeds="['1', '3']" @select="handleSelect">
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-message"></i>用户管理</template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="1-1">user</el-menu-item>
              <el-menu-item index="1-2">login</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-menu"></i>图书管理</template>
            <el-menu-item-group>
              <el-menu-item index="2-1">图书视图</el-menu-item>
              <el-menu-item index="2-2">artist</el-menu-item>
              <el-menu-item index="2-3">Album</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title"><i class="el-icon-setting"></i>广告招商</template>
            <el-menu-item-group>
              <el-menu-item index="3-1">advertising</el-menu-item>
              <el-menu-item index="3-2">launchAdvertising</el-menu-item>
              <el-menu-item index="3-3">banner</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
    </el-container>
  </div>
</template>

<style scoped lang="scss"></style>